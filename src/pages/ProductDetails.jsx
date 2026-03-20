import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
// 🚨 تأكد إن مسار ملف api.js هنا صحيح
import api from "../utils/api.js";
import {
  Star,
  ShoppingCart,
  Heart,
  RefreshCw,
  Copy,
  Facebook,
  Twitter,
  Instagram,
  ChevronLeft,
  ChevronRight,
  Minus,
  Plus,
  Medal,
  Truck,
  ShieldCheck,
  Headphones,
  CreditCard,
  CheckCircle2, // ضفنا دي عشان الـ Toast
} from "lucide-react";

export default function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // --- UI States ---
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [activeTab, setActiveTab] = useState("description");
  const [toast, setToast] = useState(null); // State for Toast messages

  // دالة عشان تظبط مسار الصورة
  const getImageUrl = (imagePath) => {
    if (!imagePath)
      return "https://placehold.co/600x400/f3f4f6/6b7280?text=No+Image";
    if (imagePath.startsWith("http")) return imagePath;
    return `http://localhost:3000/${imagePath}`;
  };

  // --- Helpers ---
  const showToast = (message) => {
    setToast(message);
    setTimeout(() => setToast(null), 3000);
  };

  // --- Fetch Real Product Data ---
  useEffect(() => {
    const fetchProductDetails = async () => {
      setIsLoading(true);
      try {
        const response = await api.get(`/products/${id}`);
        const productData =
          response.data.data || response.data.product || response.data;

        if (productData) {
          setProduct(productData);
        }
      } catch (error) {
        console.error("Error fetching product details:", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (id) {
      fetchProductDetails();
    }
  }, [id]);

  // 🚀 دالة الإضافة للسلة المحددة
  const handleAddToCart = async () => {
    try {
      const response = await api.post("/cart", {
        productId: product._id || product.id,
        quantity: quantity,
      });

      // نتحقق من نجاح العملية (سواء 200 أو 201 أو success true)
      if (
        response.status === 200 ||
        response.status === 201 ||
        response.data.success
      ) {
        // 1. إظهار رسالة النجاح للمستخدم
        showToast(`"${product.name || product.title}" added to cart! 🛒`);

        // 2. إرسال الإشارة للـ Header (دي أهم خطوة)
        // بنعملها في الـ Next Tick عشان نضمن إن الـ State في السيرفر اتحدثت
        setTimeout(() => {
          window.dispatchEvent(new Event("cartUpdated"));
        }, 100);
      }
    } catch (error) {
      console.error("Cart Error:", error.response?.data || error.message);

      if (error.response) {
        const serverMessage =
          error.response.data.message || "Failed to add product";
        if (error.response.status === 401 || error.response.status === 403) {
          showToast("Please login first to add items! ⚠️");
        } else {
          showToast(`Error: ${serverMessage} ❌`);
        }
      } else {
        showToast("Network error. Is the server running? ❌");
      }
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-orange-500 font-bold text-xl">
        Loading Product...
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-500 font-bold text-xl">
        Product not found!
      </div>
    );
  }

  const productImages = [
    getImageUrl(product.image || product.img || product.imageCover),
    "https://placehold.co/600x400/e5e7eb/6b7280?text=Side+View",
    "https://placehold.co/600x400/d1d5db/6b7280?text=Top+View",
  ];

  // ==========================================
  // بيانات وهمية للقسم التالت (عشان نظبط الشكل)
  // ==========================================
  const mockSmallProducts = [
    {
      id: 1,
      name: "Bose Sport Earbuds - Wireless Earphones",
      price: "1,500",
      img: "https://placehold.co/80x80/f3f4f6/6b7280?text=Item",
    },
    {
      id: 2,
      name: "Simple Mobile 4G LTE Prepaid Smartphone",
      price: "1,500",
      img: "https://placehold.co/80x80/f3f4f6/6b7280?text=Item",
    },
    {
      id: 3,
      name: "4K UHD LED Smart TV with Chromecast",
      price: "1,500",
      img: "https://placehold.co/80x80/f3f4f6/6b7280?text=Item",
    },
  ];

  const section3Columns = [
    { title: "RELATED PRODUCT", items: mockSmallProducts },
    { title: "PRODUCT ACCESSORIES", items: mockSmallProducts },
    { title: "APPLE PRODUCT", items: mockSmallProducts },
    { title: "FEATURED PRODUCTS", items: mockSmallProducts },
  ];

  return (
    <div className="bg-white min-h-screen pb-16 relative">
      {/* Toast Notification */}
      {toast && (
        <div className="fixed bottom-6 right-6 bg-gray-900 text-white px-6 py-3 rounded-xl shadow-2xl flex items-center gap-3 z-50 animate-bounce">
          <CheckCircle2
            size={20}
            className={
              toast.includes("❌") || toast.includes("⚠️")
                ? "text-red-400"
                : "text-green-400"
            }
          />
          <span className="text-sm font-medium">{toast}</span>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* ==================== Section 1: Main Product Details ==================== */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* --- Left: Image Gallery --- */}
          <div className="flex flex-col gap-4">
            <div className="w-full aspect-video md:aspect-[4/3] bg-gray-50 border border-gray-100 rounded-2xl flex items-center justify-center p-8 overflow-hidden">
              <img
                src={productImages[selectedImage]}
                alt={product.name || product.title}
                className="max-w-full max-h-full object-contain mix-blend-multiply"
              />
            </div>
            {/* Thumbnails */}
            <div className="flex items-center gap-3 relative px-8">
              <button className="absolute left-0 w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center shadow-md hover:bg-orange-600 transition-colors z-10">
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
                      alt={`thumb ${index}`}
                      className="max-w-full max-h-full object-contain mix-blend-multiply"
                    />
                  </div>
                ))}
              </div>
              <button className="absolute right-0 w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center shadow-md hover:bg-orange-600 transition-colors z-10">
                <ChevronRight size={20} />
              </button>
            </div>
          </div>

          {/* --- Right: Product Info --- */}
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
                4.5 Star Rating
              </span>
            </div>

            <h1 className="text-2xl font-bold text-gray-900 leading-snug mb-4">
              {product.name || product.title}
            </h1>

            <div className="grid grid-cols-2 gap-y-3 gap-x-6 text-sm mb-6">
              <div className="flex text-gray-500">
                <span className="w-20">Category:</span>{" "}
                <strong className="text-gray-900">
                  {product.categoryId?.name ||
                    product.category?.name ||
                    "General"}
                </strong>
              </div>
              <div className="flex text-gray-500">
                <span className="w-24">Availability:</span>{" "}
                <strong className="text-green-500">In Stock</strong>
              </div>
            </div>

            <div className="flex items-end gap-3 mb-6">
              <span className="text-3xl font-bold text-blue-500">
                ${product.price}
              </span>
            </div>

            <p className="text-gray-600 mb-6 border-t border-gray-100 pt-6">
              {product.description ||
                "No description available for this product."}
            </p>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row items-center gap-4 mb-6">
              <div className="flex items-center border border-gray-200 rounded-lg h-12 w-32 bg-white">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="flex-1 flex justify-center text-gray-500 hover:text-orange-500"
                >
                  <Minus size={18} />
                </button>
                <span className="font-semibold text-gray-800 w-10 text-center">
                  {quantity < 10 ? `0${quantity}` : quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="flex-1 flex justify-center text-gray-500 hover:text-orange-500"
                >
                  <Plus size={18} />
                </button>
              </div>

              {/* 🚀 الزرار اتعدل هنا واتربط بالدالة */}
              <button
                onClick={handleAddToCart}
                className="flex-1 flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-600 text-white h-12 rounded-lg font-bold uppercase tracking-wide transition-colors w-full active:scale-95"
              >
                Add to Cart <ShoppingCart size={20} />
              </button>
            </div>
          </div>
        </div>

        {/* ==================== Section 2: Product Tabs ==================== */}
        <div className="mt-12 border border-gray-200 rounded-xl bg-white overflow-hidden">
          <div className="flex flex-wrap border-b border-gray-200 px-4 sm:px-8">
            {[
              "description",
              "additional information",
              "specification",
              "review",
            ].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`py-4 px-2 sm:px-6 text-sm font-bold uppercase tracking-wide transition-all ${
                  activeTab === tab
                    ? "border-b-2 border-orange-500 text-gray-900"
                    : "text-gray-500 hover:text-gray-900"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="p-6 sm:p-10">
            {activeTab === "description" && (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                <div className="lg:col-span-1">
                  <h3 className="text-gray-900 font-bold mb-4 text-lg">
                    Description
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed mb-4">
                    {product.description ||
                      "The most powerful product ever is here. With blazing-fast performance and amazing battery life."}
                  </p>
                </div>
                <div className="lg:col-span-1">
                  <h3 className="text-gray-900 font-bold mb-4 text-lg">
                    Feature
                  </h3>
                  <ul className="space-y-4">
                    <li className="flex items-center gap-3 text-sm text-gray-700">
                      <Medal className="text-orange-500" size={20} /> Free 1
                      Year Warranty
                    </li>
                    <li className="flex items-center gap-3 text-sm text-gray-700">
                      <Truck className="text-orange-500" size={20} /> Free
                      Shipping & Fasted Delivery
                    </li>
                    <li className="flex items-center gap-3 text-sm text-gray-700">
                      <ShieldCheck className="text-orange-500" size={20} /> 100%
                      Money-back guarantee
                    </li>
                  </ul>
                </div>
                <div className="lg:col-span-1 lg:border-l lg:border-gray-100 lg:pl-10">
                  <h3 className="text-gray-900 font-bold mb-4 text-lg">
                    Shipping Information
                  </h3>
                  <ul className="space-y-4 text-sm">
                    <li>
                      <span className="text-gray-900 font-semibold">
                        Courier:
                      </span>{" "}
                      <span className="text-gray-500">
                        2 - 4 days, free shipping
                      </span>
                    </li>
                    <li>
                      <span className="text-gray-900 font-semibold">
                        Local Shipping:
                      </span>{" "}
                      <span className="text-gray-500">
                        up to one week, $19.00
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            )}
            {activeTab !== "description" && (
              <div className="text-gray-500 text-center py-8">
                Content for {activeTab} will go here...
              </div>
            )}
          </div>
        </div>

        {/* ==================== Section 3: Related Categories Grid ==================== */}
        <div className="mt-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
            {section3Columns.map((col, index) => (
              <div key={index} className="flex flex-col">
                <h3 className="text-gray-900 font-bold uppercase mb-4 text-sm tracking-widest">
                  {col.title}
                </h3>
                <div className="flex flex-col gap-4">
                  {col.items.map((item, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-4 p-3 border border-gray-200 rounded-lg bg-white hover:border-orange-500 hover:shadow-sm transition-all cursor-pointer group"
                    >
                      {/* Product Image */}
                      <div className="w-20 h-20 flex-shrink-0 bg-gray-50 rounded p-2 flex items-center justify-center">
                        <img
                          src={item.img}
                          alt={item.name}
                          className="max-w-full max-h-full object-contain mix-blend-multiply group-hover:scale-105 transition-transform"
                        />
                      </div>

                      {/* Product Details */}
                      <div className="flex flex-col overflow-hidden">
                        <span className="text-sm text-gray-700 line-clamp-2 leading-snug group-hover:text-orange-500 transition-colors">
                          {item.name}
                        </span>
                        <span className="text-blue-500 font-bold text-sm mt-1">
                          ${item.price}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
