function Graph(nodes, edges, start, end) {
    this.nodes = nodes;
    this.edges = edges;
    this.start = start;
    this.end = end;
}

function Edge(node1, node2, cellsArray) {
    this.node1 = node1;
    this.node2 = node2;
    this.cellsArray = cellsArray;
}

function getConnections(tableCell) {
    let connections = new Array();
    let row = tableCell.getAttribute("row");
    let column = tableCell.getAttribute("column");
    if (column < gridWidth - 1 && document.getElementById("cell"+row+"_"+(+column+1)).getAttribute("paintColor") != 0) { connections[connections.length] = document.getElementById("cell"+row+"_"+(+column+1)); }
    if (row < gridHeight - 1 && document.getElementById("cell"+(+row+1)+"_"+column).getAttribute("paintColor") != 0) { connections[connections.length] = document.getElementById("cell"+(+row+1)+"_"+column); }
    if (column > 0 && document.getElementById("cell"+row+"_"+(+column-1)).getAttribute("paintColor") != 0) { connections[connections.length] = document.getElementById("cell"+row+"_"+(+column-1)); }
    if (row > 0 && document.getElementById("cell"+(+row-1)+"_"+column).getAttribute("paintColor") != 0) { connections[connections.length] = document.getElementById("cell"+(+row-1)+"_"+column); }
    return connections;
}

function findNextCell(tableCell, cameFrom) {
    let connections = getConnections(tableCell);
    if (connections.length == 2) {
        for (connection of connections) {
            if (connection != cameFrom) {
                return connection;
                break;
            }
        }
    }
}

function analyzeTable() {
    let nodeList = new Array();
    let edgeList = new Array();
    let roadStartList = new Array();
    let start;
    let end;
    let table = document.getElementById("mainTable");
    for (tb of Array.from(table.children)) {
        for (tableRow of Array.from(tb.children)) {
            for (tableCell of Array.from(tableRow.children)) {
                if (tableCell.getAttribute("paintColor") == 1) {
                    if (getConnections(tableCell).length >= 3) {
                        nodeList[nodeList.length] = tableCell;
                    }
                }
                else if (tableCell.getAttribute("paintColor") == 2) {
                    start = tableCell;
                    nodeList[nodeList.length] = tableCell;
                }
                else if (tableCell.getAttribute("paintColor") == 3) {
                    end = tableCell;
                    nodeList[nodeList.length] = tableCell;
                }
            }
        }
    }

    for (node of nodeList) {
        connections = getConnections(node);
        for (connection of connections) {
            if (!roadStartList.includes(connection)) {
                let roadArray = new Array();
                let node2;
                let currentCell = connection;
                let lastCell = node;
                if (nodeList.includes(currentCell)) {
                    edgeList[edgeList.length] = new Edge(node, currentCell, roadArray);
                    continue;
                }
                while (currentCell) {
                    roadArray[roadArray.length] = currentCell;
                    nextCell = findNextCell(currentCell, lastCell);
                    if (nodeList.includes(nextCell)) {
                        node2 = nextCell;
                        roadStartList[roadStartList.length] = currentCell;
                        break;
                    }
                    lastCell = currentCell;
                    currentCell = nextCell;
                }
                if (node2) {
                    edgeList[edgeList.length] = new Edge(node, node2, roadArray);
                }
            }
        }
    }
    
    if (start && end) {
        result = new Graph(nodeList, edgeList, start, end);
        removeList = new Array();
        for (i = 0; i < result.edges.length - 1; i++) {
            for (j = i + 1; j < result.edges.length; j++) {
                if ((result.edges[i].node1 == result.edges[j].node1 && result.edges[i].node2 == result.edges[j].node2) || (result.edges[i].node1 == result.edges[j].node2 && result.edges[i].node2 == result.edges[j].node1)) {
                    if (result.edges[i].cellsArray.length <= result.edges[j].cellsArray.length) {
                        if (!removeList.includes(j)) {
                            removeList[removeList.length] = j;
                        }
                    }
                    else {
                        if (!removeList.includes(i)) {
                            removeList[removeList.length] = i;
                        }
                    }
                }
            }
        }
        removeList.sort();
        for (i = 0; i < removeList.length; i++) {
            result.edges.splice(removeList[i], 1);
            for (j = i + 1; j < removeList.length; j++) {
                removeList[j] = removeList[j] - 1;
            }
        }
        document.getElementById("error").innerHTML = "";
        return result;
    }
    else {
        document.getElementById("error").innerHTML = "Please include a start and a finish.";
    }
}

function readGraph(graph) {
    let output = "";
    for (node of graph.nodes) {
        output = output + node.id;
    }
    console.log(output);
    for (edge of graph.edges) {
        output = "road: " + edge.node1.id + "-" + edge.node2.id + ", " + (+edge.cellsArray.length + 1);
        console.log(output);
    }
}