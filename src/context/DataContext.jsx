import React, { useState, useEffect } from "react";
import { DataContext } from "./DataContext";
import api from "../utils/api"; // استيراد الـ axios instance

export default function DataProvider({ children }) {
  const [products, setProducts] = useState([]);
  const [loadingProducts, setLoadingProducts] = useState(true);
  const [productsError, setProductsError] = useState(null);

  const [categories, setCategories] = useState([]);
  const [loadingCategories, setLoadingCategories] = useState(true);
  const [categoriesError, setCategoriesError] = useState(null);

  const fetchProducts = async () => {
    try {
      setLoadingProducts(true);

      const response = await api.get("/products");

      setProducts(response.data);
      setProductsError(null);
    } catch (err) {
      const errorMessage = err.response?.data?.message || err.message;
      setProductsError(errorMessage);
    } finally {
      setLoadingProducts(false);
    }
  };

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
