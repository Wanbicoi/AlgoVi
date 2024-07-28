import { ArrayAlgorithm } from "../../array-algorithm";
import Konva from "konva";

export class QuickSort extends ArrayAlgorithm {
  constructor(layer: Konva.Layer) {
    super(layer, ["Insert", "Init"]);
  }

  async algorithm() {
    await this.quickSort(0, this.data.length - 1);
  }

  async quickSort(low: number, high: number) {
    if (low < high) {
      let pi = await this.partition(low, high);

      await this.quickSort(low, pi - 1);
      await this.quickSort(pi + 1, high);
    }
  }

  async partition(low: number, high: number) {
    let middle = Math.floor((low + high) / 2);
    await this.highlight(middle);
    await this.swap(middle, high);
    let pivot = this.data[high].value;
    let i = low - 1;

    for (let j = low; j < high; j++) {
      await this.highlight(j);
      if (this.data[j].value < pivot) {
        i++;
        await this.swap(i, j);
        await this.unhighlight(i);
      }

      await this.unhighlight(j);
    }

    await this.swap(i + 1, high); // Move pivot to its correct place
    await this.unhighlight(i + 1);
    return i + 1;
  }
}
