import { useRef } from "react";
import type { Circle } from "../types";
import { Canvas } from "./Canvas";

function newCircle(ctx: CanvasRenderingContext2D): Circle {
  const pos: {
    x: 100;
    y: 100;
  };
  const radius = 40;
  const numPoints = 12;
  const color = "#333";
  const render = (timestamp: number) => {
    console.log(timestamp);
  };

  return {};
}

export function CircleBackground() {
  const circles = useRef<Circle[]>([]);

  circles.current = [];

  const draw = (ctx: CanvasRenderingContext2D, timestamp: number) => {
    const { width, height } = ctx.canvas;
    for (let circle of circles.current) {
      circle.render(timestamp);
    }
  };

  return (
    <Canvas
      className="absolute inset-0 w-full h-full"
      onMount={(canvasRef: HTMLCanvasElement) =>
        (circles.current = Array(10)
          .fill(null)
          .map(() => newCircle(ctx)))
      }
      draw={draw}
    ></Canvas>
  );
}
