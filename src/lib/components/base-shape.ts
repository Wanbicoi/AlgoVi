import Konva from "konva";

export abstract class BaseShape {
  static BASE_UNIT = 40;
  static BASE_SHAPE_CONFIG = {
    fontSize: 18,
    fill: "transparent",
    stroke: "black",
    strokeWidth: 1,
    textColor: "black",
    cornerRadius: 5,
  };

  shape!: Konva.Shape;
  protected textNode: Konva.Text;
  protected group: Konva.Group;

  constructor(value: number) {
    this.group = new Konva.Group();
    this.shape = this.initShape(value);
    this.group.add(this.shape);
    this.textNode = new Konva.Text({
      ...BaseShape.BASE_SHAPE_CONFIG,
      verticalAlign: "middle",
      align: "center",
      fill: "black",
      text: value.toString(),
      width: BaseShape.BASE_UNIT,
      height: BaseShape.BASE_UNIT,
    });
    this.group.add(this.textNode);
  }

  protected abstract initShape(value: number): Konva.Shape;

  addTo(layer: Konva.Layer): void {
    layer.add(this.group);
  }

  get value(): number {
    return parseInt(this.textNode.text());
  }

  set value(value: number) {
    this.textNode.text(value.toString());
  }

  setAttrs(config: Konva.ShapeConfig) {
    this.shape.setAttrs(config);
  }

  get render(): Konva.Group {
    return this.group;
  }

  setPosition(x: number, y: number): void {
    this.group.position({ x, y });
  }

  get position(): { x: number; y: number } {
    return { x: this.group.position().x, y: this.group.position().y };
  }

  destroy() {
    this.group.destroyChildren();
    this.group.destroy();
  }
}
