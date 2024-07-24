import { BookmarkIcon } from "@radix-ui/react-icons";
import { Button } from "@radix-ui/themes";
import Konva from "konva";
import { ReactNode, useEffect, useState } from "react";
import { algorithms } from "./lib/core/algorithms";

export default function App() {
  useEffect(() => {
    var stage = new Konva.Stage({
      container: "container",
      width: window.innerWidth,
      height: window.innerHeight / 2,
    });

    var layer = new Konva.Layer();
    stage.add(layer);
    window.algorithms = algorithms(layer);
    setOperations(window.algorithms.bubbleSort.renderOperations());
  }, []);
  const [operations, setOperations] = useState<ReactNode>([]);
  return (
    <div className="h-screen">
      {operations}
      <Button
        variant="solid"
        onClick={() => {
          if (window.algorithms) {
            window.algorithms.bubbleSort.run();
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
