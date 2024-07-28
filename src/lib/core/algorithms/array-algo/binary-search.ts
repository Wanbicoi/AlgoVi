import { ArrayAlgorithm } from "../../array-algorithm";
import Konva from "konva";

export class BinarySearch extends ArrayAlgorithm {
  constructor(layer: Konva.Layer) {
    super(layer, ["Insert", "Init", "Search"]);
  }

  isIncreasing = () => {
    let n = this.data.length;
    for (let i = 0; i < n - 1; i++) {
      if (this.data[i].value > this.data[i + 1].value) {
        return false;
      }
    }
    return true;
  };

  async search(number: number) {
    if (!this.isIncreasing()) {
      throw new Error("Array is not sorted!");
    }

    let n = this.data.length;
    let low = 0;
    let high = n - 1;

    while (low <= high) {
      let middle = Math.floor((low + high) / 2);
      await this.highlight(middle);

      if (this.data[middle].value === number) {
        await this.highlight(middle);
      } else if (this.data[middle].value < number) {
        low = middle + 1;
      } else {
        high = middle - 1;
      }

      await this.unhighlight(middle);
    }
  }

  async algorithm() {
    // do nothing
  }
}
