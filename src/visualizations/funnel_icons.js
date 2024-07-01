import funnel from "@fnando/sparkline";
import { handleErrors } from '../common/utils';

function findClosest(target, tagName) {

  if (target.tagName === tagName) {
    return target;
  }

  while ((target = target.parentNode)) {
    if (target.tagName === tagName) {
      return target;
    }
  }

  return target;
}

var funnel_options = {
  onmousemove(event, datapoint) {
    var svg = findClosest(event.target, "svg");

    var tooltip = svg.nextElementSibling;
    var container = document.querySelector(".funnel");

    tooltip.hidden = false;
    tooltip.textContent = datapoint.html;


    // tooltip.style.top = `${event.offsetY + 35}px`;
    // tooltip.style.left = `${event.offsetX - 20}px`;
    tooltip.style.top = `${container.clientHeight + 35}px`;
    tooltip.style.left = `20px`;

    // tooltip.textContent = JSON.stringify(document.querySelector(".funnel").clientHeight)
  },

  onmouseout() {
    var svg = findClosest(event.target, "svg");
    var tooltip = svg.nextElementSibling;
    tooltip.hidden = true;
  }
};


export const viz = looker.plugins.visualizations.add({
  options: {
    stroke: {
      section: "Styling",
      type: "array",
      label: "Stroke color",
      display: "color",
      default: ["#353b49"]
    },
    strokeWidth: {
      section: "Styling",
      label: "Stroke width",
      type: "number",
      default: 3
    },
    fill: {
      section: "Styling",
      type: "array",
      label: "Fill color",
      display: "color"
    },
    drop_icon_uri: {
      section: "Icon",
      type: "string",
      label: "Drop Icon URI",
      display: "text",
      default: "https://cdn0.iconfinder.com/data/icons/flat-round-arrow-arrow-head/512/Red_Arrow_Down-512.png"
    },
    conversion_icon_uri: {
      section: "Icon",
      type: "string",
      label: "Conversion Icon URI",
      display: "text",
      default: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/Check_green_circle.svg/1024px-Check_green_circle.svg.png"
    },
    icon_height: {
      section: "Icon",
      type: "string",
      label: "Icon Height",
      display: "text",
      default: "30px"
    },
    icon_width: {
      section: "Icon",
      type: "string",
      label: "Icon Width",
      display: "text",
      default: "30px"
    },
  },
  create: function (element, config) {
    element.innerHTML = `<svg class="funnel" width="${element.offsetWidth}" height="${element.offsetHeight}" stroke-width="3"></svg>`;
  },
  updateAsync: function (data, element, config, queryResponse, details, doneRendering) {

    element.innerHTML = ''
    // Handle the names and number of fields
    const errors = handleErrors(this, queryResponse, {
      max_pivots: 0,
      min_dimensions: 0,
      max_dimensions: 0,
      min_measures: 2,
      max_measures: 10
    });

    let measures = queryResponse.fields.measure_like
    let options = this.options;

    measures.forEach((measure) => {
      options[measure.name] =
      {
        section: "Series",
        type: "string",
        label: `Label for '${measure.label}'`,
        default: measure.label
      }
    })

    this.trigger('registerOptions', options) // register options with parent page to update visConfig

    let measureCount = measures.length;

    // Grab the header cell
    // var headerRow = config.last ? data[data.length-1] : data[0];
    // var headerCell = headerRow[config.headerData];
    // var header = LookerCharts.Utils.htmlForCell(headerCell);

    var dataArray = [];

    // Each section is for 1 of the funnel steps
    let sections = document.createElement('div')

    measures.forEach((measure,i) => {
      let cell = data[0][measure.name]
      let value = parseFloat(LookerCharts.Utils.textForCell(cell).replace(/[^0-9.]/g, ''))
      dataArray.push({
        "name": measure.label,
        "value": value,
        "html": LookerCharts.Utils.htmlForCell(cell)
      });

      let iconUri = config.drop_icon_uri
      // calculate amount remaining
      let retainedText = ''
      if(i != 0){
        let previousMeasure = measures[i-1].name
        let previousCell = data[0][previousMeasure] 
        let previousValue = parseFloat(LookerCharts.Utils.textForCell(previousCell).replace(/[^0-9.]/g, '')) || 0
        let percent = previousValue === 0 ? 0 : Math.floor(1000*value/previousValue)/10  
        retainedText = `${percent}% of ${previousValue.toLocaleString('en')}`
      }

      let dropOffText = ''
      let firstMeasure = measures[0].name
      let firstCell = data[0][firstMeasure]
      let firstValue = parseFloat(LookerCharts.Utils.textForCell(firstCell).replace(/[^0-9.]/g, '')) || 0

      // calculate drop offs
      if(i != measureCount-1){
        let nextMeasure = measures[i+1].name
        let nextCell = data[0][nextMeasure] 
        let nextValue = parseFloat(LookerCharts.Utils.textForCell(nextCell).replace(/[^0-9.]/g, '')) || 0
        
        let drop = value - nextValue
        let percent = firstValue === 0 ? 0 : Math.floor(1000*drop/firstValue)/10 
        dropOffText = `DROP-OFF ${percent}% <br/> (${drop.toLocaleString('en')})`
      }

      // calculate final column's Conversion and icon url
      if(i == measureCount-1){
        let percent = firstValue === 0 ? 0 : Math.floor(1000*value/firstValue)/10 
        dropOffText = `CONVERSION ${percent}% `
        // Use the conversion icon 
        iconUri = config.conversion_icon_uri
      }
      
      // Crafting HTML elements
      let newSection = document.createElement('div')
      let widthPercent = 100 / (measureCount);
      newSection.style.width  = `${widthPercent}%`
      newSection.style.textAlign = 'center'

      let nameDiv = document.createElement('div')
      nameDiv.innerHTML = measure.label

      let valueDiv = document.createElement('div')
      valueDiv.innerHTML = value.toLocaleString('en')

      let retainedDiv = document.createElement('div')
      retainedDiv.innerHTML = retainedText

      let iconImg = `<img height='${config.icon_height || '30px'} width=${config.icon_width || '30px'} src=${iconUri || config.drop_icon_uri}/>`

      let iconDiv = document.createElement('div')
      iconDiv.style.marginTop = `${element.offsetHeight - 135 + (i===0? 22 : 0)}px`
      iconDiv.innerHTML = `<img height="${config.icon_height || '30px'}" width="${config.icon_width || '30px'}" src="${iconUri || config.drop_icon_uri}"/>`  
      let dropOffDiv = document.createElement('div')
      dropOffDiv.innerHTML = dropOffText

      newSection.appendChild(nameDiv)
      newSection.appendChild(valueDiv)
      newSection.appendChild(retainedDiv)
      newSection.appendChild(iconDiv)
      newSection.appendChild(dropOffDiv)

      sections.appendChild(newSection)
    
    })
    // Add final measure twice for the nice layout
    let cell = data[0][measures[measureCount - 1].name]
    dataArray.push({
      "name": measures[measureCount - 1].label,
      "value": parseFloat(LookerCharts.Utils.textForCell(cell).replace(/[^0-9.]/g, '')),
      "html": LookerCharts.Utils.htmlForCell(cell)
    });

    


    //  Montserrat:
    //  https://fonts.gstatic.com/s/montserrat/v14/JTUSjIg1_i6t8kCHKm459Wlhyw.woff2);}'+

    let styleEl = document.createElement('style');
    styleEl.setAttribute('type', "text/css")
    styleEl.innerHTML = '@font-face ' +
      '{font-family: Open Sans;' +
      'src: url( https://fonts.gstatic.com/s/opensans/v17/mem8YaGs126MiZpBA-UFVZ0b.woff2 );}' +
      'div {font-family: Open Sans;};'

    document.head.appendChild(styleEl);

    let vizDiv = document.createElement('div')
    vizDiv.style.position = 'absolute'
    vizDiv.style.zIndex = '-1'
    // vizDiv.style.marginTop = '20px'

    vizDiv.innerHTML = `<svg class="funnel" width="${element.offsetWidth}" height="${element.offsetHeight - 60}" stroke-width="${config.strokeWidth}"
      stroke="${config.stroke[0]}"  fill="${config.fill[0]}" ></svg>`

    element.appendChild(vizDiv)

    sections.className = 'headerdiv'
    sections.style.display = 'flex'
    sections.style.fontStyle = 'normal'
    sections.style.fontWeight = '300'
    sections.style.fontSize = '16px'
    sections.style.zIndex = '100'
    
    element.appendChild(sections)

    // element.innerHTML = `
    // <div style="position:absolute; z-index:-1; margin-top: 20px;" >
    // <svg class="funnel" width="${element.offsetWidth}" height="${element.offsetHeight}" stroke-width="${config.strokeWidth}"
    //   stroke="${config.stroke}"  fill="${config.fill}" ></svg>
    // </div> 
    // <div class="headerdiv" style="display: flex; font-style: normal; font-weight: 300; font-size: 16px; z-index:100">
    //         ${sections.}
    // </div>
    //         `
    // <span class="tooltip" style="position: absolute; 
    //   background: rgba(0, 0, 0, .7);
    //   color: #fff;
    //   padding: 2px 5px;
    //   font-size: 12px;
    //   white-space: nowrap;
    //   z-index: 9999;
    // }" hidden="true"></span>



    funnel(document.querySelector(".funnel"), dataArray,
      // Uncomment below to attach the tooltip actions (needs work.)
      // funnel_options
    );
    doneRendering()
  }
});