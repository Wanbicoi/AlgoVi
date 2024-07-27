import Konva from "konva";
import { BubbleSort } from "./bubble-sort";
import { BaseAlgorithm } from "../base-algorithm";
export * from "./operations/algorithm-operation";

export type AlgorithmName = "bubble-sort";

// declare global {
//   interface Window {
//     algorithms?: Record<AlgorithmName, BaseAlgorithm>;
//   }
// }
export const algorithms = (
  layer: Konva.Layer,
): Record<AlgorithmName, BaseAlgorithm> => ({
  "bubble-sort": new BubbleSort(layer),
});
