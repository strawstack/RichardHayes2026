import { useRef } from "react";
import type { CircleData, Timestamp } from "../types";
import { Canvas } from "../components/Canvas";
import {
  controlPointsForCircle,
  formatCircle,
  getCirclePoints,
  renderCircle,
} from "../utils";

type Size = {
  width: number;
  height: number;
};

function circleData({ width, height }: Size, color: string): CircleData {
  const numPoints = 12;
  return {
    created: 0,
    basePoints: getCirclePoints(numPoints),
    radius: Array(numPoints)
      .fill(null)
      .map(() => {
        const baseSpeed = 0.0008;
        const baseRadius = 250;
        const vary = 0.18 * baseRadius;
        const offset = Math.random() * 2 * Math.PI;
        return (timestamp: Timestamp) =>
          baseRadius + vary * Math.sin(offset + timestamp * baseSpeed);
      }),
    center: {
      x: 400,
      y: 400,
    },
    color,
  };
}

export function Circles() {
  const circles = useRef<CircleData[]>([]);
  const draw = (ctx: CanvasRenderingContext2D, timestamp: Timestamp) => {
    for (let circle of circles.current) {
      const formattedPoints = formatCircle(circle, timestamp);
      renderCircle(
        ctx,
        formattedPoints,
        controlPointsForCircle(formattedPoints),
        circle.color,
      );
    }
  };

  return (
    <div className="relative min-h-screen bg-violet-700">
      <Canvas
        className="absolute inset-0 w-full h-full"
        onMount={(canvas: HTMLCanvasElement) => {
          const ctx = canvas.getContext("2d")!;
          const { width, height } = ctx.canvas;
          // circles.current = Array(2)
          //   .fill(null)
          //   .map(() => circleData({ width, height }));
          circles.current = [
            circleData({ width, height }, "#fde047"),
            circleData({ width, height }, "#c4b5fd"),
          ];
        }}
        draw={draw}
      ></Canvas>
    </div>
  );
}
