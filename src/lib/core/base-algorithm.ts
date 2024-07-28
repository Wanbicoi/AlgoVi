import Konva from "konva";
import { OperationType } from "./base-operation";

export type Status = "running" | "stop" | "not-started" | "loading" | "cancel";

export abstract class BaseAlgorithm {
  protected _operations: OperationType[];
  protected _speed: number;
  protected _layer: Konva.Layer;
  protected _status: Status;
  protected _step: number;
  private _loadingStep: number;

  constructor(
    layer: Konva.Layer,
    operations: OperationType[],
    speed: number = 1
  ) {
    this._speed = speed;
    this._layer = layer;
    this._operations = operations;
    this._status = "not-started";
    this._step = 0;
    this._loadingStep = 0;
  }

  get operations() {
    return this._operations;
  }

  protected getDuration = () => 0.3 * this._speed;

  protected sleep = async (
    func: Function,
    ms = this.getDuration() + this._speed * 500,
  ) => {
    switch (this._status) {
      //@ts-ignore
      case "stop":
        while (this._status == "stop") {
          await new Promise((r) => setTimeout(r, 1000)); // Check every 1000ms
        }
      case "running":
        func();
        this._step++;
        await new Promise((r) => setTimeout(r, ms));
        this.saveState();
        break;
      case "loading":
        this._step++;
        if (this._step >= this._loadingStep) {
          this._status = "stop";
        }
        break;
    }
  };

  async run() {
    console.log(this._status);
    if (this._status == "not-started") {
      this._status = "running";
      await this.algorithm();
      this._status = "not-started";
    } else this._status = "running";
  }
  stop() {
    if (this._status != "not-started") this._status = "stop";
  }
  get speed() {
    return this._speed;
  }
  get isRunning() {
    return this._status == "running";
  }
  increaseSpeed(margin: number = 0.25) {
    if (this._speed - margin > 0 && this._speed - margin < 10)
      this._speed -= margin;
  }

  /**
   * Load the algorithm to the `target step`
   * @param step Target step
   * @description if `step != 0` then is function will run to the `step` without animation
   */
  async load(step: number) {
    this._loadingStep = step;
    this._status = "loading";
    await this.algorithm();
  }
  protected async cancel() {
    if (this._status == "running" || this._status == "stop") {
      this._status = "cancel";
      this._step = 0;
    }
  }

  private saveState() {
    localStorage.setItem(this._step.toString(), this.serialize());
  }

  async goToPreviouStep() {
    const step = this._step - 1;
    const value = localStorage.getItem(step.toString());
    if (!value) return;

    await this.cancel();
    this.deserialize(value);
    await this.load(step);
  }

  abstract serialize(): string;
  abstract deserialize(value: string): void;

  abstract algorithm(): Promise<void>;

  abstract highlight(index: number): void;
  abstract unhighlight(index: number): void;

  abstract swap(firstIndex: number, secondIndex: number): void;
}
