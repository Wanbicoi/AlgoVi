import { ArrayAlgorithm } from "../array-algorithm";

export class QuickSort extends ArrayAlgorithm {
  async run() {
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
    let pivot = this.data[middle].value;
    let i = low - 1;

    for (let j = low; j < high; j++) {
      await this.checkPause();
      await this.highlight(j);
      if (this.data[j].value < pivot) {
        i++;
        await this.swap(i, j);
      }
      await this.unhighlight(j);
    }

    await this.swap(i + 1, high);
    return i + 1;
  }
}
