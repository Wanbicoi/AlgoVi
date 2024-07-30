import Konva from "konva";
import { ArrayAlgorithm } from "../../array-algorithm";

export class BubbleSort extends ArrayAlgorithm {
  private textNode: Konva.Text | null = null; // Store reference to text node

  constructor(layer: Konva.Layer) {
    super(layer, ["Insert", "Init"]);
  }

  async algorithm() {
    let n = this.data.length;

    this.setText("Starting Bubble Sort");

    for (let i = 0; i < n - 1; i++) {
      await this.highlight(i);
      this.setText(`Iterating with index i = ${i}`);

      for (let j = i + 1; j < n; j++) {
        await this.highlight(j);
        this.setText(
          `Comparing indices ${i} and ${j} to find the smaller value`
        );

        if (this.data[i].value > this.data[j].value) {
          this.setText(
            `Swapping ${this.data[i].value} and ${this.data[j].value}`
          );
          await this.swap(i, j);
        }
        await this.unhighlight(j);
      }
      await this.unhighlight(i);
      this.setText(`End of pass ${i + 1}`);
    }

    this.setText("Bubble Sort Completed");
  }

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
