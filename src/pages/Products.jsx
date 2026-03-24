import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useTranslation } from "react-i18next"; // 👈 استدعاء مكتبة الترجمة
import {
  Search,
  ChevronDown,
  X,
  Star,
  ShoppingCart,
  Heart,
  Eye,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  ChevronLeft,
  ChevronRight as ChevronRightIcon,
} from "lucide-react";

const fallbackProducts = [];

export default function Products() {
  const { t, i18n } = useTranslation(); // 👈 تفعيل الترجمة
  const isRTL = i18n.language === "ar"; // 👈 عشان نعرف لو اللغة عربي نظبط اتجاهات بعض الحاجات

  // --- States for Filters & Pagination ---
  const [activeCategory, setActiveCategory] = useState("");
  const [activeCategoryType, setActiveCategoryType] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [sortBy, setSortBy] = useState("latest");

  // --- Pagination States ---
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);

  const [debouncedMin, setDebouncedMin] = useState("");
  const [debouncedMax, setDebouncedMax] = useState("");

  // --- States for API & UI ---
  const [categoriesList, setCategoriesList] = useState([]);
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [toast, setToast] = useState(null);

  // --- States for Related Products ---
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [isLoadingRelated, setIsLoadingRelated] = useState(false);

  // --- Refs ---
  const topRef = useRef(null);
  const sliderRef = useRef(null);

  // --- Debounce Effect for Prices ---
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedMin(minPrice);
      setDebouncedMax(maxPrice);
      setCurrentPage(1);
    }, 500);
    return () => clearTimeout(timer);
  }, [minPrice, maxPrice]);

  // --- Fetching Categories ---
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/category");
        if (response.data.success) {
          setCategoriesList(response.data.categoryData || []);
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchCategories();
  }, []);

  // --- Fetching Main Products ---
  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      try {
        const params = new URLSearchParams();
        params.append("page", currentPage);
        params.append("limit", 10);

        if (activeCategory) {
          if (activeCategoryType === "main")
            params.append("category", activeCategory);
          else if (activeCategoryType === "sub")
            params.append("subcategory", activeCategory);
        }

        if (searchQuery) params.append("search", searchQuery);
        if (debouncedMin) params.append("minPrice", debouncedMin);
        if (debouncedMax) params.append("maxPrice", debouncedMax);
        if (sortBy) params.append("sort", sortBy);

        const response = await axios.get(
          `http://localhost:3000/api/products?${params.toString()}`,
        );

        if (response.data.success) {
          setProducts(response.data.data.product || []);
          setTotalPages(response.data.data.pages || 1);
          setTotalItems(response.data.data.total || 0);
        }
      } catch (error) {
        console.warn("Backend error. Using fallback data...", error);
        setProducts(fallbackProducts);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, [
    activeCategory,
    activeCategoryType,
    searchQuery,
    debouncedMin,
    debouncedMax,
    sortBy,
    currentPage,
  ]);

  // --- Fetching Related Products ---
  useEffect(() => {
    const fetchRelatedProducts = async () => {
      setIsLoadingRelated(true);
      try {
        const params = new URLSearchParams();
        params.append("limit", 10);
        params.append("sort", "latest");

        if (activeCategory) {
          if (activeCategoryType === "main")
            params.append("category", activeCategory);
          else if (activeCategoryType === "sub")
            params.append("subcategory", activeCategory);
        }

        const response = await axios.get(
          `http://localhost:3000/api/products?${params.toString()}`,
        );

        if (response.data.success) {
          setRelatedProducts(response.data.data.product || []);
        }
      } catch (error) {
        console.error("Error fetching related products:", error);
      } finally {
        setIsLoadingRelated(false);
      }
    };

    fetchRelatedProducts();
  }, [activeCategory, activeCategoryType]);

  // --- Scroll to Top on Pagination ---
  useEffect(() => {
    if (topRef.current && !isLoading) {
      window.scrollTo({
        top: topRef.current.offsetTop - 50,
        behavior: "smooth",
      });
    }
  }, [currentPage, isLoading]);

  // --- Handlers ---
  const handleSearchSubmit = (e) => {
    if (e.key === "Enter") {
      setSearchQuery(searchInput);
      setCurrentPage(1);
    }
  };

  const clearFilters = () => {
    setActiveCategory("");
    setActiveCategoryType("");
    setSearchQuery("");
    setSearchInput("");
    setMinPrice("");
    setMaxPrice("");
    setCurrentPage(1);
  };

  const showToast = (message) => {
    setToast(message);
    setTimeout(() => setToast(null), 3000);
  };

  const handleAddToCart = async (e, product) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:3000/api/cart",
        {
          productId: product._id || product.id,
          quantity: 1,
        },
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        },
      );

      if (response.data.success) {
        showToast(`"${product.name}" ${t("Products.addedToCart")} 🛒`);
      }
    } catch (error) {
      console.error(
        "Full Error Object:",
        error.response?.data || error.message,
      );

      if (error.response) {
        const serverMessage =
          error.response.data.message ||
          error.response.data.error ||
          "Failed to add product";

        if (error.response.status === 401 || error.response.status === 403) {
          showToast(t("Products.loginFirst"));
        } else {
          showToast(`Error: ${serverMessage}`);
        }
      } else {
        showToast(t("Products.networkError"));
      }
    }
  };

  const handleAddToWishlist = (e, product) => {
    e.preventDefault();
    showToast(`"${product.name}" ${t("Products.addedToWishlist")}!`);
  };

  const scrollSlider = (direction) => {
    if (sliderRef.current) {
      const scrollAmount = 300;
      sliderRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  // --- Helpers ---
  const getActiveCategoryName = () => {
    if (!activeCategory) return "";
    for (const mainCat of categoriesList) {
      if (mainCat._id === activeCategory) return mainCat.name;
      if (mainCat.subCategories) {
        const sub = mainCat.subCategories.find((s) => s._id === activeCategory);
        if (sub) return sub.name;
      }
    }
    return "";
  };

  const getImageUrl = (imagePath) => {
    if (!imagePath) return "";
    if (imagePath.startsWith("http")) return imagePath;
    return `http://localhost:3000/${imagePath}`;
  };

  // --- Product Card Component ---
  const ProductCard = ({ product, isCompact = false }) => (
    <div
      className={`group flex flex-col h-full bg-white border border-gray-100 rounded-2xl overflow-hidden hover:shadow-xl hover:border-orange-200 transition-all duration-300 relative ${isCompact ? "min-w-[260px] max-w-[260px]" : ""}`}
    >
      <div
        className={`absolute top-3 ${isRTL ? "left-3" : "right-3"} flex flex-col gap-2 opacity-0 group-hover:opacity-100 ${isRTL ? "-translate-x-4" : "translate-x-4"} group-hover:translate-x-0 transition-all duration-300 z-10`}
      >
        <button
          onClick={(e) => handleAddToWishlist(e, product)}
          className="w-9 h-9 bg-white rounded-full flex items-center justify-center text-gray-500 hover:text-red-500 hover:bg-red-50 shadow-sm border border-gray-100 transition-colors"
          title={t("Products.addToWishlist")}
        >
          <Heart size={18} />
        </button>
        <Link
          to={`/product/${product._id || product.id}`}
          className="w-9 h-9 bg-white rounded-full flex items-center justify-center text-gray-500 hover:text-blue-500 hover:bg-blue-50 shadow-sm border border-gray-100 transition-colors"
          title={t("Products.quickView")}
        >
          <Eye size={18} />
        </Link>
      </div>

      <Link
        to={`/product/${product._id || product.id}`}
        className={`relative w-full ${isCompact ? "h-48" : "h-56"} bg-gray-50/50 flex items-center justify-center p-6 overflow-hidden`}
      >
        <img
          src={product.image ? getImageUrl(product.image) : product.img}
          alt={product.name}
          className="max-w-full max-h-full object-contain mix-blend-multiply group-hover:scale-110 transition-transform duration-500"
        />
      </Link>

      <div className="flex flex-col flex-1 p-5">
        <span className="text-xs font-semibold text-orange-500 mb-2 uppercase tracking-wider line-clamp-1">
          {/* هنا هنترجم اسم القسم اللي راجع من الداتابيز */}
          {t(product.categoryId?.name) || t("Products.product")}
        </span>
        <Link
          to={`/product/${product._id || product.id}`}
          className="text-[15px] font-bold text-gray-800 leading-snug hover:text-orange-500 transition-colors mb-2 line-clamp-2"
        >
          {product.name}
        </Link>

        <div className="flex items-center gap-1 mb-4 mt-auto">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              size={14}
              className={
                i < 4 ? "text-yellow-400 fill-yellow-400" : "text-gray-200"
              }
            />
          ))}
          <span
            className={`text-xs text-gray-400 ${isRTL ? "mr-1" : "ml-1"} font-medium`}
          >
            (4)
          </span>
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-gray-50">
          <div className="flex flex-col">
            <span className="text-xs text-gray-400 line-through">
              ${(product.price * 1.15).toFixed(2)}
            </span>
            <span className="text-xl font-black text-gray-900">
              ${product.price}
            </span>
          </div>
          <button
            onClick={(e) => handleAddToCart(e, product)}
            className="flex items-center justify-center bg-gray-900 text-white w-11 h-11 rounded-full hover:bg-orange-500 shadow-md hover:shadow-orange-200 transition-all active:scale-95"
            title={t("Products.addToCart")}
          >
            <ShoppingCart size={20} className="relative -left-0.5" />
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="bg-gray-50/50 min-h-screen pb-16 relative" ref={topRef}>
      {toast && (
        <div
          className={`fixed bottom-6 ${isRTL ? "left-6" : "right-6"} bg-gray-900 text-white px-6 py-3 rounded-xl shadow-2xl flex items-center gap-3 z-50 animate-bounce`}
        >
          <CheckCircle2 size={20} className="text-green-400" />
          <span className="text-sm font-medium">{toast}</span>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 mt-8 flex flex-col lg:flex-row gap-8">
        {/* --- Sidebar --- */}
        <aside className="w-full lg:w-[280px] flex-shrink-0 space-y-8 bg-white p-6 rounded-2xl border border-gray-100 shadow-sm h-fit">
          <div>
            <h3 className="text-sm font-bold text-gray-900 uppercase mb-5 tracking-wider flex items-center gap-2">
              {t("Products.categoriesTitle")}
            </h3>
            <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
              {categoriesList.map((mainCat) => (
                <div key={mainCat._id} className="flex flex-col gap-2">
                  <label className="flex items-center gap-3 cursor-pointer group">
                    <div
                      onClick={() => {
                        setActiveCategory(
                          activeCategory === mainCat._id ? "" : mainCat._id,
                        );
                        setActiveCategoryType(
                          activeCategory === mainCat._id ? "" : "main",
                        );
                        setCurrentPage(1);
                      }}
                      className={`w-4 h-4 rounded-md border flex items-center justify-center transition-all ${activeCategory === mainCat._id && activeCategoryType === "main" ? "border-orange-500 bg-orange-500" : "border-gray-300 group-hover:border-orange-400"}`}
                    >
                      {activeCategory === mainCat._id &&
                        activeCategoryType === "main" && (
                          <CheckCircle2 size={12} className="text-white" />
                        )}
                    </div>
                    <span
                      className={`text-sm font-bold transition-colors ${activeCategory === mainCat._id && activeCategoryType === "main" ? "text-orange-600" : "text-gray-800"}`}
                    >
                      {/* الترجمة لاسم القسم */}
                      {t(mainCat.name)}
                    </span>
                  </label>
                  {mainCat.subCategories?.length > 0 && (
                    <div
                      className={`pl-6 space-y-2 border-l-2 border-gray-100 ${isRTL ? "mr-2 border-l-0 border-r-2 pr-6 pl-0" : "ml-2"} py-1`}
                    >
                      {mainCat.subCategories.map((subCat) => (
                        <label
                          key={subCat._id}
                          className="flex items-center gap-3 cursor-pointer group"
                        >
                          <div
                            onClick={() => {
                              setActiveCategory(
                                activeCategory === subCat._id ? "" : subCat._id,
                              );
                              setActiveCategoryType(
                                activeCategory === subCat._id ? "" : "sub",
                              );
                              setCurrentPage(1);
                            }}
                            className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center transition-colors ${activeCategory === subCat._id && activeCategoryType === "sub" ? "border-orange-500 bg-orange-500" : "border-gray-300 group-hover:border-orange-400"}`}
                          />
                          <span
                            className={`text-sm transition-colors ${activeCategory === subCat._id && activeCategoryType === "sub" ? "text-gray-900 font-semibold" : "text-gray-500 hover:text-gray-900"}`}
                          >
                            {/* الترجمة لاسم القسم الفرعي */}
                            {t(subCat.name)}
                          </span>
                        </label>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
          <hr className="border-gray-100" />
          <div>
            <h3 className="text-sm font-bold text-gray-900 uppercase mb-5 tracking-wider">
              {t("Products.priceRange")}
            </h3>
            <div className="flex items-center gap-3">
              <div className="relative w-full">
                <span
                  className={`absolute ${isRTL ? "right-3" : "left-3"} top-1/2 -translate-y-1/2 text-gray-400 text-sm`}
                >
                  $
                </span>
                <input
                  type="number"
                  placeholder={t("Products.min")}
                  value={minPrice}
                  onChange={(e) => setMinPrice(e.target.value)}
                  className={`w-full border border-gray-200 rounded-lg ${isRTL ? "pr-7 pl-3" : "pl-7 pr-3"} py-2 text-sm focus:border-orange-500 focus:ring-1 focus:ring-orange-200 outline-none transition-all`}
                />
              </div>
              <span className="text-gray-400">-</span>
              <div className="relative w-full">
                <span
                  className={`absolute ${isRTL ? "right-3" : "left-3"} top-1/2 -translate-y-1/2 text-gray-400 text-sm`}
                >
                  $
                </span>
                <input
                  type="number"
                  placeholder={t("Products.max")}
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(e.target.value)}
                  className={`w-full border border-gray-200 rounded-lg ${isRTL ? "pr-7 pl-3" : "pl-7 pr-3"} py-2 text-sm focus:border-orange-500 focus:ring-1 focus:ring-orange-200 outline-none transition-all`}
                />
              </div>
            </div>
          </div>
        </aside>

        {/* --- Main Content --- */}
        <main className="flex-1 overflow-hidden">
          <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
            <div className="relative w-full md:w-[400px]">
              <input
                type="text"
                placeholder={t("Products.searchPlaceholder")}
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                onKeyDown={handleSearchSubmit}
                className={`w-full bg-gray-50 border border-gray-200 rounded-xl py-2.5 px-4 ${isRTL ? "pl-10" : "pr-10"} text-sm focus:outline-none focus:border-orange-500 focus:bg-white transition-all`}
              />
              <button
                onClick={() => {
                  setSearchQuery(searchInput);
                  setCurrentPage(1);
                }}
                className={`absolute ${isRTL ? "left-3" : "right-3"} top-1/2 -translate-y-1/2 text-gray-400 hover:text-orange-500 transition-colors`}
              >
                <Search size={18} />
              </button>
            </div>
            <div className="flex items-center gap-3 w-full md:w-auto">
              <span className="text-sm text-gray-500 font-medium">
                {t("Products.sortBy")}
              </span>
              <select
                value={sortBy}
                onChange={(e) => {
                  setSortBy(e.target.value);
                  setCurrentPage(1);
                }}
                className="border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-orange-500 bg-gray-50 focus:bg-white cursor-pointer transition-all font-medium"
              >
                <option value="latest">{t("Products.latestArrivals")}</option>
                <option value="price_asc">
                  {t("Products.priceLowToHigh")}
                </option>
                <option value="price_desc">
                  {t("Products.priceHighToLow")}
                </option>
              </select>
            </div>
          </div>

          {(activeCategory || searchQuery || minPrice || maxPrice) && (
            <div className="mb-6 flex flex-wrap items-center gap-3">
              <span
                className={`text-sm text-gray-500 ${isRTL ? "ml-2" : "mr-2"}`}
              >
                {t("Products.filters")}
              </span>
              {activeCategory && (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-50 text-orange-700 text-sm border border-orange-100">
                  {t(getActiveCategoryName())}{" "}
                  <button
                    onClick={() => {
                      setActiveCategory("");
                      setActiveCategoryType("");
                    }}
                    className="hover:text-red-500"
                  >
                    <X size={14} />
                  </button>
                </span>
              )}
              {searchQuery && (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-sm border border-blue-100">
                  {t("Products.searchPrefix")} "{searchQuery}"{" "}
                  <button
                    onClick={() => {
                      setSearchQuery("");
                      setSearchInput("");
                    }}
                    className="hover:text-red-500"
                  >
                    <X size={14} />
                  </button>
                </span>
              )}
              <button
                onClick={clearFilters}
                className={`text-sm text-gray-500 hover:text-orange-500 underline underline-offset-2 ${isRTL ? "mr-auto" : "ml-auto"}`}
              >
                {t("Products.clearFilters")}
              </button>
            </div>
          )}

          {/* Stats */}
          <div className="mb-6 flex items-center justify-between text-sm text-gray-500 font-medium">
            <p>
              {t("Products.showing")}{" "}
              <strong className="text-gray-900">{products.length}</strong>{" "}
              {t("Products.of")}{" "}
              <strong className="text-gray-900">{totalItems}</strong>{" "}
              {t("Products.results")}
            </p>
            <p>
              {t("Products.page")}{" "}
              <strong className="text-orange-500">{currentPage}</strong>{" "}
              {t("Products.of")}{" "}
              <strong className="text-gray-900">{totalPages}</strong>
            </p>
          </div>

          {/* Products Grid */}
          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {[...Array(10)].map((_, i) => (
                <div
                  key={i}
                  className="bg-white border border-gray-100 rounded-2xl p-5 h-[380px] flex flex-col animate-pulse"
                >
                  <div className="w-full h-48 bg-gray-200 rounded-xl mb-4"></div>
                  <div className="h-4 bg-gray-200 rounded w-3/4 mb-3"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2 mb-auto"></div>
                </div>
              ))}
            </div>
          ) : products.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-32 bg-white rounded-2xl border border-gray-100 border-dashed">
              <Search size={48} className="text-gray-300 mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                {t("Products.noProducts")}
              </h3>
              <p className="text-gray-500">{t("Products.adjustFilters")}</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {products.map((product) => (
                <ProductCard
                  key={product._id || product.id}
                  product={product}
                />
              ))}
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div
              className={`flex items-center justify-center gap-2 mt-14 mb-10 ${isRTL ? "flex-row-reverse" : ""}`}
            >
              <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="w-10 h-10 rounded-xl border border-gray-200 text-gray-600 flex items-center justify-center hover:border-orange-500 hover:text-orange-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all bg-white shadow-sm"
              >
                <ArrowLeft size={18} />
              </button>

              {[...Array(totalPages)].map((_, i) => {
                if (
                  totalPages > 7 &&
                  i > 2 &&
                  i < totalPages - 3 &&
                  i !== currentPage - 1
                ) {
                  if (i === 3)
                    return (
                      <span key={i} className="px-2 text-gray-400">
                        ...
                      </span>
                    );
                  return null;
                }
                return (
                  <button
                    key={i}
                    onClick={() => setCurrentPage(i + 1)}
                    className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold transition-all shadow-sm ${currentPage === i + 1 ? "bg-orange-500 text-white shadow-lg shadow-orange-200 border-none" : "border border-gray-200 text-gray-600 hover:border-orange-500 hover:text-orange-500 bg-white"}`}
                  >
                    {i + 1}
                  </button>
                );
              })}

              <button
                onClick={() =>
                  setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                }
                disabled={currentPage === totalPages}
                className="w-10 h-10 rounded-xl border border-gray-200 text-gray-600 flex items-center justify-center hover:border-orange-500 hover:text-orange-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all bg-white shadow-sm"
              >
                <ArrowRight size={18} />
              </button>
            </div>
          )}

          {/* --- Related Products Section --- */}
          {relatedProducts.length > 0 && (
            <div className="mt-16 pt-10 border-t border-gray-200">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-bold text-gray-900">
                  {t("Products.moreFromCategory")}
                </h2>
                <div
                  className={`flex items-center gap-2 ${isRTL ? "flex-row-reverse" : ""}`}
                >
                  <button
                    onClick={() => scrollSlider("left")}
                    className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-gray-600 hover:bg-orange-500 hover:text-white hover:border-orange-500 transition-all"
                  >
                    <ChevronLeft size={20} />
                  </button>
                  <button
                    onClick={() => scrollSlider("right")}
                    className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-gray-600 hover:bg-orange-500 hover:text-white hover:border-orange-500 transition-all"
                  >
                    <ChevronRightIcon size={20} />
                  </button>
                </div>
              </div>

              <div
                ref={sliderRef}
                className="flex gap-6 overflow-x-auto pb-6 hide-scrollbar snap-x snap-mandatory"
                style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
              >
                {relatedProducts.map((product) => (
                  <div key={product._id || product.id} className="snap-start">
                    <ProductCard product={product} isCompact={true} />
                  </div>
                ))}
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
