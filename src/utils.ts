import { couldStartTrivia } from "typescript";
import type {
  CircleData,
  ControlPoints,
  DrawPath,
  Point,
  Timestamp,
  Variation,
} from "./types";

function mag(a: Point) {
  return Math.sqrt(Math.pow(a.x, 2) + Math.pow(a.y, 2));
}

export function sub(a: Point, b: Point) {
  return {
    x: a.x - b.x,
    y: a.y - b.y,
  };
}

export function add(a: Point, b: Point) {
  return {
    x: a.x + b.x,
    y: a.y + b.y,
  };
}

function mul(a: Point, n: number) {
  return {
    x: a.x * n,
    y: a.y * n,
  };
}

function dot(a: Point, b: Point) {
  return a.x * b.x + a.y * b.y;
}

function cross(a: Point, b: Point) {
  return a.x * b.y - a.y * b.x;
}

function d2r(deg: number) {
  return (deg / 180) * Math.PI;
}

function r2d(rad: number) {
  return (rad / Math.PI) * 180;
}

function norm(a: Point) {
  const m = mag(a);
  return {
    x: a.x / m,
    y: a.y / m,
  };
}

function dist(a: Point, b: Point) {
  return Math.sqrt(Math.pow(a.x - b.x, 2) + Math.pow(a.y - b.y, 2));
}

function angleBetween(a: Point, b: Point) {
  return Math.acos(dot(a, b) / (mag(a) * mag(b)));
}

function controlVector(a: Point, b: Point) {
  const angle = Math.acos(dot(a, b) / (mag(a) * mag(b)));
  const half = angle / 2;
  const cross = a.x * b.y - a.y * b.x > 0;
  const controlAngle = Math.atan2(b.y, b.x) + (cross ? -1 * half : half);
  return {
    x: Math.cos(controlAngle),
    y: Math.sin(controlAngle),
  };
}

function getControlPoints(a: Point, controlVector: Point, bump: number) {
  const c1 = sub(a, mul(controlVector, bump));
  const c2 = add(a, mul(controlVector, bump));
  return {
    c1,
    c2,
  };
}

export function getCirclePoints(n: number) {
  const angle = (2 * Math.PI) / n;
  return Array(n)
    .fill(null)
    .map((_, i) => i * angle)
    .map((_, i) => {
      return {
        x: Math.cos(i * angle),
        y: Math.sin(i * angle),
      };
    });
}

export function formatCircle(
  { basePoints, radius, center, created }: CircleData,
  timestamp: Timestamp,
): Point[] {
  const delta = timestamp - created;
  return basePoints.map((p, i) => add(mul(p, radius[i](delta)), center));
}

export function controlPointsForCircle(circlePoints: Point[]): ControlPoints {
  const copyCirclePoints = [...circlePoints];

  // Move last to first, so i-th control points align with i-th point
  const last = copyCirclePoints.pop()!;
  copyCirclePoints.unshift(last);

  const length = copyCirclePoints.length;
  const controlPoints = [];
  for (let i = 0; i < length; i++) {
    const a = copyCirclePoints[i];
    const b = copyCirclePoints[(i + 1) % length];
    const c = copyCirclePoints[(i + 2) % length];
    const n = sub(b, a);
    const m = sub(c, b);
    const bump = 0.25 * dist(a, b);
    const { c1, c2 } = getControlPoints(b, controlVector(n, m), bump);
    controlPoints.push({ c1, c2 });
  }
  return controlPoints;
}

export function renderCircle(
  ctx: CanvasRenderingContext2D,
  p: Point[],
  c: ControlPoints,
  color: string,
  operation?: GlobalCompositeOperation,
  lineWidth?: number,
  drawPath?: DrawPath,
) {
  if (operation) ctx.globalCompositeOperation = operation;
  ctx.strokeStyle = color;
  ctx.fillStyle = color;
  ctx.lineWidth = lineWidth || 16;
  ctx.beginPath();
  ctx.moveTo(p[0].x, p[0].y);
  const len = p.length;
  for (let i = 0; i < len; i++) {
    const i1 = (i + 1) % len;
    ctx.bezierCurveTo(
      c[i].c2.x,
      c[i].c2.y,
      c[i1].c1.x,
      c[i1].c1.y,
      p[i1].x,
      p[i1].y,
    );
  }
  drawPath === "fill" || !drawPath ? ctx.fill() : ctx.stroke();
  ctx.globalCompositeOperation = "source-over"; // default
}
