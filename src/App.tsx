/* eslint-disable no-var */
import { TrackNextIcon, TrackPreviousIcon, BookmarkIcon, PauseIcon, PlayIcon, ResetIcon } from "@radix-ui/react-icons";
import { Button, Flex, Slider, Text, Select } from "@radix-ui/themes";
import Konva from "konva";
import { ReactNode, useEffect, useState, useRef } from "react";
import { algorithms } from "./lib/core/algorithms";
import Header from "./lib/components/common/header";

export default function App() {
  const [isRunning, setIsRunning] = useState(false);
  const [showOperations, setShowOperations] = useState(false);

  useEffect(() => {
    var stage = new Konva.Stage({
      container: "container",
      width: window.innerWidth / 2,
      height: window.innerHeight / 2,
    });

    var layer = new Konva.Layer();
    stage.add(layer);
    window.algorithms = algorithms(layer);
    setOperations(window.algorithms.bubbleSort.renderOperations());
  }, []);
  const [operations, setOperations] = useState<ReactNode>([]);

  // const runAlgorithm = () => {
  //   setIsRunning(true);
  // };
  // const stopAlgorithm = () => {
  //   setIsRunning(false);
  // };

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <Header />
      <div id="container" className="flex items-center justify-center w-full h-full bg-gray-200 p-4 rounded-lg shadow-md">
      </div>

  <Flex direction="column" gap="3" className="p-6 bg-white rounded-lg shadow-md">
    <Flex gap="3" align="center">
      <Select.Root>
        <Select.Content>
          <Select.Item value="selection">Selection Sort</Select.Item>
          <Select.Item value="bubble">Bubble Sort</Select.Item>
          <Select.Item value="insertion">Insertion Sort</Select.Item>
          {/* Add more algorithm options here */}
        </Select.Content>
      </Select.Root>
      <Button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        Generate Random Array
      </Button>
      <Text>Speed:</Text>
      <Slider
        defaultValue={[0,50]}
        max={100}
        step={1}
        className="w-20"
      />
      <TrackPreviousIcon />
      <PlayIcon />
      <TrackNextIcon />
      <Button variant="solid" onClick={() => {
        if (window.algorithms) {
          window.algorithms.bubbleSort.run();
        }
      }} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
        {isRunning ? <PauseIcon /> : <PlayIcon />}
        {isRunning ? 'Stop' : 'Run'}
      </Button>

      <Button variant="soft" className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
        <ResetIcon />
        Reset
      </Button>
      <div className="relative">
          <Button
            variant="soft"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={() => setShowOperations(!showOperations)}
          >
            {showOperations ? 'Hide Operations' : 'Show Operations'}
          </Button>
          {showOperations && (
            <div className="w-96 absolute bottom-full right-0 mb-2 bg-white p-2 border border-gray-300 rounded shadow-md">
              <Flex gap="2" direction="column">
                {operations}
              </Flex>
            </div>
          )}
        </div>

    </Flex>
   
  </Flex>
    </div>
  );
}
