import { ArrayAlgorithm } from "../../array-algorithm";
import Konva from "konva";

export class QuickSort extends ArrayAlgorithm {
  private textNode: Konva.Text | null = null; // Store reference to text node

  constructor(layer: Konva.Layer) {
    super(layer, ["Insert", "Init"]);
  }

  async algorithm() {
    this.setText("Starting Quick Sort");
    await this.quickSort(0, this.data.length - 1);
    this.setText("Quick Sort Completed");
  }

  async quickSort(low: number, high: number) {
    if (low < high) {
      this.setText(`Partitioning from index ${low} to ${high}`);
      let pi = await this.partition(low, high);

      this.setText(`Quick Sorting left partition from ${low} to ${pi - 1}`);
      await this.quickSort(low, pi - 1);

      this.setText(`Quick Sorting right partition from ${pi + 1} to ${high}`);
      await this.quickSort(pi + 1, high);
    }
  }

  async partition(low: number, high: number) {
    let middle = Math.floor((low + high) / 2);
    this.setText(`Choosing middle element at index ${middle} as pivot`);
    await this.highlight(middle);
    await this.swap(middle, high);
    let pivot = this.data[high].value;
    this.setText(`Pivot is ${pivot}`);
    let i = low - 1;

    for (let j = low; j < high; j++) {
      await this.highlight(j);
      this.setText(`Comparing element at index ${j} with pivot`);

      if (this.data[j].value < pivot) {
        i++;
        this.setText(`Swapping elements at indices ${i} and ${j}`);
        await this.swap(i, j);
        await this.unhighlight(i);
      }

      await this.unhighlight(j);
    }

    this.setText(`Placing pivot in the correct position at index ${i + 1}`);
    await this.swap(i + 1, high); // Move pivot to its correct place
    await this.unhighlight(i + 1);

    return i + 1;
  }

  setText(text: string) {
    if (this.textNode) {
      this.textNode.destroy(); // Remove the previous text node
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
