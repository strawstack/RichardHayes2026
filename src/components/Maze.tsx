import { useEffect, useRef, useState } from "react";
import { prims } from "../prims";
import {
  Kind,
  type Maze,
  type Nid,
  type Point,
  type Node,
  type Size,
  type Edge,
} from "../types";

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

  const inBounds = ({ x, y }: Point): Point | undefined => {
    return y >= 0 && y < ROWS && x >= 0 && x < COLS ? { x, y } : undefined;
  };

  const nodeKeyOrUndef = (p: Point | undefined) => {
    return p ? nodeKey(p) : undefined;
  };

  const nodeKey = (p: Point) => {
    return `${p.x}:${p.y}`;
  };

  type Rooms = { first: Nid; second: Nid };
  function getAdjRooms(kind: Kind, { x, y }: Point): Rooms | undefined {
    if (kind !== Kind.Edge) return undefined;
    if (even(y)) {
      return {
        first: nodeKey({ x: x - 1, y: y }),
        second: nodeKey({ x: x + 1, y: y }),
      };
    } else {
      return {
        first: nodeKey({ x: x, y: y - 1 }),
        second: nodeKey({ x: x, y: y + 1 }),
      };
    }
  }

  const graph: (Node | Edge)[] = Array(ROWS)
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

          const kind = even(y) && even(x) ? Kind.Node : Kind.Edge;
          const roomsForEdge = getAdjRooms(kind, { x, y });

          return {
            id: `${y}:${x}` as Nid,
            kind,
            pos: {
              x: PAD_X + left,
              y: PAD_Y + top,
            } as Point,
            size: {
              width: CELL_W,
              height: CELL_H,
            },
            edges: {
              top: nodeKeyOrUndef(inBounds({ x: x, y: y - 1 })),
              right: nodeKeyOrUndef(inBounds({ x: x + 1, y: y })),
              down: nodeKeyOrUndef(inBounds({ x: x, y: y + 1 })),
              left: nodeKeyOrUndef(inBounds({ x: x - 1, y: y })),
            },
            from: roomsForEdge?.first,
            to: roomsForEdge?.second,
          };
        }),
    )
    .flat();
  return {
    rows: ROWS,
    cols: COLS,
    nodes: graph
      .filter((n) => n.kind === Kind.Node)
      .reduce(
        (a, c) => {
          a[c.id] = c;
          return a;
        },
        {} as { [key: Nid]: Node },
      ),
    edges: graph
      .filter((n) => n.kind === Kind.Edge)
      .reduce(
        (a, c) => {
          a[c.id] = c;
          return a;
        },
        {} as { [key: Nid]: Node },
      ),
  };
}

export function Maze({ id }: { id: number }) {
  const svgRef = useRef<SVGSVGElement>(null);
  const [maze, setMaze] = useState<Maze | null>(null);
  const nodeRef = useRef<{ [key: string]: SVGRectElement | null }>({});

  useEffect(() => {
    if (svgRef.current) {
      const { width, height } = svgRef.current.getBoundingClientRect();
      const m = generateMaze({ width, height });
      setMaze(m);
    }
  }, []);

  function onClick() {
    if (maze) setMaze(prims(maze));
  }

  useEffect(() => {
    if (id === 0) window.addEventListener("click", onClick);
    return () => {
      if (id === 0) {
        window.removeEventListener("click", onClick);
      }
    };
  }, [maze]);

  const nodes = maze ? (
    Object.values(maze.nodes).map(({ id, pos, size }, i) => {
      return (
        <rect
          key={i}
          ref={(e) => {
            nodeRef.current[id] = e;
          }}
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
          ref={(e) => {
            nodeRef.current[id] = e;
          }}
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
