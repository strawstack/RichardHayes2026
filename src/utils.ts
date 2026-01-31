import type { Point } from "./types";

function mag(a: Point) {
  return Math.sqrt(Math.pow(a.x, 2) + Math.pow(a.y, 2));
}

function sub(a: Point, b: Point) {
  return {
    x: a.x - b.x,
    y: a.y - b.y,
  };
}

function add(a: Point, b: Point) {
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
    .map(() => {
      return {
        x: Math.cos(angle),
        y: Math.sin(angle),
      };
    });
}

export function formatCircle(points: Point[], radius: number, center: Point) {
  return points.map((p) => add(mul(p, radius), center));
}

export function controlPointsForCircle(circlePoints: Point[]) {
  // Move last to first, so i-th control points align with i-th point
  const copyCirclePoints = { ...circlePoints };
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
    const bump = 40;
    const { c1, c2 } = getControlPoints(b, controlVector(n, m), bump);
    controlPoints.push({ c1, c2 });
  }
  return controlPoints;
}

export function renderCircle(
  ctx: CanvasRenderingContext2D,
  p: Point[],
  c: { c1: Point; c2: Point }[],
) {
  ctx.beginPath();
  ctx.strokeStyle = "#333";
  ctx.lineWidth = 2;
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
  ctx.stroke();
}
