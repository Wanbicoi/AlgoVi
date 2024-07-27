import Konva from "konva";
import { OperationType } from "./base-operation";

export abstract class BaseAlgorithm {
  protected _operations: OperationType[];
  protected _speed: number;
  protected _layer: Konva.Layer;
  protected _isRunning: boolean;
  protected _step: number;

  constructor(
    layer: Konva.Layer,
    operations: OperationType[],
    speed: number = 1,
  ) {
    this._speed = speed;
    this._layer = layer;
    this._operations = operations;
    this._isRunning = false;
    this._step = 0;
  }

  get operations() {
    return this._operations;
  }
  protected getDuration = () => 0.3 * this._speed;
  protected sleep = async (ms = this.getDuration() + this._speed * 500) => {
    if (this._isRunning) {
      this._step++;
      return new Promise((r) => setTimeout(r, ms));
    } else {
      while (!this._isRunning) {
        await new Promise((resolve) => setTimeout(resolve, 1000)); // Check every 1000ms
      }
    }
  };
  async run() {
    if (this._isRunning) return;
    this._isRunning = true;
    if (this._step > 0) return;
    await this.algorithm();
    this._isRunning = false;
  }
  stop() {
    this._isRunning = false;
  }
  get speed() {
    return this._speed;
  }
  increaseSpeed(margin: number = 0.25) {
    if (this._speed - margin > 0 && this._speed - margin < 10)
      this._speed -= margin;
  }

  abstract algorithm(): Promise<void>;

  abstract highlight(index: number): void;
  abstract unhighlight(index: number): void;

  abstract swap(firstIndex: number, secondIndex: number): void;

  abstract pause(): void;
  abstract resume(): void;
}
