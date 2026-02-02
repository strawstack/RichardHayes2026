import { useRef } from "react";
import type { CircleData, DrawPath, Point, Timestamp } from "../types";
import { Canvas } from "../components/Canvas";
import {
  add,
  controlPointsForCircle,
  formatCircle,
  getCirclePoints,
  renderCircle,
} from "../utils";

type Size = {
  width: number;
  height: number;
};

type circleDataArgs = {
  size: Size;
  baseRadius: number;
  center: Point;
  color: string;
  operation?: GlobalCompositeOperation;
  drawPath?: DrawPath;
};

function circleData({
  size: { width, height },
  baseRadius,
  center,
  color,
  operation,
  drawPath,
}: circleDataArgs): CircleData {
  const numPoints = 12;
  return {
    created: 0,
    basePoints: getCirclePoints(numPoints),
    radius: Array(numPoints)
      .fill(null)
      .map(() => {
        const baseSpeed = 0.0008;

        const vary = 0.18 * baseRadius;
        const offset = Math.random() * 2 * Math.PI;
        return (timestamp: Timestamp) =>
          baseRadius + vary * Math.sin(offset + timestamp * baseSpeed);
      }),
    center,
    color,
    operation,
    drawPath,
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
        circle.operation,
        circle.drawPath,
      );
    }
  };

  return (
    <div className="relative min-h-screen h-400 bg-amber-100">
      <Canvas
        className="absolute inset-0 w-full h-full"
        onMount={(canvas: HTMLCanvasElement) => {
          const ctx = canvas.getContext("2d")!;
          const { width, height } = ctx.canvas;
          const eggPattern = (center: Point) => {
            return [
              circleData({
                size: { width, height },
                baseRadius: 400,
                center,
                color: "white",
              }),
              circleData({
                size: { width, height },
                baseRadius: 400 / 3,
                center,
                color: "#fdba74",
              }),
            ];
          };
          const xorPattern = (center: Point) => {
            const baseRadius = 300;
            return [
              circleData({
                size: { width, height },
                baseRadius,
                center,
                color: "#c4b5fd",
              }),
              circleData({
                size: { width, height },
                baseRadius,
                center: add(center, { x: -baseRadius, y: -baseRadius }),
                color: "#86efac",
                operation: "xor",
              }),
            ];
          };
          const slatePattern = (center: Point) => {
            const baseRadius = 250;
            return [
              circleData({
                size: { width, height },
                baseRadius,
                center,
                color: "#475569",
                drawPath: "stroke",
              }),
              circleData({
                size: { width, height },
                baseRadius: baseRadius - 20,
                center,
                color: "#f43f5e",
                drawPath: "stroke",
              }),
              circleData({
                size: { width, height },
                baseRadius: baseRadius - 20,
                center,
                color: "#475569",
                drawPath: "stroke",
              }),
            ];
          };
          circles.current = [
            eggPattern({ x: 0, y: 0 }),
            xorPattern({ x: width - 250, y: 4 * 250 }),
            slatePattern({ x: 0, y: 6 * 250 }),
          ].flat();
        }}
        draw={draw}
      ></Canvas>
    </div>
  );
}
