import { useEffect, useRef } from "react";

export function Maze() {
  const svgRef = useRef(null);

  useEffect(() => {}, []);

  return <svg className="h-full w-full bg-teal-300" ref={svgRef}></svg>;
}
