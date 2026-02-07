import { useRef } from "react";
import type { CircleData, DrawPath, Point, Timestamp } from "../types";
import { Canvas } from "./Canvas";
import {
  add,
  controlPointsForCircle,
  formatCircle,
  getCirclePoints,
  renderCircle,
  sub,
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
  lineWidth?: number;
  drawPath?: DrawPath;
};

function circleData({
  size: { width, height },
  baseRadius,
  center,
  color,
  operation,
  lineWidth,
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
    lineWidth,
    drawPath,
  };
}

export function BackgroundBlobView() {
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
        circle.lineWidth,
        circle.drawPath,
      );
    }
  };

  return (
    <Canvas
      className="absolute inset-0 w-full h-full bg-teal-800/20"
      onMount={(canvas: HTMLCanvasElement) => {
        const ctx = canvas.getContext("2d")!;
        const { width, height } = ctx.canvas;
        const eggPattern = (center: Point) => {
          const baseRadius = 82;
          return [
            circleData({
              size: { width, height },
              baseRadius: baseRadius,
              center,
              color: "#2dd4bf",
            }),
            circleData({
              size: { width, height },
              baseRadius: baseRadius / 3,
              center,
              color: "#115e59",
            }),
          ];
        };
        const xorPattern = (center: Point) => {
          const baseRadius = 64;
          return [
            circleData({
              size: { width, height },
              baseRadius,
              center,
              color: "#115e59",
            }),
            circleData({
              size: { width, height },
              baseRadius: baseRadius * 0.8,
              center: add(center, { x: -40, y: 0 }),
              color: "#2dd4bf",
              operation: "xor",
              lineWidth: 4,
              drawPath: "stroke",
            }),
          ];
        };
        const slatePattern = (center: Point) => {
          const baseRadius = 64;
          const lineWidth = 4;
          return [
            circleData({
              size: { width, height },
              baseRadius,
              center,
              color: "#115e59",
              lineWidth,
              drawPath: "stroke",
            }),
            circleData({
              size: { width, height },
              baseRadius: baseRadius,
              center,
              color: "#2dd4bf",
              lineWidth,
              drawPath: "stroke",
            }),
            circleData({
              size: { width, height },
              baseRadius: baseRadius,
              center,
              color: "#115e59",
              lineWidth,
              drawPath: "stroke",
            }),
          ];
        };
        const baseRadius = 64;
        const pad = 20;
        circles.current = [
          eggPattern({ x: 64, y: height / 2 }),
          slatePattern({ x: width / 2, y: height / 2 }),
          xorPattern({ x: width - 64, y: height / 2 }),
        ].flat();
      }}
      draw={draw}
    ></Canvas>
  );
}
