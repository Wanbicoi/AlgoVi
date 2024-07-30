import { ArrayAlgorithm } from "../../array-algorithm";
import Konva from "konva";

export class HeapSort extends ArrayAlgorithm {
  private textNode: Konva.Text | null = null;

  constructor(layer: Konva.Layer) {
    super(layer, ["Insert", "Init"]);
  }

  async algorithm() {
    this.setText("Building the heap...");
    await this.buildHeap();
    this.setText("Heap built. Starting sort...");

    for (let i = this.data.length - 1; i > 0; i--) {
      this.setText(`Swapping root with element at index ${i}`);
      await this.highlight(0);
      await this.highlight(i);
      await this.swap(0, i);
      await this.unhighlight(0);
      await this.unhighlight(i);
      this.setText(`Heapifying root with size ${i}`);
      await this.heapify(i, 0);
    }
    this.setText("Heap Sort Completed");
  }

  buildHeap = async () => {
    let n = this.data.length;

    for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
      this.setText(`Heapifying subtree rooted at index ${i}`);
      await this.heapify(n, i);
    }
  };

  heapify = async (n: number, i: number) => {
    let largest = i;
    let left = 2 * i + 1;
    let right = 2 * i + 2;

    await this.highlight(i);
    if (left < n) await this.highlight(left);
    if (right < n) await this.highlight(right);

    if (left < n && this.data[left].value > this.data[largest].value) {
      largest = left;
    }

    if (right < n && this.data[right].value > this.data[largest].value) {
      largest = right;
    }

    if (largest !== i) {
      this.setText(`Swapping elements at indices ${i} and ${largest}`);
      await this.swap(i, largest);
      await this.unhighlight(i);
      if (left < n) await this.unhighlight(left);
      if (right < n) await this.unhighlight(right);
      await this.heapify(n, largest);
    } else {
      await this.unhighlight(i);
      if (left < n) await this.unhighlight(left);
      if (right < n) await this.unhighlight(right);
    }
  };

  setText(text: string) {
    if (this.textNode) {
      this.textNode.destroy();
    }

    this.textNode = new Konva.Text({
      text,
      fontSize: 20,
      fontFamily: "Calibri",
      fill: "black",
      x: (this._layer.getCanvas().getWidth() - text.length * 10) / 2,
      y: 40,
    });

    this._layer.add(this.textNode);
  }
}
