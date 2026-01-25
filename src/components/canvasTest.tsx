import { useState } from "react";
import { BackgroundCanvas } from "./backgroundCanvas";
import { getControlPoints } from "../utils";

type Point = {
  x: number;
  y: number;
};

function i(p: Point): [number, number] {
  return [p.x, p.y];
}

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
    y: a.y + n,
  };
}

function dot(a: Point, b: Point) {
  return a.x * b.x + a.y * b.y;
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

function controlPoints(before: Point, point: Point, after: Point) {
  const v1 = sub(point, before);
  const v2 = sub(after, point);
  const m1 = mag(v1);
  const m2 = mag(v2);
  const angle = Math.acos(dot(v1, v2) / (m1 * m2));
  const perp_angle = Math.atan2(v2.y, v2.x) + angle / 2 + Math.PI / 2;
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

function drawSmallPoint(ctx: CanvasRenderingContext2D) {
  return (point: Point) => {
    ctx.save();
    ctx.fillStyle = "green";
    ctx.beginPath();
    ctx.arc(point.x, point.y, 4, 0, 2 * Math.PI);
    ctx.fill();
    ctx.restore();
  };
}

function drawPoint(ctx: CanvasRenderingContext2D) {
  return (point: Point) => {
    ctx.save();
    ctx.fillStyle = "#333";
    ctx.beginPath();
    ctx.arc(point.x, point.y, 8, 0, 2 * Math.PI);
    ctx.fill();
    ctx.restore();
  };
}

export function CanvasTest() {
  const [size, setSize] = useState<{ height: number; width: number } | null>(
    null,
  );
  return (
    <BackgroundCanvas
      onInit={(height, width) => {
        setSize({ height, width });
      }}
      draw={({ ctx }) => {
        const small = drawSmallPoint(ctx);
        const point = drawPoint(ctx);

        const z: Point = { x: 10, y: 10 };
        const a: Point = { x: 100, y: 100 };
        const b: Point = { x: 200, y: 100 };
        const c: Point = { x: 200, y: 200 };
        const d: Point = { x: 300, y: 250 };

        // const v1 = sub(b, a);
        // const v2 = sub(c, b);

        // const angle = Math.acos(dot(v1, v2) / (mag(v1) * mag(v2)));
        // const half = angle / 2;

        // const atan_v1 = r2d(Math.atan2(v1.y, v1.x));
        // const atan_v2 = r2d(Math.atan2(v2.y, v2.x));

        // const halfway_angle = atan_v2 + half;
        // const perp_angle = atan_v2 + half + Math.PI;

        // const v3 = {
        //   // Vector halfway between v1 and v2 (unit vector)
        //   x: Math.cos(halfway_angle),
        //   y: Math.sin(halfway_angle),
        // };

        // const v3p = {
        //   // Vector halfway between v1 and v2 (unit vector)
        //   x: Math.cos(perp_angle),
        //   y: Math.sin(perp_angle),
        // };

        point(z);
        point(a);
        point(b);
        // point(c);
        // point(d);

        const drawCtrl = ({ c1, c2 }: { c1: Point; c2: Point }) => {
          small(c1);
          small(c2);
        };

        const aa = getControlPoints(z, a, b);
        // const bb = getControlPoints(a, b, c);
        // const cc = getControlPoints(b, c, d);

        drawCtrl(aa);
        // drawCtrl(bb);
        // drawCtrl(cc);

        ctx.beginPath();
        ctx.moveTo(z.x, z.y);
        ctx.bezierCurveTo(z.x, z.y, aa.c1.x, aa.c1.y, a.x, a.y);
        // ctx.bezierCurveTo(c2.x, c2.y, c.x, c.y, c.x, c.y);
        ctx.stroke();
      }}
    ></BackgroundCanvas>
  );
}
