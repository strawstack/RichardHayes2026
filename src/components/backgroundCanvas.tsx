import { useEffect, useRef, useState, type RefObject } from "react";
import { useAnimationFrame } from "../hooks/useAnimationFrame";
import { useCanvasSize } from "../hooks/useCanvasSize";
import { useCanvasContext } from "../hooks/useCanvasContext";

export function BackgroundCanvas({
  draw,
  onInit = () => {},
  onResize = () => {},
  isAnimated = false,
}: {
  draw: (params: {
    canvas: HTMLCanvasElement;
    ctx: CanvasRenderingContext2D;
    height: number;
    width: number;
    delta: number | undefined;
  }) => void;
  onInit?: (height: number, width: number) => void;
  onResize?: (canvas: HTMLCanvasElement, height: number, width: number) => void;
  isAnimated?: boolean;
}) {
  const canvas = useRef<HTMLCanvasElement>(null);
  const size = useCanvasSize(canvas);
  const ctx = useCanvasContext(canvas);
  const [initOnce, setInitOnce] = useState(false);

  function handleResize() {
    if (canvas.current && size) {
      const { height, width } = size;
      onResize(canvas.current, height, width);
    }
  }

  useAnimationFrame(
    (delta) => {
      if (canvas.current && size && ctx && isAnimated && initOnce) {
        const { height, width } = size;
        canvas.current.width = width;
        canvas.current.height = height;
        draw({ canvas: canvas.current, ctx, height, width, delta });
      }
    },
    [canvas.current, size, ctx, isAnimated, initOnce],
  );

  useEffect(() => {
    if (canvas.current && size && ctx && initOnce) {
      window.addEventListener("resize", handleResize);
    }
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [canvas, size, ctx, initOnce]);

  useEffect(() => {
    if (canvas.current && size && ctx && initOnce) {
      const { height, width } = size;
      canvas.current.width = width;
      canvas.current.height = height;
      draw({ canvas: canvas.current, ctx, height, width, delta: undefined });
    }
  }, [canvas, size, ctx, initOnce]);

  useEffect(() => {
    if (canvas.current && size && ctx && !initOnce) {
      onInit(size.height, size.width);
      setInitOnce(true);
    }
  }, [canvas, size, ctx, initOnce]);

  return (
    <canvas
      className="absolute inset-0 z-0 w-full h-full hidden sm:inline-block"
      ref={canvas}
    ></canvas>
  );
}
