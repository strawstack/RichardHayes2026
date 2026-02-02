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

function useCanvas(
  draw: (ctx: CanvasRenderingContext2D, timestamp: number) => void,
) {
  const canvas = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvas.current) return;

    let animationFrameId: number;
    const ctx = canvas.current.getContext("2d")!;

    const render = (timestamp: number) => {
      if (!canvas.current) return;
      resizeCanvasToDisplaySize(canvas.current);
      ctx.clearRect(0, 0, canvas.current.width, canvas.current.height);
      draw(ctx, timestamp);
      animationFrameId = window.requestAnimationFrame(render);
    };

    render(0);

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
  className?: string;
  onMount?: (canvasRef: HTMLCanvasElement) => void;
  onUnMount?: (canvasRef: HTMLCanvasElement) => void;
  draw: (ctx: CanvasRenderingContext2D, timestamp: number) => void;
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
    if (handleMouseDownProp) {
      handleMouseDownProp({
        pos: m,
        event: e,
      });
    }
  }
  function handleMouseUp(e: MouseEvent) {
    const { left, top } = canvasRef.current!.getBoundingClientRect();
    const { clientX, clientY } = e;
    const m = {
      x: clientX - left,
      y: clientY - top,
    };
    if (handleMouseUpProp) {
      handleMouseUpProp({
        pos: m,
        event: e,
      });
    }
  }
  function handleMouseMove(e: MouseEvent) {
    const { left, top } = canvasRef.current!.getBoundingClientRect();
    const { clientX, clientY } = e;
    const m = {
      x: clientX - left,
      y: clientY - top,
    };
    if (handleMouseMoveProp) {
      handleMouseMoveProp({
        pos: m,
        event: e,
      });
    }
  }

  useEffect(() => {
    if (canvasRef.current) {
      if (onMount) onMount(canvasRef.current);
      if (handleMouseDownProp && handleMouseUpProp && handleMouseMoveProp) {
        canvasRef.current.addEventListener("mousedown", handleMouseDown);
        canvasRef.current.addEventListener("mouseup", handleMouseUp);
        canvasRef.current.addEventListener("mousemove", handleMouseMove);
      }
    }
    return () => {
      if (
        canvasRef.current &&
        handleMouseDownProp &&
        handleMouseUpProp &&
        handleMouseMoveProp
      ) {
        canvasRef.current.removeEventListener("mousedown", handleMouseDown);
        canvasRef.current.removeEventListener("mouseup", handleMouseUp);
        canvasRef.current.removeEventListener("mousemove", handleMouseMove);
      }
    };
  }, []);

  return <canvas className={className} ref={canvasRef}></canvas>;
}
