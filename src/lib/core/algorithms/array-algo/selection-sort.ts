import Konva from "konva";
import { ArrayAlgorithm } from "../../array-algorithm";

export class SelectionSort extends ArrayAlgorithm {
  private textNode: Konva.Text | null = null;

  constructor(layer: Konva.Layer) {
    super(layer, ["Insert", "Init"]);
  }

  async algorithm() {
    const n = this.data.length;

    for (let i = 0; i < n - 1; i++) {
      await this.updateText(`Selecting element at index ${i} as the current minimum.`);
      await this.highlight(i);

      let minIndex = i;
      for (let j = i + 1; j < n; j++) {
        await this.updateText(`Comparing element at index ${j} with the current minimum at index ${minIndex}.`);
        await this.highlight(j);
        if (this.data[j].value < this.data[minIndex].value) {
          minIndex = j;
          await this.updateText(`New minimum found at index ${minIndex} with value ${this.data[minIndex].value}.`);
        }
        await this.unhighlight(j);
      }

      if (minIndex !== i) {
        await this.updateText(`Swapping elements at index ${i} and ${minIndex}.`);
        await this.swap(minIndex, i);
      } else {
        await this.updateText(`No swap needed as the current element is already the minimum.`);
      }

      await this.unhighlight(i);
    }

    await this.updateText('Selection Sort Completed.');
  }

  private async updateText(text: string) {
    if (this.textNode) {
      this.textNode.destroy();
    }

    this.textNode = new Konva.Text({
      text,
      fontSize: 20,
      fontFamily: 'Calibri',
      fill: 'black',
      x: (this._layer.getCanvas().getWidth() - text.length * 10) / 2,
      y: 40,
    });

    this._layer.add(this.textNode);
  }
}
