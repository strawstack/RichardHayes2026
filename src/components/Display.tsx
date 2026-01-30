export function Display({
  displayRef,
  ...props
}: {
  displayRef: React.RefObject<HTMLDivElement | null>;
  [key: string]: any;
}) {
  return (
    <div className="absolute z-5 left-4 top-4 text-xl" ref={displayRef}></div>
  );
}
