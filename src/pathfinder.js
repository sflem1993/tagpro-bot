import TinyQueue from 'tinyqueue';
const WALL_TILES = [1,1.1,1.2,1,3.3,1.4]; //can set bouncepoint at center
const DEATH_TILES = [7];
export default class Pathfinder {
	constructor(map) {
		this.nodes = [];
		this.map = JSON.parse(JSON.stringify(map));
		this.aStarGrid = this.parseMap(this.map);
	}

	parseMap(map) {
		let edges = {};
		let aStarGrid = [];
		for (let i=0; i<this.map.length; i++){
			aStarGrid.push([]);
			for (let j = 0; j<this.map[i].length; j++) {
				aStarGrid[i][j] = tagpro.map[i][j];
			}
		}
		return aStarGrid;
	}

	getNeighbors(node) {
		let cartesanTiles = {
			right: {x: node.x + 1, y: node.y, valid: false},
			up: {x: node.x, y: node.y + 1, valid: false},
			left: {x: node.x - 1, y: node.y, valid: false},
			down: {x: node.x, y: node.y - 1, valid: false}
		};
		let resultingLocations = [];
		Object.values(cartesanTiles).forEach(cartesanTile =>  {
			if (
				this.aStarGrid[cartesanTile.x] &&
				this.aStarGrid[cartesanTile.x][cartesanTile.y] &&
				this.notWallOrSpike(this.aStarGrid[cartesanTile.x][cartesanTile.y])
			) {
				resultingLocations.push({x: cartesanTile.x, y: cartesanTile.y});
				cartesanTile.valid = true;
			}
		});

		//Manually checking the 4 diagonal tiles
		let upRight = {x: node.x + 1, y: node.y + 1};
		let downRight = {x: node.x + 1, y: node.y - 1};
		let upLeft = {x: node.x - 1, y: node.y + 1};
		let downLeft = {x: node.x - 1, y: node.y - 1};

		if (cartesanTiles.right.valid && cartesanTiles.up.valid && this.aStarGrid[upRight.x][upRight.y] &&
			this.notWallOrSpike(this.map[upRight.x][upRight.y])
		) {
			resultingLocations.push(upRight);
		}

		if (cartesanTiles.right.valid && cartesanTiles.down.valid && this.aStarGrid[downRight.x][downRight.y] &&
			this.notWallOrSpike(this.map[downRight.x][downRight.y])
		) {
			resultingLocations.push(downRight);
		}

		if (cartesanTiles.left.valid && cartesanTiles.up.valid && this.aStarGrid[upLeft.x][upLeft.y] &&
			this.notWallOrSpike(this.map[upLeft.x][upLeft.y])
		) {
			resultingLocations.push(upLeft);
		}

		if (cartesanTiles.left.valid && cartesanTiles.down.valid && this.aStarGrid[downLeft.x][downLeft.y] &&
			this.notWallOrSpike(this.map[downLeft.x][downLeft.y])
		) {
			resultingLocations.push(downLeft);
		}

		return resultingLocations;
	}

	getCost(point) {
		//todo add team/tile/gate logic after basic velocity/movement stuff
		if (this.notWallOrSpike(this.map[point.x][point.y])) {
			return 1;
		} else {
			return 999;
		}
	}

	notWallOrSpike(value) {
		return !DEATH_TILES.includes(value) && !WALL_TILES.includes(value);
	}

	heuristic(start, goal) {
		let dx = Math.abs(start.x - goal.x);
	    let dy = Math.abs(start.y - goal.y);
	    //TODO: update 1 with a getTileValue
	    return 1 * (dx + dy);
	}

	getPointKey(point) {
		return point.x + "/" + point.y;
	}

	findPath(start, goal) {
		let costsSoFar = {};
		let cameFrom = {};
		cameFrom[this.getPointKey(start)] = null;
    	costsSoFar[this.getPointKey(start)] = 0;
		let frontier = new TinyQueue([],  function (a, b) {
			return a.priority - b.priority;
		});
		frontier.push({x: start.x, y: start.y, priority: 0});

		while (frontier.length > 0) {
			let currentNode = frontier.pop();
			if (currentNode.x === goal.x && currentNode.y === goal.y) {
				break;
			}
			let currentNodeKey = this.getPointKey(currentNode);
			this.getNeighbors(currentNode).forEach((neighbor) => {
				let costSoFar = costsSoFar[currentNodeKey];
				if (costSoFar === undefined) {
					costSoFar = 0;
				}
				let newCost = costSoFar + this.getCost(neighbor);
				let neighborKey = this.getPointKey(neighbor);
				if (!costsSoFar.hasOwnProperty(neighborKey) || newCost < costsSoFar[neighborKey]) {
					costsSoFar[neighborKey] = newCost;
					let priority = newCost + this.heuristic(goal, neighbor);
					neighbor.priority = priority;
					frontier.push(neighbor);
					cameFrom[neighborKey] = currentNode;
				}
			});
		}

		//build the path backwards from the cameFrom object
		let path = [goal];
		while(cameFrom[this.getPointKey(path[path.length-1])]) {
			let nextStep = cameFrom[this.getPointKey(path[path.length-1])];
			path.push(nextStep);
		}

		//reverse path
		//this is faster than array.reverse() - see https://jsperf.com/js-array-reverse-vs-while-loop
		let index = 0;
		let len = path.length;
		while (index < len) {
			let end = (len - 1) - index;
			path.push(path[end]);
			path.splice(end, 1);
		 	index++;
		}
		return path;
	}
}