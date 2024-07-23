import Konva from "konva";
import { BaseShape } from "./base-shape";

export class Column extends BaseShape {
  protected initShape(value: number): Konva.Shape {
    return new Konva.Rect({
      ...BaseShape.BASE_SHAPE_CONFIG,
      height: value * BaseShape.BASE_UNIT,
      width: BaseShape.BASE_UNIT,
    });
  }
}
