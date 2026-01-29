import { useEffect, useRef } from "react";

function resizeCanvasToDisplaySize(canvas: HTMLCanvasElement) {
  const { width, height } = canvas.getBoundingClientRect();
  if (canvas.width !== width || canvas.height !== height) {
    canvas.width = width;
    canvas.height = height;
    return true;
  }
  return false;
}

function useCanvas(draw: (ctx: CanvasRenderingContext2D) => void) {
  const canvas = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvas.current) return;

    let animationFrameId: number;
    const ctx = canvas.current.getContext("2d")!;

    const render = () => {
      if (!canvas.current) return;
      resizeCanvasToDisplaySize(canvas.current);
      ctx.clearRect(0, 0, canvas.current.height, canvas.current.width);
      draw(ctx);
      animationFrameId = window.requestAnimationFrame(render);
    };

    draw(ctx);
    render();

    return () => {
      window.cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return canvas;
}

export function Canvas({
  className,
  onMount,
  onUnMount,
  draw,
}: {
  className: string;
  onMount: (canvasRef: HTMLCanvasElement) => void;
  onUnMount: (canvasRef: HTMLCanvasElement) => void;
  draw: (ctx: CanvasRenderingContext2D) => void;
}) {
  const canvasRef = useCanvas(draw);

  useEffect(() => {
    if (canvasRef.current) onMount(canvasRef.current);
    return () => {
      if (canvasRef.current) onUnMount(canvasRef.current);
    };
  }, []);

  return <canvas className={className} ref={canvasRef}></canvas>;
}
