var pcf_tools_652ac3f36e1e4bca82eb3c1dc44e6fad =
/******/ (function(modules) { // webpackBootstrap
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
/******/ 	return __webpack_require__(__webpack_require__.s = "./GridActivity/index.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./GridActivity/index.ts":
/*!*******************************!*\
  !*** ./GridActivity/index.ts ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.GridActivity = void 0;\n\nvar GridActivity =\n/** @class */\nfunction () {\n  /**\r\n   * Empty constructor.\r\n   */\n  function GridActivity() {}\n  /**\r\n   * Get sorted columns on view, columns are sorted by DataSetInterfaces.Column.order\r\n   * Property-set columns will always have order = -1.\r\n   * In Model-driven app, the columns are ordered in the same way as columns defined in views.\r\n   * In Canvas-app, the columns are ordered by the sequence fields added to control\r\n   * Note that property set columns will have order = 0 in test harness, this is a bug.\r\n   * @param context\r\n   * @return sorted columns object on View\r\n   */\n\n\n  GridActivity.prototype.getSortedColumnsOnView = function (context) {\n    if (!context.parameters.dataSet.columns) {\n      return [];\n    }\n\n    var columns = context.parameters.dataSet.columns;\n    return columns;\n  };\n\n  GridActivity.prototype.createTableHeader = function (columnsOnView) {\n    var tableHeader = document.createElement(\"thead\");\n    var tableHeaderRow = document.createElement(\"tr\"); //tableHeaderRow.classList.add(\"SimpleTable_TableRow_Style\");\n\n    columnsOnView.forEach(function (columnItem, index) {\n      var tableHeaderCell = document.createElement(\"th\");\n      var innerDiv = document.createElement(\"div\");\n      innerDiv.classList.add(\"display\");\n      innerDiv.style.width = \"100%\";\n      innerDiv.style.maxWidth = \"200px\";\n      var columnDisplayName;\n\n      if (columnItem.order < 0) {\n        tableHeaderCell.classList.add(\"header\");\n        columnDisplayName = columnItem.displayName + \"(propertySet)\";\n      } else {\n        tableHeaderCell.classList.add(\"header\");\n        columnDisplayName = columnItem.displayName;\n      }\n\n      innerDiv.innerText = columnDisplayName;\n      tableHeaderCell.appendChild(innerDiv);\n      tableHeaderRow.appendChild(tableHeaderCell);\n    });\n    tableHeader.appendChild(tableHeaderRow);\n    return tableHeader;\n  };\n  /**\r\n   * Used to initialize the control instance. Controls can kick off remote server calls and other initialization actions here.\r\n   * Data-set values are not initialized here, use updateView.\r\n   * @param context The entire property bag available to control via Context Object; It contains values as set up by the customizer mapped to property names defined in the manifest, as well as utility functions.\r\n   * @param notifyOutputChanged A callback method to alert the framework that the control has new outputs ready to be retrieved asynchronously.\r\n   * @param state A piece of data that persists in one session for a single user. Can be set at any point in a controls life cycle by calling 'setControlState' in the Mode interface.\r\n   * @param container If a control is marked control-type='standard', it will receive an empty div element within which it can render its content.\r\n   */\n\n\n  GridActivity.prototype.init = function (context, notifyOutputChanged, state, container) {\n    //container.appendChild(this.generateTable());\t\t\n    // Need to track container resize so that control could get the available width.\n    // In Model-driven app, the available height won't be provided even this is true\n    // In Canvas-app, the available height will be provided in context.mode.allocatedHeight\n    debugger;\n    context.mode.trackContainerResize(true);\n    this._htmlTable = document.createElement(\"table\");\n    this._htmlTable.id = \"activities\";\n\n    this._htmlTable.classList.add(\"display\"); // Create main table container div.\n\n\n    this._mainContainer = document.createElement(\"div\"); // Adding the main table and loadNextPage button created to the container DIV.\n\n    this._mainContainer.appendChild(this._htmlTable);\n\n    this._mainContainer.classList.add(\"main-container\");\n\n    container.appendChild(this._mainContainer);\n  };\n\n  GridActivity.prototype.generateTable = function () {\n    // get the reference for the body\n    var body = document.getElementsByTagName(\"body\")[0]; // creates a <table> element and a <tbody> element\n\n    var tbl = document.createElement(\"table\");\n    var tblBody = document.createElement(\"tbody\"); // creating all cells\n\n    for (var i = 0; i < 2; i++) {\n      // creates a table row\n      var row = document.createElement(\"tr\");\n\n      for (var j = 0; j < 2; j++) {\n        // Create a <td> element and a text node, make the text\n        // node the contents of the <td>, and put the <td> at\n        // the end of the table row\n        var cell = document.createElement(\"td\");\n        var cellText = document.createTextNode(\"cell in row \" + i + \", column \" + j);\n        cell.appendChild(cellText);\n        row.appendChild(cell);\n      } // add the row to the end of the table body\n\n\n      tblBody.appendChild(row);\n    } // put the <tbody> in the <table>\n\n\n    tbl.appendChild(tblBody); // appends <table> into <body>\n\n    body.appendChild(tbl); // sets the border attribute of tbl to 2;\n\n    tbl.setAttribute(\"border\", \"2\");\n    return tbl;\n  };\n  /**\r\n   * Called when any value in the property bag has changed. This includes field values, data-sets, global values such as container height and width, offline status, control metadata values such as label, visible, etc.\r\n   * @param context The entire property bag available to control via Context Object; It contains values as set up by the customizer mapped to names defined in the manifest, as well as utility functions\r\n   */\n\n\n  GridActivity.prototype.updateView = function (context) {\n    if (!context.parameters.dataSet.loading) {\n      // Get sorted columns on View\n      var columnsOnView = this.getSortedColumnsOnView(context);\n\n      if (!columnsOnView || columnsOnView.length === 0) {\n        return;\n      } //calculate the width for each column\n      //let columnWidthDistribution = this.getColumnWidthDistribution(context, columnsOnView);\n      //When new data is received, it needs to first remove the table element, allowing it to properly render a table with updated data\n      //This only needs to be done on elements having child elements which is tied to data received from canvas/model ..\n\n\n      while (this._htmlTable.firstChild) {\n        this._htmlTable.removeChild(this._htmlTable.firstChild);\n      }\n\n      this._htmlTable.appendChild(this.createTableHeader(columnsOnView)); //this.dataTable.appendChild(this.createTableBody(columnsOnView, columnWidthDistribution, context.parameters.sampleDataSet));\n      //this._htmlTable.parentElement!.style.height = (context.mode.allocatedHeight - 50) + \"px\";\n\n    }\n  };\n  /**\r\n   * It is called by the framework prior to a control receiving new data.\r\n   * @returns an object based on nomenclature defined in manifest, expecting object[s] for property marked as “bound” or “output”\r\n   */\n\n\n  GridActivity.prototype.getOutputs = function () {\n    return {};\n  };\n  /**\r\n   * Called when the control is to be removed from the DOM tree. Controls should use this call for cleanup.\r\n   * i.e. cancelling any pending remote calls, removing listeners, etc.\r\n   */\n\n\n  GridActivity.prototype.destroy = function () {// Add code to cleanup control if necessary\n  };\n\n  return GridActivity;\n}();\n\nexports.GridActivity = GridActivity;\n\n//# sourceURL=webpack://pcf_tools_652ac3f36e1e4bca82eb3c1dc44e6fad/./GridActivity/index.ts?");

/***/ })

/******/ });
if (window.ComponentFramework && window.ComponentFramework.registerControl) {
	ComponentFramework.registerControl('PCFGridActivity.GridActivity', pcf_tools_652ac3f36e1e4bca82eb3c1dc44e6fad.GridActivity);
} else {
	var PCFGridActivity = PCFGridActivity || {};
	PCFGridActivity.GridActivity = pcf_tools_652ac3f36e1e4bca82eb3c1dc44e6fad.GridActivity;
	pcf_tools_652ac3f36e1e4bca82eb3c1dc44e6fad = undefined;
}