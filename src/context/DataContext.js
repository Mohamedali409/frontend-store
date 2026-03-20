import { createContext, useContext } from "react";

// 1. إنشاء الـ Context
export const DataContext = createContext();

// 2. إنشاء الـ Custom Hook
export const useData = () => {
  return useContext(DataContext);
};
