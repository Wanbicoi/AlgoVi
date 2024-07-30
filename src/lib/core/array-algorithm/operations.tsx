/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Flex, TextField } from "@radix-ui/themes";
import { ArrayAlgorithm } from ".";
import * as Form from "@radix-ui/react-form";
import { ArrowRightIcon } from "@radix-ui/react-icons";
import { ReactNode, useRef, useState } from "react";
import { OperationType } from "../base-operation";
import { useLanguage } from "../../components/common/LanguageContext";

type Props = {
  algorithm: ArrayAlgorithm;
};

export default function ArrayOperations({ algorithm }: Props) {
  const { t } = useLanguage();
  const operations: Record<OperationType, ReactNode> = {
    Insert: <InitOperation algorithm={algorithm} key="init" />,
    Update: <UpdateOperation algorithm={algorithm} key="update" />,
    Init: <InsertOperation algorithm={algorithm} key="insert" />,
    Search: <SearchOperation algorithm={algorithm} key="search" />,
    Delete: undefined,
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
  const { t } = useLanguage();
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
        <Form.Field
          name="value"
          className="w-5/6 flex gap-2 items-center font-quicksand"
        >
          <Form.Label className="w-1/4 font-bold">
            {t("formLabels.insert")}
          </Form.Label>
          <div className="flex-1">
            <Form.Control asChild className="w-3/4">
              <TextField.Root
                required
                type="number"
                placeholder={t("formPlaceholders.insert")}
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

function InitOperation({ algorithm }: OperationProps) {
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
            <Form.Control asChild className="w-3/4">
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

function UpdateOperation({ algorithm }: OperationProps) {
  const { t } = useLanguage();
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
        <Form.Field
          name="index"
          className="w-5/6 flex gap-2 items-center font-quicksand"
        >
          <Form.Label className="w-1/4">{t("formLabels.update")}</Form.Label>
          <div className="flex space-x-2 w-3/4">
            <Form.Control asChild>
              <TextField.Root
                required
                type="number"
                size="2"
                placeholder={t("formPlaceholders.index")}
              />
            </Form.Control>
            <Form.Message match="valueMissing">
              {t("formMessages.valueMissing")}
            </Form.Message>
            <Form.Control asChild>
              <TextField.Root
                required
                type="number"
                size="2"
                placeholder={t("formPlaceholders.value")}
              />
            </Form.Control>
            <Form.Message match="valueMissing">
              {t("formMessages.valueMissing")}
            </Form.Message>
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

function SearchOperation({ algorithm }: OperationProps) {
  const { t } = useLanguage();
  return (
    <Form.Root
      onSubmit={async (event) => {
        event.preventDefault();
        const data = Object.fromEntries(
          new FormData(event.currentTarget)
        ) as any;
        await algorithm.search(Number(data.value));
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
                size="2"
                placeholder={t("formPlaceholders.value")}
              />
            </Form.Control>
            <Form.Message match="valueMissing">
              {t("formMessages.valueMissing")}
            </Form.Message>
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
