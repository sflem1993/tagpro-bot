const WALL_TILES = 1
const ANGLED_WALL_TILE = [1.1,1.2,1,3.3,1.4] //can set bouncepoint at center
const NORMAL_TILES = [0,2,3,3.1,4,4.1,5,5.1,6,6.1,6.11,6.2,6.21,6.3,6.31,6.4,6.41]
const POWERUP_TILES = [6,6.1,6.11,6.2,6.21,6.3,6.31]
const DEATH_TILES = [7]
const RED_FLAG = 3;
const RED_FLAG_TAKEN = 3.1;
const BLUE_FLAG = 4;
const BLUE_FLAG_TAKEN = 4.1;
const YELLOW_FLAG = 16;
const YELLOW_FLAG_TAKEN = 16.1;
const YELLOW = 0;
const RED = 1;
const BLUE = 2;
const TILE_PIXELS = 40;


import Pathfinder from './pathfinder.js'
export default class GameInfo {
	constructor(tagpro) {
		this.tagpro = tagpro
		this.pathfinder = new Pathfinder(tagpro.map)
		this.flags = []
		for (let i = 0; i < 3; i++) {
            this.flags.push({
                x : -1,
                y : -1,
                captured: false,
            });
        }
		this.neutralFlag = false
		this.playerID = tagpro.playerId;
		this.updateFlagLocations()
		this.teamValue = tagpro.players[this.playerID].team; //get value from the Player object's team property
		this.enemyTeamID = RED + BLUE - this.teamValue;
        this.regrabFlagID = this.neutralFlag ? YELLOW : this.enemyTeamID;
	}

	getPlayerTileLocation(player) {
		let results = {x: player.x, y: player.y}
		for (let key in results) {
  			if (results.hasOwnProperty(key)) {
  				let new_value  = results[key] / 40
    			results[key] = new_value
			}
		}

		return results
	}

	getSelfTileLocation() {
		let player = this.tagpro.players[this.playerID]
		return this.getPlayerTileLocation(player)
	}

	getEnemyFlag() {
		let enemyFlag = this.flags[this.regrabFlagID]
		return this.pathfinder.findPath(this.getSelfTileLocation(), enemyFlag)
	}

    updateFlagLocations() {
        for (let i = 0; i<this.tagpro.map.length; i++) {
            for (let j = 0; j<this.tagpro.map[0].length; j++) {
                if (this.tagpro.map[i][j] === RED_FLAG || this.tagpro.map[i][j] === RED_FLAG_TAKEN) {
                   this.flags[RED].x = i;
                   this.flags[RED].y = j;
                }
                if (this.tagpro.map[i][j] === BLUE_FLAG || this.tagpro.map[i][j] === BLUE_FLAG_TAKEN) {
                    this.flags[BLUE].x = i;
                    this.flags[BLUE].y = j;
                }
                if (this.tagpro.map[i][j] === YELLOW_FLAG ||this.tagpro.map[i][j] === YELLOW_FLAG_TAKEN) {
                    this.flags[YELLOW].x = i;
                    this.flags[YELLOW].y = j;
                    this.neutralFlag = true;
                }
            }
        }
    }
}