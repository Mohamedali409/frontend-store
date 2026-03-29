import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import api from "../utils/api.js";
import {
  Star,
  ShoppingCart,
  ChevronLeft,
  ChevronRight,
  Minus,
  Plus,
  Medal,
  Truck,
  ShieldCheck,
  CheckCircle2,
} from "lucide-react";

export default function ProductDetails() {
  const { id } = useParams();
  const { t } = useTranslation();

  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [activeTab, setActiveTab] = useState("description");
  const [toast, setToast] = useState(null);

  // ✅ الجزء المُعدل بالكامل لتشغيل الصور بمسافات أو بدون ✅
  const getImageUrl = (imagePath) => {
    if (!imagePath)
      return "https://placehold.co/600x400/f3f4f6/6b7280?text=No+Image";
    if (imagePath.startsWith("http")) return imagePath;

    // التأكد من عدم وجود "دبل سلاش" في الرابط
    const cleanPath = imagePath.startsWith("/") ? imagePath : `/${imagePath}`;

    // استخدام encodeURI لتحويل المسافات لـ %20
    return encodeURI(`http://localhost:3000${cleanPath}`);
  };

  const showToast = (message) => {
    setToast(message);
    setTimeout(() => setToast(null), 3000);
  };

  useEffect(() => {
    const fetchProductDetails = async () => {
      setIsLoading(true);
      try {
        const response = await api.get(`/products/${id}`);
        const productData =
          response.data.data || response.data.product || response.data;
        if (productData) setProduct(productData);
      } catch (error) {
        console.error("Error fetching product details:", error);
      } finally {
        setIsLoading(false);
      }
    };
    if (id) fetchProductDetails();
  }, [id]);

  const handleAddToCart = async () => {
    try {
      const response = await api.post("/cart", {
        productId: product._id || product.id,
        quantity: quantity,
      });

      if (
        response.status === 200 ||
        response.status === 201 ||
        response.data.success
      ) {
        showToast(`${t("product.addedToCart")}`);
        setTimeout(() => window.dispatchEvent(new Event("cartUpdated")), 100);
      }
    } catch (error) {
      if (error.response?.status === 401) {
        showToast(`${t("product.loginFirst")}`);
      } else {
        showToast(`${t("product.errorAdding")}`);
      }
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-orange-500 font-bold text-xl">
        {t("product.loading")}
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-500 font-bold text-xl">
        {t("product.notFound")}
      </div>
    );
  }

  const productImages = [
    getImageUrl(product.image || product.img || product.imageCover),
    "https://placehold.co/600x400/e5e7eb/6b7280?text=Side+View",
    "https://placehold.co/600x400/d1d5db/6b7280?text=Top+View",
  ];

  const tabs = ["description", "additional_info", "specification", "review"];

  return (
    <div className="bg-white min-h-screen pb-16 relative">
      {toast && (
        <div className="fixed bottom-6 right-6 left-6 md:left-auto md:w-80 bg-gray-900 text-white px-6 py-4 rounded-xl shadow-2xl flex items-center gap-3 z-50 animate-in fade-in slide-in-from-bottom-4">
          <CheckCircle2 size={20} />
          <span className="text-sm font-medium">{toast}</span>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <div className="flex flex-col gap-4">
            <div className="w-full aspect-square md:aspect-[4/3] bg-gray-50 border border-gray-100 rounded-2xl flex items-center justify-center p-8 overflow-hidden group">
              <img
                src={productImages[selectedImage]}
                alt={product.name}
                className="max-w-full max-h-full object-contain mix-blend-multiply group-hover:scale-105 transition-transform duration-500"
              />
            </div>

            <div className="flex items-center gap-3 relative px-8">
              <button className="absolute left-0 w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center shadow-md z-10 rtl:rotate-180">
                <ChevronLeft size={20} />
              </button>
              <div className="flex gap-3 overflow-x-auto w-full px-2 hide-scrollbar">
                {productImages.map((img, index) => (
                  <div
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`w-20 h-20 flex-shrink-0 rounded-lg border-2 cursor-pointer p-2 flex items-center justify-center transition-all ${
                      selectedImage === index
                        ? "border-orange-500 bg-white"
                        : "border-gray-100 bg-gray-50"
                    }`}
                  >
                    <img
                      src={img}
                      alt="thumb"
                      className="max-w-full max-h-full object-contain"
                    />
                  </div>
                ))}
              </div>
              <button className="absolute right-0 w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center shadow-md z-10 rtl:rotate-180">
                <ChevronRight size={20} />
              </button>
            </div>
          </div>

          <div className="flex flex-col">
            <div className="flex items-center gap-2 mb-3">
              <div className="flex items-center text-orange-400">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={16}
                    fill={i < 4 ? "currentColor" : "none"}
                    className={i === 4 ? "text-gray-300" : ""}
                  />
                ))}
              </div>
              <span className="text-sm font-bold text-gray-800">
                4.5 {t("product.rating")}
              </span>
            </div>

            <h1 className="text-3xl font-black text-gray-900 leading-snug mb-4">
              {product.name || product.title}
            </h1>

            <div className="grid grid-cols-2 gap-y-3 text-sm mb-6 border-b pb-6">
              <div className="text-gray-500">
                {t("product.category")}:{" "}
                <strong className="text-gray-900">
                  {product.categoryId?.name || t("product.general")}
                </strong>
              </div>
              <div className="text-gray-500">
                {t("product.availability")}:{" "}
                <strong className="text-green-500">
                  {t("product.inStock")}
                </strong>
              </div>
            </div>

            <div className="text-4xl font-black text-blue-600 mb-6">
              ${product.price}
            </div>

            <p className="text-gray-600 mb-8 leading-relaxed">
              {product.description || t("product.tabs.description")}
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-4">
              <div className="flex items-center border-2 border-gray-100 rounded-xl h-14 w-36 bg-white">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="flex-1 flex justify-center text-gray-400 hover:text-orange-500 transition-colors"
                >
                  <Minus size={20} />
                </button>
                <span className="font-bold text-xl text-gray-800 w-10 text-center">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="flex-1 flex justify-center text-gray-400 hover:text-orange-500 transition-colors"
                >
                  <Plus size={20} />
                </button>
              </div>

              <button
                onClick={handleAddToCart}
                className="flex-1 flex items-center justify-center gap-3 bg-orange-500 hover:bg-orange-600 text-white h-14 rounded-xl font-black uppercase tracking-wider transition-all active:scale-95 w-full shadow-lg shadow-orange-200"
              >
                {t("product.addToCart")} <ShoppingCart size={22} />
              </button>
            </div>
          </div>
        </div>

        {/* --- قسم الـ Tabs --- */}
        <div className="mt-16 border border-gray-100 rounded-2xl bg-white shadow-sm overflow-hidden">
          <div className="flex flex-wrap border-b bg-gray-50/50">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`py-5 px-8 text-sm font-bold uppercase tracking-widest transition-all ${
                  activeTab === tab
                    ? "bg-white border-t-4 border-orange-500 text-gray-900 shadow-sm"
                    : "text-gray-400 hover:text-gray-600"
                }`}
              >
                {t(`product.tabs.${tab}`)}
              </button>
            ))}
          </div>

          <div className="p-8 md:p-12">
            {activeTab === "description" ? (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                <div className="lg:col-span-2">
                  <h3 className="text-xl font-bold text-gray-900 mb-6">
                    {t("product.tabs.description")}
                  </h3>
                  <p className="text-gray-600 leading-loose">
                    {product.description}
                  </p>
                </div>
                <div className="space-y-6 bg-orange-50/50 p-6 rounded-2xl">
                  <div className="flex items-center gap-4">
                    <Medal className="text-orange-500" />
                    <span className="text-sm font-bold">
                      {t("help.categories.returns")}
                    </span>
                  </div>
                  <div className="flex items-center gap-4">
                    <Truck className="text-orange-500" />
                    <span className="text-sm font-bold">
                      {t("help.categories.tracking")}
                    </span>
                  </div>
                  <div className="flex items-center gap-4">
                    <ShieldCheck className="text-orange-500" />
                    <span className="text-sm font-bold">
                      {t("product.availability")}
                    </span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-gray-400 text-center py-10 italic">
                {t("product.tabs.no_content")}...
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
