import { useMemo, useState } from "react";
import { BackgroundCanvas } from "./backgroundCanvas";
import { getControlPointsForList } from "../utils";
import type { Point } from "../types";

function angleToPoint(radius: number, angle: number): [number, number] {
  return [radius * Math.cos(angle), radius * Math.sin(angle)];
}

type Circle = {
  cx: number;
  cy: number;
  radius: number;
  numPoints: number;
  varySize: number;
  varySpeed: number;
  angle: number;
  initAngle: number;
  duration: number; // remaining time to fade out
  angleValues: number[];
  varySpeeds: number[];
  render: (ctx: CanvasRenderingContext2D, delta: number | undefined) => void;
};

type Size = { height: number; width: number };

function circle({ height, width }: Size): Circle {
  const cx = Math.random() * width;
  const cy = Math.random() * height;
  const radius = Math.random() * 100 + 50;
  const numPoints = 6;
  const varySize = 30;
  const varySpeed = 0.01;
  const angle = (2 * Math.PI) / numPoints;
  const initAngle = Math.random() * angle;
  const angleValues = Array(numPoints)
    .fill(null)
    .map((_, i) => i * angle + initAngle);
  const vary = (amount: number) => Math.random() * 2 * amount - amount;
  let varyValues = Array(numPoints)
    .fill(null)
    .map(() => vary(varySize));
  let varySpeeds = Array(numPoints)
    .fill(null)
    .map(() => varySpeed);
  return {
    cx,
    cy,
    radius,
    numPoints,
    varySize,
    varySpeed,
    angle,
    initAngle,
    duration: 1000,
    angleValues,
    varySpeeds,
    render(ctx: CanvasRenderingContext2D, delta: number | undefined = 1) {
      const flipSpeeds = (speeds: number[]) =>
        speeds.map((s) => {
          const flip = Math.random() < 0.01;
          return flip ? -1 * s : s;
        });
      const clamp = (v: number) =>
        Math.max(Math.min(v, varySize), -1 * varySize);
      varySpeeds = flipSpeeds(varySpeeds);
      varyValues = varyValues.map((v, i) => clamp(v + varySpeeds[i] * delta));
      const points: Point[] = angleValues
        .map((v, i) => angleToPoint(radius + varyValues[i], v))
        .map(([x, y]) => {
          return { x: x + cx, y: y + cy };
        });
      ctx.beginPath();
      const controlPoints = getControlPointsForList(points);
      const z = points[points.length - 1];
      ctx.moveTo(z.x, z.y);
      points.forEach(({ x, y }, i) => {
        const { c2 } = controlPoints[(i + points.length - 1) % points.length]; // Same as `(i - 1) % len`
        const { c1 } = controlPoints[i];
        ctx.bezierCurveTo(c2.x, c2.y, c1.x, c1.y, x, y);
      });
      ctx.lineWidth = 3;
      ctx.stroke();
    },
  };
}

export function BackgroundDrops() {
  const [size, setSize] = useState<{ height: number; width: number } | null>(
    null,
  );

  const circles: Circle[] = useMemo(() => {
    if (size) {
      const numCircles = 16;
      return Array(numCircles)
        .fill(null)
        .map(() => circle(size));
    } else {
      return [];
    }
  }, [size]);

  return (
    <BackgroundCanvas
      isAnimated={false}
      onInit={(height, width) => {
        setSize({ height, width });
      }}
      draw={({ ctx, height, width, delta }) => {
        ctx.clearRect(0, 0, height, width);
        circles.forEach((circle) => circle.render(ctx, delta));
      }}
    ></BackgroundCanvas>
  );
}
