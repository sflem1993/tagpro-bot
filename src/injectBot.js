import Bot from './bot.js';
function addToTagpro(startFunction) {
	if (tagpro.map && tagpro.renderer.renderer && tagpro.players && typeof tagpro.players[tagpro.playerId] !== "undefined") {
    	console.log("reached");
  		console.log(window.tagpro.socketPort);
  		console.log(window.tagpro.socketHost);
  		window.tagpro.ready(startFunction);
  	} else {
	    setTimeout(() => {
	      addToTagpro(startFunction);
    	}, 100);
  	}
}

function initializeBot() {
  console.log("bot initialized");
  let bot = new Bot(window.tagpro);
  bot.initializeSocketListeners();
  let r = bot.getPathToEnemyFlag();
  console.log("the result is :", r);
}

addToTagpro(initializeBot);