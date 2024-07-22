import Konva from "konva";
import { BaseShape, Column, Circle } from "../components";
import { BaseAlgorithm } from "./base-algorithm";
import { BaseOperation } from "./base-operation";

export abstract class ArrayAlgorithm extends BaseAlgorithm<ArrayAlgorithm> {
  data: BaseShape[];
  constructor(
    layer: Konva.Layer,
    data: number[] = [],
    type: "circle" | "column" = "column",
  ) {
    super(layer);
    this.data = data.map(() =>
      type == "circle" ? new Circle() : new Column({}),
    );
    this.data.forEach((column) => layer.add(column.render));
    this.registerOperation("Insert", new InsertOperation());
    this.registerOperation("Update", new UpdateOperation());
    this.registerOperation("Init", new InitOperation());
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
}

class InsertOperation extends BaseOperation<ArrayAlgorithm> {
  run(algorithm: ArrayAlgorithm, arg: number): void {
    algorithm.data.push({
      value: arg,
      render: Column({
        x: algorithm.data.length * 30,
        y: 5,
        width: 20,
        height: arg * 10 + 30,
      }),
    });
  }
}
class UpdateOperation extends BaseOperation<ArrayAlgorithm> {
  run(algorithm: ArrayAlgorithm, arg: number[]): void {
    algorithm.data[arg[0]].value = arg[1];
  }
}

class InitOperation extends BaseOperation<ArrayAlgorithm> {
  run(algorithm: ArrayAlgorithm, arg: number[]): void {
    algorithm.data = arg.map((item, i) => ({
      value: item,
      render: Column({
        x: i * 30,
        y: 5,
        width: 20,
        height: item * 10 + 30,
      }),
    }));
  }
}
