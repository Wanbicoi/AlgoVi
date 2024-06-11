import Konva from "konva";
import { Column } from "../components";
import {
  BaseAlgorithm,
  IHighlight,
  IHighlightWithCursor,
  ISwap,
} from "./base-algorithm";

export class SortingAlgorithm
  extends BaseAlgorithm
  implements ISwap, IHighlight, IHighlightWithCursor
{
  data: {
    value: number;
    render: Konva.Rect;
  }[];
  constructor(data: number[], layer: Konva.Layer) {
    super(layer);
    this.data = data.map((item, i) => ({
      value: item,
      render: Column({
        x: i * 30,
        y: 5,
        width: 20,
        height: item * 10 + 30,
      }),
    }));
    this.data.forEach((column) => layer.add(column.render));
  }
  async swap(firstIndex: number, secondIndex: number) {
    new Konva.Tween({
      node: this.data[firstIndex].render,
      duration: this.getDuration(),
      x: this.data[secondIndex].render.getPosition().x,
      y: this.data[secondIndex].render.getPosition().y,
    }).play();
    new Konva.Tween({
      node: this.data[secondIndex].render,
      duration: this.getDuration(),
      x: this.data[firstIndex].render.getPosition().x,
      y: this.data[firstIndex].render.getPosition().y,
    }).play();
    await this.sleep();

    [this.data[firstIndex], this.data[secondIndex]] = [
      this.data[secondIndex],
      this.data[firstIndex],
    ];
  }

  async highlight(index: number) {
    new Konva.Tween({
      node: this.data[index].render,
      duration: this.getDuration(),
      fill: "red",
    }).play();
    await this.sleep();
  }

  async unhighlight(index: number) {
    this.data[index].render.setAttr("fill", "green");
    await this.sleep();
  }

  highlightWithCursor = (index: number) => {};
  unhighlightWithCursor = (index: number) => {};
}
