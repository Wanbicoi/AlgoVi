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
        <Flex gap="2">
          <Form.Field name="value" className="flex gap-2 items-center">
            <Form.Label>Insert: </Form.Label>
            <div>
              <Form.Control asChild>
                <TextField.Root
                  required
                  type="number"
                  size="2"
                  placeholder="value"
                />
              </Form.Control>
              <Form.Message match="valueMissing">
                Please enter value
              </Form.Message>
            </div>
          </Form.Field>
          <Form.Submit asChild>
            <Button>
              <ArrowRightIcon />
            </Button>
          </Form.Submit>
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
          const data = Object.fromEntries(
            new FormData(event.currentTarget),
          ) as any;
          console.log(data);
          algorithm.initData(data.value);
        }}
      >
        <Flex gap="2">
          <Form.Field name="value" className="flex gap-2 items-center">
            <Form.Label>Init value: </Form.Label>
            <div>
              <Form.Control asChild>
                <TextField.Root
                  required
                  type="number"
                  size="2"
                  placeholder="3,4,1,6,2,..."
                />
              </Form.Control>
              <Form.Message match="valueMissing">
                Please enter value
              </Form.Message>
              {/* <Form.Message */}
              {/*   match={(value) => { */}
              {/*     console.log(value); */}
              {/*     return /^(\d,)*\d$/.test(value); */}
              {/*   }} */}
              {/* > */}
              {/*   Not correct format */}
              {/* </Form.Message> */}
            </div>
          </Form.Field>
          <Form.Submit asChild>
            <Button>
              <ArrowRightIcon />
            </Button>
          </Form.Submit>
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
          const data = Object.fromEntries(
            new FormData(event.currentTarget),
          ) as any;
          algorithm.updateData(data.index, data.value);
        }}
      >
        <Flex gap="2">
          <Form.Field name="index" className="flex gap-2 items-center">
            <Form.Label>Update: </Form.Label>
            <div>
              <Form.Control asChild>
                <TextField.Root
                  required
                  type="number"
                  size="2"
                  placeholder="index"
                />
              </Form.Control>
              <Form.Message match="valueMissing">
                Please enter value
              </Form.Message>
            </div>
          </Form.Field>
          <Form.Field name="value" className="flex gap-2 items-center">
            <div>
              <Form.Control asChild>
                <TextField.Root
                  required
                  type="number"
                  size="2"
                  placeholder="value"
                />
              </Form.Control>
              <Form.Message match="valueMissing">
                Please enter value
              </Form.Message>
            </div>
          </Form.Field>
          <Form.Submit asChild>
            <Button>
              <ArrowRightIcon />
            </Button>
          </Form.Submit>
        </Flex>
      </Form.Root>
    );
  }
}
