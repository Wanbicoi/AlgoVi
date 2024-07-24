import { ArrayAlgorithm } from "../array-algorithm";

export class BinarySearch extends ArrayAlgorithm {
  async run(number: number) {
    let n = this.data.length;
    let low = 0;
    let high = n - 1;

    while (low <= high) {
      await this.checkPause();
      let middle = Math.floor((low + high) / 2);
      await this.highlight(middle);

      if (this.data[middle].value === number) {
        return middle;
      } else if (this.data[middle].value < number) {
        low = middle + 1;
      } else {
        high = middle - 1;
      }

      await this.unhighlight(middle);
    }

    return -1;
  }
}
