import { useEffect, useRef } from "react";

const colorFill = ["fill-emerald-50", "fill-emerald-100", "fill-emerald-300"];
const hexFill = ["#ecfdf5", "#d1fae5", "#a7f3d0"];

export function Background() {
  const canvas = useRef<HTMLCanvasElement>(null);

  function renderCanvas(canvas: HTMLCanvasElement) {
    const { height, width } = canvas.getBoundingClientRect();
    const ctx = canvas.getContext("2d")!;
    canvas.height = height;
    canvas.width = width;

    const cols = 50;
    const size = width / cols;
    const rows = Math.ceil(height / size);

    for (let y = 0; y < rows; y++) {
      for (let x = 0; x < cols; x++) {
        const rand = Math.floor(Math.random() * hexFill.length);
        ctx.fillStyle = hexFill[rand];
        ctx.beginPath();
        ctx.rect(x * size, y * size, size, size);
        ctx.fill();
      }
    }
  }

  useEffect(() => {
    if (canvas.current) renderCanvas(canvas.current);
  }, []);

  function handleResize() {
    if (canvas.current) renderCanvas(canvas.current);
  }

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <canvas
      className="absolute inset-0 z-0 w-full h-full hidden sm:inline-block"
      ref={canvas}
    ></canvas>
  );
}
