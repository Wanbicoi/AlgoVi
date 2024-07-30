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
    noResults: "No results found",
    algorithms: {
      bubbleSort: "Bubble Sort",
      quickSort: "Quick Sort",
      insertionSort: "Insertion Sort",
      selectionSort: "Selection Sort",
      heapSort: "Heap Sort",
      linearSearch: "Linear Search",
      binarySearchTree: "Binary Search Tree",
    },
    descriptions: {
      bubbleSort: "Simple comparison-based sorting algorithm.",
      quickSort: "Efficient comparison-based sorting algorithm using pivot.",
      insertionSort: "Builds the final sorted array one item at a time.",
      selectionSort: "Sorts by repeatedly finding the minimum element.",
      heapSort:
        "Comparison-based sorting algorithm that uses a heap data structure.",
      linearSearch:
        "Sequentially checks each element until the target is found.",
      binarySearchTree:
        "Data structure that supports fast lookup, addition, and deletion of items.",
    },
    operations: {
      insert: "Insert",
      update: "Update",
      init: "Initialize",
      search: "Search",
    },
    controls: {
      reset: "Reset",
      speed: "Speed:",
      operationsOpen: "Operations",
      operationsClosed: "Operations",
    },
    formLabels: {
      insert: "Insert: ",
      init: "Init value: ",
      update: "Update: ",
      delete: "Delete: ",
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
    noResults: "Không tìm thấy kết quả",
    algorithms: {
      bubbleSort: "Sắp xếp nổi bọt",
      quickSort: "Sắp xếp nhanh",
      insertionSort: "Sắp xếp chèn",
      selectionSort: "Sắp xếp chọn",
      heapSort: "Sắp xếp heap",
      linearSearch: "Tìm kiếm tuần tự",
      binarySearchTree: "Cây tìm kiếm nhị phân",
    },
    descriptions: {
      bubbleSort: "Thuật toán sắp xếp dựa trên so sánh đơn giản.",
      quickSort:
        "Thuật toán sắp xếp dựa trên so sánh hiệu quả sử dụng điểm chốt.",
      insertionSort: "Xây dựng mảng đã sắp xếp cuối cùng từng mục một.",
      selectionSort: "Sắp xếp bằng cách tìm phần tử nhỏ nhất liên tục.",
      heapSort:
        "Thuật toán sắp xếp dựa trên so sánh sử dụng cấu trúc dữ liệu heap.",
      linearSearch:
        "Kiểm tra từng phần tử một cách tuần tự cho đến khi tìm thấy mục tiêu.",
      binarySearchTree:
        "Cấu trúc dữ liệu hỗ trợ tra cứu, thêm, và xóa các mục một cách nhanh chóng.",
    },
    operations: {
      insert: "Chèn",
      update: "Cập nhật",
      init: "Khởi tạo",
      search: "Tìm kiếm",
    },
    controls: {
      reset: "Đặt lại",
      speed: "Tốc độ:",
      operationsOpen: "Hoạt động",
      operationsClosed: "Hoạt động",
    },
    formLabels: {
      insert: "Chèn: ",
      init: "Khởi tạo: ",
      update: "Cập nhật: ",
      delete: "Xóa: ",
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
