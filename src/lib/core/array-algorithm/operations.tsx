import { Button } from "@radix-ui/themes";
import { ArrayAlgorithm } from ".";
import React from "react";
import { BaseOperation } from "../base-operation";
import * as Form from "@radix-ui/react-form";

export class InsertOperation extends BaseOperation<ArrayAlgorithm> {
  run(algorithm: ArrayAlgorithm, arg: number): void {
    algorithm.addData(arg);
  }

  render(algorithm: ArrayAlgorithm): React.ReactNode {
    return (
      <Form.Root
        className="FormRoot"
        onSubmit={(event) => {
          const data = Object.fromEntries(
            new FormData(event.currentTarget)
          ) as any;
          console.log(data);
          algorithm.executeOperation("Insert", data.value);
        }}
      >
        <Form.Field className="FormField" name="value">
          <div className="flex align-baseline justify-between">
            <Form.Label className="FormLabel">Insert</Form.Label>
            <Form.Message className="FormMessage" match="valueMissing">
              Please enter value
            </Form.Message>
          </div>
          <Form.Control asChild>
            <input className="Input" type="number" required />
          </Form.Control>
        </Form.Field>
        <Form.Submit asChild>
          <Button>Save</Button>
        </Form.Submit>
      </Form.Root>
    );
  }
}
export class UpdateOperation extends BaseOperation<ArrayAlgorithm> {
  run(algorithm: ArrayAlgorithm, arg: number[]): void {
    algorithm.data[arg[0]].value = arg[1];
  }
  render(algorithm: ArrayAlgorithm): React.ReactNode {
    return (
      <Form.Root
        className="FormRoot"
        onSubmit={(event) => {
          const data = Object.fromEntries(
            new FormData(event.currentTarget)
          ) as any;
          console.log(data);
          algorithm.executeOperation("Insert", data.value);
        }}
      >
        <Form.Field className="FormField" name="value">
          <div className="flex align-baseline justify-between">
            <Form.Label className="FormLabel">Update</Form.Label>
            <Form.Message className="FormMessage" match="valueMissing">
              Please enter value
            </Form.Message>
          </div>
          <Form.Control asChild>
            <input className="Input" type="number" required />
          </Form.Control>
        </Form.Field>
        <Form.Submit asChild>
          <Button>Save</Button>
        </Form.Submit>
      </Form.Root>
    );
  }
}

export class InitOperation extends BaseOperation<ArrayAlgorithm> {
  run(algorithm: ArrayAlgorithm, arg: number[]): void {
    algorithm.initData(arg);
  }
  render(algorithm: ArrayAlgorithm): React.ReactNode {
    return (
      <Form.Root
        className="FormRoot"
        onSubmit={(event) => {
          const data = Object.fromEntries(
            new FormData(event.currentTarget)
          ) as any;
          console.log(data);
          algorithm.executeOperation("Init", data.value);
        }}
      >
        <Form.Field className="FormField" name="value">
          <div className="flex align-baseline justify-between">
            <Form.Label className="FormLabel">Init</Form.Label>
            <Form.Message className="FormMessage" match="valueMissing">
              Please enter value
            </Form.Message>
          </div>
          <Form.Control asChild>
            <input className="Input" type="number" required />
          </Form.Control>
        </Form.Field>
        <Form.Submit asChild>
          <Button>Save</Button>
        </Form.Submit>
      </Form.Root>
    );
  }
}

export class DeleteOperation extends BaseOperation<ArrayAlgorithm> {
  run(algorithm: ArrayAlgorithm, arg: number): void {
    algorithm.delete(arg);
  }
  render(algorithm: ArrayAlgorithm): React.ReactNode {
    return (
      <Form.Root
        className="FormRoot"
        onSubmit={(event) => {
          const data = Object.fromEntries(
            new FormData(event.currentTarget)
          ) as any;
          console.log(data);
          algorithm.executeOperation("Delete", data.value);
        }}
      >
        <Form.Field className="FormField" name="value">
          <div className="flex align-baseline justify-between">
            <Form.Label className="FormLabel">Delete</Form.Label>
            <Form.Message className="FormMessage" match="valueMissing">
              Please enter value
            </Form.Message>
          </div>
          <Form.Control asChild>
            <input className="Input" type="number" required />
          </Form.Control>
        </Form.Field>
        <Form.Submit asChild>
          <Button>Save</Button>
        </Form.Submit>
      </Form.Root>
    );
  }
}
