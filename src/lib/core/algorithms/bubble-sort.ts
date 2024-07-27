/* eslint-disable prefer-const */
import Konva from "konva";
import { ArrayAlgorithm } from "../array-algorithm";

export class BubbleSort extends ArrayAlgorithm {
  constructor(layer: Konva.Layer) {
    super(layer, ["Insert", "Init"]);
  }
  async algorithm() {
    let n = this.data.length;
    for (let i = 0; i < n - 1; i++) {
      await this.checkPause();
      await this.highlight(i);
      for (let j = i + 1; j < n; j++) {
        await this.checkPause();
        await this.highlight(j);
        if (this.data[i].value > this.data[j].value) {
          await this.swap(i, j);
        }
        await this.unhighlight(j);
      }
      await this.unhighlight(i);
    }
  }
}
