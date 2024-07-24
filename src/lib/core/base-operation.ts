import { ReactNode } from "react";

export type OperationType = "Insert" | "Update" | "Init" | "Search";

export abstract class BaseOperation<T> {
  abstract render(algorithm: T): ReactNode;
}
