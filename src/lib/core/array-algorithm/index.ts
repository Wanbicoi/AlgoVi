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
  delete(value: number) {
    const index = this.data.findIndex((item) => item.value == value);
    if (index !== -1) {
      this.data.splice(index, 1);
      this.data.forEach((column, i) => {
        column.setPosition(i * (BaseShape.BASE_UNIT + 10), 0);
      });
    }
  }

  async swap(firstIndex: number, secondIndex: number) {
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
    await this.sleep();

    [this.data[firstIndex], this.data[secondIndex]] = [
      this.data[secondIndex],
      this.data[firstIndex],
    ];
  }

  async highlight(index: number) {
    new Konva.Tween({
      node: this.data[index].shape,
      duration: this.getDuration(),
      fill: "#2ec56a",
    }).play();
    await this.sleep();
  }

  async unhighlight(index: number) {
    this.data[index].setAttrs(BaseShape.BASE_SHAPE_CONFIG);
    await this.sleep();
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
  initData(value: number[]) {
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
