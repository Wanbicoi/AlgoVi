import Konva from "konva";
import { BubbleSort } from "./bubble-sort";
import { BaseAlgorithm } from "../../base-algorithm";
import { SelectionSort } from "./selection-sort";
import { QuickSort } from "./quick-sort";
import { HeapSort } from "./heap-sort";
import { LinearSearch } from "./linear-search";
import { BinarySearch } from "./binary-search";
export * from "../operations/algorithm-operation";
import { AVLTree } from "../tree-algo/avl-tree";
import { BinarySearchTree } from "../tree-algo/binary-search-tree";

export type AlgorithmName =
  | "bubble-sort"
  | "selection-sort"
  | "quick-sort"
  | "heap-sort"
  | "linear-search"
  | "binary-search"
  | "avl-tree"
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
  "binary-search": new BinarySearch(layer),
  "avl-tree": new AVLTree(layer),
  "binary-search-tree": new BinarySearchTree(layer),
});
