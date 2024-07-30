import Konva from "konva";
import { BaseShape } from "./base-shape";

export class Circle extends BaseShape {
  protected initShape(value: number): Konva.Shape {
    return new Konva.Circle({
      ...BaseShape.BASE_SHAPE_CONFIG,
      radius: BaseShape.BASE_UNIT / 2,
    });
  }

  constructor(value: number) {
    super(value);

    this.text.offset({
      x: this.text.width() / 2,
      y: this.text.height() / 2,
    });

    this.text.position({
      x: 0,
      y: 0,
    });
  }
}
