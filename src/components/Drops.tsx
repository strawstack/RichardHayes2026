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

export function Drops() {
  const dropsRef = useRef<Drop[]>([]);
  const selectedDropRef = useRef<number>(null);
  const id = useRef<number>(0);

  function newDrop(pos: Point, radius: number): Drop {
    let _pos = { ...pos };
    let _r = radius;
    let _id = id.current;
    id.current += 1;

    function setPos(pos: Point) {
      _pos.x = pos.x;
      _pos.y = pos.y;
    }

    function render(ctx: CanvasRenderingContext2D) {
      ctx.fillStyle = "#333";
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
  };

  function handleMouseDown(e: PointEvent<MouseEvent>) {
    const { pos } = e;
    const drop = dropsRef.current.find((drop) => {
      console.log(drop.pos);
      return dist(drop.pos, pos) <= drop.r;
    });
    if (drop) selectedDropRef.current = drop.id;
    console.log(`selected: ${selectedDropRef.current}`);
  }
  function handleMouseUp(e: PointEvent<MouseEvent>) {
    selectedDropRef.current = null;
    console.log(`selected: ${selectedDropRef.current}`);
  }
  function handleMouseMove(e: PointEvent<MouseEvent>) {
    const drop = dropsRef.current.find(
      (drop) => drop.id === selectedDropRef.current,
    );
    if (drop) {
      drop.setPos(e.pos);
      console.log(`drop: ${JSON.stringify(drop.pos)}`);
    }
  }

  const onMount = (canvas: HTMLCanvasElement) => {
    dropsRef.current = [
      newDrop({ x: 100, y: 100 }, 20),
      newDrop({ x: 150, y: 200 }, 20),
      newDrop({ x: 200, y: 100 }, 20),
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
