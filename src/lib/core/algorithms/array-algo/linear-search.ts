import { ArrayAlgorithm } from "../../array-algorithm";
import Konva from "konva";

export class LinearSearch extends ArrayAlgorithm {
  constructor(layer: Konva.Layer) {
    super(layer, ["Insert", "Init", "Search"]);
  }
  async algorithm() {}
}
