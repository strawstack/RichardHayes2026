import { Maze } from "../components/Maze";

export function MazeRoute() {
  return (
    <div className="p-4 flex flex-col gap-y-4">
      <div className="h-32 bg-gray-500">
        <Maze id={0} />
      </div>
      <div className="flex gap-x-4">
        <div className="h-64 w-32 bg-gray-500">
          <Maze id={1} />
        </div>
        <div className="grow flex flex-col gap-y-4">
          <div className="h-20 grow bg-gray-500">
            <Maze id={2} />
          </div>
          <div className="flex gap-x-4">
            <div className="h-32 grow-2 bg-gray-500">
              <Maze id={3} />
            </div>
            <div className="h-32 grow bg-gray-500">
              <Maze id={4} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
