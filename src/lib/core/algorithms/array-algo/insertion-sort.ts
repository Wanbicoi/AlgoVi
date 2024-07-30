import Konva from "konva";
import { ArrayAlgorithm } from "../../array-algorithm";

export class InsertionSort extends ArrayAlgorithm {
  private textNode: Konva.Text | null = null;

  constructor(layer: Konva.Layer) {
    super(layer, ["Insert", "Init"]);
  }

  async algorithm() {
    const n = this.data.length;

    for (let i = 1; i < n; i++) {
      const key = this.data[i].value;
      let j = i - 1;

      await this.updateText(
        `Inserting element at index ${i} with value ${key}...`
      );
      await this.highlight(i);

      while (j >= 0 && this.data[j].value > key) {
        await this.updateText(
          `Comparing and shifting element at index ${j}...`
        );

        // Swap or move elements for visualization purposes
        await this.highlight(j);
        await this.swap(j + 1, j);
        await this.unhighlight(j);

        j--;
      }

      this.data[j + 1].value = key;
      await this.updateText(
        `Inserted element at index ${j + 1} with value ${key}.`
      );
      await this.unhighlight(i);
    }

    await this.updateText("Insertion Sort Completed.");
  }

  private async updateText(text: string) {
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
    this._layer.batchDraw(); // Redraw the layer to display the new text
  }
}
