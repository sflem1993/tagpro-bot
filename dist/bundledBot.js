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
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return Bot; });\n/* harmony import */ var _gameInfo_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./gameInfo.js */ \"./src/gameInfo.js\");\n/* harmony import */ var _pathfinder_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./pathfinder.js */ \"./src/pathfinder.js\");\n/* harmony import */ var _steerer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./steerer.js */ \"./src/steerer.js\");\n\r\n\r\n\r\nclass Bot {\r\n\tconstructor(tagpro) {\r\n\t\tthis.socket = tagpro.socket;\r\n\t\tthis.gameInfo = new _gameInfo_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"](tagpro);\r\n\t\tthis.steerer = new _steerer_js__WEBPACK_IMPORTED_MODULE_2__[\"default\"](tagpro.socket);\r\n\t\tthis.self = tagpro.players[tagpro.playerId];\r\n\t}\r\n\r\n\tinitializeSocketListeners() {\r\n\t\tconsole.log(\"initiailizing socket listeners\");\r\n\t\tthis.socket.on(\"p\", (info) => {\r\n\t\t\tlet updates = info.u || info;\r\n\t\t\tupdates.forEach((update) => {\r\n\t\t\t\tif (update.hasOwnProperty(\"flag\")) {\r\n\t\t\t\t\tthis.sendAllMessage(\"the flags been tampered with.\");\r\n\t\t\t\t}\r\n\t\t\t});\r\n\t\t});\r\n\t}\r\n\r\n\tsendAllMessage(chat) {\r\n\t\tthis.socket.emit(\"chat\", {\r\n\t\t\tmessage: chat,\r\n\t\t\ttoAll: true\r\n\t\t});\r\n\t}\r\n}\n\n//# sourceURL=webpack:///./src/bot.js?");

/***/ }),

/***/ "./src/gameInfo.js":
/*!*************************!*\
  !*** ./src/gameInfo.js ***!
  \*************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return GameInfo; });\n/* harmony import */ var _pathfinder_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./pathfinder.js */ \"./src/pathfinder.js\");\nconst WALL_TILES = 1;\r\nconst ANGLED_WALL_TILE = [1.1,1.2,1,3.3,1.4]; //can set bouncepoint at center\r\nconst NORMAL_TILES = [0,2,3,3.1,4,4.1,5,5.1,6,6.1,6.11,6.2,6.21,6.3,6.31,6.4,6.41];\r\nconst POWERUP_TILES = [6,6.1,6.11,6.2,6.21,6.3,6.31];\r\nconst DEATH_TILES = [7];\r\nconst RED_FLAG = 3;\r\nconst RED_FLAG_TAKEN = 3.1;\r\nconst BLUE_FLAG = 4;\r\nconst BLUE_FLAG_TAKEN = 4.1;\r\nconst YELLOW_FLAG = 16;\r\nconst YELLOW_FLAG_TAKEN = 16.1;\r\nconst YELLOW = 0;\r\nconst RED = 1;\r\nconst BLUE = 2;\r\nconst TILE_PIXELS = 40;\r\n\r\n\r\nclass GameInfo {\r\n\tconstructor(tagpro) {\r\n\t\tthis.tagpro = tagpro;\r\n\t\tthis.pathfinder = new _pathfinder_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"](tagpro.map);\r\n\t\tthis.flags = [];\r\n\t\tfor (let i = 0; i < 3; i++) {\r\n            this.flags.push({\r\n                x : -1,\r\n                y : -1,\r\n                captured: false,\r\n            });\r\n        }\r\n\t\tthis.neutralFlag = false;\r\n\t\tthis.playerID = tagpro.playerId;\r\n\t\tthis.updateFlagLocations();\r\n\t\tthis.teamValue = tagpro.players[this.playerID].team;\r\n        this.enemyTeamID = RED + BLUE - this.teamValue;\r\n        this.regrabFlagID = this.neutralFlag ? YELLOW : this.enemyTeamID;\r\n        console.log(\"teamValue is \", this.teamValue);\r\n        console.log(\"regrabFlagID is \", this.regrabFlagID);\r\n\t}\r\n\r\n\tgetPlayerTileLocation(player) {\r\n\t\tlet results = {x: player.x, y: player.y};\r\n\t\tfor (let key in results) {\r\n  \t\t\tif (results.hasOwnProperty(key)) {\r\n  \t\t\t\tlet new_value  = Math.round(results[key] / 40);\r\n    \t\t\tresults[key] = new_value;\r\n\t\t\t}\r\n\t\t}\r\n\r\n\t\treturn results;\r\n\t}\r\n\r\n\tgetSelfTileLocation() {\r\n\t\tlet player = this.tagpro.players[this.playerID];\r\n\t\treturn this.getPlayerTileLocation(player);\r\n\t}\r\n\r\n\tgetEnemyFlag() {\r\n\t\tlet enemyFlag = this.flags[this.regrabFlagID];\r\n        console.log(\"enemyFlag is \", enemyFlag);\r\n\t\treturn this.pathfinder.findPath(this.getSelfTileLocation(), enemyFlag);\r\n\t}\r\n\r\n    updateFlagLocations() {\r\n        for (let i = 0; i<this.tagpro.map.length; i++) {\r\n            for (let j = 0; j<this.tagpro.map[0].length; j++) {\r\n                if (this.tagpro.map[i][j] === RED_FLAG || this.tagpro.map[i][j] === RED_FLAG_TAKEN) {\r\n                   this.flags[RED].x = i;\r\n                   this.flags[RED].y = j;\r\n                }\r\n                if (this.tagpro.map[i][j] === BLUE_FLAG || this.tagpro.map[i][j] === BLUE_FLAG_TAKEN) {\r\n                    this.flags[BLUE].x = i;\r\n                    this.flags[BLUE].y = j;\r\n                }\r\n                if (this.tagpro.map[i][j] === YELLOW_FLAG ||this.tagpro.map[i][j] === YELLOW_FLAG_TAKEN) {\r\n                    this.flags[YELLOW].x = i;\r\n                    this.flags[YELLOW].y = j;\r\n                    this.neutralFlag = true;\r\n                }\r\n            }\r\n        }\r\n    }\r\n}\n\n//# sourceURL=webpack:///./src/gameInfo.js?");

/***/ }),

/***/ "./src/injectBot.js":
/*!**************************!*\
  !*** ./src/injectBot.js ***!
  \**************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _bot_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./bot.js */ \"./src/bot.js\");\n\r\nfunction addToTagpro(startFunction) {\r\n\tif (tagpro.map && tagpro.renderer.renderer && tagpro.players && typeof tagpro.players[tagpro.playerId] !== \"undefined\") {\r\n    \tconsole.log(\"reached\");\r\n  \t\tconsole.log(window.tagpro.socketPort);\r\n  \t\tconsole.log(window.tagpro.socketHost);\r\n  \t\twindow.tagpro.ready(startFunction);\r\n  \t} else {\r\n\t    setTimeout(() => {\r\n\t      addToTagpro(startFunction);\r\n    \t}, 100);\r\n  \t}\r\n}\r\n\r\nfunction initializeBot() {\r\n  console.log(\"bot initialized\");\r\n  let bot = new _bot_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"](window.tagpro);\r\n  bot.initializeSocketListeners();\r\n  let r = bot.gameInfo.getEnemyFlag();\r\n  console.log(\"the result is :\", r);\r\n}\r\n\r\naddToTagpro(initializeBot);\n\n//# sourceURL=webpack:///./src/injectBot.js?");

/***/ }),

/***/ "./src/pathfinder.js":
/*!***************************!*\
  !*** ./src/pathfinder.js ***!
  \***************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return Pathfinder; });\n/* harmony import */ var tinyqueue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tinyqueue */ \"./node_modules/tinyqueue/index.js\");\n\r\nconst WALL_TILES = [1,1.1,1.2,1,3.3,1.4]; //can set bouncepoint at center\r\nconst DEATH_TILES = [7];\r\nclass Pathfinder {\r\n\tconstructor() {\r\n\t\tthis.nodes = [];\r\n\t\tthis.map = JSON.parse(JSON.stringify(tagpro.map));\r\n\t\tthis.aStarGrid = this.parseMap(this.map);\r\n\t}\r\n\r\n\tparseMap(map) {\r\n\t\tlet edges = {};\r\n\t\tlet aStarGrid = [];\r\n\t\tfor (let i=0; i<this.map.length; i++){\r\n\t\t\taStarGrid.push([]);\r\n\t\t\tfor (let j = 0; j<this.map[i].length; j++) {\r\n\t\t\t\taStarGrid[i][j] = tagpro.map[i][j];\r\n\t\t\t}\r\n\t\t}\r\n\t\treturn aStarGrid;\r\n\t}\r\n\r\n\tgetNeighbors(node) {\r\n\t\tlet cartesanTiles = {\r\n\t\t\tright: {x: node.x + 1, y: node.y, valid: false},\r\n\t\t\tup: {x: node.x, y: node.y + 1, valid: false},\r\n\t\t\tleft: {x: node.x - 1, y: node.y, valid: false},\r\n\t\t\tdown: {x: node.x, y: node.y - 1, valid: false}\r\n\t\t};\r\n\t\tlet resultingLocations = [];\r\n\t\tObject.values(cartesanTiles).forEach(cartesanTile =>  {\r\n\t\t\tif (\r\n\t\t\t\tthis.aStarGrid[cartesanTile.x] &&\r\n\t\t\t\tthis.aStarGrid[cartesanTile.x][cartesanTile.y] &&\r\n\t\t\t\tthis.notWallOrSpike(this.aStarGrid[cartesanTile.x][cartesanTile.y])\r\n\t\t\t) {\r\n\t\t\t\tresultingLocations.push({x: cartesanTile.x, y: cartesanTile.y});\r\n\t\t\t\tcartesanTile.valid = true;\r\n\t\t\t}\r\n\t\t});\r\n\r\n\t\t//Manually checking the 4 diagonal tiles\r\n\t\tlet upRight = {x: node.x + 1, y: node.y + 1};\r\n\t\tlet downRight = {x: node.x + 1, y: node.y - 1};\r\n\t\tlet upLeft = {x: node.x - 1, y: node.y + 1};\r\n\t\tlet downLeft = {x: node.x - 1, y: node.y - 1};\r\n\r\n\t\tif (cartesanTiles.right.valid && cartesanTiles.up.valid && this.aStarGrid[upRight.x][upRight.y] &&\r\n\t\t\tthis.notWallOrSpike(this.map[upRight.x][upRight.y])\r\n\t\t) {\r\n\t\t\tresultingLocations.push(upRight);\r\n\t\t}\r\n\r\n\t\tif (cartesanTiles.right.valid && cartesanTiles.down.valid && this.aStarGrid[downRight.x][downRight.y] &&\r\n\t\t\tthis.notWallOrSpike(this.map[downRight.x][downRight.y])\r\n\t\t) {\r\n\t\t\tresultingLocations.push(downRight);\r\n\t\t}\r\n\r\n\t\tif (cartesanTiles.left.valid && cartesanTiles.up.valid && this.aStarGrid[upLeft.x][upLeft.y] &&\r\n\t\t\tthis.notWallOrSpike(this.map[upLeft.x][upLeft.y])\r\n\t\t) {\r\n\t\t\tresultingLocations.push(upLeft);\r\n\t\t}\r\n\r\n\t\tif (cartesanTiles.left.valid && cartesanTiles.down.valid && this.aStarGrid[downLeft.x][downLeft.y] &&\r\n\t\t\tthis.notWallOrSpike(this.map[downLeft.x][downLeft.y])\r\n\t\t) {\r\n\t\t\tresultingLocations.push(downLeft);\r\n\t\t}\r\n\r\n\t\treturn resultingLocations;\r\n\t}\r\n\r\n\tgetCost(point) {\r\n\t\tif (this.notWallOrSpike(this.map[point.x][point.y])) {\r\n\t\t\treturn 1;\r\n\t\t} else {\r\n\t\t\treturn 999;\r\n\t\t}\r\n\t}\r\n\r\n\tnotWallOrSpike(value) {\r\n\t\treturn !DEATH_TILES.includes(value) && !WALL_TILES.includes(value);\r\n\t}\r\n\r\n\theuristic(start, goal) {\r\n\t\tlet dx = Math.abs(start.x - goal.x);\r\n\t    let dy = Math.abs(start.y - goal.y);\r\n\t    //TODO: update 1 with a getTileValue\r\n\t    return 1 * (dx + dy);\r\n\t}\r\n\r\n\tgetPointKey(point) {\r\n\t\treturn point.x + \"/\" + point.y;\r\n\t}\r\n\r\n\tfindPath(start, goal) {\r\n\t\tconsole.log(\"start is \", start);\r\n\t\tconsole.log(\"goal is \", goal);\r\n\t\tlet costsSoFar = {};\r\n\t\tlet cameFrom = {};\r\n\t\tcameFrom[this.getPointKey(start)] = null;\r\n    \tcostsSoFar[this.getPointKey(start)] = 0;\r\n\t\tlet frontier = new tinyqueue__WEBPACK_IMPORTED_MODULE_0__[\"default\"]([],  function (a, b) {\r\n\t\t\treturn a.priority - b.priority;\r\n\t\t});\r\n\t\tfrontier.push({x: start.x, y: start.y, priority: 0});\r\n\r\n\t\twhile (frontier.length > 0) {\r\n\t\t\tlet currentNode = frontier.pop();\r\n\t\t\tif (currentNode.x === goal.x && currentNode.y === goal.y) {\r\n\t\t\t\tbreak;\r\n\t\t\t}\r\n\t\t\tlet currentNodeKey = this.getPointKey(currentNode);\r\n\t\t\tthis.getNeighbors(currentNode).forEach((neighbor) => {\r\n\t\t\t\tlet costSoFar = costsSoFar[currentNodeKey];\r\n\t\t\t\tif (costSoFar === undefined) {\r\n\t\t\t\t\tcostSoFar = 0;\r\n\t\t\t\t}\r\n\t\t\t\tlet newCost = costSoFar + this.getCost(neighbor);\r\n\t\t\t\tlet neighborKey = this.getPointKey(neighbor);\r\n\t\t\t\tif (!costsSoFar.hasOwnProperty(neighborKey) || newCost < costsSoFar[neighborKey]) {\r\n\t\t\t\t\tcostsSoFar[neighborKey] = newCost;\r\n\t\t\t\t\tlet priority = newCost + this.heuristic(goal, neighbor);\r\n\t\t\t\t\tneighbor.priority = priority;\r\n\t\t\t\t\tfrontier.push(neighbor);\r\n\t\t\t\t\tcameFrom[neighborKey] = currentNode;\r\n\t\t\t\t}\r\n\t\t\t});\r\n\t\t}\r\n\t\tlet path = [goal];\r\n\t\tconsole.log(\"came from looks like this\", cameFrom);\r\n\t\twhile(cameFrom[this.getPointKey(path[path.length-1])]) {\r\n\t\t\tlet nextStep = cameFrom[this.getPointKey(path[path.length-1])];\r\n\t\t\tconsole.log(\"next step is \", nextStep);\r\n\t\t\tpath.push(nextStep);\r\n\t\t}\r\n\r\n\t\t//reverse array\r\n\t\t//faster than reverse - see https://jsperf.com/js-array-reverse-vs-while-loop\r\n\t\tlet index = 0;\r\n\t\tlet len = path.length;\r\n\t\twhile (index < len) {\r\n\t\t\tlet end = (len - 1) - index;\r\n\t\t\tpath.push(path[end]);\r\n\t\t\tpath.splice(end, 1);\r\n\t\t \tindex++;\r\n\t\t}\r\n\t\tconsole.log(\"path is spathzzzzz \", path);\r\n\t\treturn path;\r\n\t}\r\n}\n\n//# sourceURL=webpack:///./src/pathfinder.js?");

/***/ }),

/***/ "./src/steerer.js":
/*!************************!*\
  !*** ./src/steerer.js ***!
  \************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return Steerer; });\nconst MAX_VELOCITY = 2.5;\r\nconst MIN_VELOCITY = -2.5;\r\n\r\nconst UP = \"up\";\r\nconst DOWN = \"down\";\r\nconst LEFT = \"left\";\r\nconst RIGHT = \"right\";\r\n\r\nconst KEY_UP = \"keyup\";\r\nconst KEY_DOWN = \"keydown\";\r\n//velocity calculated from\r\n//https://www.reddit.com/r/TagPro/comments/4gzg88/tagpro_max_speed_question/\r\n//https://gist.github.com/SomeBall-1/5e48d74a8aba2f20aa7137475f00c89f#file-tagpro-pos-vel-predictor-js\r\nclass Steerer {\r\n\tconstructor(socket) {\r\n\t\tthis.socket = socket;\r\n\t\tthis.accel = {\r\n\t\t\tleft: false,\r\n\t\t\tright: false,\r\n\t\t\tup: false,\r\n\t\t\tdown: false\r\n\t\t};\r\n\t\tthis.step = (1.0 / 60); //60 fps\r\n\t\tthis.damping = 0.5;\r\n\t\t// Scale between Box2d physics and tagpro physics.\r\n\t\tthis.scale = 100;\r\n\t\t// Damping factor.\r\n\t\t// So while our velocity increases by 0.025 every frame if an arrow key is held down,\r\n\t\t// it also decreases by v*0.00833 where v is your current velocity (x and y directions are handled independently).\r\n\t\t// linear damping in Box2D = 1-step*damp\r\n\t\t// velocity(i) = (velocity(i-1) + a) * d\r\n\t\t// //n = number of steps (time_in_sec*60)\r\n\t\t//a = acceleration (ball default = 0.025)\r\n\t\t//damp = linear damping value (ball default = 0.5)\r\n\t\t//\r\n\t\t//normal (0.025)\tjuke juice (0.031)\tteam tiles (0.037)\r\n\t\tthis.d = 1 - (this.damping * this.step);\r\n\t}\r\n\r\n\t//todo - limit to 2.5\r\n\t//(well 2.499999 (init velocity) + .025)\r\n\t//https://www.wolframalpha.com/input/?i=v(i)+%3D+(v(i-1)+%2B+a)*d\r\n\tgetNewVelocity(velocity, accel, steps) {\r\n\t\treturn velocity*Math.pow(this.d, steps) + (accel*this.d*(Math.pow(this.d, steps)-1)) / (this.d-1);\r\n\t}\r\n\r\n\t//https://gist.github.com/SomeBall-1/5e48d74a8aba2f20aa7137475f00c89f#file-tagpro-pos-vel-predictor-js\r\n\t//https://www.wolframalpha.com/input/?i=solve((a+d+(-1+%2B+d%5En))%2F(-1+%2B+d)+%2B+d%5En+v%3Df,n)\r\n\tgetNumStepsForVelocity(initialVelocity, finalVelocity, accel) {\r\n\t\treturn (Math.log((a*this.d+finalVelocity*(this.d-1))/(accel*this.d+initialVelocity*(this.d-1)))/Math.log(this.d));\r\n\t}\r\n\r\n\r\n\t//solving for steps gives\r\n\t//n = log((d * dt * (v + a) - v) / (d * dt * (v_0 + a) - v_0)) / log(d * dt)\r\n\r\n\r\n\tchangeDirection(command, direction) {\r\n\t\tthis.socket.emit(command, {k: direction});\r\n\t}\r\n\r\n\taccelInDirection(direction) {\r\n\t\tthis.changeDirection(KEY_UP, direction);\r\n\t\tthis.accel[direction] = true;\r\n\t}\r\n\r\n\tdeAccelInDirection(direction) {\r\n\t\tthis.changeDirection(KEY_DOWN, direction);\r\n\t\tthis.accel[direction] = false;\r\n\t}\r\n\r\n\taccelUp() {\r\n\t\tthis.accelInDirection(UP);\r\n\t}\r\n\r\n\taccelDown() {\r\n\t\tthis.accelInDirection(DOWN);\r\n\t}\r\n\r\n\taccelLeft() {\r\n\t\tthis.accelInDirection(LEFT);\r\n\t}\r\n\r\n\taccelRight() {\r\n\t\tthis.accelInDirection(RIGHT);\r\n\t}\r\n\r\n\tdeAccelUp() {\r\n\t\tthis.deAccelInDirection(UP);\r\n\t}\r\n\r\n\tdeAcelDown() {\r\n\t\tthis.deAccelInDirection(DOWN);\r\n\t}\r\n\r\n\tdeAccelLeft() {\r\n\t\tthis.deAccelInDirection(LEFT);\r\n\t}\r\n\r\n\tdeAccelRight() {\r\n\t\tthis.deAccelInDirection(RIGHT);\r\n\t}\r\n}\n\n//# sourceURL=webpack:///./src/steerer.js?");

/***/ })

/******/ });