import { ReactNode } from "react";

export type OperationType = "Insert" | "Update" | "Init" | "Search";
export type OperationArgumentType = number | number[] | (number | number[])[];

export abstract class BaseOperation<T> {
  abstract run(algorithm: T, args: OperationArgumentType): void;
  abstract render(algorithm: T): ReactNode;
}
