import Konva from "konva";
import { BubbleSort } from "./bubble-sort";
import { BaseAlgorithm } from "../base-algorithm";
import { SelectionSort } from "./selection-sort";
export type AlgorithmType = {
  [key: string]: BaseAlgorithm;
};

declare global {
  interface Window {
    algorithms?: AlgorithmType;
  }
}
export const algorithms = (layer: Konva.Layer): AlgorithmType => {
  return {
    bubbleSort: new BubbleSort(layer),
    selectionSort: new SelectionSort(layer),
  };
};
