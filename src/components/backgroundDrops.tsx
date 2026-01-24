import { useMemo, useState } from "react";
import { BackgroundCanvas } from "./BackgroundCanvas";
import { height, width } from "@fortawesome/free-brands-svg-icons/fa11ty";

function angleToPoint(radius: number, angle: number): [number, number] {
  const clockwise = -1;
  const rotate = Math.PI / 2;
  return [
    radius * Math.cos(angle * clockwise + rotate),
    radius * Math.sin(angle * clockwise + rotate),
  ];
}

type Circle = {
  cx: number;
  cy: number;
  radius: number;
  numPoints: number;
  initVary: number;
  angle: number;
  initAngle: number;
  duration: number; // remaining time to fade out
  angleValues: number[];
  varyValues: number[];
};

export function BackgroundDrops() {
  const [size, setSize] = useState({ height: 0, width: 0 });
  const circles: Circle[] = useMemo(() => {
    const numCircles = 10;
    return Array(numCircles)
      .fill(null)
      .map(() => {
        const cx = Math.random() * size.width;
        const cy = Math.random() * size.height;
        const radius = 50;
        const numPoints = 24;
        const initVary = radius * 0.025;
        const angle = (2 * Math.PI) / numPoints;
        const initAngle = Math.random() * angle;
        const angleValues = Array(numPoints)
          .fill(null)
          .map((_, i) => i * angle + initAngle);
        const vary = (amount: number) => Math.random() * 2 * amount - amount;
        const varyValues = Array(numPoints)
          .fill(null)
          .map(() => vary(initVary));
        return {
          cx,
          cy,
          radius,
          numPoints,
          initVary,
          angle,
          initAngle,
          duration: 1000,
          angleValues,
          varyValues,
        };
      });
  }, [size]);

  return (
    <BackgroundCanvas
      isAnimated={false}
      draw={({ ctx, height, width, delta }) => {
        ctx.clearRect(0, 0, height, width);
        setSize({ height, width });
        for (let { cx, cy, radius, angleValues, varyValues } of circles) {
          const points: [number, number][] = angleValues
            .map((v, i) => angleToPoint(radius + varyValues[i], v))
            .map(([x, y]) => [x + cx, y + cy]);
          ctx.beginPath();
          ctx.moveTo(...points[0]);
          points.slice(1).forEach(([x, y]) => ctx.lineTo(x, y));
          ctx.closePath();
          ctx.fill();
        }
      }}
    ></BackgroundCanvas>
  );
}
