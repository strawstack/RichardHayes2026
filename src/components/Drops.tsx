import { Canvas } from "./Canvas";
import { useRef } from "react";

type Drop = {
  render: (ctx: CanvasRenderingContext2D) => void;
  pos: Point;
  setPos: (pos: Point) => void;
  r: number;
  id: number;
};

type Point = {
  x: number;
  y: number;
};

type PointEvent<T> = {
  pos: Point;
  event: T;
};

function dist(a: Point, b: Point) {
  return Math.sqrt(Math.pow(a.x - b.x, 2) + Math.pow(a.y - b.y, 2));
}

function add(a: Point, b: Point) {
  return {
    x: a.x + b.x,
    y: a.y + b.y,
  };
}

function sub(a: Point, b: Point) {
  return {
    x: a.x - b.x,
    y: a.y - b.y,
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

function mag(a: Point) {
  return Math.sqrt(Math.pow(a.x, 2) + Math.pow(a.y, 2));
}

function r2d(rad: number) {
  return (rad / Math.PI) * 180;
}

function renderLines(ctx: CanvasRenderingContext2D, drops: Drop[]) {
  if (drops.length !== 3) return;
  const a = drops[0];
  const b = drops[1];
  const c = drops[2];

  ctx.beginPath();
  ctx.strokeStyle = "#bbb";
  ctx.lineWidth = 2;
  ctx.moveTo(a.pos.x, a.pos.y);
  ctx.lineTo(b.pos.x, b.pos.y);
  ctx.lineTo(c.pos.x, c.pos.y);
  ctx.stroke();
}

export function Drops({
  displayRef,
}: {
  displayRef: React.RefObject<HTMLDivElement | null>;
}) {
  const dropsRef = useRef<Drop[]>([]);
  const selectedDropRef = useRef<number>(null);
  const id = useRef<number>(0);

  function renderBezier(ctx: CanvasRenderingContext2D, drops: Drop[]) {
    if (drops.length !== 3) return;
    const a = drops[0];
    const b = drops[1];
    const c = drops[2];

    const n = sub(b.pos, a.pos);
    const m = sub(c.pos, b.pos);
    const mag_n = mag(n);
    const mag_m = mag(m);

    const angle = Math.acos(dot(n, m) / (mag_n * mag_m));
    const half = angle / 2;
    const cross = n.x * m.y - n.y * m.x > 0;

    const controlAngle = Math.atan2(m.y, m.x) + (cross ? -1 * half : half);
    const controlVector = {
      x: Math.cos(controlAngle),
      y: Math.sin(controlAngle),
    };

    const bump = 40;

    const draw = (p: Point) => {
      ctx.fillStyle = "#a78bfa";
      ctx.beginPath();
      ctx.arc(p.x, p.y, 5, 0, 2 * Math.PI);
      ctx.fill();
    };

    // Control Points
    const a2 = a.pos;
    const b1 = sub(b.pos, mul(controlVector, bump));
    const b2 = add(b.pos, mul(controlVector, bump));
    const c1 = c.pos;

    draw(b1);
    draw(b2);

    if (displayRef.current) {
      displayRef.current.innerHTML = [
        `angle: ${r2d(angle)}`,
        `cross: ${cross}`,
      ].join("<br>");
    }

    // setData({
    //   angle: Math.round(r2d(angle) * 100) / 100,
    //   crossSign: cross,
    // });

    ctx.beginPath();
    ctx.strokeStyle = "#333";
    ctx.lineWidth = 3;
    ctx.moveTo(a.pos.x, a.pos.y);
    ctx.bezierCurveTo(a2.x, a2.y, b1.x, b1.y, b.pos.x, b.pos.y);
    ctx.bezierCurveTo(b2.x, b2.y, c1.x, c1.y, c.pos.x, c.pos.y);
    ctx.stroke();
  }

  function newDrop(pos: Point, radius: number, fill: string): Drop {
    let _pos = { ...pos };
    let _r = radius;
    let _id = id.current;
    id.current += 1;

    function setPos(pos: Point) {
      _pos.x = pos.x;
      _pos.y = pos.y;
    }

    function render(ctx: CanvasRenderingContext2D) {
      ctx.fillStyle = fill;
      ctx.beginPath();
      ctx.arc(_pos.x, _pos.y, _r, 0, 2 * Math.PI);
      ctx.fill();
    }

    return {
      render,
      pos: _pos,
      setPos,
      r: _r,
      id: _id,
    };
  }

  const draw = (ctx: CanvasRenderingContext2D) => {
    const drops = dropsRef.current;
    for (let { render } of drops) render(ctx);
    //renderLines(ctx, drops);
    renderBezier(ctx, drops);
  };

  function handleMouseDown(e: PointEvent<MouseEvent>) {
    const { pos } = e;
    const drop = dropsRef.current.find((drop) => {
      return dist(drop.pos, pos) <= drop.r;
    });
    if (drop) selectedDropRef.current = drop.id;
  }
  function handleMouseUp(e: PointEvent<MouseEvent>) {
    selectedDropRef.current = null;
  }
  function handleMouseMove(e: PointEvent<MouseEvent>) {
    const drop = dropsRef.current.find(
      (drop) => drop.id === selectedDropRef.current,
    );
    if (drop) drop.setPos(e.pos);
  }

  const onMount = (canvas: HTMLCanvasElement) => {
    dropsRef.current = [
      newDrop({ x: 100, y: 100 }, 20, "#34d399"),
      newDrop({ x: 150, y: 200 }, 20, "#60a5fa"),
      newDrop({ x: 200, y: 100 }, 20, "#fb7185"),
    ];
  };

  return (
    <Canvas
      className="absolute inset-0 w-full h-full"
      draw={draw}
      onMount={onMount}
      handleMouseDown={handleMouseDown}
      handleMouseUp={handleMouseUp}
      handleMouseMove={handleMouseMove}
    ></Canvas>
  );
}
