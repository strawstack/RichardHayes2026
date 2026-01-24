import { BackgroundCanvas } from "./BackgroundCanvas";

function angleToPoint(radius: number, angle: number): [number, number] {
  const clockwise = -1;
  const rotate = Math.PI / 2;
  return [
    radius * Math.cos(angle * clockwise + rotate),
    radius * Math.sin(angle * clockwise + rotate),
  ];
}

function angleToPointForRadius(radius: number) {
  return (angle: number) => angleToPoint(radius, degToRad(angle));
}

function degToRad(d: number) {
  return (d / 180) * Math.PI;
}

export function BackgroundDrops() {
  return (
    <BackgroundCanvas
      isAnimated={false}
      draw={({ ctx, height, width, delta }) => {
        ctx.clearRect(0, 0, height, width);

        const cx = 100;
        const cy = 200;
        const radius = 50;
        const numPoints = 30;
        const initAngle = 0;
        const vRadius = radius * 0.05;

        const angle = (2 * Math.PI) / numPoints;
        const angleValues = Array(numPoints)
          .fill(null)
          .map((_, i) => i * angle + initAngle);

        const vary = (amount: number) => {
          return Math.random() * 2 * amount - amount;
        };

        const points: [number, number][] = angleValues
          .map((v) => angleToPoint(radius + vary(vRadius), v))
          .map(([x, y]) => [x + cx, y + cy]);

        ctx.beginPath();
        ctx.moveTo(...points[0]);
        points.slice(1).forEach(([x, y]) => ctx.lineTo(x, y));
        ctx.closePath();
        ctx.fill();
      }}
    ></BackgroundCanvas>
  );
}
