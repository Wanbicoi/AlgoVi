import Konva from "konva";
import { BaseShape } from "./base-shape";

export class Circle extends BaseShape {
  protected initShape(): Konva.Shape {
    return new Konva.Circle({
      ...BaseShape.BASE_SHAPE_CONFIG,
      radius: BaseShape.BASE_UNIT / 2,
    });
  }
}
