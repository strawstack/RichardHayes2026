import { useEffect, useMemo, useRef, useState, type RefObject } from "react";

type Point = { x: number; y: number };
type Size = { width: number; height: number };
type nid = string;
type eid = string;

enum Kind {
  Node = "Node",
  Edge = "Edge",
}

type Node = {
  id: nid;
  pos: Point;
  size: Size;
  kind: Kind;
  edges?: {
    top: eid | undefined;
    right: eid | undefined;
    down: eid | undefined;
    left: eid | undefined;
  };
};

type Edge = {
  id: eid;
  pos: Point;
  size: Size;
  kind: Kind;
  from?: nid;
  to?: nid;
};

type Maze = {
  nodes: { [key: nid]: Node };
  edges: { [key: eid]: Edge };
};

const even = (r: number) => r % 2 === 0;

function getSize(y: number, x: number, big: number, small: number): Size {
  if (even(y) && even(x)) {
    return { width: big, height: big };
  } else if (even(y) && !even(x)) {
    return { width: small, height: big };
  } else if (!even(y) && even(x)) {
    return { width: big, height: small };
  } else {
    // (!even(y) && !even(x))
    return { width: small, height: small };
  }
}

function getTopLeft(y: number, x: number, big: number, small: number): Size {
  return {
    width: even(x)
      ? (x / 2) * (big + small)
      : ((x - 1) / 2) * (big + small) + big,
    height: even(y)
      ? (y / 2) * (big + small)
      : ((y - 1) / 2) * (big + small) + big,
  };
}

function generateMaze({
  width,
  height,
}: {
  width: number;
  height: number;
}): Maze {
  // The size of a Node or Room
  const NODE_SIZE = 12;

  // The width/height of the smaller dimension of a door
  const EDGE_SIZE = 6;

  const MIN_PAD = 4;
  // Min pad + space for outer wall
  const PAD = MIN_PAD + EDGE_SIZE;

  // Size of actual space maze has to take up
  const mazeWidth = width - 2 * PAD;
  const mazeHeight = height - 2 * PAD;

  // The smallest possible maze size (2 nodes with one edge between them)
  const minSize = 2 * NODE_SIZE + EDGE_SIZE;

  // Calculating number of nodes and edges that can fit
  // starting from minSize
  const pCols = Math.floor((mazeWidth - minSize) / (NODE_SIZE + EDGE_SIZE));
  const pRows = Math.floor((mazeHeight - minSize) / (NODE_SIZE + EDGE_SIZE));

  // The real padding value including space left over after rooms are added
  const PAD_X =
    (mazeWidth - pCols * (NODE_SIZE + EDGE_SIZE) - minSize) / 2 + PAD;
  const PAD_Y =
    (mazeHeight - pRows * (NODE_SIZE + EDGE_SIZE) - minSize) / 2 + PAD;

  // Nodes and edges count as rows
  const COLS = 2 * pCols + 3; // 3 = 2 nodes and 1 edge contained in minSize
  const ROWS = 2 * pRows + 3;

  const graph: Node[] = Array(ROWS)
    .fill(null)
    .map((_, y) =>
      Array(COLS)
        .fill(null)
        .map((_, x) => {
          const { width: CELL_W, height: CELL_H } = getSize(
            y,
            x,
            NODE_SIZE,
            EDGE_SIZE,
          );

          const { width: left, height: top } = getTopLeft(
            y,
            x,
            NODE_SIZE,
            EDGE_SIZE,
          );

          return {
            id: `${y}:${x}` as nid,
            kind: even(y) && even(x) ? Kind.Node : Kind.Edge,
            pos: {
              x: PAD_X + left,
              y: PAD_Y + top,
            } as Point,
            size: {
              width: CELL_W,
              height: CELL_H,
            },
            edges: {
              top: undefined,
              right: undefined,
              down: undefined,
              left: undefined,
            },
          };
        }),
    )
    .flat();
  return {
    nodes: graph
      .filter((n) => n.kind === Kind.Node)
      .reduce(
        (a, c) => {
          a[c.id] = c;
          return a;
        },
        {} as { [key: nid]: Node },
      ),
    edges: graph
      .filter((n) => n.kind === Kind.Edge)
      .reduce(
        (a, c) => {
          a[c.id] = c;
          return a;
        },
        {} as { [key: nid]: Node },
      ),
  };
}

const first = (id: number) => id === 0;

export function Maze({ id }: { id: number }) {
  const svgRef = useRef<SVGSVGElement>(null);
  const [maze, setMaze] = useState<Maze | null>(null);
  useEffect(() => {
    if (svgRef.current) {
      const { width, height } = svgRef.current.getBoundingClientRect();
      setMaze(generateMaze({ width, height }));
    }
  }, []);

  const nodes = maze ? (
    Object.values(maze.nodes).map(({ id, pos, size }, i) => {
      return (
        <rect
          key={i}
          x={pos.x}
          y={pos.y}
          width={size.width}
          height={size.height}
          fill="salmon"
        />
      );
    })
  ) : (
    <></>
  );

  const edges = maze ? (
    Object.values(maze.edges).map(({ id, pos, size }, i) => {
      return (
        <rect
          key={i}
          x={pos.x}
          y={pos.y}
          width={size.width}
          height={size.height}
          fill="lightsalmon"
        />
      );
    })
  ) : (
    <></>
  );

  return (
    <svg className="h-full w-full bg-teal-300" ref={svgRef}>
      {edges}
      {nodes}
    </svg>
  );
}
