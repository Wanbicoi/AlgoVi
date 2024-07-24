import Konva from "konva";
import { OperationType, BaseOperation } from "./base-operation";
import { ReactNode } from "react";

export abstract class BaseAlgorithm {
  private operations: { [key in OperationType]?: BaseOperation<BaseAlgorithm> };

  protected speed: number;
  protected layer: Konva.Layer;
  constructor(layer: Konva.Layer, speed: number = 1) {
    this.speed = speed;
    this.layer = layer;
    this.operations = {};
  }
  protected getDuration = () => 0.3 * this.speed;
  protected sleep = (ms = this.getDuration() + 500) =>
    new Promise((r) => setTimeout(r, ms));

  protected registerOperation(
    name: OperationType,
    operation: BaseOperation<BaseAlgorithm>,
  ) {
    this.operations[name] = operation;
  }

  public renderOperations(): ReactNode {
    return Object.values(this.operations).map((operation) =>
      operation.render(this),
    );
  }

  abstract run(): void;

  abstract highlight(index: number): void;
  abstract unhighlight(index: number): void;

  abstract swap(firstIndex: number, secondIndex: number): void;
}
