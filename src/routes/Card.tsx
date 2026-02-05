import { useEffect, useRef } from "react";

type Point = {
  x: number;
  y: number;
};

export function Card() {
  const angle = 30;
  const displayRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  function round(n: number) {
    return Math.round(n * 100) / 100;
  }

  function roundPoint(p: Point) {
    return {
      x: Math.round(p.x * 100) / 100,
      y: Math.round(p.y * 100) / 100,
    };
  }

  function display(msg: string[]) {
    if (displayRef.current) {
      displayRef.current.innerHTML = msg.join("<br>");
    }
  }

  function handleMouseMove(e: any) {
    const { left, top, width, height } =
      e.currentTarget.getBoundingClientRect();
    const mouse = {
      x: e.clientX - left - width / 2,
      y: e.clientY - top - height / 2,
    };
    const mouseNormal = {
      x: (mouse.x / width) * 2,
      y: (mouse.y / height) * 2,
    };
    const point = roundPoint(mouseNormal);
    const rotX = point.y * angle;
    const rotY = point.x * angle;

    display([
      `rotX: ${round(rotX)} / rotY: ${round(rotY)}`,
      `${point.x} / ${point.y}`,
    ]);

    if (cardRef.current) {
      cardRef.current.style = `
        transition: transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        transform: rotateX(${rotX}deg) rotateY(${rotY}deg);
      `;
    }
  }

  function handleMouseLeave() {
    if (cardRef.current) {
      cardRef.current.style = `
        transition: transform 1s cubic-bezier(0.175, 0.885, 0.32, 1.275) 0.25s;
        transform: rotateX(0deg) rotateY(0deg);
      `;
    }
  }

  return (
    <div className="h-full p-8 flex justify-center items-center">
      <div
        className="border-2 size-80"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        <div
          className="bg-blue-500 size-80 cursor-pointer wrap-break-word"
          ref={cardRef}
        ></div>
      </div>
      <div className="absolute bottom-4 left-4" ref={displayRef}></div>
    </div>
  );
}
