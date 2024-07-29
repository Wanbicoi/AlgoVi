import React from "react";
import { useNavigate } from "react-router-dom";
import { Grid, Box, Card, Inset, Text, Strong } from "@radix-ui/themes";
import { useLanguage } from "./LanguageContext";

const algorithms = [
  { name: "bubbleSort", path: "bubble-sort" },
  { name: "mergeSort", path: "merge-sort" },
  { name: "quickSort", path: "quick-sort" },
  { name: "insertionSort", path: "insertion-sort" },
  { name: "selectionSort", path: "selection-sort" },
  { name: "heapSort", path: "heap-sort" },
  { name: "radixSort", path: "radix-sort" },
  { name: "countingSort", path: "counting-sort" },
  { name: "bucketSort", path: "bucket-sort" },
  { name: "shellSort", path: "shell-sort" },
];

const AlgorithmList: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();

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
              <Strong>{t(`algorithms.${algo.name}`)}</Strong>
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
              {t(`descriptions.${algo.name}`)}
            </Text>
          </Card>
        </Box>
      ))}
    </Grid>
  );
};

export default AlgorithmList;
