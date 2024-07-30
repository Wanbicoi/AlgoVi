/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { TreeAlgorithm } from ".";
import { OperationType } from "../base-operation";
import { ReactNode, useRef, useState } from "react";
import { ArrowRightIcon } from "@radix-ui/react-icons";
import { Button, Flex, TextField } from "@radix-ui/themes";
import * as Form from "@radix-ui/react-form";
import { useLanguage } from "../../components/common/LanguageContext";

type Props = {
  algorithm: TreeAlgorithm;
};

export default function TreeOperations({ algorithm }: Props) {
  const { t } = useLanguage();
  const operations: Record<OperationType, ReactNode> = {
    Insert: <InsertOperation algorithm={algorithm} key="insert" />,
    Delete: <DeleteOperation algorithm={algorithm} key="delete" />,
    Search: <SearchOperation algorithm={algorithm} key="search" />,
    Init: <InitOperation algorithm={algorithm} key="init" />,
    Update: undefined,
  };

  return (Object.keys(operations) as OperationType[])
    .filter((operationName) => algorithm.operations.includes(operationName))
    .map((operationName) => operations[operationName]);
}

function InsertOperation({ algorithm }: Props) {
  const formRef = useRef<HTMLFormElement>(null);
  const { t } = useLanguage();
  return (
    <Form.Root
      ref={formRef}
      onSubmit={(event) => {
        event.preventDefault();
        const data = Object.fromEntries(
          new FormData(event.currentTarget)
        ) as any;
        algorithm.insert(data.value);
        formRef.current?.reset();
      }}
    >
      <Flex gap="2">
        <Form.Field
          name="value"
          className="w-5/6 flex gap-2 items-center font-quicksand"
        >
          <Form.Label className="w-1/4 font-bold">
            {t("operations.insert")}
          </Form.Label>
          <div className="flex-1">
            <Form.Control asChild className="w-3/4">
              <TextField.Root
                required
                type="number"
                placeholder={t("formPlaceholders.value")}
                min="0"
                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-500"
              />
            </Form.Control>
            <Form.Message match="valueMissing">
              {t("formMessages.valueMissing")}
            </Form.Message>
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

function DeleteOperation({ algorithm }: Props) {
  const formRef = useRef<HTMLFormElement>(null);
  const { t } = useLanguage();
  return (
    <Form.Root
      ref={formRef}
      onSubmit={(event) => {
        event.preventDefault();
        const data = Object.fromEntries(
          new FormData(event.currentTarget)
        ) as any;
        algorithm.delete(data.value);
        formRef.current?.reset();
      }}
    >
      <Flex gap="2">
        <Form.Field
          name="value"
          className="w-5/6 flex gap-2 items-center font-quicksand"
        >
          <Form.Label className="w-1/4 font-bold">
            {t("formLabels.delete")}
          </Form.Label>
          <div className="flex-1">
            <Form.Control asChild className="w-3/4">
              <TextField.Root
                required
                type="number"
                placeholder={t("formPlaceholders.value")}
                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-500"
              />
            </Form.Control>
            <Form.Message match="valueMissing">
              {t("formMessages.valueMissing")}
            </Form.Message>
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

function SearchOperation({ algorithm }: Props) {
  const formRef = useRef<HTMLFormElement>(null);
  const { t } = useLanguage();
  return (
    <Form.Root
      ref={formRef}
      onSubmit={(event) => {
        event.preventDefault();
        const data = Object.fromEntries(
          new FormData(event.currentTarget)
        ) as any;
        algorithm.search(data.value);
        formRef.current?.reset();
      }}
    >
      <Flex gap="2">
        <Form.Field
          name="value"
          className="w-5/6 flex gap-2 items-center font-quicksand"
        >
          <Form.Label className="w-1/4 font-bold">
            {t("operations.search")}
          </Form.Label>
          <div className="flex-1">
            <Form.Control asChild className="w-3/4">
              <TextField.Root
                required
                type="number"
                placeholder={t("formPlaceholders.value")}
                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-500"
              />
            </Form.Control>
            <Form.Message match="valueMissing">
              {t("formMessages.valueMissing")}
            </Form.Message>
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

function InitOperation({ algorithm }: Props) {
  const [value, setValue] = useState<string>();
  const { t } = useLanguage();
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
        <Form.Field
          name="value"
          className="w-5/6 flex gap-2 items-center font-quicksand"
        >
          <Form.Label className="w-1/4 font-bold">
            {t("formLabels.init")}
          </Form.Label>
          <div className="flex-1">
            <Form.Control asChild className="w-3/4 ">
              <TextField.Root
                value={value}
                onChange={(e) => setValue(e.target.value)}
                required
                pattern="(\d+,)*\d+"
                type="text"
                size="2"
                placeholder={t("formPlaceholders.init")}
                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-500"
              />
            </Form.Control>
            <Form.Message match="valueMissing">
              {t("formMessages.valueMissing")}
            </Form.Message>
            <Form.Message match="patternMismatch">
              {t("formMessages.patternMismatch")}
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
