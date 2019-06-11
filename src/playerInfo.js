import PhysicsInfo from './physicsInfo.js';
export default class PlayerInfo {
	constructor(tagpro) {
		this.playerID = tagpro.playerId;
		this.physicsInfo = new PhysicsInfo(tagpro.players[this.playerID]);
		this.position = "D"; //default to D - replace with constant/actual logic for o or d & to check team positions
	}

	getSelfTileLocation() {
		let results = {x: this.physicsInfo.x, y: this.physicsInfo.y};
		for (let key in results) {
  			if (results.hasOwnProperty(key)) {
  				let new_value  = Math.round(results[key] / 40);
    			results[key] = new_value;
			}
		}
		return results;
	}
}