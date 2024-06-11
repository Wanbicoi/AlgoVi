import Konva from "konva";
export const Node = (config?: Konva.RectConfig) =>
  new Konva.Circle({
    radius: 30,
    fill: "green",
    stroke: "black",
    strokeWidth: 2,
    ...config,
  });
