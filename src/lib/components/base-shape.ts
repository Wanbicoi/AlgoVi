import Konva from "konva";

export interface ShapeConfig {
  x?: number;
  y?: number;
  text?: string;
  fontSize?: number;
  fontFamily?: string;
  fill?: string;
  stroke?: string;
  strokeWidth?: number;
  textColor?: string;
}

export abstract class BaseShape {
  protected config: ShapeConfig;
  protected shape!: Konva.Shape;
  protected textNode: Konva.Text;
  protected group: Konva.Group;

  constructor(config: ShapeConfig) {
    this.config = {
      x: 0,
      y: 0,
      text: "",
      fontSize: 18,
      fontFamily: "Arial",
      fill: "lightgray",
      stroke: "black",
      strokeWidth: 2,
      textColor: "black",
      ...config,
    };

    this.group = new Konva.Group({
      x: this.config.x,
      y: this.config.y,
    });

    this.initShape();
    this.textNode = new Konva.Text({
      text: this.config.text,
      fontSize: this.config.fontSize,
      fontFamily: this.config.fontFamily,
      fill: this.config.textColor,
      align: "center",
      verticalAlign: "middle",
    });
    this.group.add(this.textNode);
  }

  protected abstract initShape(): void;

  addTo(layer: Konva.Layer): void {
    layer.add(this.group);
  }

  get value(): number {
    return parseInt(this.textNode.text());
  }

  set value(value: number) {
    this.textNode.text(value.toString());
  }

  position(x: number, y: number): void {
    this.group.position({ x, y });
  }
}
