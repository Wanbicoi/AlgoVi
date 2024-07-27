import React from "react";
import { useNavigate } from "react-router-dom";
import { Grid, Box, Card, Inset, Text, Strong } from "@radix-ui/themes";

const algorithms = [
  {
    name: "Bubble Sort",
    path: "bubble-sort",
    description: "Simple comparison-based sorting algorithm.",
  },
  {
    name: "Merge Sort",
    path: "merge-sort",
    description: "Divide and conquer algorithm that sorts by merging.",
  },
  {
    name: "Quick Sort",
    path: "quick-sort",
    description: "Efficient comparison-based sorting algorithm using pivot.",
  },
  {
    name: "Insertion Sort",
    path: "insertion-sort",
    description: "Builds the final sorted array one item at a time.",
  },
  {
    name: "Selection Sort",
    path: "selection-sort",
    description: "Sorts by repeatedly finding the minimum element.",
  },
  {
    name: "Heap Sort",
    path: "heap-sort",
    description:
      "Comparison-based sorting algorithm that uses a heap data structure.",
  },
  {
    name: "Radix Sort",
    path: "radix-sort",
    description: "Non-comparison-based sorting algorithm for integers.",
  },
  {
    name: "Counting Sort",
    path: "counting-sort",
    description: "Non-comparison-based algorithm that counts occurrences.",
  },
  {
    name: "Bucket Sort",
    path: "bucket-sort",
    description: "Distributes elements into buckets and sorts each bucket.",
  },
  {
    name: "Shell Sort",
    path: "shell-sort",
    description: "Improves insertion sort by comparing elements at gaps.",
  },
];

const AlgorithmList: React.FC = () => {
  const navigate = useNavigate();

  // Hàm xử lý nhấp vào box
  const handleBoxClick = (path: string) => {
    navigate(`${path}`);
  };

  return (
    <Grid columns="3" gap="6" width="auto">
      {algorithms.map((algo) => (
        <Box
          key={algo.path}
          maxWidth="300px"
          onClick={() => handleBoxClick(algo.path)}
          style={{ cursor: "pointer" }}
        >
          <Card size="2">
            <Inset clip="padding-box" side="top" pb="current">
              <img
                src="https://camo.githubusercontent.com/e01007c4e81671c11d204f22c3a62bd62849bdc0c507367af3a1d2b7796e7ea9/68747470733a2f2f692e696d6775722e636f6d2f5361576c45384b2e706e67"
                alt="Algorithm illustration"
                style={{
                  display: "block",
                  objectFit: "cover",
                  margin: 5,
                  width: "100%",
                  height: 140,
                  backgroundColor: "var(--gray-5)",
                  borderBottom: "1px solid #ddd",
                }}
              />
            </Inset>
            <Text as="p" size="3" className="font-quicksand">
              <Strong>{algo.name}</Strong>
            </Text>
            <Text
              as="span"
              size="1"
              style={{
                display: "-webkit-box",
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
                textOverflow: "ellipsis",
                WebkitLineClamp: 1,
                lineClamp: 1,
              }}
              className="font-quicksand"
            >
              {algo.description}
            </Text>
          </Card>
        </Box>
      ))}
    </Grid>
  );
};

export default AlgorithmList;
