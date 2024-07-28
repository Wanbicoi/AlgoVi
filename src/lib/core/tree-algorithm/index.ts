import Konva from "konva";
import { BaseAlgorithm } from "../base-algorithm";
import { OperationType } from "../base-operation";
import { TreeNode } from "./tree-node";
import { Arrow } from "../../components/arrow";
import { BaseShape } from "../../components/base-shape";

export abstract class TreeAlgorithm extends BaseAlgorithm {
  protected root: TreeNode | null;
  protected type: "circle" | "column";

  constructor(
    layer: Konva.Layer,
    operations: OperationType[],
    type: "circle" | "column" = "column"
  ) {
    super(layer, operations);
    this.root = null;
    this.type = type;
  }

  abstract insert(value: number): void;
  abstract delete(value: number): void;
  abstract search(value: number): void;
  abstract initData(params: number[] | number): void;

  protected createArrow(startShape: BaseShape, endShape: BaseShape): Arrow {
    const arrow = new Arrow(-10000);
    arrow.setPointsFromShapes(startShape, endShape);
    arrow.addTo(this._layer);
    return arrow;
  }

  async highlight(index: number) {}
  unhighlight(index: number): void {
    // implement unhighlight
  }

  swap(index1: number, index2: number): void {
    // not implemented
  }

  pause(): void {
    // not implemented
  }

  resume(): void {
    // not implemented
  } 
}
