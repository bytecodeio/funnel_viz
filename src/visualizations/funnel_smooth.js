import funnel from "@fnando/sparkline";
import { handleErrors } from '../common/utils';
import FunnelGraph from 'funnel-graph-js';

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
    
  },
  create: function (element, config) {
    element.innerHTML = `<svg class="funnel" width="${element.offsetWidth}" height="${element.offsetHeight}" stroke-width="3"></svg>`;
  },
  updateAsync: function (data, element, config, queryResponse, details, doneRendering) {

    element.innerHTML = ''
    // Handle the field counts
    const errors = handleErrors(this, queryResponse, {
      max_pivots: 0,
      min_dimensions: 0,
      max_dimensions: 0,
      min_measures: 2,
      max_measures: 10
    });

    let measures = queryResponse.fields.measure_like
    let options = this.options;

    // make an option for labeling each measure
    measures.forEach((measure) => {
      options[measure.name] =
      {
        section: "Series",
        type: "string",
        label: `Label for '${measure.label}'`,
        default: measure.label
      }
    })
// Example call for funnel-graph-js library:
// var graph = new FunnelGraph({
//     container: '.funnel',
//     gradientDirection: 'horizontal',
//     data: {...},
//     displayPercent: true,
//     direction: 'horizontal'
// });
// graph.draw();
// Example data for funnel-graph-js library:
// data: {
//     labels: ['Impressions', 'Add To Cart', 'Buy'],
//     colors: ['orange', 'red'],
//     values: [12000, 5700, 360]
// },

    this.trigger('registerOptions', options) // register options with parent page to update visConfig

    // Data handling example
    var dataArray = [];
    measures.forEach((measure,i) => {
      let cell = data[0][measure.name]
      let value = parseFloat(LookerCharts.Utils.textForCell(cell).replace(/[^0-9.]/g, ''))
      dataArray.push({
        "name": measure.label,
        "value": value,
        "html": LookerCharts.Utils.htmlForCell(cell)
      });
    })
    
    element.innerHTML = "Hello World"
    doneRendering()
  }
});