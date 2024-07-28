import { BaseAlgorithm } from "./base-algorithm";

export type OperationType = "Insert" | "Update" | "Init" | "Search" | "Delete";
export type BaseOperationProps = { algorithm: BaseAlgorithm };
export type BaseOperationType<T> = (algorithm: T) => React.ReactNode;
