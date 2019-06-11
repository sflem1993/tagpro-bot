import GameInfo from './gameInfo.js';
import Pathfinder from './pathfinder.js';
import Steerer from './steerer.js';
import PlayerInfo from './playerInfo.js';
export default class Bot {
	constructor(tagpro) {
		this.actions = [];
		this.socket = tagpro.socket;
		this.gameInfo = new GameInfo(tagpro);
		this.nextTile = null;
		console.log("game info is ", this.gameInfo)
		this.playerInfo = new PlayerInfo(tagpro);
		this.steerer = new Steerer(tagpro);
		this.self = tagpro.players[tagpro.playerId];
		this.update1 = setInterval(this.getNextTile.bind(this), 20);
  		this.update2 = setInterval(this.goToPoint.bind(this), 10);
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

		this.socket.on("mapUpdate", (info) => {
			let update = info.u || info;
			if (Array.isArray(updates)) {

			} else {

			}
		});
	}

	getNextTile() {
		this.playerInfo.physicsInfo.x = tagpro.players[this.playerInfo.playerID].x;
		this.playerInfo.physicsInfo.y = tagpro.players[this.playerInfo.playerID].y;
		let path = this.gameInfo.getEnemyFlag();
		this.nextTile = path[1];
	}

	goToPoint() {
		if (this.nextTile != null) {
			let needChange = false;
			let self = this.gameInfo.getSelfTileLocation();
			console.log("next tile x is ", this.nextTile.x);
			console.log("player  x is ",self.x);
			if (this.nextTile.x > self.x ) {
				this.steerer.accelX = true;
			} else {
				this.steerer.accelX = false;
			}

			if (this.nextTile.y > self.y) {
				this.steerer.accelY = true;
			} else {
				this.steerer.accelY = false;
			}
			this.steerer.steer();
		}
	}

	sendAllMessage(chat) {
		this.socket.emit("chat", {
			message: chat,
			toAll: true
		});
	}
}