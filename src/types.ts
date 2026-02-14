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
  lineWidth?: number;
  operation?: GlobalCompositeOperation;
  drawPath?: DrawPath;
}

export type ControlPoints = { c1: Point; c2: Point }[];

export type DrawPath = "fill" | "stroke";

export type Size = { width: number; height: number };
export type Nid = string;
export type Eid = string;

export enum Kind {
  Node = "Node",
  Edge = "Edge",
}

export type Node = {
  id: Nid;
  pos: Point;
  size: Size;
  kind: Kind;
  edges?: {
    top: Eid | undefined;
    right: Eid | undefined;
    down: Eid | undefined;
    left: Eid | undefined;
  };
};

type Edge = {
  id: Eid;
  pos: Point;
  size: Size;
  kind: Kind;
  from?: Nid;
  to?: Nid;
};

export type Maze = {
  rows: number;
  cols: number;
  nodes: { [key: Nid]: Node };
  edges: { [key: Eid]: Edge };
};
