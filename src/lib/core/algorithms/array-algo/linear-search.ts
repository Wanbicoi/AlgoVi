import { ArrayAlgorithm } from "../../array-algorithm";
import Konva from "konva";

export class LinearSearch extends ArrayAlgorithm {
  constructor(layer: Konva.Layer) {
    super(layer, ["Insert", "Init", "Search"]);
  }
  async search(number: number) {
    console.log("searching for", number);
    let n = this.data.length;
    for (let i = 0; i < n; i++) {
      await this.highlight(i);
      if (this.data[i].value === number) {
        await this.highlight(i);
        return;
      }
      await this.unhighlight(i);
    }
  }

  async algorithm() {
    // do nothing
  }
}
