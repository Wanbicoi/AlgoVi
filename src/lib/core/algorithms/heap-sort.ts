import { ArrayAlgorithm } from "../array-algorithm";

export class HeapSort extends ArrayAlgorithm {
  async run() {
    await this.buildHeap();

    for (let i = this.data.length - 1; i > 0; i--) {
      await this.checkPause();
      await this.swap(0, i);
      await this.heapify(i, 0);
    }
  }

  buildHeap = async () => {
    let n = this.data.length;

    for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
      await this.checkPause();
      await this.heapify(n, i);
    }
  };

  heapify = async (n: number, i: number) => {
    let largest = i;
    let left = 2 * i + 1;
    let right = 2 * i + 2;

    if (left < n && this.data[left].value > this.data[largest].value) {
      largest = left;
    }

    if (right < n && this.data[right].value > this.data[largest].value) {
      largest = right;
    }

    if (largest !== i) {
      await this.checkPause();
      await this.swap(i, largest);
      await this.heapify(n, largest);
    }
  };
}
