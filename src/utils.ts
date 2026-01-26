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

function atan2_pos(value: number) {
  return value < 0 ? 2 * Math.PI + value : value;
}

export function getControlPoints(before: Point, point: Point, after: Point) {
  const v1 = sub(point, before);
  const v2 = sub(after, point);
  const atan2_v1 = atan2_pos(Math.atan2(v1.y, v1.x));
  const atan2_v2 = atan2_pos(Math.atan2(v2.y, v2.x));
  const half_diff = Math.abs(atan2_v1 - atan2_v2) / 2;
  let tangent = atan2_v1 + (atan2_v1 < atan2_v2 ? half_diff : -1 * half_diff);

  // Special case passing zero
  if (atan2_v1 > atan2_v2) tangent += Math.PI;

  const bend = 30;
  const pv = mul(
    norm({
      x: Math.cos(tangent),
      y: Math.sin(tangent),
    }),
    bend,
  );
  const c1 = sub(point, pv);
  const c2 = add(pv, point);
  return { c1, c2 };
}

export function getControlPointsForList(points: Point[]) {
  const controlPoints = [];
  for (let i = 0; i < points.length; i++) {
    const before = i === 0 ? points[points.length - 1] : points[i - 1];
    const point = points[i];
    const after = i === points.length - 1 ? points[0] : points[i + 1];
    controlPoints.push(getControlPoints(before, point, after));
  }
  return controlPoints;
}

export function drawPoint(
  ctx: CanvasRenderingContext2D,
  color: string = "#333",
  size: number = 6,
) {
  return (point: Point) => {
    ctx.save();
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(point.x, point.y, 8, 0, 2 * Math.PI);
    ctx.fill();
    ctx.restore();
  };
}
