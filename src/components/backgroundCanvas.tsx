import { useEffect, useRef, type RefObject } from "react";
import { useAnimationFrame } from "../hooks/useAnimationFrame";
import { useCanvasSize } from "../hooks/useCanvasSize";
import { useCanvasContext } from "../hooks/useCanvasContext";

export function BackgroundCanvas({
  draw,
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
  onResize?: (canvas: HTMLCanvasElement, height: number, width: number) => void;
  isAnimated?: boolean;
}) {
  const canvas = useRef<HTMLCanvasElement>(null);
  const size = useCanvasSize(canvas);
  const ctx = useCanvasContext(canvas);

  function handleResize() {
    if (canvas.current && size) {
      const { height, width } = size;
      onResize(canvas.current, height, width);
    }
  }

  useAnimationFrame(
    (delta) => {
      if (canvas.current && size && ctx && isAnimated) {
        const { height, width } = size;
        canvas.current.width = width;
        canvas.current.height = height;
        draw({ canvas: canvas.current, ctx, height, width, delta });
      }
    },
    [isAnimated, canvas.current, size, ctx],
  );

  useEffect(() => {
    if (canvas.current && size && ctx) {
      window.addEventListener("resize", handleResize);
    }
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [canvas, size, ctx]);

  useEffect(() => {
    if (canvas.current && size && ctx) {
      const { height, width } = size;
      canvas.current.width = width;
      canvas.current.height = height;
      draw({ canvas: canvas.current, ctx, height, width, delta: undefined });
    }
  }, [canvas, size, ctx]);

  return (
    <canvas
      className="absolute inset-0 z-0 w-full h-full hidden sm:inline-block"
      ref={canvas}
    ></canvas>
  );
}
