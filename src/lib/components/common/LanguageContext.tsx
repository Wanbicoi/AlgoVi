/* eslint-disable @typescript-eslint/no-explicit-any */
// LanguageContext.tsx
import React, { createContext, useContext, useState, ReactNode } from "react";

type Language = "en" | "vi";

const translations = {
  en: {
    greeting: "Hello",
    speed: "Speed",
    selectAlgorithm: "Select Algorithm",
    run: "Run",
    stop: "Stop",
    reset: "Reset",
    operation: "Operations",
    placeholder: "Search Algorithm",
    algorithms: {
      bubbleSort: "Bubble Sort",
      mergeSort: "Merge Sort",
      quickSort: "Quick Sort",
      insertionSort: "Insertion Sort",
      selectionSort: "Selection Sort",
      heapSort: "Heap Sort",
      radixSort: "Radix Sort",
      countingSort: "Counting Sort",
      bucketSort: "Bucket Sort",
      shellSort: "Shell Sort",
    },
    descriptions: {
      bubbleSort: "Simple comparison-based sorting algorithm.",
      mergeSort: "Divide and conquer algorithm that sorts by merging.",
      quickSort: "Efficient comparison-based sorting algorithm using pivot.",
      insertionSort: "Builds the final sorted array one item at a time.",
      selectionSort: "Sorts by repeatedly finding the minimum element.",
      heapSort:
        "Comparison-based sorting algorithm that uses a heap data structure.",
      radixSort: "Non-comparison-based sorting algorithm for integers.",
      countingSort: "Non-comparison-based algorithm that counts occurrences.",
      bucketSort: "Distributes elements into buckets and sorts each bucket.",
      shellSort: "Improves insertion sort by comparing elements at gaps.",
    },
    operations: {
      insert: "Insert",
      update: "Update",
      init: "Initialize",
      search: "Search",
    },
    formLabels: {
      insert: "Insert: ",
      init: "Init value: ",
      update: "Update: ",
    },
    formPlaceholders: {
      insert: "value",
      init: "3,4,1,6,2,...",
      index: "index",
      value: "value",
    },
    formMessages: {
      valueMissing: "Please enter value",
      patternMismatch: "Not correct format",
    },
  },
  vi: {
    greeting: "Xin chào",
    speed: "Tốc độ",
    selectAlgorithm: "Chọn Thuật toán",
    run: "Chạy",
    stop: "Dừng",
    reset: "Làm lại",
    operation: "Hoạt động",
    placeholder: "Tìm kiếm thuật toán",
    algorithms: {
      bubbleSort: "Sắp xếp nổi bọt",
      mergeSort: "Sắp xếp gộp",
      quickSort: "Sắp xếp nhanh",
      insertionSort: "Sắp xếp chèn",
      selectionSort: "Sắp xếp chọn",
      heapSort: "Sắp xếp heap",
      radixSort: "Sắp xếp cơ số",
      countingSort: "Sắp xếp đếm",
      bucketSort: "Sắp xếp theo xô",
      shellSort: "Sắp xếp vỏ",
    },
    descriptions: {
      bubbleSort: "Thuật toán sắp xếp dựa trên so sánh đơn giản.",
      mergeSort: "Thuật toán chia để trị sắp xếp bằng cách gộp.",
      quickSort:
        "Thuật toán sắp xếp dựa trên so sánh hiệu quả sử dụng điểm chốt.",
      insertionSort: "Xây dựng mảng đã sắp xếp cuối cùng từng mục một.",
      selectionSort: "Sắp xếp bằng cách tìm phần tử nhỏ nhất liên tục.",
      heapSort:
        "Thuật toán sắp xếp dựa trên so sánh sử dụng cấu trúc dữ liệu heap.",
      radixSort: "Thuật toán sắp xếp không dựa trên so sánh cho số nguyên.",
      countingSort:
        "Thuật toán sắp xếp không dựa trên so sánh đếm số lần xuất hiện.",
      bucketSort: "Phân phối các phần tử vào các xô và sắp xếp từng xô.",
      shellSort:
        "Cải thiện sắp xếp chèn bằng cách so sánh các phần tử tại khoảng cách.",
    },
    operations: {
      insert: "Chèn",
      update: "Cập nhật",
      init: "Khởi tạo",
      search: "Tìm kiếm",
    },
    formLabels: {
      insert: "Chèn: ",
      init: "Khởi tạo: ",
      update: "Cập nhật: ",
    },
    formPlaceholders: {
      insert: "giá trị",
      init: "3,4,1,6,2,...",
      index: "chỉ số",
      value: "giá trị",
    },
    formMessages: {
      valueMissing: "Vui lòng nhập giá trị",
      patternMismatch: "Định dạng không chính xác",
    },
  },
};

const LanguageContext = createContext<
  | {
      language: Language;
      setLanguage: (lang: Language) => void;
      t: (key: string) => string;
    }
  | undefined
>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [language, setLanguage] = useState<Language>("en");

  const t = (key: string) => {
    const keys = key.split(".");
    let result: any = translations[language];
    for (const k of keys) {
      result = result[k];
      if (result === undefined) return key;
    }
    return result;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};
