import { AlgorithmName } from "..";
import { ArrayAlgorithm } from "../../array-algorithm";
import { BaseAlgorithm } from "../../base-algorithm";
import ArrayOperations from "../../array-algorithm/operations";

type Props = { algorithm: BaseAlgorithm; algorithmName: AlgorithmName };

export function Operation({ algorithmName, algorithm }: Props) {
  const operation: Record<AlgorithmName, React.ReactNode> = {
    "bubble-sort": <ArrayOperations algorithm={algorithm as ArrayAlgorithm} />,
  };
  return operation[algorithmName];
}
