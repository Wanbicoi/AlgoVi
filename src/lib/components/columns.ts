import Konva from "konva";
export const Column = (config?: Konva.RectConfig) =>
  new Konva.Rect({
    fill: "green",
    stroke: "black",
    strokeWidth: 2,
    cornerRadius: 5,
    ...config,
  });
