import { handleErrors } from '../common/utils';
import FunnelGraph from 'funnel-graph-js';
import './css/main.css';
import './css/themes.css'


function loadFunnelGraphStyles() {
  const cssUrls = [
    "https://unpkg.com/funnel-graph-js@1.3.9/dist/css/main.min.css",
    "https://unpkg.com/funnel-graph-js@1.3.9/dist/css/theme.min.css"
  ];

  cssUrls.forEach(url => {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.type = 'text/css';
    link.href = url;
    document.head.appendChild(link);
  });
}

function injectStyles(config) {
  const styleId = 'my-visualization-styles'; // A unique identifier for your styles
  let styleElement = document.getElementById(styleId);

  if (!styleElement) {
    styleElement = document.createElement('style');
    styleElement.id = styleId;
    document.head.appendChild(styleElement);
  }

  styleElement.innerHTML = `
    .funnel-container {
      background-color: ${config.background} !important;
    }
  `;
}

export const viz = looker.plugins.visualizations.add({
  options: {
    background: {
      section: "Styling",
      type: "array",
      label: "Background Color",
      display: "color",
      default: ["#353b49"]
    },
    startColor: {
      section: "Styling",
      type: "array",
      label: "Starting Color",
      display: "color",
      default: ["#22ff22"]
    },
    endColor: {
      section: "Styling",
      type: "array",
      label: "Ending Color",
      display: "color",
      default: ["#ff2222"]
    },
      direction: {
        section: "Styling",
        type: "string",
        label: "Direction",
        display: "select",
        values: [
          {"Vertical": "vertical"},
          {"Horizontal": "horizontal"}
        ],
        default: "horizontal"
      },
  },
  create: function (element, config) {
    element.innerHTML = `<svg class="funnel" width="${element.offsetWidth}" height="${element.offsetHeight}" stroke-width="3"></svg>`;
  },
  updateAsync: function (data, element, config, queryResponse, details, doneRendering) {

    element.innerHTML = `
    <style>
    body {
      background-color: ${config.background};
    }
    </style>`
    // Call this function at an appropriate time (e.g., when initializing your app or component)
    loadFunnelGraphStyles();

    // Handle the field counts
    const errors = handleErrors(this, queryResponse, {
      max_pivots: 0,
      min_dimensions: 0,
      max_dimensions: 1,
      min_measures: 2,
      max_measures: 10
    });

    let measures = queryResponse.fields.measure_like
    let options = this.options;

    // make an option for labeling each measure
    measures.forEach((measure) => {
      options[measure.name] =
      {
        section: "Labels",
        type: "string",
        label: `Label for '${measure.label}'`,
        default: measure.label
      }
    })
    
    this.trigger('registerOptions', options) // register options with parent page to update visConfig

// Example call for funnel-graph-js library:
element.classList.add('funnel-container');

const labels = measures.map((measure) => {
  console.log(measure)
  return config[measure.name];
})
console.log('labels:',labels)
let subLabels = [];
let values = [];
const hasADimension = queryResponse.fields.dimension_like.length > 0;
if (hasADimension) {
  const dimension = queryResponse.fields.dimension_like[0];
  subLabels = data.map((row) => row[dimension.name].value);
  values = data.map((row) => {
    return measures.map((measure) => {
      return row[measure.name].value;
  })
  })
} else {
  values = measures.map((measure) => {
      return data[0][measure.name].value;
  })
  }

  let graph;
if (hasADimension) {
graph = new FunnelGraph({
    container: '.funnel-container',
    data: {
      subLabels: subLabels,
      labels: labels,
      colors: ['orange','blue'],
      values: values
  },
    displayPercent: true,
    direction: config.direction,
    gradientDirection: config.direction,
});
} else {
  graph = new FunnelGraph({
    container: '.funnel-container',
    data: {
      labels: labels,
      colors: [config.startColor, config.endColor],
      values: values
  },
    displayPercent: true,
    direction: config.direction,
    gradientDirection: config.direction,
});
}
console.log(graph)
graph.draw();

    // element.innerHTML = "Hello World"
    doneRendering()
  }
});