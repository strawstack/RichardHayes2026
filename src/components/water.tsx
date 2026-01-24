import { useCallback, useEffect, useMemo, useState } from "react";

type Pair = [number, number];

const colorFill = ["fill-emerald-200", "fill-emerald-300", "fill-emerald-400"];

function Triangle({ path }: { path: Pair[] }) {
  const rand = useMemo(() => Math.floor(Math.random() * colorFill.length), []);
  const flip = useMemo(() => Math.random() < 0.6, []);
  const pulse = flip ? "animate-pulse" : "";
  return (
    <path
      className={`${colorFill[rand]} ${pulse}`}
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
  const ROWS = 12;
  const COLS = 29;
  const SPACE = 20;

  const [offsetY, setOffsetY] = useState(0);

  const triangles = [];
  for (let y = 0; y < ROWS; y++) {
    for (let x = 0; x < COLS; x++) {
      const evenRow = y % 2 === 0;
      const d = evenRow ? 0 : SPACE / 2;
      const p = {
        x: x * SPACE + d,
        y: y * SPACE,
      };
      triangles.push(
        <Triangle key={`${y}:${x}:${0}`} path={triPath(p, true)} />,
      );
      triangles.push(
        <Triangle key={`${y}:${x}:${1}`} path={triPath(p, false)} />,
      );
    }
  }

  function handleScroll() {
    setOffsetY(window.scrollY / 12);
  }

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <svg
      className="w-full h-full"
      xmlns="http://www.w3.org/2000/svg"
      shapeRendering="crispEdges"
    >
      <g transform={`translate(0 ${-1 * offsetY})`}>{triangles}</g>
    </svg>
  );
}
