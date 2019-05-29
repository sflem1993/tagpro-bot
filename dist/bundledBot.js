// ==UserScript==
// @name        Tagpro Bot
// @version     0.1
// @author      Sean Fleming
// @description A sample Webpack build
// @include     https://tagpro.koalabeast.com/game
// @include     http://tagpro-maptest.koalabeast.com:*/
// @include     http://tangent.jukejuice.com:*
// @include     http://maptest2.newcompte.fr:*/
// @grant       none
// ==/UserScript==

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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/injectBot.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/tinyqueue/index.js":
/*!*****************************************!*\
  !*** ./node_modules/tinyqueue/index.js ***!
  \*****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return TinyQueue; });\n\nclass TinyQueue {\n    constructor(data = [], compare = defaultCompare) {\n        this.data = data;\n        this.length = this.data.length;\n        this.compare = compare;\n\n        if (this.length > 0) {\n            for (let i = (this.length >> 1) - 1; i >= 0; i--) this._down(i);\n        }\n    }\n\n    push(item) {\n        this.data.push(item);\n        this.length++;\n        this._up(this.length - 1);\n    }\n\n    pop() {\n        if (this.length === 0) return undefined;\n\n        const top = this.data[0];\n        const bottom = this.data.pop();\n        this.length--;\n\n        if (this.length > 0) {\n            this.data[0] = bottom;\n            this._down(0);\n        }\n\n        return top;\n    }\n\n    peek() {\n        return this.data[0];\n    }\n\n    _up(pos) {\n        const {data, compare} = this;\n        const item = data[pos];\n\n        while (pos > 0) {\n            const parent = (pos - 1) >> 1;\n            const current = data[parent];\n            if (compare(item, current) >= 0) break;\n            data[pos] = current;\n            pos = parent;\n        }\n\n        data[pos] = item;\n    }\n\n    _down(pos) {\n        const {data, compare} = this;\n        const halfLength = this.length >> 1;\n        const item = data[pos];\n\n        while (pos < halfLength) {\n            let left = (pos << 1) + 1;\n            let best = data[left];\n            const right = left + 1;\n\n            if (right < this.length && compare(data[right], best) < 0) {\n                left = right;\n                best = data[right];\n            }\n            if (compare(best, item) >= 0) break;\n\n            data[pos] = best;\n            pos = left;\n        }\n\n        data[pos] = item;\n    }\n}\n\nfunction defaultCompare(a, b) {\n    return a < b ? -1 : a > b ? 1 : 0;\n}\n\n\n//# sourceURL=webpack:///./node_modules/tinyqueue/index.js?");

/***/ }),

/***/ "./src/bot.js":
/*!********************!*\
  !*** ./src/bot.js ***!
  \********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return Bot; });\n/* harmony import */ var _gameInfo_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./gameInfo.js */ \"./src/gameInfo.js\");\n/* harmony import */ var _pathfinder_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./pathfinder.js */ \"./src/pathfinder.js\");\n\r\n\r\nclass Bot {\r\n\tconstructor(tagpro) {\r\n\t\tthis.socket = tagpro.socket\r\n\t\tthis.gameInfo = new _gameInfo_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"](tagpro)\r\n\t\tthis.self = tagpro.players[tagpro.playerId];\r\n\t}\r\n\r\n\tinitializeSocketListeners() {\r\n\t\tconsole.log(\"initiailizing socket listeners\")\r\n\t\tthis.socket.on(\"p\", (info) => {\r\n\t\t\tlet updates = info.u || info\r\n\t\t\tupdates.forEach((update) => {\r\n\t\t\t\tif (update.hasOwnProperty(\"flag\")) {\r\n\t\t\t\t\tthis.sendAllMessage(\"the flags been tampered with.\")\r\n\t\t\t\t}\r\n\t\t\t});\r\n\t\t});\r\n\t}\r\n\r\n\tsendAllMessage(chat) {\r\n\t\tthis.socket.emit(\"chat\", {\r\n\t\t\tmessage: chat,\r\n\t\t\ttoAll: true\r\n\t\t})\r\n\t}\r\n}\n\n//# sourceURL=webpack:///./src/bot.js?");

/***/ }),

/***/ "./src/gameInfo.js":
/*!*************************!*\
  !*** ./src/gameInfo.js ***!
  \*************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return GameInfo; });\n/* harmony import */ var _pathfinder_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./pathfinder.js */ \"./src/pathfinder.js\");\nconst WALL_TILES = 1\r\nconst ANGLED_WALL_TILE = [1.1,1.2,1,3.3,1.4] //can set bouncepoint at center\r\nconst NORMAL_TILES = [0,2,3,3.1,4,4.1,5,5.1,6,6.1,6.11,6.2,6.21,6.3,6.31,6.4,6.41]\r\nconst POWERUP_TILES = [6,6.1,6.11,6.2,6.21,6.3,6.31]\r\nconst DEATH_TILES = [7]\r\nconst RED_FLAG = 3;\r\nconst RED_FLAG_TAKEN = 3.1;\r\nconst BLUE_FLAG = 4;\r\nconst BLUE_FLAG_TAKEN = 4.1;\r\nconst YELLOW_FLAG = 16;\r\nconst YELLOW_FLAG_TAKEN = 16.1;\r\nconst YELLOW = 0;\r\nconst RED = 1;\r\nconst BLUE = 2;\r\nconst TILE_PIXELS = 40;\r\n\r\n\r\n\r\nclass GameInfo {\r\n\tconstructor(tagpro) {\r\n\t\tthis.tagpro = tagpro\r\n\t\tthis.pathfinder = new _pathfinder_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"](tagpro.map)\r\n\t\tthis.flags = []\r\n\t\tfor (let i = 0; i < 3; i++) {\r\n            this.flags.push({\r\n                x : -1,\r\n                y : -1,\r\n                captured: false,\r\n            });\r\n        }\r\n\t\tthis.neutralFlag = false\r\n\t\tthis.playerID = tagpro.playerId;\r\n\t\tconsole.log(\"playher id is : \" + this.playerID)\r\n\t\tconsole.log(\"players is : \" + tagpro.players)\r\n\t\tconsole.log(\"playher is : \" + tagpro.players[this.playerID])\r\n\t\tthis.updateFlagLocations()\r\n\t\tconsole.log(\"flags are \", this.flags)\r\n\t\tthis.teamValue = tagpro.players[this.playerID].team; //get value from the Player object's team property\r\n\t\tthis.enemyTeamID = RED + BLUE - this.teamValue;\r\n\t\tconsole.log(\"teamVAle is \" + this.teamValue)\r\n\t\tconsole.log(\"enemyteamid is \" + this.enemyTeamID)\r\n        this.regrabFlagID = this.neutralFlag ? YELLOW : this.enemyTeamID;\r\n\t}\r\n\r\n\tgetPlayerTileLocation(player) {\r\n\t\tlet results = {x: player.x, y: player.y}\r\n\t\tconsole.log(\"player values\")\r\n\t\tconsole.log(player.x)\r\n\t\tconsole.log(player.y)\r\n\t\tconsole.log(\"player values done\")\r\n\t\tfor (let key in results) {\r\n  \t\t\tif (results.hasOwnProperty(key)) {\r\n  \t\t\t\tlet new_value  = results[key] / 40\r\n    \t\t\tresults[key] = new_value\r\n    \t\t\tconsole.log(\"tile value is \" + new_value )\r\n\t\t\t}\r\n\t\t}\r\n\r\n\t\treturn results\r\n\t}\r\n\r\n\tgetSelfTileLocation() {\r\n\t\tlet player = this.tagpro.players[this.playerID]\r\n\t\tconsole.log(\"players : \" +  this.tagpro.players)\r\n\t\tconsole.log(\"player : \" + player)\r\n\t\treturn this.getPlayerTileLocation(player)\r\n\t}\r\n\r\n\tgetEnemyFlag() {\r\n\t\tlet enemyFlag = this.flags[this.regrabFlagID]\r\n\t\tconsole.log(\"enemy flag is \", enemyFlag)\r\n\t\treturn this.pathfinder.findPath(this.getSelfTileLocation(), enemyFlag)\r\n\t}\r\n\r\n\t// goToEnemyFlag() {\r\n\t// \treturn this.pathfinder.findPath(this.flags[enemyTeamID])\r\n\t// }\r\n    //find flag location for flags\r\n    //the tagpro.map x and y represent tiles that are 40 by 40 pixels\r\n    //To get pixel value, times by 40 to get bottom left corner and add 20 to x and y to get center pixel value\r\n    updateFlagLocations() {\r\n        for (let i = 0; i<this.tagpro.map.length; i++) {\r\n            for (let j = 0; j<this.tagpro.map[0].length; j++) {\r\n                if (this.tagpro.map[i][j] === RED_FLAG || this.tagpro.map[i][j] === RED_FLAG_TAKEN) {\r\n                   this.flags[RED].x = i;\r\n                   this.flags[RED].y = j;\r\n                }\r\n                if (this.tagpro.map[i][j] === BLUE_FLAG || this.tagpro.map[i][j] === BLUE_FLAG_TAKEN) {\r\n                    this.flags[BLUE].x = i;\r\n                    this.flags[BLUE].y = j;\r\n                }\r\n                if (this.tagpro.map[i][j] === YELLOW_FLAG ||this.tagpro.map[i][j] === YELLOW_FLAG_TAKEN) {\r\n                    this.flags[YELLOW].x = i;\r\n                    this.flags[YELLOW].y = j;\r\n                    this.neutralFlag = true;\r\n                }\r\n            }\r\n        }\r\n    }\r\n}\n\n//# sourceURL=webpack:///./src/gameInfo.js?");

/***/ }),

/***/ "./src/injectBot.js":
/*!**************************!*\
  !*** ./src/injectBot.js ***!
  \**************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _bot_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./bot.js */ \"./src/bot.js\");\n\r\nfunction addToTagpro(startFunction) {\r\n\tif (tagpro.map && tagpro.renderer.renderer && tagpro.players && typeof tagpro.players[tagpro.playerId] !== \"undefined\") {\r\n    \tconsole.log(\"reached\")\r\n  \t\tconsole.log(window.tagpro.socketPort)\r\n  \t\tconsole.log(window.tagpro.socketHost)\r\n  \t\twindow.tagpro.ready(startFunction);\r\n  \t} else {\r\n\t    setTimeout(() => {\r\n\t      addToTagpro(startFunction);\r\n    \t}, 100);\r\n  \t}\r\n}\r\n\r\nfunction printArray(array) {\r\n  for (let a in array) {\r\n    print(a)\r\n  }\r\n}\r\n\r\nfunction initializeBot() {\r\n  console.log(\"bot initialized\")\r\n  let bot = new _bot_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"](window.tagpro)\r\n  bot.initializeSocketListeners()\r\n  console.log(\"pathfinding test\")\r\n  let r = bot.gameInfo.getEnemyFlag()\r\n  for (let key in r[0]) {\r\n    console.log(key)\r\n  }\r\n  console.log(\"the result is :\", r[0])\r\n  console.log(\"the result is :\", r[1])\r\n  console.log(\"Test over\")\r\n}\r\n\r\nconsole.log(\"gottem\")\r\naddToTagpro(initializeBot)\n\n//# sourceURL=webpack:///./src/injectBot.js?");

/***/ }),

/***/ "./src/pathfinder.js":
/*!***************************!*\
  !*** ./src/pathfinder.js ***!
  \***************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return Pathfinder; });\n/* harmony import */ var tinyqueue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tinyqueue */ \"./node_modules/tinyqueue/index.js\");\n\r\nconst WALL_TILES = [1,1.1,1.2,1,3.3,1.4] //can set bouncepoint at center\r\nconst DEATH_TILES = [7]\r\nclass Pathfinder {\r\n\tconstructor() {\r\n\t\tthis.nodes = []\r\n\t\tthis.map = JSON.parse(JSON.stringify(tagpro.map))\r\n\t\tthis.aStarGrid = this.parseMap(this.map)\r\n\t}\r\n\r\n\tparseMap(map) {\r\n\t\tlet edges = {}\r\n\t\tlet aStarGrid = []\r\n\t\tfor (let i=0; i<this.map.length; i++){\r\n\t\t\taStarGrid.push([])\r\n\t\t\tfor (let j = 0; j<this.map[i].length; j++) {\r\n\t\t\t\taStarGrid[i][j] = tagpro.map[i][j]//this.getPathFindingValue(this.map[i][j])\r\n\t\t\t}\r\n\t\t}\r\n\t\treturn aStarGrid\r\n\t}\r\n\r\n\tgetPathFindingValue(value) {\r\n\t\tif (this.notWallOrSpike(value)) {\r\n\t\t\treturn 1\r\n\t\t} else {\r\n\t\t\treturn 0\r\n\t\t}\r\n\t}\r\n\r\n\tgetNeighbors(node) {\r\n\t\t let directions = [{x: 1, y: 0}, {x: 0, y: 1}, {x: -1, y: 0}, {x: 0, y:-1}]\r\n\t\t let resultingLocations = []\r\n\t\t for (let direction in directions) {\r\n\t\t \tlet new_x = node.x + direction.x\r\n\t\t \tlet new_y = node.y + direction.y\r\n\t\t \tconsole.log(\"new x is \" + new_x)\r\n\t\t \tconsole.log(\"new y is \" + new_y)\r\n\t\t \tif (this.aStarGrid[new_x] && this.aStarGrid[new_x][new_y] && this.notWallOrSpike(this.aStarGrid[new_x][new_y])) {\r\n\t\t \t\tresultingLocations.push({x: new_x, y: new_y})\r\n\t\t \t}\r\n\t\t}\r\n\t\treturn resultingLocations\r\n\t}\r\n\r\n\tnotWallOrSpike(value) {\r\n\t\treturn !DEATH_TILES.includes(value) && !WALL_TILES.includes(value)\r\n\t}\r\n\r\n\theuristic(start, goal) {\r\n\t\tlet dx = abs(start.x - goal.x)\r\n\t    let dy = abs(start.y - goal.y)\r\n\t    return 1 * (dx + dy)\r\n\t}\r\n\r\n\tfindPath(start, goal) {\r\n\t\tconsole.log(\"start is \", start)\r\n\t\tconsole.log(\"goal is \", goal)\r\n\t\tlet costs_so_far = {}\r\n\t\tlet came_from = {}\r\n\t\tcame_from[start] = null\r\n    \tcosts_so_far[start] = 0\r\n\r\n\t\tlet frontier = new tinyqueue__WEBPACK_IMPORTED_MODULE_0__[\"default\"]([],  function (a, b) {\r\n\t\t\treturn a.priority - b.priority;\r\n\t\t});\r\n\t\tfrontier.push({x: start.x, y: start.y, priority: 0})\r\n\r\n\t\twhile (frontier.length > 0) {\r\n\t\t\tlet currentNode = frontier.pop()\r\n\t\t\tif (currentNode.x === goal.x && currentNode.y === goal.y) {\r\n\t\t\t\tbreak\r\n\t\t\t}\r\n\t\t\tlet neighbors = this.getNeighbors(currentNode)\r\n\t\t\tconsole.log(\"neighbors are \", neighbors)\r\n\t\t\tneighbors.forEach((neighbor) => {\r\n\t\t\t\tlet new_cost = costs_so_far[currentNode] + graph.cost(currentNode, next)\r\n\t\t\t\tif (!costs_so_far.hasOwnProperty(neighbor) || new_cost < costs_so_far[neighbor]) {\r\n\t\t\t\t\tlet priority = new_cost + this.heuristic(goal, neighbor)\r\n\t\t\t\t\tneighbor.priority = priority\r\n\t\t\t\t\tfrontier.put(neighbor)\r\n\t\t\t\t\tcame_from[neighbor] = current\r\n\t\t\t\t}\r\n\t\t\t});\r\n\t\t}\r\n\t\tvar results = []\r\n\t\tresults[0] = {x: 1, y:2}//came_from\r\n\t\tresults[1] = costs_so_far\r\n\t\treturn [came_from, costs_so_far]\r\n\t}\r\n\r\n\tgetFlagLocation() {\r\n\t    for (let i = 0; i < tagpro.map.length; i++) {\r\n\t        for (let j = 0; y < yl; y++) {\r\n\t            switch (Math.floor(tagpro.map[x][y])) {\r\n\t                case 3:\r\n\t                    if (color === 'red')\r\n\t                        return {x: x * 40, y: y * 40};\r\n\t                    break;\r\n\t                case 4:\r\n\t                    if (color === 'blue')\r\n\t                        return {x: x * 40, y: y * 40};\r\n\t                    break;\r\n\t                case 16:\r\n\t                    if (color === 'yellow')\r\n\t                        return {x: x * 40, y: y * 40};\r\n\t                    break;\r\n\t            }\r\n\t        }\r\n\t    }\r\n\t}\r\n}\n\n//# sourceURL=webpack:///./src/pathfinder.js?");

/***/ })

/******/ });