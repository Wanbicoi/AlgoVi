/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Flex, TextField } from "@radix-ui/themes";
import { ArrayAlgorithm } from ".";
import * as Form from "@radix-ui/react-form";
import { ArrowRightIcon } from "@radix-ui/react-icons";
import { ReactNode, useRef, useState } from "react";
import { OperationType } from "../base-operation";

type Props = {
  algorithm: ArrayAlgorithm;
};

export default function ArrayOperaions({ algorithm }: Props) {
  const operations: Record<OperationType, ReactNode> = {
    Insert: <InitOperation algorithm={algorithm} key="init" />,
    Update: <UpdateOperation algorithm={algorithm} key="update" />,
    Init: <InsertOperation algorithm={algorithm} key="insert" />,
    Search: undefined,
  };
  return (Object.keys(operations) as OperationType[])
    .filter((operationName) => algorithm.operations.includes(operationName))
    .map((operationName) => operations[operationName]);
}

type OperationProps = {
  algorithm: ArrayAlgorithm;
};

function InsertOperation({ algorithm }: OperationProps) {
  const formRef = useRef<HTMLFormElement>(null);
  return (
    <Form.Root
      ref={formRef}
      onSubmit={(event) => {
        event.preventDefault();
        const data = Object.fromEntries(
          new FormData(event.currentTarget)
        ) as any;
        algorithm.addData(data.value);
        formRef.current?.reset();
      }}
    >
      <Flex gap="2">
        <Form.Field name="value" className="w-5/6 flex gap-2 items-center">
          <Form.Label className="w-1/4">Insert: </Form.Label>
          <div className="flex-1">
            <Form.Control asChild className="w-3/4">
              <TextField.Root
                required
                type="number"
                placeholder="value"
                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-500"
              />
            </Form.Control>
            <Form.Message match="valueMissing">Please enter value</Form.Message>
          </div>
        </Form.Field>
        <Form.Submit asChild className="w-1/6">
          <Button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            <ArrowRightIcon />
          </Button>
        </Form.Submit>
      </Flex>
    </Form.Root>
  );
}
function InitOperation({ algorithm }: OperationProps) {
  const [value, setValue] = useState<string>();
  return (
    <Form.Root
      onSubmit={(event) => {
        event.preventDefault();
        const data = Object.fromEntries(
          new FormData(event.currentTarget)
        ) as any;
        algorithm.initData(
          (data.value as string).split(",").map((item) => parseInt(item))
        );
      }}
    >
      <Flex gap="2">
        <Form.Field name="value" className="w-5/6 flex gap-2 items-center">
          <Form.Label className="w-1/4">Init value: </Form.Label>
          <div className="flex-1">
            <Form.Control asChild className="w-3/4 ">
              <TextField.Root
                value={value}
                onChange={(e) => setValue(e.target.value)}
                required
                pattern="(\d+,)*\d+"
                type="text"
                size="2"
                placeholder="3,4,1,6,2,..."
                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-500"
              />
            </Form.Control>
            <Form.Message match="valueMissing">Please enter value</Form.Message>
            <Form.Message match="patternMismatch">
              Not correct format
            </Form.Message>
          </div>
          <Button
            variant="outline"
            onClick={() =>
              setValue(
                Array.from({ length: 10 }, (_, i) => i + 1)
                  .sort(() => Math.random() - 0.5)
                  .join(",")
              )
            }
          >
            Random
          </Button>
        </Form.Field>
        <Form.Submit asChild className="w-1/6">
          <Button>
            <ArrowRightIcon />
          </Button>
        </Form.Submit>
      </Flex>
    </Form.Root>
  );
}

function UpdateOperation({ algorithm }: OperationProps) {
  return (
    <Form.Root
      onSubmit={(event) => {
        const data = Object.fromEntries(
          new FormData(event.currentTarget)
        ) as any;
        algorithm.updateData(data.index, data.value);
      }}
    >
      <Flex gap="2">
        <Form.Field name="index" className="w-5/6 flex gap-2 items-center">
          <Form.Label className="w-1/4">Update: </Form.Label>
          <div className="flex space-x-2 w-3/4">
            <Form.Control asChild>
              <TextField.Root
                required
                type="number"
                size="2"
                placeholder="index"
              />
            </Form.Control>
            <Form.Message match="valueMissing">Please enter value</Form.Message>
            <Form.Control asChild>
              <TextField.Root
                required
                type="number"
                size="2"
                placeholder="value"
              />
            </Form.Control>
            <Form.Message match="valueMissing">Please enter value</Form.Message>
          </div>
        </Form.Field>
        <Form.Submit asChild className="w-1/6">
          <Button>
            <ArrowRightIcon />
          </Button>
        </Form.Submit>
      </Flex>
    </Form.Root>
  );
}
