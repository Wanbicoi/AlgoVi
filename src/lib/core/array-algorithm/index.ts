import Konva from "konva";
import { BaseShape, Circle, Column } from "../../components";
import { BaseAlgorithm } from "../base-algorithm";
import { OperationType } from "../base-operation";

export abstract class ArrayAlgorithm extends BaseAlgorithm {
  protected data: BaseShape[];
  protected type: "circle" | "column" | "square";

  constructor(
    layer: Konva.Layer,
    operations: OperationType[],
    type: "circle" | "column" = "column"
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

  async deserialize(json: string): Promise<void> {
    this.data.forEach((item) => item.destroy());
    const data = JSON.parse(json) as string[];
    this.data = data.map((item: string) =>
      this.type == "circle" ? new Circle(0, item) : new Column(0, item)
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
      return new Promise<void>((resolve) => {
        new Konva.Tween({
          node: this.data[index].shape,
          duration: this.getDuration(),
          fill: "#2ec56a",
          onFinish: resolve,
        }).play();
      });
    });
  }

  async unhighlight(index: number) {
    await this.sleep(() => {
      return new Promise<void>((resolve) => {
        new Konva.Tween({
          node: this.data[index].shape,
          duration: this.getDuration(),
          fill: BaseShape.BASE_SHAPE_CONFIG.fill,
          onFinish: resolve,
        }).play();
      });
    });
  }
  updateData(index: number, value: number) {
    if (this.data[index]) this.data[index].value = value;
  }

  addData(value: number) {
    // Determine the x position for the new shape
    const spacing = 10;
    const elementWidth = BaseShape.BASE_UNIT;
    const lastElement = this.data[this.data.length - 1];
    const x = lastElement
      ? lastElement.position.x + elementWidth + spacing
      : (this._layer.getCanvas().getWidth() - elementWidth) / 2;
    const y = lastElement ? lastElement.position.y : 200;

    const newShape =
      this.type === "circle" ? new Circle(value) : new Column(value);
    newShape.setPosition(x, y);
    newShape.addTo(this._layer);
    this.data.push(newShape);
  }
  
  async initData(value: number[]) {
    await this.cancel();
    this.data.forEach((item) => item.destroy());

    const canvasWidth = this._layer.getCanvas().getWidth();
    const elementWidth = BaseShape.BASE_UNIT;
    const spacing = 10;
    const totalWidth =
      value.length * elementWidth + (value.length - 1) * spacing;

    const x = (canvasWidth - totalWidth) / 2;
    const y = 200;

    this.data = value.map((item, i) => {
      const newShape =
        this.type === "circle" ? new Circle(item) : new Column(item);
      newShape.setPosition(x + i * (elementWidth + spacing), y);
      newShape.addTo(this._layer);
      return newShape;
    });
  }

  async search(value: number) {
    for (let i = 0; i < this.data.length; i++) {
      await this.highlight(i);
      if (this.data[i].value == value) {
        return i;
      }
      await this.unhighlight(i);
    }
    return;
  }
}
