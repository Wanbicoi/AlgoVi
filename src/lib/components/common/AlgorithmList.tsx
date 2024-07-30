import React, { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Grid, Box, Card, Inset, Text, Strong } from "@radix-ui/themes";
import { useLanguage } from "./LanguageContext";

type AlgorithmListProps = {
  searchTerm: string;
};

// Hàm chuẩn hóa văn bản
function normalizeText(text: string) {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

const algorithms = [
  {
    name: "bubbleSort",
    path: "bubble-sort",
    vietnameseName: "Sắp xếp nổi bọt",
  },
  { name: "mergeSort", path: "merge-sort", vietnameseName: "Sắp xếp trộn" },
  { name: "quickSort", path: "quick-sort", vietnameseName: "Sắp xếp nhanh" },
  {
    name: "insertionSort",
    path: "insertion-sort",
    vietnameseName: "Sắp xếp chèn",
  },
  {
    name: "selectionSort",
    path: "selection-sort",
    vietnameseName: "Sắp xếp chọn",
  },
  { name: "heapSort", path: "heap-sort", vietnameseName: "Sắp xếp heap" },
  { name: "radixSort", path: "radix-sort", vietnameseName: "Sắp xếp cơ số" },
  {
    name: "countingSort",
    path: "counting-sort",
    vietnameseName: "Sắp xếp đếm",
  },
  { name: "bucketSort", path: "bucket-sort", vietnameseName: "Sắp xếp xô" },
  { name: "shellSort", path: "shell-sort", vietnameseName: "Sắp xếp shell" },
].map((algo) => ({
  ...algo,
  normalizedName: normalizeText(algo.name),
  normalizedVietnameseName: normalizeText(algo.vietnameseName),
}));

export default function AlgorithmList({ searchTerm }: AlgorithmListProps) {
  const navigate = useNavigate();
  const { t } = useLanguage();

  // Hàm xử lý nhấp vào box
  const handleBoxClick = (path: string) => {
    navigate(`/${path}`);
  };

  const filteredAlgorithms = useMemo(() => {
    const normalizedSearchTerm = normalizeText(searchTerm);

    return algorithms.filter(
      (algo) =>
        algo.normalizedName.includes(normalizedSearchTerm) ||
        algo.normalizedVietnameseName.includes(normalizedSearchTerm)
    );
  }, [searchTerm]);

  return (
    <div>
      {filteredAlgorithms.length > 0 ? (
        <Grid columns="3" gap="6" width="auto">
          {filteredAlgorithms.map((algo) => (
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
      ) : (
        <Text>{t("noResults")}</Text>
      )}
    </div>
  );
}
