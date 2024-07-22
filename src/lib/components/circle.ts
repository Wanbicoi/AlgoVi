import Konva from "konva";
import { BaseShape, ShapeConfig } from "./base-shape";

interface CircleNodeConfig extends ShapeConfig {
  radius?: number;
}

export class Circle extends BaseShape {
  protected config: CircleNodeConfig;

  constructor(config?: CircleNodeConfig) {
    super(config);
    this.config = {
      ...config,
      radius: 50,
    };

    this.textNode.position({
      x: 0,
      y: 0,
    });
    this.textNode.width(this.config.radius! * 2);
    this.textNode.height(this.config.radius! * 2);
  }

  protected initShape(): void {
    this.shape = new Konva.Circle({
      x: this.config.radius,
      y: this.config.radius,
      radius: this.config.radius,
      fill: this.config.fill,
      stroke: this.config.stroke,
      strokeWidth: this.config.strokeWidth,
    });
    this.group.add(this.shape);
  }
}
