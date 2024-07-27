import { BaseAlgorithm } from "./base-algorithm";

export type OperationType = "Insert" | "Update" | "Init" | "Search";
export type BaseOperationProps = { algorithm: BaseAlgorithm };
export type BaseOperationType<T> = (algorithm: T) => React.ReactNode;
