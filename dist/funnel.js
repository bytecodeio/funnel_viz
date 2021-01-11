(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["funnel"] = factory();
	else
		root["funnel"] = factory();
})(window, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/visualizations/funnel.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/@fnando/sparkline/dist/sparkline.commonjs2.js":
/*!********************************************************************!*\
  !*** ./node_modules/@fnando/sparkline/dist/sparkline.commonjs2.js ***!
  \********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports=function(t){var e={};function r(n){if(e[n])return e[n].exports;var o=e[n]={i:n,l:!1,exports:{}};return t[n].call(o.exports,o,o.exports,r),o.l=!0,o.exports}return r.m=t,r.c=e,r.d=function(t,e,n){r.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:n})},r.r=function(t){\"undefined\"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:\"Module\"}),Object.defineProperty(t,\"__esModule\",{value:!0})},r.t=function(t,e){if(1&e&&(t=r(t)),8&e)return t;if(4&e&&\"object\"==typeof t&&t&&t.__esModule)return t;var n=Object.create(null);if(r.r(n),Object.defineProperty(n,\"default\",{enumerable:!0,value:t}),2&e&&\"string\"!=typeof t)for(var o in t)r.d(n,o,function(e){return t[e]}.bind(null,o));return n},r.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return r.d(e,\"a\",e),e},r.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},r.p=\"\",r(r.s=1)}([function(t,e,r){var n=r(2),o=r(3),i=r(4);t.exports=function(t){return n(t)||o(t)||i()}},function(t,e,r){\"use strict\";r.r(e),r.d(e,\"sparkline\",function(){return c});var n=r(0),o=r.n(n);function i(t,e,r,n){return parseFloat((e-n*e/t+r).toFixed(2))}function a(t){return t.value}function u(t,e){var r=document.createElementNS(\"http://www.w3.org/2000/svg\",t);for(var n in e)r.setAttribute(n,e[n]);return r}function c(t,e,r){var n;if(n=t,o()(n.querySelectorAll(\"*\")).forEach(function(t){return n.removeChild(t)}),!(e.length<=1)){r=r||{},\"number\"==typeof e[0]&&(e=e.map(function(t){return{value:t}}));var c=r.onmousemove,l=r.onmouseout,s=\"interactive\"in r?r.interactive:!!c,f=r.spotRadius||2,p=2*f,d=r.cursorWidth||2,v=parseFloat(t.attributes[\"stroke-width\"].value),b=r.fetch||a,h=e.map(function(t){return b(t)}),y=parseFloat(t.attributes.width.value)-2*p,x=parseFloat(t.attributes.height.value),m=x-2*v-p,g=Math.max.apply(Math,o()(h)),A=-1e3,w=h.length-1,j=y/w,O=[],k=i(g,m,v+f,h[0]),S=\"M\".concat(p,\" \").concat(k);h.forEach(function(t,r){var n=r*j+p,o=i(g,m,v+f,t);O.push(Object.assign({},e[r],{index:r,x:n,y:o})),S+=\" L \".concat(n,\" \").concat(o)});var M=u(\"path\",{class:\"sparkline--line\",d:S,fill:\"none\"}),C=u(\"path\",{class:\"sparkline--fill\",d:\"\".concat(S,\" V \").concat(x,\" L \").concat(p,\" \").concat(x,\" Z\"),stroke:\"none\"});if(t.appendChild(C),t.appendChild(M),s){var E=u(\"line\",{class:\"sparkline--cursor\",x1:A,x2:A,y1:0,y2:x,\"stroke-width\":d}),_=u(\"circle\",{class:\"sparkline--spot\",cx:A,cy:A,r:f});t.appendChild(E),t.appendChild(_);var F=u(\"rect\",{width:t.attributes.width.value,height:t.attributes.height.value,style:\"fill: transparent; stroke: transparent\",class:\"sparkline--interaction-layer\"});t.appendChild(F),F.addEventListener(\"mouseout\",function(t){E.setAttribute(\"x1\",A),E.setAttribute(\"x2\",A),_.setAttribute(\"cx\",A),l&&l(t)}),F.addEventListener(\"mousemove\",function(t){var e=t.offsetX,r=O.find(function(t){return t.x>=e});r||(r=O[w]);var n,o=O[O.indexOf(r)-1],i=(n=o?o.x+(r.x-o.x)/2<=e?r:o:r).x,a=n.y;_.setAttribute(\"cx\",i),_.setAttribute(\"cy\",a),E.setAttribute(\"x1\",i),E.setAttribute(\"x2\",i),c&&c(t,n)})}}}e.default=c},function(t,e){t.exports=function(t){if(Array.isArray(t)){for(var e=0,r=new Array(t.length);e<t.length;e++)r[e]=t[e];return r}}},function(t,e){t.exports=function(t){if(Symbol.iterator in Object(t)||\"[object Arguments]\"===Object.prototype.toString.call(t))return Array.from(t)}},function(t,e){t.exports=function(){throw new TypeError(\"Invalid attempt to spread non-iterable instance\")}}]);\n//# sourceMappingURL=sparkline.commonjs2.js.map\n\n//# sourceURL=webpack://%5Bname%5D/./node_modules/@fnando/sparkline/dist/sparkline.commonjs2.js?");

/***/ }),

/***/ "./src/common/utils.ts":
/*!*****************************!*\
  !*** ./src/common/utils.ts ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nexports.handleErrors = void 0;\nexports.handleErrors = (vis, res, options) => {\n    const check = (group, noun, count, min, max) => {\n        if (!vis.addError || !vis.clearErrors)\n            return false;\n        if (count < min) {\n            vis.addError({\n                title: `Not Enough ${noun}s`,\n                message: `This visualization requires ${min === max ? 'exactly' : 'at least'} ${min} ${noun.toLowerCase()}${min === 1 ? '' : 's'}.`,\n                group\n            });\n            return false;\n        }\n        if (count > max) {\n            vis.addError({\n                title: `Too Many ${noun}s`,\n                message: `This visualization requires ${min === max ? 'exactly' : 'no more than'} ${max} ${noun.toLowerCase()}${min === 1 ? '' : 's'}.`,\n                group\n            });\n            return false;\n        }\n        vis.clearErrors(group);\n        return true;\n    };\n    const { pivots, dimensions, measure_like: measures } = res.fields;\n    return (check('pivot-req', 'Pivot', pivots.length, options.min_pivots, options.max_pivots)\n        && check('dim-req', 'Dimension', dimensions.length, options.min_dimensions, options.max_dimensions)\n        && check('mes-req', 'Measure', measures.length, options.min_measures, options.max_measures));\n};\n\n\n//# sourceURL=webpack://%5Bname%5D/./src/common/utils.ts?");

/***/ }),

/***/ "./src/visualizations/funnel.js":
/*!**************************************!*\
  !*** ./src/visualizations/funnel.js ***!
  \**************************************/
/*! exports provided: viz */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"viz\", function() { return viz; });\n/* harmony import */ var _fnando_sparkline__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @fnando/sparkline */ \"./node_modules/@fnando/sparkline/dist/sparkline.commonjs2.js\");\n/* harmony import */ var _fnando_sparkline__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_fnando_sparkline__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _common_utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../common/utils */ \"./src/common/utils.ts\");\n/* harmony import */ var _common_utils__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_common_utils__WEBPACK_IMPORTED_MODULE_1__);\n\n\n\nfunction findClosest(target, tagName) {\n\n  if (target.tagName === tagName) {\n    return target;\n  }\n\n  while ((target = target.parentNode)) {\n    if (target.tagName === tagName) {\n      return target;\n    }\n  }\n\n  return target;\n}\n\nvar funnel_options = {\n  onmousemove(event, datapoint) {\n    var svg = findClosest(event.target, \"svg\");\n\n    var tooltip = svg.nextElementSibling;\n    var container = document.querySelector(\".funnel\");\n\n    tooltip.hidden = false;\n    tooltip.textContent = datapoint.html;\n\n\n    // tooltip.style.top = `${event.offsetY + 35}px`;\n    // tooltip.style.left = `${event.offsetX - 20}px`;\n    tooltip.style.top = `${container.clientHeight + 35}px`;\n    tooltip.style.left = `20px`;\n\n    // tooltip.textContent = JSON.stringify(document.querySelector(\".funnel\").clientHeight)\n  },\n\n  onmouseout() {\n    var svg = findClosest(event.target, \"svg\");\n    var tooltip = svg.nextElementSibling;\n    tooltip.hidden = true;\n  }\n};\n\n\nconst viz = looker.plugins.visualizations.add({\n  options: {\n    stroke: {\n      section: \"Styling\",\n      type: \"array\",\n      label: \"Stroke color\",\n      display: \"color\",\n      default: [\"#353b49\"]\n    },\n    strokeWidth: {\n      section: \"Styling\",\n      label: \"Stroke width\",\n      type: \"number\",\n      default: \"3\"\n    },\n    fill: {\n      section: \"Styling\",\n      type: \"array\",\n      label: \"Fill color\",\n      display: \"color\"\n    },\n    drop_icon_uri: {\n      section: \"Icon\",\n      type: \"string\",\n      label: \"Drop Icon URI\",\n      display: \"text\",\n      default: \"https://cdn0.iconfinder.com/data/icons/flat-round-arrow-arrow-head/512/Red_Arrow_Down-512.png\"\n    },\n    conversion_icon_uri: {\n      section: \"Icon\",\n      type: \"string\",\n      label: \"Conversion Icon URI\",\n      display: \"text\",\n      default: \"https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/Check_green_circle.svg/1024px-Check_green_circle.svg.png\"\n    },\n    icon_height: {\n      section: \"Icon\",\n      type: \"string\",\n      label: \"Icon Height\",\n      display: \"text\",\n      default: \"30px\"\n    },\n    icon_width: {\n      section: \"Icon\",\n      type: \"string\",\n      label: \"Icon Width\",\n      display: \"text\",\n      default: \"30px\"\n    },\n  },\n  create: function (element, config) {\n    element.innerHTML = `<svg class=\"funnel\" width=\"${element.offsetWidth}\" height=\"${element.offsetHeight}\" stroke-width=\"3\"></svg>`;\n  },\n  updateAsync: function (data, element, config, queryResponse, details, doneRendering) {\n\n    element.innerHTML = ''\n    // Handle the names and number of fields\n    const errors = Object(_common_utils__WEBPACK_IMPORTED_MODULE_1__[\"handleErrors\"])(this, queryResponse, {\n      max_pivots: 0,\n      min_dimensions: 0,\n      max_dimensions: 0,\n      min_measures: 2,\n      max_measures: 10\n    });\n\n    let measures = queryResponse.fields.measure_like\n    // .map((field) => {\n    //   let key = field.label\n    //   let value = field.name\n    //   return { [key]: value }\n    // })\n    let options = this.options;\n\n    // reset the viz on re-rendering.\n    measures.forEach((measure) => {\n      options[measure.name] =\n      {\n        section: \"Series\",\n        type: \"string\",\n        label: `Label for '${measure.label}'`,\n        default: measure.label\n      }\n    })\n\n    this.trigger('registerOptions', options) // register options with parent page to update visConfig\n\n    let measureCount = measures.length;\n\n    // Grab the header cell\n    // var headerRow = config.last ? data[data.length-1] : data[0];\n    // var headerCell = headerRow[config.headerData];\n    // var header = LookerCharts.Utils.htmlForCell(headerCell);\n\n    var dataArray = [];\n\n    // Each section is for 1 of the funnel steps\n    let sections = document.createElement('div')\n\n    measures.forEach((measure,i) => {\n      let cell = data[0][measure.name]\n      let value = parseFloat(LookerCharts.Utils.textForCell(cell).replace(/[^0-9.]/g, ''))\n      dataArray.push({\n        \"name\": measure.label,\n        \"value\": value,\n        \"html\": LookerCharts.Utils.htmlForCell(cell)\n      });\n\n      let iconUri = config.drop_icon_uri\n      // calculate amount remaining\n      let retainedText = ''\n      if(i != 0){\n        let previousMeasure = measures[i-1].name\n        let previousCell = data[0][previousMeasure] \n        let previousValue = parseFloat(LookerCharts.Utils.textForCell(previousCell).replace(/[^0-9.]/g, '')) || 0\n        let percent = previousValue === 0 ? 0 : Math.floor(1000*value/previousValue)/10  \n        retainedText = `${percent}% of ${previousValue.toLocaleString('en')}`\n      }\n\n      let dropOffText = ''\n      let firstMeasure = measures[0].name\n      let firstCell = data[0][firstMeasure]\n      let firstValue = parseFloat(LookerCharts.Utils.textForCell(firstCell).replace(/[^0-9.]/g, '')) || 0\n\n      // calculate drop offs\n      if(i != measureCount-1){\n        let nextMeasure = measures[i+1].name\n        let nextCell = data[0][nextMeasure] \n        let nextValue = parseFloat(LookerCharts.Utils.textForCell(nextCell).replace(/[^0-9.]/g, '')) || 0\n        \n        let drop = value - nextValue\n        let percent = firstValue === 0 ? 0 : Math.floor(1000*drop/firstValue)/10 \n        dropOffText = `DROP-OFF ${percent}% <br/> (${drop.toLocaleString('en')})`\n      }\n\n      // calculate final column's Conversion and icon url\n      if(i == measureCount-1){\n        let percent = firstValue === 0 ? 0 : Math.floor(1000*value/firstValue)/10 \n        dropOffText = `CONVERSION ${percent}% `\n        // Use the conversion icon \n        iconUri = config.conversion_icon_uri\n      }\n      \n      // Crafting HTML elements\n      let newSection = document.createElement('div')\n      let widthPercent = 100 / (measureCount);\n      newSection.style.width  = `${widthPercent}%`\n      newSection.style.textAlign = 'center'\n\n      let nameDiv = document.createElement('div')\n      nameDiv.innerHTML = measure.label\n\n      let valueDiv = document.createElement('div')\n      valueDiv.innerHTML = value.toLocaleString('en')\n\n      let retainedDiv = document.createElement('div')\n      retainedDiv.innerHTML = retainedText\n\n      let iconImg = `<img height='${config.icon_height || '30px'} width=${config.icon_width || '30px'} src=${iconUri || config.drop_icon_uri}/>`\n\n      let iconDiv = document.createElement('div')\n      iconDiv.style.marginTop = `${element.offsetHeight - 135 + (i===0? 22 : 0)}px`\n      iconDiv.innerHTML = `<img height=\"${config.icon_height || '30px'}\" width=\"${config.icon_width || '30px'}\" src=\"${iconUri || config.drop_icon_uri}\"/>`  \n      let dropOffDiv = document.createElement('div')\n      dropOffDiv.innerHTML = dropOffText\n\n      newSection.appendChild(nameDiv)\n      newSection.appendChild(valueDiv)\n      newSection.appendChild(retainedDiv)\n      newSection.appendChild(iconDiv)\n      newSection.appendChild(dropOffDiv)\n\n      sections.appendChild(newSection)\n    \n    })\n    // Add final measure twice for the nice layout\n    let cell = data[0][measures[measureCount - 1].name]\n    dataArray.push({\n      \"name\": measures[measureCount - 1].label,\n      \"value\": parseFloat(LookerCharts.Utils.textForCell(cell).replace(/[^0-9.]/g, '')),\n      \"html\": LookerCharts.Utils.htmlForCell(cell)\n    });\n\n    \n\n\n    //  Montserrat:\n    //  https://fonts.gstatic.com/s/montserrat/v14/JTUSjIg1_i6t8kCHKm459Wlhyw.woff2);}'+\n\n    let styleEl = document.createElement('style');\n    styleEl.setAttribute('type', \"text/css\")\n    styleEl.innerHTML = '@font-face ' +\n      '{font-family: Open Sans;' +\n      'src: url( https://fonts.gstatic.com/s/opensans/v17/mem8YaGs126MiZpBA-UFVZ0b.woff2 );}' +\n      'div {font-family: Open Sans;};'\n\n    document.head.appendChild(styleEl);\n\n    let vizDiv = document.createElement('div')\n    vizDiv.style.position = 'absolute'\n    vizDiv.style.zIndex = '-1'\n    // vizDiv.style.marginTop = '20px'\n\n    vizDiv.innerHTML = `<svg class=\"funnel\" width=\"${element.offsetWidth}\" height=\"${element.offsetHeight - 60}\" stroke-width=\"${config.strokeWidth}\"\n      stroke=\"${config.stroke}\"  fill=\"${config.fill}\" ></svg>`\n\n    element.appendChild(vizDiv)\n\n    sections.className = 'headerdiv'\n    sections.style.display = 'flex'\n    sections.style.fontStyle = 'normal'\n    sections.style.fontWeight = '300'\n    sections.style.fontSize = '16px'\n    sections.style.zIndex = '100'\n    \n    element.appendChild(sections)\n\n    // element.innerHTML = `\n    // <div style=\"position:absolute; z-index:-1; margin-top: 20px;\" >\n    // <svg class=\"funnel\" width=\"${element.offsetWidth}\" height=\"${element.offsetHeight}\" stroke-width=\"${config.strokeWidth}\"\n    //   stroke=\"${config.stroke}\"  fill=\"${config.fill}\" ></svg>\n    // </div> \n    // <div class=\"headerdiv\" style=\"display: flex; font-style: normal; font-weight: 300; font-size: 16px; z-index:100\">\n    //         ${sections.}\n    // </div>\n    //         `\n    // <span class=\"tooltip\" style=\"position: absolute; \n    //   background: rgba(0, 0, 0, .7);\n    //   color: #fff;\n    //   padding: 2px 5px;\n    //   font-size: 12px;\n    //   white-space: nowrap;\n    //   z-index: 9999;\n    // }\" hidden=\"true\"></span>\n\n\n\n    _fnando_sparkline__WEBPACK_IMPORTED_MODULE_0___default()(document.querySelector(\".funnel\"), dataArray,\n      // Uncomment below to attach the tooltip actions (needs work.)\n      // funnel_options\n    );\n    doneRendering()\n  }\n});\n\n//# sourceURL=webpack://%5Bname%5D/./src/visualizations/funnel.js?");

/***/ })

/******/ });
});