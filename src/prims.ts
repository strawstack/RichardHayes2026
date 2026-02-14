import type { Maze } from "./types";

function shuffleKeys(keys: string[]) {
  const cKeys = [...keys];
  const len = cKeys.length;
  for (let i = 0; i < len; i++) {
    const index = Math.floor(Math.random() * (len - i) + i);
    const temp = cKeys[i];
    cKeys[i] = cKeys[index];
    cKeys[index] = temp;
  }
  return cKeys;
}

export function prims(maze: Maze): Maze {
  const cMaze: Maze = { ...maze };
  const { rows, cols, nodes, edges } = cMaze;
  const edgeKeys = shuffleKeys(Object.keys(edges));

  for (let eid of edgeKeys) {
    let { from, to } = edges[eid];
    console.log(from, to);
  }

  // Get shuffled array of edges
  // For each edge, open the edge if adj rooms are not yet connected
  // Check room connection with Union-Find
  // After all edges are considerd you have a maze
  // Hand the maze off to the 'walk' function
  // The 'walk' function runs an algorithim from start to end room
  // We could then collect and replay the steps from these algorithims
  // Or re-run both

  return cMaze;
}
