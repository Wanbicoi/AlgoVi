import Konva from "konva";
import { BubbleSort } from "./bubble-sort";
import { BaseAlgorithm } from "../../base-algorithm";
import { SelectionSort } from "./selection-sort";
import { QuickSort } from "./quick-sort";
import { HeapSort } from "./heap-sort";
export * from "../operations/algorithm-operation";
import { LinearSearch } from "./linear-search";
import { InsertionSort } from "./insertion-sort";
import { BinarySearchTree } from "../tree-algo/binary-search-tree";

export type AlgorithmName =
  | "bubble-sort"
  | "selection-sort"
  | "quick-sort"
  | "heap-sort"
  | "linear-search"
  | "insertion-sort"
  | "binary-search-tree";

// declare global {
//   interface Window {
//     algorithms?: Record<AlgorithmName, BaseAlgorithm>;
//   }
// }
export const algorithms = (
  layer: Konva.Layer
): Record<AlgorithmName, BaseAlgorithm> => ({
  "bubble-sort": new BubbleSort(layer),
  "selection-sort": new SelectionSort(layer),
  "quick-sort": new QuickSort(layer),
  "heap-sort": new HeapSort(layer),
  "linear-search": new LinearSearch(layer),
  "insertion-sort": new InsertionSort(layer),
  "binary-search-tree": new BinarySearchTree(layer),
});
