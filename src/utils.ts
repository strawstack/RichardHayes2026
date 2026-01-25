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
  // TODO(richard): The issue is when I calculate the two control points
  // I don't know which is c1 and which c2
  // The reason is because when I calculate the tangent I don;'t know which way
  // it will be facing clock-wise or counter-clockwise with respect to the center
  // of the circle so to speak.
  // A solution could be to better track the relative angles between v1 and v2
  // rather than use min and max as this loses info about which one is which

  const v1 = sub(before, point);
  const v2 = sub(after, point);
  const atan2_v1 = atan2_pos(Math.atan2(v1.y, v1.x));
  const atan2_v2 = atan2_pos(Math.atan2(v2.y, v2.x));
  const small = Math.min(atan2_v1, atan2_v2);
  const big = Math.max(atan2_v1, atan2_v2);
  const perp_angle = (big - small) / 2 + small + Math.PI / 2;
  const v3 = {
    x: Math.cos(perp_angle),
    y: Math.sin(perp_angle),
  };
  const bendValue = 30;
  const pv = mul(norm(v3), bendValue);
  const c1 = sub(point, pv);
  const c2 = add(pv, point);
  return { c1, c2 };
}

function arrToPoints(pointArr: [number, number]): Point {
  return {
    x: pointArr[0],
    y: pointArr[1],
  };
}

export function getControlPointsForList(points: [number, number][]) {
  const controlPoints = [];
  for (let i = 0; i < points.length; i++) {
    const before = i === 0 ? points[points.length - 1] : points[i - 1];
    const point = points[i];
    const after = i == points.length - 1 ? points[0] : points[i + 1];
    controlPoints.push(
      getControlPoints(
        arrToPoints(before),
        arrToPoints(point),
        arrToPoints(after),
      ),
    );
  }
  return controlPoints;
}
