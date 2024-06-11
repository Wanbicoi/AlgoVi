import { BookmarkIcon } from "@radix-ui/react-icons";
import { Button } from "@radix-ui/themes";
import Konva from "konva";
// import { BubbleSort } from "./lib/core/algorithms";
import { SelectionSort } from "./lib/core/algorithms/selection-sort";

export default function App() {
  return (
    <div className="flex justify-center items-center h-screen">
      <Button
        variant="solid"
        onClick={() => {
          {
            var stage = new Konva.Stage({
              container: "container",
              width: window.innerWidth,
              height: window.innerHeight,
            });

            var layer = new Konva.Layer();
            stage.add(layer);

            new SelectionSort([3, 1, 0, 10, 6, 1, 3], layer).run();
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
