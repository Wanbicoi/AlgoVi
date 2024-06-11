import Konva from "konva";
import { BaseAlgorithm, IHighlight, ISwap } from "./base-algorithm";
import { Node } from "../components/node";

export type TreeNode = {
  value: number;
  next: TreeNode[] | undefined;
};
export type TreeDataNode = Partial<{
  value: number;
  render: Konva.Circle;
  next: TreeDataNode[];
}>;

export class TreeAlgorithm extends BaseAlgorithm {
  data: TreeDataNode | undefined;
  constructor(root: TreeNode, layer: Konva.Layer) {
    super(layer);
    this.preOrderTraversal(root);
  }

  preOrderTraversal(root: TreeNode) {
    if (!root) return;
    if (!this.data) this.data = {};
    this.data.value = root.value;
    this.data.render = Node({ x: 0, y: 0 });
    this.layer.add(this.data.render);
    root.next?.forEach((node) => {
      this.preOrderTraversal(node);
    });
  }
}
