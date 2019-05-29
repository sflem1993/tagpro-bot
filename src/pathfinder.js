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
				aStarGrid[i][j] = tagpro.map[i][j]//this.getPathFindingValue(this.map[i][j])
			}
		}
		return aStarGrid
	}

	getPathFindingValue(value) {
		if (this.notWallOrSpike(value)) {
			return 1
		} else {
			return 0
		}
	}

	getNeighbors(node) {
		 let directions = [{x: 1, y: 0}, {x: 0, y: 1}, {x: -1, y: 0}, {x: 0, y:-1}]
		 let resultingLocations = []
		 for (let direction in directions) {
		 	let new_x = node.x + direction.x
		 	let new_y = node.y + direction.y
		 	console.log("new x is " + new_x)
		 	console.log("new y is " + new_y)
		 	if (this.aStarGrid[new_x] && this.aStarGrid[new_x][new_y] && this.notWallOrSpike(this.aStarGrid[new_x][new_y])) {
		 		resultingLocations.push({x: new_x, y: new_y})
		 	}
		}
		return resultingLocations
	}

	notWallOrSpike(value) {
		return !DEATH_TILES.includes(value) && !WALL_TILES.includes(value)
	}

	heuristic(start, goal) {
		let dx = abs(start.x - goal.x)
	    let dy = abs(start.y - goal.y)
	    return 1 * (dx + dy)
	}

	findPath(start, goal) {
		console.log("start is ", start)
		console.log("goal is ", goal)
		let costs_so_far = {}
		let came_from = {}
		came_from[start] = null
    	costs_so_far[start] = 0

		let frontier = new TinyQueue([],  function (a, b) {
			return a.priority - b.priority;
		});
		frontier.push({x: start.x, y: start.y, priority: 0})

		while (frontier.length > 0) {
			let currentNode = frontier.pop()
			if (currentNode.x === goal.x && currentNode.y === goal.y) {
				break
			}
			let neighbors = this.getNeighbors(currentNode)
			console.log("neighbors are ", neighbors)
			neighbors.forEach((neighbor) => {
				let new_cost = costs_so_far[currentNode] + graph.cost(currentNode, next)
				if (!costs_so_far.hasOwnProperty(neighbor) || new_cost < costs_so_far[neighbor]) {
					let priority = new_cost + this.heuristic(goal, neighbor)
					neighbor.priority = priority
					frontier.put(neighbor)
					came_from[neighbor] = current
				}
			});
		}
		var results = []
		results[0] = {x: 1, y:2}//came_from
		results[1] = costs_so_far
		return [came_from, costs_so_far]
	}

	getFlagLocation() {
	    for (let i = 0; i < tagpro.map.length; i++) {
	        for (let j = 0; y < yl; y++) {
	            switch (Math.floor(tagpro.map[x][y])) {
	                case 3:
	                    if (color === 'red')
	                        return {x: x * 40, y: y * 40};
	                    break;
	                case 4:
	                    if (color === 'blue')
	                        return {x: x * 40, y: y * 40};
	                    break;
	                case 16:
	                    if (color === 'yellow')
	                        return {x: x * 40, y: y * 40};
	                    break;
	            }
	        }
	    }
	}
}