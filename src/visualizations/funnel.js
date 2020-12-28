import funnel from "@fnando/sparkline";

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
      var date = (new Date(datapoint.date)).toUTCString().replace(/^.*?, (.*?) \d{2}:\d{2}:\d{2}.*?$/, "$1");
      var container = document.querySelector(".funnel");
        
      tooltip.hidden = false;
      tooltip.textContent = `${date}: ${datapoint.html}`;
      
      
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
          section: "funnel",
          type: "array",
          label: "Stroke color",
          display: "color",
          default: ["#353b49"]
        },
        strokeWidth: {
            label: "Stroke width",
            section: "funnel",
            type: "number",
            default: "3"  
        },
        fill: {
            section: "funnel",
            type: "array",
            label: "Fill color",
            display: "color"
        },
        top_label: {
          section: "Header",
          type: "string",
          label: "Label (for top)",
          placeholder: "My Great Chart"
        },
        last: {
          section: "Header",
          type: "boolean",
          label: "Use the last value?"
        }
    },
	create: function(element, config){
		element.innerHTML = `<svg class="funnel" width="${element.offsetWidth}" height="${element.offsetHeight - 37}" stroke-width="3"></svg>`;
    },
	updateAsync: function(data, element, config, queryResponse, details, doneRendering){
        
        let values = queryResponse.fields.measure_like.map((field) => {
            let key =    field.label
            let value =  field.name
            return {[key]: value}
        })
        let firstDimension = queryResponse.fields.dimensions[0].name;
        let options = this.options;
        options["funnelData"] =
        {
            section: "funnel",
            type: "string",
            label: "Measure for funnel",
            display: "select",
            values: values
        }
        options["headerData"] =
        {
            section: "Header",
            type: "string",
            label: "Measure for Header",
            display: "select",
            values: values,
        }
      
        
        if (config.funnelData == null) {
            this.trigger('registerOptions', options) // register options with parent page to update visConfig
        }
        
    
        // Grab the header cell
        var headerRow = config.last ? data[data.length-1] : data[0];
        var headerCell = headerRow[config.headerData];
        var header = LookerCharts.Utils.htmlForCell(headerCell);
        
        var dataArray = [];
        for(var row of data) {
              var measureCell = row[config.funnelData];
              var dateCell = row[firstDimension];
                dataArray.push({
                  "name": config.top_label,
                  "value": parseFloat(LookerCharts.Utils.textForCell(measureCell).replace(/[^0-9.]/g,'')),
                  "date": LookerCharts.Utils.textForCell(dateCell),
                  "html": LookerCharts.Utils.textForCell(measureCell)
              });
         }

        //  Montserrat:
        //  https://fonts.gstatic.com/s/montserrat/v14/JTUSjIg1_i6t8kCHKm459Wlhyw.woff2);}'+
         
        var styleEl = document.createElement('style');
        styleEl.setAttribute('type',"text/css")
        styleEl.innerHTML = '@font-face '+
          '{font-family: Open Sans;'+
            'src: url( https://fonts.gstatic.com/s/opensans/v17/mem8YaGs126MiZpBA-UFVZ0b.woff2 );}'+
          'div {font-family: Open Sans;};'


         document.head.appendChild(styleEl);

         element.innerHTML = `
         
         <div class="headerdiv" style=" font-style: normal; font-weight: 300; font-size: 16px;">
         ${config.top_label}
         <div style="font-size: 24px; font-weight: bolder;">${header}</div></div>
         <svg class="funnel" width="${element.offsetWidth}" height="${element.offsetHeight - 32}" stroke-width="${config.strokeWidth}"
          stroke="${config.stroke}"  fill="${config.fill}"></svg>
          <span class="tooltip" style="position: absolute; 
            background: rgba(0, 0, 0, .7);
            color: #fff;
            padding: 2px 5px;
            font-size: 12px;
            white-space: nowrap;
            z-index: 9999;
          }" hidden="true"></span>`;
    
       
         funnel(document.querySelector(".funnel"), dataArray, funnel_options);
		doneRendering()
	}
});