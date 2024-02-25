import React, { Component } from "react";
import Node from "./Node/Node";
import { dijkstraAlgorithm } from "../algorithm/dijkstraAlgorithm";
const START_NODE_ROW = 10;
const START_NODE_COL = 15;
const FINISH_NODE_ROW = 10;
const FINISH_NODE_COL = 35;

class pathFindingVisualizer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      grid: [],
      mouseIsPressed: false,
    };
  }
  componentDidMount() {
    const grid = getInitialGrid();
    this.setState({
      grid,
    });
  }
  timeout(newGrid) {
    let p = new Promise((resolve) => {
      setTimeout(() => {
        this.setState({ grid: newGrid }, () => {
          resolve();
        });
      }, 1);
    });
    return p;
  }
  async timeoutset(newGrid) {
    await this.timeout(newGrid);
  }
  async animateDijkstra(visitedNodesInorder) {
    for (let i = 0; i < visitedNodesInorder.length; i++) {
      const node = visitedNodesInorder[i];
      const newGrid = this.state.grid.slice();
      const newNode = {
        ...node,
        isVisited: true,
        isVisitedNow: true,
      };
      newGrid[node.row][node.col] = newNode;
      await this.timeoutset(newGrid);
      //console.log(this.state.grid);
    }
  }
  visualizeDijkstra() {
    const { grid } = this.state;
    const startNode = grid[START_NODE_ROW][START_NODE_COL];
    const finsihNode = grid[FINISH_NODE_ROW][FINISH_NODE_COL];
    const visitedNodesInorder = dijkstraAlgorithm(grid, startNode, finsihNode);
    this.animateDijkstra(visitedNodesInorder);
    //console.log(visitedNodesInorder);
  }
  render() {
    const { grid, mouseIsPressed } = this.state;
    return (
      <>
        <button onClick={() => this.visualizeDijkstra()}>
          Visualize Dijkstra's Algorithm
        </button>
        <div className="grid">
          {grid.map((row, rowIdx) => {
            return (
              <div key={rowIdx}>
                {row.map((node, nodeIdx) => {
                  const { isStart, isFinish, isVisitedNow } = node;
                  return (
                    <Node
                      key={nodeIdx}
                      isStart={isStart}
                      isFinish={isFinish}
                      isVisitedNow={isVisitedNow}
                      // row={row}
                      // col={col}
                      // isWall={isWall}
                      // mouseIsPressed={mouseIsPressed}
                      // onMouseDown={(row, col) => this.handleMouseDown(row, col)}
                      // onMouseEnter={(row, col) =>
                      //   this.handleMouseEnter(row, col)
                      // }
                      // onMouseUp={() => this.handleMouseUp()}
                    ></Node>
                  );
                })}
              </div>
            );
          })}
        </div>
      </>
    );
  }
}
const getInitialGrid = () => {
  const grid = [];
  for (let row = 0; row < 20; row++) {
    const currentRow = [];
    for (let col = 0; col < 50; col++) {
      currentRow.push(createNode(row, col));
    }
    grid.push(currentRow);
  }
  return grid;
};
const createNode = (row, col) => {
  return {
    col,
    row,
    isStart: row === START_NODE_ROW && col === START_NODE_COL,
    isFinish: row === FINISH_NODE_ROW && col === FINISH_NODE_COL,
    distance: Infinity,
    isVisited: false,
    isWall: false,
    previousNode: null,
    isVisitedNow: false,
  };
};
const getNewGridWithWallToggled = (grid, row, col) => {
  const newGrid = grid.slice();
  const node = newGrid[row][col];
  const newNode = {
    ...node,
    isWall: !node.isWall,
  };
  newGrid[row][col] = newNode;
  return newGrid;
};
export default pathFindingVisualizer;




---------------------------------------------------------------------------------------------------------------------
import React, { Component } from "react";
import Node from "./Node/Node";
import { dijkstraAlgorithm } from "../algorithm/dijkstraAlgorithm";
const START_NODE_ROW = 10;
const START_NODE_COL = 15;
const FINISH_NODE_ROW = 10;
const FINISH_NODE_COL = 35;
class pathFindingVisualizer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      grid: [],
    };
  }
  componentDidMount() {
    const grid = getInitialGrid();
    this.setState({
      grid,
    });
  }
  async animateDijkstra(visitedNodesInorder) {
    for (let i = 0; i < visitedNodesInorder.length; i++) {
      const node = visitedNodesInorder[i];
      const newGrid = this.state.grid.slice();
      const newNode = {
        ...node,
        isVisited: true,
      };
      newGrid[node.row][node.col] = newNode;
      setTimeout(() => {
        this.setState({ grid: newGrid });
      }, 20 * i);
    }
  }
  visualizeDijkstra() {
    const { grid } = this.state;
    const startNode = grid[START_NODE_ROW][START_NODE_COL];
    const finsihNode = grid[FINISH_NODE_ROW][FINISH_NODE_COL];
    const visitedNodesInorder = dijkstraAlgorithm(grid, startNode, finsihNode);
    this.animateDijkstra(visitedNodesInorder);
  }
  render() {
    const { grid } = this.state;
    return (
      <>
        <button onClick={() => this.visualizeDijkstra()}>
          Visualize Dijkstra's Algorithm
        </button>
        <div className="grid">
          {grid.map((row, rowIdx) => {
            return (
              <div key={rowIdx}>
                {row.map((node, nodeIdx) => {
                  const { isStart, isFinish, isVisited } = node;
                  return (
                    <Node
                      key={nodeIdx}
                      isStart={isStart}
                      isFinish={isFinish}
                      isVisited={isVisited}
                    ></Node>
                  );
                })}
              </div>
            );
          })}
        </div>
      </>
    );
  }
}
const getInitialGrid = () => {
  const grid = [];
  for (let row = 0; row < 20; row++) {
    const currentRow = [];
    for (let col = 0; col < 50; col++) {
      currentRow.push(createNode(row, col));
    }
    grid.push(currentRow);
  }
  return grid;
};
const createNode = (row, col) => {
  return {
    col,
    row,
    isStart: row === START_NODE_ROW && col === START_NODE_COL,
    isFinish: row === FINISH_NODE_ROW && col === FINISH_NODE_COL,
    distance: Infinity,
    isVisited: false,
    isWall: false,
    previousNode: null,
  };
};
const getNewGridWithWallToggled = (grid, row, col) => {
  const newGrid = grid.slice();
  const node = newGrid[row][col];
  const newNode = {
    ...node,
    isWall: !node.isWall,
  };
  newGrid[row][col] = newNode;
  return newGrid;
};
export default pathFindingVisualizer;














-------------------------------------------------------------------------------
export function dijkstraAlgorithm(grid, startNode, finishNode) {
  const visitedNodesInOrder = [];
  startNode.distance = 0;
  const unvisitedNodes = getAllNodes(grid);
  //both grid and unvi.... poiniting to same memory location
  while (unvisitedNodes.length != 0) {
    sortNodesByDistance(unvisitedNodes);
    //.shift() removes the first element of array
    const closestNode = unvisitedNodes.shift();
    //console.log(`${closestNode.row} ${closestNode.col}`);
    closestNode.isVisited = true;
    visitedNodesInOrder.push(closestNode);
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
