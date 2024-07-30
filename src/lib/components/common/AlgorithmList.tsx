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
    imageUrl: "https://www.productplan.com/uploads/bubble-sort-1024x683-2.png",
  },
  {
    name: "quickSort",
    path: "quick-sort",
    vietnameseName: "Sắp xếp nhanh",
    imageUrl:
      "https://builtin.com/sites/www.builtin.com/files/styles/ckeditor_optimize/public/inline-images/1_quicksort.jpg",
  },
  {
    name: "insertionSort",
    path: "insertion-sort",
    vietnameseName: "Sắp xếp chèn",
    imageUrl:
      "https://ds055uzetaobb.cloudfront.net/brioche/uploads/eqqQFDjrIZ-insertion_sort_ocw.png?width=1200",
  },
  {
    name: "selectionSort",
    path: "selection-sort",
    vietnameseName: "Sắp xếp chọn",
    imageUrl:
      "https://cdn.programiz.com/cdn/farfuture/9O1S5eX8iqxnCN-JCaK9091sCglFFmxaASBpsofc6dg/mtime:1677313377/sites/tutorial2program/files/Selection-sort-0-comparision.png",
  },
  {
    name: "heapSort",
    path: "heap-sort",
    vietnameseName: "Sắp xếp heap",
    imageUrl:
      "https://www.mygreatlearning.com/blog/wp-content/uploads/2020/07/Blog-Algorithm-23-7-2020-03.jpg",
  },
  {
    name: "linearSearch",
    path: "linear-search",
    vietnameseName: "Tìm kiếm tuần tự",
    imageUrl:
      "https://cdn.hashnode.com/res/hashnode/image/upload/v1681712140768/f8c02fa4-e48a-4bcb-abc8-79c4dbe6c82e.png",
  },
  {
    name: "binarySearchTree",
    path: "binary-search-tree",
    vietnameseName: "Cây tìm kiếm nhị phân",
    imageUrl:
      "https://static.javatpoint.com/ds/images/binary-search-tree11.png",
  },
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
                    src={algo.imageUrl}
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
