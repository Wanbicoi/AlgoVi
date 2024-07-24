import { ArrayAlgorithm } from "../array-algorithm";

export class SelectionSort extends ArrayAlgorithm {
  async run() {
    let n = this.data.length;

    for (let i = 0; i < n - 1; i++) {
      await this.checkPause();
      await this.highlight(i);

      let minIndex = i;
      for (let j = i + 1; j < n; j++) {
        await this.checkPause();
        await this.highlight(j);
        if (this.data[j].value < this.data[minIndex].value) {
          minIndex = j;
        }
        await this.unhighlight(j);
      }

      if (minIndex !== i) {
        await this.checkPause();
        this.swap(minIndex, i);
      }

      await this.unhighlight(i);
    }
  }
}
