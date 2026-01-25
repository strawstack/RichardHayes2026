import { useState } from "react";
import { BackgroundCanvas } from "./backgroundCanvas";

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
        const a: Point = { x: 100, y: 100 };
        const b: Point = { x: 200, y: 100 };
        const c: Point = { x: 200, y: 200 };

        const v1 = sub(b, a);
        const v2 = sub(c, b);

        const angle = Math.acos(dot(v1, v2) / (mag(v1) * mag(v2)));

        const half = angle / 2;

        console.log(`half: ${r2d(half)}`);

        const atan_v1 = r2d(Math.atan2(v1.y, v1.x));
        const atan_v2 = r2d(Math.atan2(v2.y, v2.x));
        console.log(`atan2(v1): ${atan_v1}`);
        console.log(`atan2(v2): ${atan_v2}`);

        const halfway_angle = atan_v2 + half;
        const perp_angle = atan_v2 + half + Math.PI;

        const v3 = {
          // Vector halfway between v1 and v2 (unit vector)
          x: Math.cos(halfway_angle),
          y: Math.sin(halfway_angle),
        };

        const v3p = {
          // Vector halfway between v1 and v2 (unit vector)
          x: Math.cos(perp_angle),
          y: Math.sin(perp_angle),
        };

        const v3m = add(mul(norm(v3), mag(v1)), b);
        ctx.save();
        ctx.fillStyle = "blue";
        ctx.beginPath();
        ctx.arc(v3m.x, v3m.y, 6, 0, 2 * Math.PI);
        ctx.fill();
        ctx.restore();

        const v3mp = add(mul(norm(v3p), mag(v1)), b);
        ctx.save();
        ctx.fillStyle = "green";
        ctx.beginPath();
        ctx.arc(v3mp.x, v3mp.y, 6, 0, 2 * Math.PI);
        ctx.fill();
        ctx.restore();

        ctx.beginPath();
        ctx.arc(a.x, a.y, 6, 0, 2 * Math.PI);
        ctx.fill();

        ctx.beginPath();
        ctx.arc(b.x, b.y, 6, 0, 2 * Math.PI);
        ctx.fill();

        ctx.beginPath();
        ctx.arc(c.x, c.y, 6, 0, 2 * Math.PI);
        ctx.fill();

        const p = mul(norm(v3p), 30);
        const c1 = sub(b, p);
        const c2 = add(p, b);

        ctx.beginPath();
        ctx.arc(c1.x, c1.y, 6, 0, 2 * Math.PI);
        ctx.fill();

        ctx.beginPath();
        ctx.arc(c2.x, c2.y, 6, 0, 2 * Math.PI);
        ctx.fill();

        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.bezierCurveTo(a.x, a.y, c1.x, c1.y, b.x, b.y);
        ctx.bezierCurveTo(c2.x, c2.y, c.x, c.y, c.x, c.y);
        ctx.stroke();
      }}
    ></BackgroundCanvas>
  );
}
