import { Canvas } from "./Canvas";
import { useRef, useState } from "react";

export function Drops() {
  const dropsRef = useRef<any[]>([]);

  function newDrop() {
    let x = 100;
    let y = 100;
    let r = 100;

    function render(ctx: CanvasRenderingContext2D) {
      ctx.fillStyle = "#000000";
      ctx.beginPath();
      ctx.arc(x, y, r, 0, 2 * Math.PI);
      ctx.fill();
    }

    return {
      render,
    };
  }

  const draw = (ctx: CanvasRenderingContext2D) => {
    const drops = dropsRef.current;
    for (let { render } of drops) render(ctx);
  };

  function handleMouseDown(e: MouseEvent) {
    const pos = e;
    console.log(pos);
  }
  function handleMouseUp(e: MouseEvent) {}

  const onMount = (canvas: HTMLCanvasElement) => {
    canvas.addEventListener("mousedown", handleMouseDown);
    canvas.addEventListener("mousedown", handleMouseUp);
    dropsRef.current = [newDrop(), newDrop(), newDrop()];
  };

  const onUnMount = (canvas: HTMLCanvasElement) => {
    canvas.removeEventListener("mousedown", handleMouseDown);
    canvas.removeEventListener("mousedown", handleMouseUp);
  };

  return (
    <Canvas
      className="absolute inset-0 w-full h-full"
      draw={draw}
      onMount={onMount}
      onUnMount={onUnMount}
    ></Canvas>
  );
}
