/******/ (function(modules) { // webpackBootstrap
/******/  // The module cache
/******/  var installedModules = {};
/******/
/******/  // The require function
/******/  function __webpack_require__(moduleId) {
/******/
/******/    // Check if module is in cache
/******/    if(installedModules[moduleId])
/******/      return installedModules[moduleId].exports;
/******/
/******/    // Create a new module (and put it into the cache)
/******/    var module = installedModules[moduleId] = {
/******/      exports: {},
/******/      id: moduleId,
/******/      loaded: false
/******/    };
/******/
/******/    // Execute the module function
/******/    modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/    // Flag the module as loaded
/******/    module.loaded = true;
/******/
/******/    // Return the exports of the module
/******/    return module.exports;
/******/  }
/******/
/******/
/******/  // expose the modules object (__webpack_modules__)
/******/  __webpack_require__.m = modules;
/******/
/******/  // expose the module cache
/******/  __webpack_require__.c = installedModules;
/******/
/******/  // __webpack_public_path__
/******/  __webpack_require__.p = "";
/******/
/******/  // Load entry module and return exports
/******/  return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

  module.exports = __webpack_require__(1);


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

  // This is the entry point for webpack to distribute assets

  // Require all JS and output as a single js bundle.
  // Note, we are requiring the es6 js.
  __webpack_require__(2);


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

  'use strict';

  var _fhirClientCernerAdditions = __webpack_require__(3);

  var _fhirClientCernerAdditions2 = _interopRequireDefault(_fhirClientCernerAdditions);

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

  /**
  * Prereq: This library should be included after fhir-client.js library.
  *
  * Automatically sets the fullSessionStorageSupport flag
  * when this library is included after fhir-client.js.
  * The boolean value is computed based on whether the page
  * is rendered within PowerChart or elsewhere.
  *
  * If the page is rendered within PowerChart, the value will
  * be set to false.  This is done to prevent session data
  * to be shared between applications. The reason is the embedded
  * IE browser is instantiated on a single thread in PowerChart.
  */
  _fhirClientCernerAdditions2.default.setFullSessionStorageSupport();

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _utils = __webpack_require__(4);

  var _utils2 = _interopRequireDefault(_utils);

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

  /**
  * Wrapper object containing additional feature or settings
  * to the open source version of fhir-client.js file.
  */
  var FhirClientCernerAdditions = {

    /**
    * Override fullSessionStorageSupport flag in fhir-client.js (src/client/bb-client.js) file.
    * The value depends on whether the page is loaded in PowerChart or
    * a regular browser that supports sessionStorage API without session being shared across tabs.
    */
    setFullSessionStorageSupport: function setFullSessionStorageSupport() {
      FHIR.oauth2.settings.fullSessionStorageSupport = !_utils2.default.isPowerChart();
    }
  }; /* globals FHIR */
  exports.default = FhirClientCernerAdditions;

/***/ }),
/* 4 */
/***/ (function(module, exports) {

  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  /* globals window */

  /**
  * This Utils object contains util function(s) needed by this project.
  * All the functions in this file can be moved to fhir-client-cerner-additions.js file,
  * however having them here make it easier to write tests.
  */
  var Utils = {

    /**
    * Determine if application is rendered in PowerChart.
    * @return null or true/false
    */
    isPowerChart: function isPowerChart() {
      return window.external && typeof window.external.DiscernObjectFactory !== 'undefined';
    }
  };

  exports.default = Utils;

/***/ })
/******/ ]);
//# sourceMappingURL=fhir-client-cerner-additions-1.0.0.min.js.map
