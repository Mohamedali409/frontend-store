import React, { useState, useEffect } from "react";
import { DataContext } from "./DataContext";
import api from "../utils/api"; // استيراد الـ axios instance

export default function DataProvider({ children }) {
  // States للمنتجات
  const [products, setProducts] = useState([]);
  const [loadingProducts, setLoadingProducts] = useState(true);
  const [productsError, setProductsError] = useState(null);

  // States للأقسام
  const [categories, setCategories] = useState([]);
  const [loadingCategories, setLoadingCategories] = useState(true);
  const [categoriesError, setCategoriesError] = useState(null);

  // دالة جلب المنتجات باستخدام Axios
  const fetchProducts = async () => {
    try {
      setLoadingProducts(true);
      // مفيش داعي نكتب الرابط كامل لأننا عرفناه في الـ baseURL
      const response = await api.get("/products");

      // Axios بيحط الداتا في response.data
      // (لو الباك اند بيرجع الداتا جوه object اسمه data، هتبقى response.data.data)
      setProducts(response.data);
      setProductsError(null);
    } catch (err) {
      // Axios بيحط رسالة الخطأ اللي جاية من الباك اند في err.response.data
      const errorMessage = err.response?.data?.message || err.message;
      setProductsError(errorMessage);
    } finally {
      setLoadingProducts(false);
    }
  };

  // دالة جلب الأقسام باستخدام Axios
  const fetchCategories = async () => {
    try {
      setLoadingCategories(true);
      const response = await api.get("/category");

      setCategories(response.data);
      setCategoriesError(null);
    } catch (err) {
      const errorMessage = err.response?.data?.message || err.message;
      setCategoriesError(errorMessage);
    } finally {
      setLoadingCategories(false);
    }
  };

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  const value = {
    products,
    loadingProducts,
    productsError,
    refetchProducts: fetchProducts,

    categories,
    loadingCategories,
    categoriesError,
    refetchCategories: fetchCategories,
  };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
}
