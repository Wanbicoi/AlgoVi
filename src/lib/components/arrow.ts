import Konva from "konva";
import { BaseShape } from "./base-shape";

export class Arrow extends BaseShape {
  protected initShape(): Konva.Shape {
    return new Konva.Arrow({
      ...BaseShape.BASE_SHAPE_CONFIG,
      points: [],
      pointerLength: 10,
      pointerWidth: 10,
      fill: "black",
      stroke: "black",
      strokeWidth: 2,
    });
  }

  updatePoints(
    startX: number,
    startY: number,
    endX: number,
    endY: number
  ): void {
    const arrow = this.shape as Konva.Arrow;
    arrow.points([startX, startY, endX, endY]);
  }

  setPointsFromShapes(startShape: BaseShape, endShape: BaseShape): void {
    const startX = startShape.render.x();
    const startY = startShape.render.y() + BaseShape.BASE_UNIT / 2;
    const endX = endShape.render.x();
    const endY = endShape.render.y() - BaseShape.BASE_UNIT / 2;

    console.log(startX, startY, endX, endY);

    this.updatePoints(startX, startY, endX, endY);
  }
}
