import { BookmarkIcon } from "@radix-ui/react-icons";
import { Button } from "@radix-ui/themes";
import Konva from "konva";

export default function App() {
  return (
    <div className="flex justify-center items-center h-screen">
      <Button
        variant="solid"
        onClick={() => {
          {
            var width = window.innerWidth;
            var height = window.innerHeight;

            var stage = new Konva.Stage({
              container: "container",
              width: width,
              height: height,
            });

            var layer = new Konva.Layer();
            stage.add(layer);

            bubbleSort([40, 2, 4, 1, 2, 5], layer);
          }
        }}
      >
        <BookmarkIcon />
        Run
      </Button>
      <div id="container"></div>
    </div>
  );
}

const sleep = (ms = 1000) => new Promise((r) => setTimeout(r, ms));

export async function bubbleSort(arr: number[], layer: Konva.Layer) {
  let a = 0;
  const columns = arr.map((item, i) => {
    a = i * 30;
    return new Konva.Rect({
      x: a,
      y: 5,
      width: 20,
      height: item * 10,
      fill: "green",
      stroke: "black",
      strokeWidth: 2,
      cornerRadius: 5,
    });
  });
  columns.forEach((column) => layer.add(column));

  let n = arr.length;
  for (let i = 0; i < n - 1; i++) {
    new Konva.Tween({
      node: columns[i],
      duration: 0.3,
      fill: "red",
    }).play();
    await sleep(300);
    for (let j = i + 1; j < n; j++) {
      new Konva.Tween({ node: columns[j], duration: 0.3, fill: "red" }).play();
      await sleep(300);

      if (arr[i] > arr[j]) {
        [arr[i], arr[j]] = [arr[j], arr[i]];
        [columns[i], columns[j]] = [columns[j], columns[i]];
        new Konva.Tween({
          node: columns[j],
          duration: 0.5,
          x: columns[i].getPosition().x,
          y: columns[i].getPosition().y,
        }).play();
        new Konva.Tween({
          node: columns[i],
          duration: 0.5,
          x: columns[j].getPosition().x,
          y: columns[j].getPosition().y,
        }).play();
      }
      await sleep();

      new Konva.Tween({
        node: columns[j],
        duration: 0,
        fill: "green",
      }).play();
    }

    new Konva.Tween({
      node: columns[i],
      fill: "green",
    }).play();
  }
  return arr;
}
