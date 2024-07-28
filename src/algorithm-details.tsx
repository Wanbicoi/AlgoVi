/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-var */
import {
  TrackNextIcon,
  TrackPreviousIcon,
  PauseIcon,
  PlayIcon,
  ResetIcon,
} from "@radix-ui/react-icons";
import { Button, Flex, Slider, Text, Select, Popover } from "@radix-ui/themes";
import Konva from "konva";
import { ReactNode, useEffect, useState } from "react";
import { AlgorithmName, Operation, algorithms } from "./lib/core/algorithms";
import Header from "./lib/components/common/header";
import { useParams } from "react-router-dom";
import { BaseAlgorithm } from "./lib/core/base-algorithm";

export default function AlgorithmDetails() {
  const { algorithmName } = useParams() as { algorithmName: AlgorithmName };

  const [isRunning, setIsRunning] = useState(false);
  const [showOperations, setShowOperations] = useState(false);
  const [algorithm, setAlgorithm] = useState<BaseAlgorithm>();

  useEffect(() => {
    const stage = new Konva.Stage({
      container: "container",
      width: window.innerWidth / 2,
      height: window.innerHeight / 2,
    });

    const layer = new Konva.Layer();
    stage.add(layer);
    const algo = algorithms(layer);
    setAlgorithm(algo[algorithmName]);
  }, []);

  const handlePopoverOpenChange = (open: boolean) => {
    setShowOperations(open);
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100 dark:bg-gray-900">
      <Header />
      <div className="flex-grow flex items-center justify-center">
        <div
          id="container"
          className="flex justify-center items-center w-full h-full bg-gray-200 dark:bg-gray-800"
        ></div>
      </div>

      <div className="fixed bottom-0 w-full bg-white dark:bg-gray-800">
        <Flex
          gap="3"
          className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md items-center justify-center"
        >
          <Select.Root defaultValue={algorithmName}>
            <Select.Trigger />
            <Select.Content>
              <Select.Group>
                <Select.Item value="orange">Selection sort</Select.Item>
                <Select.Item value="apple">Insertion sort</Select.Item>
              </Select.Group>
            </Select.Content>
          </Select.Root>

          <Text className="text-black dark:text-white">Speed:</Text>
          <Slider defaultValue={[50]} max={100} step={1} className="w-36" />
          <TrackPreviousIcon
            className="text-black dark:text-white"
            onClick={() => algorithm?.increaseSpeed(-0.25)}
          />

          {isRunning ? (
            <PauseIcon
              className="text-black dark:text-white"
              onClick={() => {
                algorithm?.stop();
                setIsRunning(false);
              }}
            />
          ) : (
            <PlayIcon
              className="text-black dark:text-white"
              onClick={() => {
                algorithm?.run();
                setIsRunning(true);
              }}
            />
          )}

          <TrackNextIcon
            className="text-black dark:text-white"
            onClick={() => algorithm?.increaseSpeed()}
          />
          <Button
            variant="solid"
            onClick={() => {
              algorithm?.run();
              setIsRunning(!!algorithm?.isRunning);
            }}
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
          >
            {isRunning ? <PauseIcon /> : <PlayIcon />}
            {isRunning ? "Stop" : "Run"}
          </Button>

          <Button
            variant="soft"
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
          >
            <ResetIcon />
            Reset
          </Button>

          <Popover.Root
            open={showOperations}
            onOpenChange={handlePopoverOpenChange}
          >
            <Popover.Trigger>
              <Button
                variant="soft"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                onClick={() => setShowOperations(!showOperations)}
              >
                {showOperations}
                Operations
              </Button>
            </Popover.Trigger>
            <Popover.Content sideOffset={5}>
              <Flex gap="2" direction="column">
                {showOperations && (
                  <Flex gap="2" direction="column">
                    <Operation
                      algorithmName={algorithmName}
                      algorithm={algorithm!}
                    />
                  </Flex>
                )}
              </Flex>
            </Popover.Content>
          </Popover.Root>
        </Flex>
      </div>
    </div>
  );
}
