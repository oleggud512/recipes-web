/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./js/features/recipes/presentation/recipes_list_page/index.js":
/*!*********************************************************************!*\
  !*** ./js/features/recipes/presentation/recipes_list_page/index.js ***!
  \*********************************************************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

eval("__webpack_require__(/*! ./recipe_list_element/recipe_list_element */ \"./js/features/recipes/presentation/recipes_list_page/recipe_list_element/recipe_list_element.js\");\n\n//# sourceURL=webpack://my-webpack-project/./js/features/recipes/presentation/recipes_list_page/index.js?");

/***/ }),

/***/ "./js/features/recipes/presentation/recipes_list_page/recipe_list_element/recipe_list_element.js":
/*!*******************************************************************************************************!*\
  !*** ./js/features/recipes/presentation/recipes_list_page/recipe_list_element/recipe_list_element.js ***!
  \*******************************************************************************************************/
/***/ ((module) => {

eval("class RecipeListElement extends HTMLElement {\n  constructor() {\n    super();\n  }\n  connectedCallback() {\n    this.render();\n  }\n  render() {\n    this.innerHTML = \"<h3>empty recipe-list element...</h3>\";\n  }\n}\ncustomElements.define('recipe-list', RecipeListElement);\nmodule.exports = {\n  RecipeListElement\n};\n\n//# sourceURL=webpack://my-webpack-project/./js/features/recipes/presentation/recipes_list_page/recipe_list_element/recipe_list_element.js?");

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
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./js/features/recipes/presentation/recipes_list_page/index.js");
/******/ 	
/******/ })()
;