class Graph {
	constructor() {
		this.adjacencyList = new Map();
	}

	addVertex(vertex = null) {
		if(!(!vertex)) {
			this.adjacencyList.set(vertex, []);
		}
	}

	addEdge(origin, destination) {
		this.adjacencyList.get(origin).push(destination);
		this.adjacencyList.get(destination).push(origin);
	}

	bfs(origin, destination) {
		let visited = {};
		visited[origin] = null;
		let queue = [origin];
		while (queue.length > 0) {
			const current = queue.shift();
			const destinations = this.adjacencyList.get(current);

			if (current === destination) {
                return visited;
			}
			
			for (let next of destinations) {
				if (!visited.hasOwnProperty(next)) {
					queue.push(next);
					visited[next] = current;
				}
			}
		}
		return visited;
	}

	constructPath(start, end, prev) {
		let path = [];
		let current = end;

        while (current !== null) {
            path.push(current);
            current = prev[current];
        }

        path.reverse();

		if (path[0] === start) {
			return path;
		}
		return [];
	}

	getShortestPath(origin, destination) {
		const prev = this.bfs(origin, destination);
		return this.constructPath(origin, destination, prev)
	}


}

const airports = ['LAX', 'ATL', 'DFW', 'ORD', 'MEX', 'AMS', 'JFK', 'LOS', 'VKO', 'IST', 'LHR', 'AMS', 'CUN'];

const routes = [
	['LAX', 'ORD'],
	['LAX', 'MEX'],
	['MEX', 'DFW'],
	['MEX', 'CUN'],
	['CUN', 'DFW'],
	['DFW', 'ATL'],
	['DFW', 'LOS'],
	['LOS', 'AMS'],
	['LOS', 'VKO'],
	['VKO', 'AMS'],
	['VKO', 'IST'],
	['IST', 'LHR'],
	['AMS', 'JFK'],
	['AMS', 'IST'],
	['LHR', 'JFK'],
	['JFK', 'ATL'],
	['JFK', 'ORD'],
	['ORD', 'ATL'],
	['ATL', 'LAX'],
	['ATL', 'AMS'],
];


const graph = new Graph();

airports.forEach(airport => graph.addVertex(airport));

routes.forEach(route => graph.addEdge(...route));

console.log(graph);

const res = graph.getShortestPath('LAX', 'DFW');

console.log('Shortest Path is: ', res);