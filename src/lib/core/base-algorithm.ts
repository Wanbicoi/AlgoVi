import Konva from "konva";
import {
  OperationType,
  BaseOperation,
  OperationArgumentType,
} from "./base-operation";
import { ReactNode } from "react";

export abstract class BaseAlgorithm<T> {
  private operations: { [key in OperationType]?: BaseOperation<T> };

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
    operation: BaseOperation<T>,
  ) {
    this.operations[name] = operation;
  }
  public executeOperation(name: OperationType, arg: OperationArgumentType) {
    const operation = this.operations[name];
    if (operation) {
      operation.run(this as unknown as T, arg);
    }
  }
  public renderOperations(): ReactNode {
    return Object.keys(this.operations).map((key) =>
      this.operations[key as keyof typeof this.operations]!.render(
        this as unknown as T,
      ),
    );
  }

  abstract run(): void;

  abstract highlight(index: number): void;
  abstract unhighlight(index: number): void;

  abstract swap(firstIndex: number, secondIndex: number): void;
}
