import { useState } from "react";
import { BackgroundCanvas } from "./backgroundCanvas";
import { getControlPoints, getControlPointsForList } from "../utils";
import type { Point } from "../types";

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
        const cx = 400;
        const cy = 400;
        const radius = 200;
        const numPts = 6;
        const angle = (2 * Math.PI) / numPts;
        const p = Array(numPts)
          .fill(null)
          .map((_, i) => {
            const ang = i * angle;
            return {
              x: radius * Math.cos(ang) + cx,
              y: radius * Math.sin(ang) + cy,
            };
          });

        p.forEach(({ x, y }) => {
          ctx.fillStyle = "#333";
          ctx.beginPath();
          ctx.arc(x, y, 6, 0, 2 * Math.PI);
          ctx.fill();
        });

        const z = p[p.length - 1];
        const a = p[0];
        const b = p[1];

        const { c1, c2 } = getControlPoints(z, a, b);
        const { c1: p1a, c2: p1b } = getControlPoints(p[0], p[1], p[2]);
        const { c1: p2a, c2: p2b } = getControlPoints(p[1], p[2], p[3]);
        const { c1: p3a, c2: p3b } = getControlPoints(p[2], p[3], p[4]);
        const { c1: p4a, c2: p4b } = getControlPoints(p[3], p[4], p[5]);
        const { c1: p5a, c2: p5b } = getControlPoints(p[4], p[5], p[0]);

        const draw = (cp: Point) => {
          ctx.fillStyle = "blue";
          ctx.beginPath();
          ctx.arc(cp.x, cp.y, 3, 0, 2 * Math.PI);
          ctx.arc(cp.x, cp.y, 3, 0, 2 * Math.PI);
          ctx.fill();
        };

        draw(c1);
        draw(c2);
        draw(p1a);
        draw(p1b);
        draw(p2a);
        draw(p2b);
        draw(p3a);
        draw(p3b);
        draw(p4a);
        draw(p4b);
        draw(p5a);
        draw(p5b);

        ctx.beginPath();
        ctx.moveTo(z.x, z.y);
        ctx.bezierCurveTo(p5b.x, p5b.y, c1.x, c1.y, a.x, a.y);
        ctx.bezierCurveTo(c2.x, c2.y, p1a.x, p1a.y, b.x, b.y);
        ctx.bezierCurveTo(p1b.x, p1b.y, p2a.x, p2a.y, p[2].x, p[2].y);
        ctx.bezierCurveTo(p2b.x, p2b.y, p3a.x, p3a.y, p[3].x, p[3].y);
        ctx.bezierCurveTo(p3b.x, p3b.y, p4a.x, p4a.y, p[4].x, p[4].y);
        ctx.bezierCurveTo(p4b.x, p4b.y, p5a.x, p5a.y, p[5].x, p[5].y);

        ctx.stroke();
      }}
    ></BackgroundCanvas>
  );
}
