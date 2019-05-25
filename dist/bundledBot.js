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
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
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
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

// ==UserScript==
// @name        Tagpro Botr
// @namespace   sflem1993
// @version     0.1
// @include     https://tagpro.koalabeast.com/game
// @include     http://tagpro-maptest.koalabeast.com:*/
// @include     http://tangent.jukejuice.com:*
// @include     http://maptest2.newcompte.fr:*/
// @grant       none
// ==/UserScript==

//registers our function with the game by passing it into tagpro.ready when the objects we need are initialized
//tagpro.ready registers our_function and calls it when the game is ready for userscripts to execute
//inline_src/Babel compilation is copied from Tampermonkey template to make installation of this script possible
/* jshint ignore:start */
function addToTagpro(startFunction) {
  if (typeof window.tagpro !== "undefined" && typeof window.tagpro.map !== "undefined") {
      console.log("reached")
      window.tagpro.ready(startFunction);
  } else {
    //if not ready, wait and try again
    //console.log("waiting")
    setTimeout(() => {
      addToTagpro(startFunction);
    }, 100);
  }
}

function bot() {
  //listen for all grabbed/dropped flag updates for player's own team
  window.tagpro.socket.on("p", (info) => {
    //the property u is an array that contains all updates to be applied to players
    let updates = info.u || info;
    updates.forEach((update) => {
      if (update.hasOwnProperty("flag")) {
        window.tagpro.socket.emit("chat", {
          message: "the flags been tampered with.",
          toAll: true
        });
      }
    });
  });
}

console.log("gottem")
addToTagpro(bot)

/***/ })
/******/ ]);