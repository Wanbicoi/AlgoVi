import Konva from "konva";
import { BaseShape, Circle, Column } from "../../components";
import { BaseAlgorithm } from "../base-algorithm";
import { OperationType } from "../base-operation";

export abstract class ArrayAlgorithm extends BaseAlgorithm {
  protected data: BaseShape[];
  protected type: "circle" | "column";
  constructor(
    layer: Konva.Layer,
    operations: OperationType[],
    type: "circle" | "column" = "column",
  ) {
    super(layer, operations);
    this.data = [];
    this.type = type;
  }

  async deserialize(json: string): Promise<void> {
    this.data.forEach((item) => item.destroy());
    const data = JSON.parse(json) as string[];
    this.data = data.map((item: string) =>
      this.type == "circle" ? new Circle(0, item) : new Column(0, item),
    );
    this.data.forEach((column) => column.addTo(this._layer));
  }

  serialize(): string {
    return JSON.stringify(this.data.map((item) => item.toJSON()));
  }

  async swap(firstIndex: number, secondIndex: number) {
    await this.sleep(() => {
      new Konva.Tween({
        node: this.data[firstIndex].render,
        duration: this.getDuration(),
        x: this.data[secondIndex].position.x,
        y: this.data[secondIndex].position.y,
      }).play();
      new Konva.Tween({
        node: this.data[secondIndex].render,
        duration: this.getDuration(),
        x: this.data[firstIndex].position.x,
        y: this.data[firstIndex].position.y,
      }).play();
    });

    [this.data[firstIndex], this.data[secondIndex]] = [
      this.data[secondIndex],
      this.data[firstIndex],
    ];
  }

  async highlight(index: number) {
    await this.sleep(() => {
      new Konva.Tween({
        node: this.data[index].shape,
        duration: this.getDuration(),
        fill: "#2ec56a",
      }).play();
    });
  }

  async unhighlight(index: number) {
    await this.sleep(() => {
      this.data[index].setAttrs(BaseShape.BASE_SHAPE_CONFIG);
    });
  }

  updateData(index: number, value: number) {
    if (this.data[index]) this.data[index].value = value;
  }

  addData(value: number) {
    const newShape =
      this.type == "circle" ? new Circle(value) : new Column(value);
    newShape.setPosition(this.data.length * (BaseShape.BASE_UNIT + 10), 0);
    newShape.addTo(this._layer);
    this.data.push(newShape);
  }
  async initData(value: number[]) {
    await this.cancel();
    this.data.forEach((item) => item.destroy());
    this.data = value.map((item, i) => {
      const newShape =
        this.type == "circle" ? new Circle(item) : new Column(item);
      newShape.setPosition(i * (BaseShape.BASE_UNIT + 10), 0);
      return newShape;
    });
    this.data.forEach((column) => column.addTo(this._layer));
  }
}
