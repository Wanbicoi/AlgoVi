import Konva from "konva";

export interface IBaseAlgorithm {
  run: () => void;
}
export interface ISwap {
  swap: (firstIndex: number, secondIndex: number) => void;
}
export interface IHighlight {
  highlight: (index: number) => void;
  unhighlight: (index: number) => void;
}
export interface IHighlightWithCursor {
  highlightWithCursor: (index: number) => void;
  unhighlightWithCursor: (index: number) => void;
}
export class BaseAlgorithm {
  speed: number;

  layer: Konva.Layer;
  constructor(layer: Konva.Layer, speed: number = 1) {
    this.speed = speed;
    this.layer = layer;
  }
  getDuration = () => 0.3 * this.speed;
  sleep = (ms = this.getDuration() + 500) =>
    new Promise((r) => setTimeout(r, ms));
}
