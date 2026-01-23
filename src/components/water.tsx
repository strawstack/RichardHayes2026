import { useMemo } from "react";

type Pair = [number, number];

const blueFill = [
  "fill-blue-200",
  "fill-blue-300",
  "fill-blue-400",
  "fill-blue-500",
  "fill-blue-600",
  "fill-blue-700",
  "fill-blue-800",
  "fill-blue-900",
];

function Triangle({ path }: { path: Pair[] }) {
  const rand = useMemo(() => Math.floor(Math.random() * 8), []);
  const pulse = rand < 4 ? "animate-pulse" : "";
  return (
    <path
      className={`${blueFill[rand]} ${pulse}`}
      d={`M ${path[0].join(" ")} L ${path[1].join(" ")} L ${path[2].join(" ")} Z`}
    />
  );
}

function triPath({ x, y }: { x: number; y: number }, upward: boolean): Pair[] {
  if (upward) {
    const a: Pair = [0 + x, 0 + y];
    const b: Pair = [-10 + x, -20 + y];
    const c: Pair = [10 + x, -20 + y];
    return [a, b, c];
  } else {
    const a: Pair = [0 + x, 0 + y];
    const b: Pair = [10 + x, 20 + y];
    const c: Pair = [-10 + x, 20 + y];
    return [a, b, c];
  }
}

export function Water() {
  const ROWS = 8;
  const COLS = 29;
  const SPACE = 20;

  const points = [];
  const triangles = [];
  for (let y = 0; y < ROWS; y++) {
    for (let x = 0; x < COLS; x++) {
      const evenRow = y % 2 === 0;
      const d = evenRow ? 0 : SPACE / 2;
      const p = {
        x: x * SPACE + d,
        y: y * SPACE,
      };
      triangles.push(<Triangle path={triPath(p, true)} />);
      triangles.push(<Triangle path={triPath(p, false)} />);
    }
  }

  return (
    <svg
      className="w-full h-full"
      xmlns="http://www.w3.org/2000/svg"
      shapeRendering="crispEdges"
    >
      {triangles}
    </svg>
  );
}
