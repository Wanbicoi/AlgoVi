/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Flex, TextField } from "@radix-ui/themes";
import { ArrayAlgorithm } from ".";
import React from "react";
import { BaseOperation } from "../base-operation";
import * as Form from "@radix-ui/react-form";
import { ArrowRightIcon } from "@radix-ui/react-icons";

export class InsertOperation extends BaseOperation<ArrayAlgorithm> {
  render(algorithm: ArrayAlgorithm): React.ReactNode {
    return (
      <Form.Root
        key="insert"
        onSubmit={(event) => {
          event.preventDefault();
          const data = Object.fromEntries(
            new FormData(event.currentTarget),
          ) as any;
          algorithm.addData(data.value);
        }}
      >
        <Flex
          gap="2"
          direction="row"
          align="center"
          justify="center"
          className="bg-white p-4 rounded-lg shadow-md"
        >
          <Form.Field name="value" className="flex flex-row gap-2 w-full">
            <Form.Label className="w-1/4 font-bold mb-2">Insert:</Form.Label>
            <Form.Control asChild className="w-2/4">
              <TextField.Root
                required
                type="number"
                placeholder="Enter value"
                className="w-full p-2 rounded-lg border border-gray-300 focus:outline-none focus:ring focus:ring-blue-500"
              />
            </Form.Control>
            <Form.Submit asChild className="w-1/4">
              <Button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full">
                <ArrowRightIcon />
                Insert
              </Button>
            </Form.Submit>
          </Form.Field>
        </Flex>
      </Form.Root>
    );
  }
}

export class InitOperation extends BaseOperation<ArrayAlgorithm> {
  render(algorithm: ArrayAlgorithm): React.ReactNode {
    return (
      <Form.Root
        key="init"
        onSubmit={(event) => {
          event.preventDefault();
          const data = Object.fromEntries(
            new FormData(event.currentTarget),
          ) as any;
          console.log(data);
          algorithm.initData(data.value);
        }}
      >
        <Flex
          gap="2"
          direction="row"
          align="center"
          justify="center"
          className="bg-white p-4 rounded-lg shadow-md"
        >
          <Form.Field name="value" className="flex flex-row gap-2 w-full">
            <Form.Label className="w-1/4 font-bold mb-2">Init value:</Form.Label>
            <Form.Control asChild className="w-2/4">
              <TextField.Root
                required
                type="text"
                placeholder="Enter initial values (e.g. 1,2,3,4,5)"
                className="w-full p-2 rounded-lg border border-gray-300 focus:outline-none focus:ring focus:ring-blue-500"
              />
            </Form.Control>
            <Form.Submit asChild className="w-1/4">
              <Button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full">
                <ArrowRightIcon />
                Init
              </Button>
            </Form.Submit>
          </Form.Field>
        </Flex>
      </Form.Root>
    );
  }
}

export class UpdateOperation extends BaseOperation<ArrayAlgorithm> {
  render(algorithm: ArrayAlgorithm): React.ReactNode {
    return (
      <Form.Root
        key="update"
        onSubmit={(event) => {
          event.preventDefault();
          const data = Object.fromEntries(
            new FormData(event.currentTarget),
          ) as any;
          algorithm.updateData(data.index, data.value);
        }}
      >
        <Flex
          gap="2"
          direction="row"
          align="center"
          justify="center"
          className="bg-white p-4 rounded-lg shadow-md"
        >
          <Flex direction="row" gap="2" className="w-full">
          <Flex
          gap="2"
          direction="column"
          align="center"
          justify="center"
          className="bg-white"
        >
          <Form.Field name="index" className="flex flex-grow gap-2">
            <Form.Label className="w-1/4 font-bold mb-2">Update index:</Form.Label>
            <Form.Control asChild className="w-3/4">
              <TextField.Root
                required
                type="number"
                placeholder="Enter index"
                className="w-full p-2 rounded-lg border border-gray-300 focus:outline-none focus:ring focus:ring-blue-500"
              />
            </Form.Control>
            <Form.Message match="valueMissing">
              Please enter index
            </Form.Message>
          </Form.Field>
          <Form.Field name="value" className="flex flex-grow gap-2">
            <Form.Label className="w-1/4 font-bold mb-2">New value:</Form.Label>
            <Form.Control asChild className="w-3/4">
              <TextField.Root
                required
                type="number"
                placeholder="Enter new value"
                className="w-full p-2 rounded-lg border border-gray-300 focus:outline-none focus:ring focus:ring-blue-500"
              />
            </Form.Control>
            <Form.Message match="valueMissing">
              Please enter new value
            </Form.Message>
          </Form.Field>
          </Flex>
          </Flex>
          <Form.Submit asChild className="w-1/4">
            <Button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full">
              <ArrowRightIcon />
              Update
            </Button>
          </Form.Submit>
        </Flex>
      </Form.Root>
    );
  }
}