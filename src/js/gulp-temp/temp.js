"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

/******/
(function (modules) {
  // webpackBootstrap

  /******/
  // The module cache

  /******/
  var installedModules = {};
  /******/

  /******/
  // The require function

  /******/

  function __webpack_require__(moduleId) {
    /******/

    /******/
    // Check if module is in cache

    /******/
    if (installedModules[moduleId]) {
      /******/
      return installedModules[moduleId].exports;
      /******/
    }
    /******/
    // Create a new module (and put it into the cache)

    /******/


    var module = installedModules[moduleId] = {
      /******/
      i: moduleId,

      /******/
      l: false,

      /******/
      exports: {}
      /******/

    };
    /******/

    /******/
    // Execute the module function

    /******/

    modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
    /******/

    /******/
    // Flag the module as loaded

    /******/

    module.l = true;
    /******/

    /******/
    // Return the exports of the module

    /******/

    return module.exports;
    /******/
  }
  /******/

  /******/

  /******/
  // expose the modules object (__webpack_modules__)

  /******/


  __webpack_require__.m = modules;
  /******/

  /******/
  // expose the module cache

  /******/

  __webpack_require__.c = installedModules;
  /******/

  /******/
  // define getter function for harmony exports

  /******/

  __webpack_require__.d = function (exports, name, getter) {
    /******/
    if (!__webpack_require__.o(exports, name)) {
      /******/
      Object.defineProperty(exports, name, {
        enumerable: true,
        get: getter
      });
      /******/
    }
    /******/

  };
  /******/

  /******/
  // define __esModule on exports

  /******/


  __webpack_require__.r = function (exports) {
    /******/
    if (typeof Symbol !== 'undefined' && Symbol.toStringTag) {
      /******/
      Object.defineProperty(exports, Symbol.toStringTag, {
        value: 'Module'
      });
      /******/
    }
    /******/


    Object.defineProperty(exports, '__esModule', {
      value: true
    });
    /******/
  };
  /******/

  /******/
  // create a fake namespace object

  /******/
  // mode & 1: value is a module id, require it

  /******/
  // mode & 2: merge all properties of value into the ns

  /******/
  // mode & 4: return value when already ns object

  /******/
  // mode & 8|1: behave like require

  /******/


  __webpack_require__.t = function (value, mode) {
    /******/
    if (mode & 1) value = __webpack_require__(value);
    /******/

    if (mode & 8) return value;
    /******/

    if (mode & 4 && _typeof(value) === 'object' && value && value.__esModule) return value;
    /******/

    var ns = Object.create(null);
    /******/

    __webpack_require__.r(ns);
    /******/


    Object.defineProperty(ns, 'default', {
      enumerable: true,
      value: value
    });
    /******/

    if (mode & 2 && typeof value != 'string') for (var key in value) {
      __webpack_require__.d(ns, key, function (key) {
        return value[key];
      }.bind(null, key));
    }
    /******/

    return ns;
    /******/
  };
  /******/

  /******/
  // getDefaultExport function for compatibility with non-harmony modules

  /******/


  __webpack_require__.n = function (module) {
    /******/
    var getter = module && module.__esModule ?
    /******/
    function getDefault() {
      return module['default'];
    } :
    /******/
    function getModuleExports() {
      return module;
    };
    /******/

    __webpack_require__.d(getter, 'a', getter);
    /******/


    return getter;
    /******/
  };
  /******/

  /******/
  // Object.prototype.hasOwnProperty.call

  /******/


  __webpack_require__.o = function (object, property) {
    return Object.prototype.hasOwnProperty.call(object, property);
  };
  /******/

  /******/
  // __webpack_public_path__

  /******/


  __webpack_require__.p = "";
  /******/

  /******/

  /******/
  // Load entry module and return exports

  /******/

  return __webpack_require__(__webpack_require__.s = "./src/js/bundle/app.js");
  /******/
})(
/************************************************************************/

/******/
{
  /***/
  "./node_modules/vanilla-lazyload/dist/lazyload.es2015.js":
  /*!***************************************************************!*\
    !*** ./node_modules/vanilla-lazyload/dist/lazyload.es2015.js ***!
    \***************************************************************/

  /*! exports provided: default */

  /***/
  function node_modulesVanillaLazyloadDistLazyloadEs2015Js(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    eval("__webpack_require__.r(__webpack_exports__);\nvar getDefaultSettings = () => ({\n\telements_selector: \"img\",\n\tcontainer: window,\n\tthreshold: 300,\n\tthrottle: 150,\n\tdata_src: \"src\",\n\tdata_srcset: \"srcset\",\n\tdata_sizes: \"sizes\",\n\tdata_bg: \"bg\",\n\tclass_loading: \"loading\",\n\tclass_loaded: \"loaded\",\n\tclass_error: \"error\",\n\tclass_initial: \"initial\",\n\tskip_invisible: true,\n\tcallback_load: null,\n\tcallback_error: null,\n\tcallback_set: null,\n\tcallback_enter: null,\n\tcallback_finish: null,\n\tto_webp: false\n});\n\nconst dataPrefix = \"data-\";\nconst processedDataName = \"was-processed\";\nconst processedDataValue = \"true\";\n\nconst getData = (element, attribute) => {\n\treturn element.getAttribute(dataPrefix + attribute);\n};\n\nconst setData = (element, attribute, value) => {\n\tvar attrName = dataPrefix + attribute;\n\tif (value === null) {\n\t\telement.removeAttribute(attrName);\n\t\treturn;\n\t}\n\telement.setAttribute(attrName, value);\n};\n\nconst setWasProcessedData = element =>\n\tsetData(element, processedDataName, processedDataValue);\n\nconst getWasProcessedData = element =>\n\tgetData(element, processedDataName) === processedDataValue;\n\nconst purgeProcessedElements = elements => {\n\treturn elements.filter(element => !getWasProcessedData(element));\n};\n\nconst purgeOneElement = (elements, elementToPurge) => {\n\treturn elements.filter(element => element !== elementToPurge);\n};\n\nconst getTopOffset = function(element) {\n\treturn (\n\t\telement.getBoundingClientRect().top +\n\t\twindow.pageYOffset -\n\t\telement.ownerDocument.documentElement.clientTop\n\t);\n};\n\nconst isBelowViewport = function(element, container, threshold) {\n\tconst fold =\n\t\tcontainer === window\n\t\t\t? window.innerHeight + window.pageYOffset\n\t\t\t: getTopOffset(container) + container.offsetHeight;\n\treturn fold <= getTopOffset(element) - threshold;\n};\n\nconst getLeftOffset = function(element) {\n\treturn (\n\t\telement.getBoundingClientRect().left +\n\t\twindow.pageXOffset -\n\t\telement.ownerDocument.documentElement.clientLeft\n\t);\n};\n\nconst isAtRightOfViewport = function(element, container, threshold) {\n\tconst documentWidth = window.innerWidth;\n\tconst fold =\n\t\tcontainer === window\n\t\t\t? documentWidth + window.pageXOffset\n\t\t\t: getLeftOffset(container) + documentWidth;\n\treturn fold <= getLeftOffset(element) - threshold;\n};\n\nconst isAboveViewport = function(element, container, threshold) {\n\tconst fold =\n\t\tcontainer === window ? window.pageYOffset : getTopOffset(container);\n\treturn fold >= getTopOffset(element) + threshold + element.offsetHeight;\n};\n\nconst isAtLeftOfViewport = function(element, container, threshold) {\n\tconst fold =\n\t\tcontainer === window ? window.pageXOffset : getLeftOffset(container);\n\treturn fold >= getLeftOffset(element) + threshold + element.offsetWidth;\n};\n\nfunction isInsideViewport(element, container, threshold) {\n\treturn (\n\t\t!isBelowViewport(element, container, threshold) &&\n\t\t!isAboveViewport(element, container, threshold) &&\n\t\t!isAtRightOfViewport(element, container, threshold) &&\n\t\t!isAtLeftOfViewport(element, container, threshold)\n\t);\n}\n\n/* Creates instance and notifies it through the window element */\nconst createInstance = function(classObj, options) {\n\tvar event;\n\tlet eventString = \"LazyLoad::Initialized\";\n\tlet instance = new classObj(options);\n\ttry {\n\t\t// Works in modern browsers\n\t\tevent = new CustomEvent(eventString, { detail: { instance } });\n\t} catch (err) {\n\t\t// Works in Internet Explorer (all versions)\n\t\tevent = document.createEvent(\"CustomEvent\");\n\t\tevent.initCustomEvent(eventString, false, false, { instance });\n\t}\n\twindow.dispatchEvent(event);\n};\n\n/* Auto initialization of one or more instances of lazyload, depending on the \n    options passed in (plain object or an array) */\nfunction autoInitialize(classObj, options) {\n\tif (!options) {\n\t\treturn;\n\t}\n\tif (!options.length) {\n\t\t// Plain object\n\t\tcreateInstance(classObj, options);\n\t} else {\n\t\t// Array of objects\n\t\tfor (let i = 0, optionsItem; (optionsItem = options[i]); i += 1) {\n\t\t\tcreateInstance(classObj, optionsItem);\n\t\t}\n\t}\n}\n\nconst replaceExtToWebp = (value, condition) =>\n\tcondition ? value.replace(/\\.(jpe?g|png)/gi, \".webp\") : value;\n\nconst detectWebp = () => {\n\tvar webpString = \"image/webp\";\n\tvar canvas = document.createElement(\"canvas\");\n\n\tif (canvas.getContext && canvas.getContext(\"2d\")) {\n\t\treturn canvas.toDataURL(webpString).indexOf(`data:${webpString}`) === 0;\n\t}\n\n\treturn false;\n};\n\nconst runningOnBrowser = typeof window !== \"undefined\";\n\nconst isBot =\n\t(runningOnBrowser && !(\"onscroll\" in window)) ||\n\t/(gle|ing|ro)bot|crawl|spider/i.test(navigator.userAgent);\nconst supportsClassList =\n\trunningOnBrowser && \"classList\" in document.createElement(\"p\");\n\nconst supportsWebp = runningOnBrowser && detectWebp();\n\nconst addClass = (element, className) => {\n\tif (supportsClassList) {\n\t\telement.classList.add(className);\n\t\treturn;\n\t}\n\telement.className += (element.className ? \" \" : \"\") + className;\n};\n\nconst removeClass = (element, className) => {\n\tif (supportsClassList) {\n\t\telement.classList.remove(className);\n\t\treturn;\n\t}\n\telement.className = element.className.\n\t\treplace(new RegExp(\"(^|\\\\s+)\" + className + \"(\\\\s+|$)\"), \" \").\n\t\treplace(/^\\s+/, \"\").\n\t\treplace(/\\s+$/, \"\");\n};\n\nconst setSourcesInChildren = function(\n\tparentTag,\n\tattrName,\n\tdataAttrName,\n\ttoWebpFlag\n) {\n\tfor (let i = 0, childTag; (childTag = parentTag.children[i]); i += 1) {\n\t\tif (childTag.tagName === \"SOURCE\") {\n\t\t\tlet attrValue = getData(childTag, dataAttrName);\n\t\t\tsetAttributeIfValue(childTag, attrName, attrValue, toWebpFlag);\n\t\t}\n\t}\n};\n\nconst setAttributeIfValue = function(\n\telement,\n\tattrName,\n\tvalue,\n\ttoWebpFlag\n) {\n\tif (!value) {\n\t\treturn;\n\t}\n\telement.setAttribute(attrName, replaceExtToWebp(value, toWebpFlag));\n};\n\nconst setSourcesImg = (element, settings) => {\n\tconst toWebpFlag = supportsWebp && settings.to_webp;\n\tconst srcsetDataName = settings.data_srcset;\n\tconst parent = element.parentNode;\n\n\tif (parent && parent.tagName === \"PICTURE\") {\n\t\tsetSourcesInChildren(parent, \"srcset\", srcsetDataName, toWebpFlag);\n\t}\n\tconst sizesDataValue = getData(element, settings.data_sizes);\n\tsetAttributeIfValue(element, \"sizes\", sizesDataValue);\n\tconst srcsetDataValue = getData(element, srcsetDataName);\n\tsetAttributeIfValue(element, \"srcset\", srcsetDataValue, toWebpFlag);\n\tconst srcDataValue = getData(element, settings.data_src);\n\tsetAttributeIfValue(element, \"src\", srcDataValue, toWebpFlag);\n};\n\nconst setSourcesIframe = (element, settings) => {\n\tconst srcDataValue = getData(element, settings.data_src);\n\n\tsetAttributeIfValue(element, \"src\", srcDataValue);\n};\n\nconst setSourcesVideo = (element, settings) => {\n\tconst srcDataName = settings.data_src;\n\tconst srcDataValue = getData(element, srcDataName);\n\n\tsetSourcesInChildren(element, \"src\", srcDataName);\n\tsetAttributeIfValue(element, \"src\", srcDataValue);\n\telement.load();\n};\n\nconst setSourcesBgImage = (element, settings) => {\n\tconst toWebpFlag = supportsWebp && settings.to_webp;\n\tconst srcDataValue = getData(element, settings.data_src);\n\tconst bgDataValue = getData(element, settings.data_bg);\n\n\tif (srcDataValue) {\n\t\tlet setValue = replaceExtToWebp(srcDataValue, toWebpFlag);\n\t\telement.style.backgroundImage = `url(\"${setValue}\")`;\n\t}\n\n\tif (bgDataValue) {\n\t\tlet setValue = replaceExtToWebp(bgDataValue, toWebpFlag);\n\t\telement.style.backgroundImage = setValue;\n\t}\n};\n\nconst setSourcesFunctions = {\n\tIMG: setSourcesImg,\n\tIFRAME: setSourcesIframe,\n\tVIDEO: setSourcesVideo\n};\n\nconst setSources = (element, instance) => {\n\tconst settings = instance._settings;\n\tconst tagName = element.tagName;\n\tconst setSourcesFunction = setSourcesFunctions[tagName];\n\tif (setSourcesFunction) {\n\t\tsetSourcesFunction(element, settings);\n\t\tinstance._updateLoadingCount(1);\n\t\tinstance._elements = purgeOneElement(instance._elements, element);\n\t\treturn;\n\t}\n\tsetSourcesBgImage(element, settings);\n};\n\nconst callbackIfSet = function(callback, argument) {\n\tif (callback) {\n\t\tcallback(argument);\n\t}\n};\n\nconst genericLoadEventName = \"load\";\nconst mediaLoadEventName = \"loadeddata\";\nconst errorEventName = \"error\";\n\nconst addEventListener = (element, eventName, handler) => {\n\telement.addEventListener(eventName, handler);\n};\n\nconst removeEventListener = (element, eventName, handler) => {\n\telement.removeEventListener(eventName, handler);\n};\n\nconst addAllEventListeners = (element, loadHandler, errorHandler) => {\n\taddEventListener(element, genericLoadEventName, loadHandler);\n\taddEventListener(element, mediaLoadEventName, loadHandler);\n\taddEventListener(element, errorEventName, errorHandler);\n};\n\nconst removeAllEventListeners = (element, loadHandler, errorHandler) => {\n\tremoveEventListener(element, genericLoadEventName, loadHandler);\n\tremoveEventListener(element, mediaLoadEventName, loadHandler);\n\tremoveEventListener(element, errorEventName, errorHandler);\n};\n\nconst eventHandler = function(event, success, instance) {\n\tvar settings = instance._settings;\n\tconst className = success ? settings.class_loaded : settings.class_error;\n\tconst callback = success ? settings.callback_load : settings.callback_error;\n\tconst element = event.target;\n\n\tremoveClass(element, settings.class_loading);\n\taddClass(element, className);\n\tcallbackIfSet(callback, element);\n\n\tinstance._updateLoadingCount(-1);\n};\n\nconst addOneShotEventListeners = (element, instance) => {\n\tconst loadHandler = event => {\n\t\teventHandler(event, true, instance);\n\t\tremoveAllEventListeners(element, loadHandler, errorHandler);\n\t};\n\tconst errorHandler = event => {\n\t\teventHandler(event, false, instance);\n\t\tremoveAllEventListeners(element, loadHandler, errorHandler);\n\t};\n\taddAllEventListeners(element, loadHandler, errorHandler);\n};\n\nconst managedTags = [\"IMG\", \"IFRAME\", \"VIDEO\"];\n\nfunction revealElement(element, instance, force) {\n\tvar settings = instance._settings;\n\tif (!force && getWasProcessedData(element)) {\n\t\treturn; // element has already been processed and force wasn't true\n\t}\n\tcallbackIfSet(settings.callback_enter, element);\n\tif (managedTags.indexOf(element.tagName) > -1) {\n\t\taddOneShotEventListeners(element, instance);\n\t\taddClass(element, settings.class_loading);\n\t}\n\tsetSources(element, instance);\n\tsetWasProcessedData(element);\n\tcallbackIfSet(settings.callback_set, element);\n}\n\nconst removeFromArray = (elements, indexes) => {\n\twhile (indexes.length) {\n\t\telements.splice(indexes.pop(), 1);\n\t}\n};\n\n/*\n * Constructor\n */\n\nconst LazyLoad = function(instanceSettings) {\n\tthis._settings = Object.assign({}, getDefaultSettings(), instanceSettings);\n\tthis._loadingCount = 0;\n\tthis._queryOriginNode =\n\t\tthis._settings.container === window\n\t\t\t? document\n\t\t\t: this._settings.container;\n\n\tthis._previousLoopTime = 0;\n\tthis._loopTimeout = null;\n\tthis._boundHandleScroll = this.handleScroll.bind(this);\n\n\tthis._isFirstLoop = true;\n\twindow.addEventListener(\"resize\", this._boundHandleScroll);\n\tthis.update();\n};\n\nLazyLoad.prototype = {\n\t_loopThroughElements: function(forceDownload) {\n\t\tconst settings = this._settings,\n\t\t\telements = this._elements,\n\t\t\telementsLength = !elements ? 0 : elements.length;\n\t\tlet i,\n\t\t\tprocessedIndexes = [],\n\t\t\tisFirstLoop = this._isFirstLoop;\n\n\t\tif (isFirstLoop) {\n\t\t\tthis._isFirstLoop = false;\n\t\t}\n\n\t\tif (elementsLength === 0) {\n\t\t\tthis._stopScrollHandler();\n\t\t\treturn;\n\t\t}\n\n\t\tfor (i = 0; i < elementsLength; i++) {\n\t\t\tlet element = elements[i];\n\t\t\t/* If must skip_invisible and element is invisible, skip it */\n\t\t\tif (settings.skip_invisible && element.offsetParent === null) {\n\t\t\t\tcontinue;\n\t\t\t}\n\n\t\t\tif (\n\t\t\t\tforceDownload ||\n\t\t\t\tisInsideViewport(\n\t\t\t\t\telement,\n\t\t\t\t\tsettings.container,\n\t\t\t\t\tsettings.threshold\n\t\t\t\t)\n\t\t\t) {\n\t\t\t\tif (isFirstLoop) {\n\t\t\t\t\taddClass(element, settings.class_initial);\n\t\t\t\t}\n\t\t\t\tthis.load(element);\n\t\t\t\tprocessedIndexes.push(i);\n\t\t\t}\n\t\t}\n\n\t\t// Removing processed elements from this._elements.\n\t\tremoveFromArray(elements, processedIndexes);\n\t},\n\n\t_startScrollHandler: function() {\n\t\tif (!this._isHandlingScroll) {\n\t\t\tthis._isHandlingScroll = true;\n\t\t\tthis._settings.container.addEventListener(\n\t\t\t\t\"scroll\",\n\t\t\t\tthis._boundHandleScroll\n\t\t\t);\n\t\t}\n\t},\n\n\t_stopScrollHandler: function() {\n\t\tif (this._isHandlingScroll) {\n\t\t\tthis._isHandlingScroll = false;\n\t\t\tthis._settings.container.removeEventListener(\n\t\t\t\t\"scroll\",\n\t\t\t\tthis._boundHandleScroll\n\t\t\t);\n\t\t}\n\t},\n\n\t_updateLoadingCount: function(plusMinus) {\n\t\tthis._loadingCount += plusMinus;\n\t\tif (this._elements.length === 0 && this._loadingCount === 0) {\n\t\t\tcallbackIfSet(this._settings.callback_finish);\n\t\t}\n\t},\n\n\thandleScroll: function() {\n\t\tconst throttle = this._settings.throttle;\n\n\t\tif (throttle !== 0) {\n\t\t\tlet now = Date.now();\n\t\t\tlet remainingTime = throttle - (now - this._previousLoopTime);\n\t\t\tif (remainingTime <= 0 || remainingTime > throttle) {\n\t\t\t\tif (this._loopTimeout) {\n\t\t\t\t\tclearTimeout(this._loopTimeout);\n\t\t\t\t\tthis._loopTimeout = null;\n\t\t\t\t}\n\t\t\t\tthis._previousLoopTime = now;\n\t\t\t\tthis._loopThroughElements();\n\t\t\t} else if (!this._loopTimeout) {\n\t\t\t\tthis._loopTimeout = setTimeout(\n\t\t\t\t\tfunction() {\n\t\t\t\t\t\tthis._previousLoopTime = Date.now();\n\t\t\t\t\t\tthis._loopTimeout = null;\n\t\t\t\t\t\tthis._loopThroughElements();\n\t\t\t\t\t}.bind(this),\n\t\t\t\t\tremainingTime\n\t\t\t\t);\n\t\t\t}\n\t\t} else {\n\t\t\tthis._loopThroughElements();\n\t\t}\n\t},\n\n\tloadAll: function() {\n\t\tthis._loopThroughElements(true);\n\t},\n\n\tupdate: function(elements) {\n\t\tconst settings = this._settings;\n\t\tconst nodeSet =\n\t\t\telements ||\n\t\t\tthis._queryOriginNode.querySelectorAll(settings.elements_selector);\n\n\t\tthis._elements = purgeProcessedElements(\n\t\t\tArray.prototype.slice.call(nodeSet) // NOTE: nodeset to array for IE compatibility\n\t\t);\n\n\t\tif (isBot) {\n\t\t\tthis.loadAll();\n\t\t\treturn;\n\t\t}\n\n\t\tthis._loopThroughElements();\n\t\tthis._startScrollHandler();\n\t},\n\n\tdestroy: function() {\n\t\twindow.removeEventListener(\"resize\", this._boundHandleScroll);\n\t\tif (this._loopTimeout) {\n\t\t\tclearTimeout(this._loopTimeout);\n\t\t\tthis._loopTimeout = null;\n\t\t}\n\t\tthis._stopScrollHandler();\n\t\tthis._elements = null;\n\t\tthis._queryOriginNode = null;\n\t\tthis._settings = null;\n\t},\n\n\tload: function(element, force) {\n\t\trevealElement(element, this, force);\n\t}\n};\n\n/* Automatic instances creation if required (useful for async script loading) */\nif (runningOnBrowser) {\n\tautoInitialize(LazyLoad, window.lazyLoadOptions);\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (LazyLoad);\n\n\n//# sourceURL=webpack:///./node_modules/vanilla-lazyload/dist/lazyload.es2015.js?");
    /***/
  },

  /***/
  "./src/js/bundle/app.js":
  /*!******************************!*\
    !*** ./src/js/bundle/app.js ***!
    \******************************/

  /*! no exports provided */

  /***/
  function srcJsBundleAppJs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _modules_lazyLoading__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/lazyLoading */ \"./src/js/bundle/modules/lazyLoading.js\");\n\n\n//# sourceURL=webpack:///./src/js/bundle/app.js?");
    /***/
  },

  /***/
  "./src/js/bundle/modules/lazyLoading.js":
  /*!**********************************************!*\
    !*** ./src/js/bundle/modules/lazyLoading.js ***!
    \**********************************************/

  /*! no exports provided */

  /***/
  function srcJsBundleModulesLazyLoadingJs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var vanilla_lazyload__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vanilla-lazyload */ \"./node_modules/vanilla-lazyload/dist/lazyload.es2015.js\");\n\nvar lazy = new vanilla_lazyload__WEBPACK_IMPORTED_MODULE_0__[\"default\"]({\n  elements_selector: '.lazy'\n});\n\n//# sourceURL=webpack:///./src/js/bundle/modules/lazyLoading.js?");
    /***/
  }
  /******/

});