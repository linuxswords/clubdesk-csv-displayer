/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
var csvtabler;
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((module) => {

eval("class CSVConverter {\n    constructor(csv_content) {\n        this.csv_content = csv_content\n    }\n\n    table({ignore_columns = [], include_numbering = false, numbering_prefix='', numbering_postfix='', show_total_only=false, total_title='Total'}){\n        var table = '<table>'\n        const rows = this.csv_content.split('\\n')\n\n        if(show_total_only){\n            return `<span class=\"total_csv_displayer\">${total_title}: ${rows.length -1}</span>`\n        }\n\n        var ignored_column_indices = []\n        for(var row_index = 0; row_index < rows.length; row_index++) {\n            const row = rows[row_index]\n            table += '<tr>'\n            const fields = row.split(';')\n            for(var column_index = 0; column_index < fields.length; column_index++){\n                const field = fields[column_index]\n                \n                var tag = 'td'\n                if(row_index===0) {\n                    tag = 'th'\n                    if(ignore_columns.includes(field)){\n                        ignored_column_indices.push(column_index)\n                    }\n                }\n                // add row numbering with prefix except for the header row\n                if(column_index===0 && include_numbering){\n                    const number = row_index > 0 ? row_index : ''\n                    const prefix = numbering_prefix && row_index > 0 ? numbering_prefix + ' ' : ''\n                    const postfix = numbering_postfix && row_index > 0 ? numbering_postfix : ''\n                    table += `<${tag}>${prefix}${number}${postfix}</${tag}>`\n                }\n                // add column entry if not on ignore list\n                if(!ignored_column_indices.includes(column_index)){\n                    table += `<${tag}>${field}</${tag}>`\n                }\n            }\n            table += '</tr>'\n        }\n        table += '</table>'\n        return table\n    }\n}\n\nfunction loadFileAsTable(targetContainerId, fileId, settings) {\n    $.ajax({\n      url: \"fileservlet?id=\" + fileId,\n      dataType: \"text\",\n      beforeSend: function(jqXHR) {\n        jqXHR.overrideMimeType('text/html;charset=iso-8859-1');\n      },\n      success: function(data) {\n        const clubdesklist_data = data.replace(/[^\"]\\n/g, '<br/>').replaceAll('\\\"','');\n        table_data = new CSVConverter(clubdesklist_data).table(settings);\n        $('#' + targetContainerId).html(table_data);\n      },\n      error: function(data) {\n        $('#' + targetContainerId).html('<div>Fehler beim laden der Daten</div>');\n      }\n    });\n  }\n\n\nmodule.exports = {\n    CSVConverter:CSVConverter,\n    loadFileAsTable\n}\n\n//# sourceURL=webpack://csvtabler/./src/index.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	csvtabler = __webpack_exports__;
/******/ 	
/******/ })()
;