export function dijkstraAlgorithm(grid, startNode, finishNode) {
  const visitedNodesInOrder = [];
  startNode.distance = 0;
  const unvisitedNodes = getAllNodes(grid);
  //both grid and unvi.... poiniting to same memory location
  while (unvisitedNodes.length != 0) {
    sortNodesByDistance(unvisitedNodes);
    const closestNode = unvisitedNodes.shift();
    if (closestNode.isWall) continue;
    if (closestNode.distance === Infinity) return visitedNodesInOrder;
    closestNode.isVisited = true;
    visitedNodesInOrder.push(closestNode);
    //console.log(visitedNodesInOrder);
    if (closestNode === finishNode) return visitedNodesInOrder;
    updateUnvisitedNeighbours(closestNode, grid);
  }
}
function sortNodesByDistance(unvisitedNodes) {
  unvisitedNodes.sort((nodeA, nodeB) => nodeA.distance - nodeB.distance);
}
function updateUnvisitedNeighbours(node, grid) {
  const univistedneighbors = getUnvisitedNeighbors(node, grid);
  for (let i = 0; i < univistedneighbors.length; i++) {
    univistedneighbors[i].distance = node.distance + 1;
    univistedneighbors[i].previousNode = node;
  }
}
function getUnvisitedNeighbors(node, grid) {
  const neighbors = [];
  const { col, row } = node;
  if (row > 0) neighbors.push(grid[row - 1][col]);
  if (row < grid.length - 1) neighbors.push(grid[row + 1][col]);
  if (col > 0) neighbors.push(grid[row][col - 1]);
  if (col < grid[0].length - 1) neighbors.push(grid[row][col + 1]);
  return neighbors.filter((neighbor) => !neighbor.isVisited);
}
function getAllNodes(grid) {
  const nodes = [];
  for (let i = 0; i < grid.length; i++) {
    const row = grid[i];
    for (let j = 0; j < row.length; j++) {
      const node = row[j];
      nodes.push(node);
    }
  }
  return nodes;
}
export function getNodesInShortestPathOrder(finishNode) {
  const NodesInShortestPathOrder = [];
  let currentNode = finishNode;
  while (currentNode !== null) {
    NodesInShortestPathOrder.unshift(currentNode);
    currentNode = currentNode.previousNode;
  }
  console.log(NodesInShortestPathOrder);
  return NodesInShortestPathOrder;
}
