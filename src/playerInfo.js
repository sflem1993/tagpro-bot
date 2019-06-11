import PhysicsInfo from './physicsInfo.js';
import Steerer from './steerer.js';
export default class PlayerInfo {
	constructor(tagpro) {
		this.playerID = tagpro.playerId;
		this.info = tagpro.players[this.playerID];
		console.log("info is ", this.info);
		this.physicsInfo = new PhysicsInfo(this.info);
		this.steerer = new Steerer(tagpro.socket);
		this.position = "D"; //default to D - replace with constant/actual logic for o or d & to check team positions
	}
}