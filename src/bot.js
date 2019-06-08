import GameInfo from './gameInfo.js';
import Pathfinder from './pathfinder.js';
import Steerer from './steerer.js';
export default class Bot {
	constructor(tagpro) {
		this.socket = tagpro.socket;
		this.gameInfo = new GameInfo(tagpro);
		this.steerer = new Steerer(tagpro.socket);
		this.self = tagpro.players[tagpro.playerId];
	}

	initializeSocketListeners() {
		console.log("initiailizing socket listeners");
		this.socket.on("p", (info) => {
			let updates = info.u || info;
			updates.forEach((update) => {
				if (update.hasOwnProperty("flag")) {
					this.sendAllMessage("the flags been tampered with.");
				}
			});
		});
	}

	sendAllMessage(chat) {
		this.socket.emit("chat", {
			message: chat,
			toAll: true
		});
	}
}