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
  ...props
}: {
  className: string;
  onMount: (canvasRef: HTMLCanvasElement) => void;
  onUnMount?: (canvasRef: HTMLCanvasElement) => void;
  draw: (ctx: CanvasRenderingContext2D) => void;
  [key: string]: any;
}) {
  const {
    handleMouseDown: handleMouseDownProp,
    handleMouseUp: handleMouseUpProp,
    handleMouseMove: handleMouseMoveProp,
  } = props;
  const canvasRef = useCanvas(draw);

  function handleMouseDown(e: MouseEvent) {
    const { left, top } = canvasRef.current!.getBoundingClientRect();
    const { clientX, clientY } = e;
    const m = {
      x: clientX - left,
      y: clientY - top,
    };
    handleMouseDownProp({
      pos: m,
      event: e,
    });
  }
  function handleMouseUp(e: MouseEvent) {
    const { left, top } = canvasRef.current!.getBoundingClientRect();
    const { clientX, clientY } = e;
    const m = {
      x: clientX - left,
      y: clientY - top,
    };
    handleMouseUpProp({
      pos: m,
      event: e,
    });
  }
  function handleMouseMove(e: MouseEvent) {
    const { left, top } = canvasRef.current!.getBoundingClientRect();
    const { clientX, clientY } = e;
    const m = {
      x: clientX - left,
      y: clientY - top,
    };
    handleMouseMoveProp({
      pos: m,
      event: e,
    });
  }

  useEffect(() => {
    if (canvasRef.current) {
      onMount(canvasRef.current);
      canvasRef.current.addEventListener("mousedown", handleMouseDown);
      canvasRef.current.addEventListener("mouseup", handleMouseUp);
      canvasRef.current.addEventListener("mousemove", handleMouseMove);
    }
    return () => {
      if (canvasRef.current) {
        canvasRef.current.removeEventListener("mousedown", handleMouseDown);
        canvasRef.current.removeEventListener("mouseup", handleMouseUp);
        canvasRef.current.removeEventListener("mousemove", handleMouseMove);
      }
    };
  }, []);

  return <canvas className={className} ref={canvasRef}></canvas>;
}
