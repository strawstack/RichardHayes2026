import { useEffect, useState, type RefObject } from "react";

export function useCanvasContext(canvas: RefObject<HTMLCanvasElement | null>) {
  const [ctx, setCtx] = useState<CanvasRenderingContext2D | null>(null);
  useEffect(() => {
    if (canvas.current) {
      const ctx = canvas.current.getContext("2d");
      if (ctx) setCtx(ctx);
    }
  }, []);
  return ctx;
}
