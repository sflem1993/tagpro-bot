import TinyQueue from 'tinyqueue';
const WALL_TILES = [1,1.1,1.2,1,3.3,1.4] //can set bouncepoint at center
const DEATH_TILES = [7]
export default class Pathfinder {
	constructor() {
		this.nodes = []
		this.map = JSON.parse(JSON.stringify(tagpro.map))
		this.aStarGrid = this.parseMap(this.map)
	}

	parseMap(map) {
		let edges = {}
		let aStarGrid = []
		for (let i=0; i<this.map.length; i++){
			aStarGrid.push([])
			for (let j = 0; j<this.map[i].length; j++) {
				aStarGrid[i][j] = tagpro.map[i][j]
			}
		}
		return aStarGrid
	}

	getNeighbors(node) {
		 let directions = [{x: 1, y: 0}, {x: 0, y: 1}, {x: -1, y: 0}, {x: 0, y:-1}]
		 let resultingLocations = []
		 for (let direction of directions) {
		 	let new_x = node.x + direction.x
		 	let new_y = node.y + direction.y
		 	if (this.aStarGrid[new_x] && this.aStarGrid[new_x][new_y] && this.notWallOrSpike(this.aStarGrid[new_x][new_y])) {
		 		resultingLocations.push({x: new_x, y: new_y})
		 	}
		}

		//TODO, calc if diaganol movement is ok
		return resultingLocations
	}

	getCost(point) {
		if (this.notWallOrSpike(this.map[point.x][point.y])) {
			return 1
		} else {
			return 999
		}
	}

	notWallOrSpike(value) {
		return !DEATH_TILES.includes(value) && !WALL_TILES.includes(value)
	}

	heuristic(start, goal) {
		let dx = Math.abs(start.x - goal.x)
	    let dy = Math.abs(start.y - goal.y)
	    return 1 * (dx + dy)
	}

	getPointKey(point) {
		return point.x + "/" + point.y
	}

	findPath(start, goal) {
		console.log("start is ", start)
		console.log("goal is ", goal)
		let costsSoFar = {}
		let cameFrom = {}
		cameFrom[this.getPointKey(start)] = null
    	costsSoFar[this.getPointKey(start)] = 0
		let frontier = new TinyQueue([],  function (a, b) {
			return a.priority - b.priority;
		});
		frontier.push({x: start.x, y: start.y, priority: 0})

		while (frontier.length > 0) {
			let currentNode = frontier.pop()
			if (currentNode.x === goal.x && currentNode.y === goal.y) {
				break
			}

			this.getNeighbors(currentNode).forEach((neighbor) => {
				let costSoFar = costsSoFar[this.getPointKey(currentNode)]
				if (costSoFar === undefined) {
					costSoFar = 0
				}
				let newCost = costSoFar + this.getCost(neighbor)
				let neighborKey = this.getPointKey(neighbor)
				if (!costsSoFar.hasOwnProperty(neighborKey) || newCost < costsSoFar[neighborKey]) {
					costsSoFar[neighborKey] = newCost
					let priority = newCost + this.heuristic(goal, neighbor)
					neighbor.priority = priority
					frontier.push(neighbor)
					cameFrom[neighborKey] = currentNode
				}
			});
		}
		let path = [goal]
		console.log("came from looks like this", cameFrom)
		while(cameFrom[this.getPointKey(path[path.length-1])]) {
			let nextStep = cameFrom[this.getPointKey(path[path.length-1])]
			console.log("next step is ", nextStep)
			path.push(nextStep)
		}
		return path
	}
}