import { BookmarkIcon } from "@radix-ui/react-icons";
import { Button } from "@radix-ui/themes";
import Konva from "konva";
import { useEffect } from "react";
import { algorithms } from "./lib/core/algorithms";

export default function App() {
  useEffect(() => {
    var stage = new Konva.Stage({
      container: "container",
      width: window.innerWidth,
      height: window.innerHeight,
    });

    var layer = new Konva.Layer();
    stage.add(layer);
    algorithms(layer).bubbleSort.run();
  }, []);
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
