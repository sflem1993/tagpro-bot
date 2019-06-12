import GameInfo from './gameInfo.js';
import Pathfinder from './pathfinder.js';
import Steerer from './steerer.js';
import PlayerInfo from './playerInfo.js';
export default class Bot {
	constructor(tagpro) {
		this.actions = [];
		this.tagpro = tagpro
		this.socket = tagpro.socket;
		this.gameInfo = new GameInfo(tagpro);
		this.nextTile = null;
		this.playerInfo = new PlayerInfo(tagpro);
		this.pathfinder = new Pathfinder(tagpro.map);
		this.steerer = new Steerer(tagpro);
		this.self = tagpro.players[tagpro.playerId];
  		this.update2 = setInterval(this.goToPoint.bind(this), 200);
  		this.update2 = setInterval(this.steer.bind(this), 10);
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

	getPathToEnemyFlag() {
		return this.pathfinder.findPath(this.playerInfo.getSelfTileLocation(), this.gameInfo.getEnemyFlagLocation());
	}

	updatePlayerPosition() {
		let player = this.tagpro.players[this.playerInfo.playerID];
		this.playerInfo.physicsInfo.x = player.x;
		this.playerInfo.physicsInfo.y = player.y;
		this.playerInfo.physicsInfo.velocityX = player.lx;
		this.playerInfo.physicsInfo.velocityY = player.ly;
	}

	getNextTile() {
		this.updatePlayerPosition();
		this.path = this.getPathToEnemyFlag();
		if (this.path.length > 2) {
			this.nextTile = this.path[1];
		} else {
			this.nextTile = [];
		}
	}

	goToPoint() {
		this.updatePlayerPosition();
		this.getNextTile();
		this.steerer.determineAccelDirections(this.path, this.nextTile, this.playerInfo.physicsInfo);
	}

	steer() {
		this.steerer.steer();
	}

	sendAllMessage(chat) {
		this.socket.emit("chat", {
			message: chat,
			toAll: true
		});
	}
}