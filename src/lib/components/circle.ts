import Konva from "konva";
import { BaseShape } from "./base-shape";
export class Circle extends BaseShape {
  protected initShape(): Konva.Shape {
    return new Konva.Circle({
      ...BaseShape.BASE_SHAPE_CONFIG,
      radius: BaseShape.BASE_UNIT / 2,
    });
  }

  constructor(value: number) {
    super(value);
    this.textNode.offset({
      x: this.textNode.width() / 2,
      y: this.textNode.height() / 2,
    });
    this.textNode.position({
      x: 0,
      y: 0,
    });
  }
}
