import Konva from "konva";
import { ArrayAlgorithm } from "../array-algorithm";

export class SelectionSort extends ArrayAlgorithm {
  constructor(layer: Konva.Layer) {
    super(layer, ["Insert", "Init"]);
  }
  async algorithm() {
    let n = this.data.length;

    for (let i = 0; i < n - 1; i++) {
      await this.highlight(i);
      // Find the minimum element in the remaining unsorted array
      let minIndex = i;
      for (let j = i + 1; j < n; j++) {
        await this.highlight(j);
        if (this.data[j].value < this.data[minIndex].value) {
          minIndex = j;
        }
        await this.unhighlight(j);
      }

      // Swap the found minimum element with the first element
      if (minIndex !== i) this.swap(minIndex, i);

      await this.unhighlight(i);
    }
  }
}
