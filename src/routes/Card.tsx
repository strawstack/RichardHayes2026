export function Card() {
  function handleMouseMove(e: any) {
    const { left, top, width, height } =
      e.currentTarget.getBoundingClientRect();
    const mouse = {
      x: e.clientX - left - width / 2,
      y: e.clientY - top - height / 2,
    };
    const mouseNormal = {
      x: mouse.x / width,
      y: mouse.y / height,
    };
    console.log(mouse);
    console.log(mouseNormal);
  }

  return (
    <div className="h-full p-8">
      <div
        className="bg-blue-500 w-50 h-100 cursor-pointer"
        onMouseMove={handleMouseMove}
      ></div>
    </div>
  );
}
