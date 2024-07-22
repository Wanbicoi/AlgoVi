import Konva from "konva";
import { BaseShape, ShapeConfig } from "./base-shape";

interface ColumnConfig extends ShapeConfig {
  width?: number;
  height?: number;
}

export class Column extends BaseShape {
  protected config: ColumnConfig;

  constructor(config: ColumnConfig) {
    super(config);
    this.config = {
      ...config,
      width: 100,
      height: 50,
    };
  }

  protected initShape(): void {
    this.shape = new Konva.Rect({
      width: this.config.width,
      height: this.config.height,
      fill: this.config.fill,
      stroke: this.config.stroke,
      strokeWidth: this.config.strokeWidth,
    });
    this.group.add(this.shape);
  }
}
