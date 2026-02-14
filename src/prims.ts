import type { Maze } from "./types";

export function prims(maze: Maze): Maze {
  // Get shuffled array of edges
  // For each edge, open the edge if adj rooms are not yet connected
  // Check room connection with Union-Find
  // After all edges are considerd you have a maze
  // Hand the maze off to the 'walk' function
  // The 'walk' function runs an algorithim from start to end room
  // We could then collect and replay the steps from these algorithims
  // Or re-run both
}
