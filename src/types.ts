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

export type Timestamp = number;

export type Variation = (timestamp: number) => number;

export interface CircleData {
  created: Timestamp;
  basePoints: Point[];
  radius: Variation[];
  center: Point;
  color: string;
}

export type ControlPoints = { c1: Point; c2: Point }[];
