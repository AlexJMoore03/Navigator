var steps;
function Node(nodeCell, edgeList) {
    this.nodeCell = nodeCell;
    this.edgeList = edgeList;
}

//Colors the path to the current node, de-colors everything else
function colorCurrentPathBFS(graph, currentNode, currentFrom) {
    let safetyArray = [currentNode.nodeCell];
    if (currentNode.nodeCell != graph.start) {
        let currentIndex = graph.nodes.indexOf(currentNode.nodeCell);
        while (currentFrom[currentIndex] != graph.start) {
            safetyArray[safetyArray.length] = currentFrom[currentIndex];
            //currentFrom[currentIndex].style.background = "purple";
            currentIndex = graph.nodes.indexOf(currentFrom[currentIndex]);
        }
        safetyArray[safetyArray.length] = graph.start;
    }
    for (edge of graph.edges) {
        if (safetyArray.includes(edge.node1) && safetyArray.includes(edge.node2)) {
            colorRoadBFS(edge, "purple");
        }
        else {
            colorRoadBFS(edge, "yellow");
        }
    }
}

//Colors ever cell of an edge
function colorRoadBFS(edge, paintColor) {
    for (cell of edge.cellsArray) {
        cell.style.background = paintColor;
    }
}

//Displays the amount of nodes visited
function DisplayStepsBFS() {
    let stepsDisplay = document.getElementById("stepsDisplay");
    steps = 
    stepsDisplay.innerHTML = steps;
}

//Visits a node and performs BFS algorithm
function BFSVisit(graph, currentNode, distances, visited, currentFrom, nodeArray) {
    colorCurrentPathBFS(graph, currentNode, currentFrom);
    let thisIndex = graph.nodes.indexOf(currentNode.nodeCell);
    visited[thisIndex] = true;
    if (currentNode.nodeCell == graph.end) {
        console.log(distances[thisIndex]);
        DisplayStepsBFS();
        return;
    }
    for (i = 0; i < currentNode.edgeList.length; i++) {
        colorRoadBFS(currentNode.edgeList[i], "purple");
        let otherNode = currentNode.edgeList[i].node1
        if (currentNode.edgeList[i].node1 == currentNode.nodeCell) {
            otherNode = currentNode.edgeList[i].node2;
        }
        let otherIndex = graph.nodes.indexOf(otherNode);
        if (!visited[otherIndex] && (distances[otherIndex] > distances[thisIndex] + currentNode.edgeList[i].cellsArray.length + 1 || distances[otherIndex] == -1)) {
            distances[otherIndex] = distances[thisIndex] + currentNode.edgeList[i].cellsArray.length + 1;
            currentFrom[otherIndex] = currentNode.nodeCell;
        }
        colorRoadBFS(currentNode.edgeList[i], "yellow");
    }
    let minDistance = -1;
    let minIndex = -1;
    for (i = 0; i < distances.length; i++) {
        if ((distances[i] <= minDistance || minDistance == -1) && distances[i] != -1) {
            if (visited[i] == false) {
                minIndex = i;
                minDistance = distances[i];
            }
        }
    }
    BFSVisit(graph, nodeArray[minIndex], distances, visited, currentFrom, nodeArray);
}

//Initiates BFS algorithm
function BFS(graph) {
    let distances = new Array();
    let visited = new Array();
    let currentFrom = new Array();
    let nodeArray = new Array();
    let startNode;
    steps = graph.nodes.length;
    for (i = 0; i < graph.nodes.length; i++) {
        visited[i] = false;
        if (graph.nodes[i] == graph.start) {
            distances[i] = 0;
        }
        else {
            distances[i] = -1;
        }
        let edgeArray = new Array();
        for (edge of graph.edges) {
            if (edge.node1 == graph.nodes[i] || edge.node2 == graph.nodes[i]) {
                edgeArray[edgeArray.length] = edge;
            }   
        }
        let realNode = new Node(graph.nodes[i], edgeArray);
        if (graph.nodes[i] == graph.start) {
            startNode = realNode;
        }
        nodeArray[i] = realNode;
    }
    BFSVisit(graph, startNode, distances, visited, currentFrom, nodeArray);
}