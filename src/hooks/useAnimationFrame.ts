import { useEffect, useRef } from "react";

type Callback = (deltaTime: number) => void;

export const useAnimationFrame = (callback: Callback, deps: any) => {
  const requestRef = useRef(0);
  const previousTimeRef = useRef(0);

  const animate = (time: number) => {
    if (previousTimeRef.current != undefined) {
      const deltaTime = time - previousTimeRef.current;
      callback(deltaTime);
    }
    previousTimeRef.current = time;
    requestRef.current = requestAnimationFrame(animate);
  };

  useEffect(() => {
    requestRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(requestRef.current);
  }, deps);
};
