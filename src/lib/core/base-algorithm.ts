import Konva from "konva";
import { OperationType } from "./base-operation";

export abstract class BaseAlgorithm {
  protected _operations: OperationType[];
  protected _speed: number;
  protected _layer: Konva.Layer;
  constructor(
    layer: Konva.Layer,
    operations: OperationType[],
    speed: number = 1,
  ) {
    this._speed = speed;
    this._layer = layer;
    this._operations = operations;
  }

  get operations() {
    return this._operations;
  }
  protected getDuration = () => 0.3 * this._speed;
  protected sleep = (ms = this.getDuration() + 500) =>
    new Promise((r) => setTimeout(r, ms));

  abstract run(): void;

  abstract highlight(index: number): void;
  abstract unhighlight(index: number): void;

  abstract swap(firstIndex: number, secondIndex: number): void;
}
