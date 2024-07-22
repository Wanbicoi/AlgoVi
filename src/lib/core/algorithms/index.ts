import Konva from "konva";
import { BubbleSort } from "./bubble-sort";
export const algorithms = (layer: Konva.Layer) => {
  return {
    bubbleSort: new BubbleSort(layer),
  };
};
