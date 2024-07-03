import { handleErrors } from '../common/utils';
import FunnelGraph from 'funnel-graph-js-2';
import './css/main.css';
import './css/themes.css'


function loadFunnelGraphStyles() {
  const cssUrls = [
    "https://unpkg.com/funnel-graph-js@1.3.9/dist/css/main.min.css",
    "https://unpkg.com/funnel-graph-js@1.3.9/dist/css/theme.min.css"
  ];

  cssUrls.forEach(url => {
    if (!document.querySelector(`link[href="${url}"]`)) {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.type = 'text/css';
      link.href = url;
      document.head.appendChild(link);
    }
  });
}


export const viz = looker.plugins.visualizations.add({
  options: {
    background: {
      section: "Colors",
      type: "array",
      label: "Background Color",
      display: "color",
      default: ["#353b49"]
    },
    colorArray: {
      section: "Colors",
      type: "array",
      label: "Colors for Multiple Series",
      display: "colors",
      default: []
    },
    startColor: {
      section: "Colors",
      type: "array",
      label: "Starting Color",
      display: "color",
      default: ["#22ff22"]
    },
    endColor: {
      section: "Colors",
      type: "array",
      label: "Ending Color",
      display: "color",
      default: ["#ff2222"]
    },
    valueColor: {
      section: "Font",
      type: "array",
      label: "Value Color",
      display: "color",
      default: ["#ffffff"],
      order: 1
    },
    labelColor: {
      section: "Font",
      type: "array",
      label: "Label Color",
      display: "color",
      default: ["#ffffff"],
      order: 11
    },
    percentColor: {
      section: "Font",
      type: "array",
      label: "Percent Color",
      display: "color",
      default: ["#ffffff"],
      order: 21
    },
    percentDiffColor: {
      section: "Font",
      type: "array",
      label: "Percent Diff Color",
      display: "color",
      default: ["#ffffff"],
      order: 31
    },
    valueFontSize: {
      section: "Font",
      type: "number",
      label: "value Font Size",
      default: 18,
      order: 2
    },
    labelFontSize: {
      section: "Font",
      type: "number",
      label: "value Font Size",
      default: 14,
      order: 12
    },
    percentFontSize: {
      section: "Font",
      type: "number",
      label: "Percent Font Size",
      default: 14,
      order: 22
    },
    percentDiffFontSize: {
      section: "Font",
      type: "number",
      label: "Percent Diff Font Size",
      default: 14,
      order: 32
    },
    valueFontWeight: {
      section: "Font",
      type: "number",
      label: "value Font Weight",
      default: 800,
      order: 3
    },
    labelFontWeight: {
      section: "Font",
      type: "number",
      label: "value Font Weight",
      default: 400,
      order: 13
    },
    percentFontWeight: {
      section: "Font",
      type: "number",
      label: "Percent Font Weight",
      default: 400,
      order: 23
    },
    percentDiffFontWeight: {
      section: "Font",
      type: "number",
      label: "Percent Diff Font Weight",
      default: 400,
      order: 33
    },
    direction: {
      section: "Colors",
      type: "string",
      label: "Direction",
      display: "select",
      values: [
        { "Vertical": "vertical" },
        { "Horizontal": "horizontal" }
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
      .svg-funnel-js__container {
        margin-top: 70px;
      }
      .label__value { 
        color: ${config.valueColor} !important;
        font-size: ${config.valueFontSize}px !important;
        font-weight: ${config.valueFontWeight} !important;
      }
      .label__title {
        color: ${config.labelColor} !important;
        font-size: ${config.labelFontSize}px !important;
        font-weight: ${config.labelFontWeight} !important;
      }
      .label__percentage {
        color: ${config.percentColor} !important;
        font-size: ${config.percentFontSize}px !important;
        font-weight: ${config.percentFontWeight} !important
      }
      .label__delta-percentage {
        color: ${config.percentDiffColor} !important;
        font-size: ${config.percentDiffFontSize}px !important;
        font-weight: ${config.percentDiffFontWeight} !important
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
      return config[measure.name];
    })
    let subLabels = [];
    let values = [];
    const hasADimension = queryResponse.fields.dimension_like.length > 0;
    let colorArrayForMultipleSeries = [];
    if (hasADimension) {
      if (config?.colorArray?.length === 0) {
        errors.push(
          'If you have a dimension, you must provide a Colors for Multiple Series palette option.'
        )
      }
      const dimension = queryResponse.fields.dimension_like[0];
      const dimensionValuesCount = data.map((row) => row[dimension.name].value).length;

      subLabels = data.map((row) => row[dimension.name].value);
      values = data.map((row) => {
        return measures.map((measure) => {
          return row[measure.name].value;
        })
      })
      console.log(values)
      // Begin color array handling
      // Assuming config.colorArray has exactly 12 entries
      const colorPairs = [];
      // First 6 pairs in direct order
      for (let i = 0; i < 6; i++) {
        colorPairs.push([config.colorArray[i], config.colorArray[i + 6]]);
      }
      // Next 6 pairs in reversed order to ensure distinctiveness
      for (let i = 0; i < 6; i++) {
        colorPairs.push([config.colorArray[11 - i], config.colorArray[5 - i]]);
      }
      // Ensure there's a color pair for each dimension value
      for (let i = 0; i < dimensionValuesCount; i++) {
        // Use modulo operator to loop through colorPairs array
        colorArrayForMultipleSeries.push(colorPairs[i % colorPairs.length]);
      }
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
          colors: colorArrayForMultipleSeries,
          values: values
        },
        displayPercent: true,
        direction: config.direction,
        gradientDirection: config.direction,
        height: element.offsetHeight - 70
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
        height: element.offsetHeight - 70
      });
    }
    graph.draw();

    // element.innerHTML = "Hello World"
    doneRendering()
  }
});