import { useEffect, useState, type RefObject } from "react";

export function useCanvasSize(canvas: RefObject<HTMLCanvasElement | null>) {
  const [size, setSize] = useState<{ height: number; width: number } | null>(
    null,
  );
  useEffect(() => {
    if (canvas.current) {
      const { height, width } = canvas.current.getBoundingClientRect();
      setSize({ height, width });
    }
  }, [canvas]);
  return size;
}
