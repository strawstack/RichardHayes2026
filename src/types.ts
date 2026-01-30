export type Point = {
  x: number;
  y: number;
};

export type Circle = {
  pos: {
    x: number;
    y: number;
  };
  radius: number;
  numPoints: number;
  color: string;
  render: (timestamp: number) => void;
};
