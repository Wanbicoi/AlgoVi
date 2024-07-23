import { BookmarkIcon } from "@radix-ui/react-icons";
import { Button, Flex } from "@radix-ui/themes";
import Konva from "konva";
import { useEffect } from "react";
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
  }, []);
  return (
    <div className="h-screen">
      <Flex mb={"3"}>
        {window.algorithms && window.algorithms.bubbleSort.renderOperations()}
      </Flex>
      <Button
        variant="solid"
        onClick={() => {
          if (window.algorithms) {
            window.algorithms.bubbleSort.executeOperation("Init", [3, 2, 1]);
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
