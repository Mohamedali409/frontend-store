import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Star } from "lucide-react";

// =========================================
// 1. البيانات الوهمية (Mock Data)
// =========================================
const tabs = [
  "All Product",
  "Keyboard & Mouse",
  "Headphone",
  "Webcam",
  "Printer",
];

const products = [
  {
    id: 1,
    name: "Amazon Basics High-Speed HDMI Cable (18 Gbps, 4K/6...",
    price: 360,
    rating: 4,
    reviews: 994,
    badge: { text: "BEST DEALS", color: "bg-[#2DB2FF]" },
    image:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=300",
  },
  {
    id: 2,
    name: "Portable Wshing Machine, 11lbs capacity Model 18NMF...",
    price: 80,
    rating: 5,
    reviews: 798,
    image:
      "https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&q=80&w=300",
  },
  {
    id: 3,
    name: "TOZO T6 True Wireless Earbuds Bluetooth Headphon...",
    price: 70,
    rating: 5,
    reviews: 600,
    badge: { text: "HOT", color: "bg-[#EF5151]" },
    image:
      "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?auto=format&fit=crop&q=80&w=300", // Keyboard image mock
  },
  {
    id: 4,
    name: "Dell Optiplex 7000x7480 All-in-One Computer Monitor",
    price: 250,
    rating: 4,
    reviews: 492,
    image:
      "https://images.unsplash.com/photo-1612815154858-60aa4c59eaa6?auto=format&fit=crop&q=80&w=300", // Printer image mock
  },
  {
    id: 5,
    name: "Samsung Electronics Samsung Galaxy S21 5G",
    price: 2300,
    rating: 4,
    reviews: 740,
    image:
      "https://images.unsplash.com/photo-1555274175-6cbf6f3b137b?auto=format&fit=crop&q=80&w=300", // Camera/Webcam mock
  },
  {
    id: 6,
    name: "4K UHD LED Smart TV with Chromecast Built-in",
    price: 220,
    rating: 4,
    reviews: 556,
    badge: { text: "SALE", color: "bg-[#2DB2FF]" }, // Changed to green in UI manually
    image:
      "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?auto=format&fit=crop&q=80&w=300",
  },
  {
    id: 7,
    name: "Wired Over-Ear Gaming Headphones with USB",
    price: 1500,
    rating: 4,
    reviews: 536,
    image:
      "https://images.unsplash.com/photo-1593640408182-31c70c8268f5?auto=format&fit=crop&q=80&w=300",
  },
  {
    id: 8,
    name: "Polaroid 57-Inch Photo/Video Tripod with Deluxe Tripod Ca...",
    price: 1200,
    oldPrice: 1600,
    rating: 3,
    reviews: 423,
    badge: { text: "25% OFF", color: "bg-[#F3DE6D]" },
    image:
      "https://images.unsplash.com/photo-1626806787461-102c1bfaaea1?auto=format&fit=crop&q=80&w=300",
  },
];

// =========================================
// 2. مكون التقييم (النجوم)
// =========================================
const StarRating = ({ rating }) => {
  return (
    <div className="flex gap-[1px]">
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          size={14}
          className={
            i < rating
              ? "fill-[#FA8232] text-[#FA8232]"
              : "fill-gray-200 text-gray-200"
          }
        />
      ))}
    </div>
  );
};

// =========================================
// 3. المكون الرئيسي (Computer Accessories)
// =========================================
export default function ComputerAccessories() {
  const [activeTab, setActiveTab] = useState("All Product");

  return (
    <section className="max-w-7xl mx-auto px-4 py-8 md:py-12 bg-white">
      {/* Header & Tabs */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-6 gap-4 border-b border-gray-100 pb-2">
        <h2 className="text-xl md:text-2xl font-bold text-gray-900">
          Computer Accessories
        </h2>

        <div className="flex flex-wrap items-center gap-4 md:gap-6 text-sm font-medium">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`pb-2 transition-colors relative ${
                activeTab === tab
                  ? "text-gray-900"
                  : "text-gray-500 hover:text-gray-900"
              }`}
            >
              {tab}
              {activeTab === tab && (
                <span className="absolute bottom-[-2px] left-0 w-full h-0.5 bg-[#FA8232]"></span>
              )}
            </button>
          ))}
          <Link
            to="/accessories"
            className="text-[#FA8232] flex items-center gap-1.5 hover:gap-2 transition-all ml-auto lg:ml-4 pb-2"
          >
            Browse All Product <ArrowRight size={16} />
          </Link>
        </div>
      </div>

      {/* Main Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* =========================================
            Left Side: Products Grid (3 Columns Width)
           ========================================= */}
        <div className="lg:col-span-3 border border-gray-200 bg-white grid grid-cols-2 md:grid-cols-4">
          {products.map((product, index) => (
            <div
              key={product.id}
              className={`p-4 relative group flex flex-col hover:shadow-lg transition-shadow bg-white ${
                // Add right and bottom borders selectively to prevent double borders
                (index + 1) % 4 !== 0
                  ? "md:border-r border-b border-gray-200"
                  : "border-b border-gray-200"
              } ${index >= 4 ? "border-b-0 md:border-b-0" : ""}`}
            >
              {/* Badge */}
              {product.badge && (
                <span
                  className={`absolute top-3 left-3 z-10 text-[10px] font-bold px-2 py-1 rounded-sm text-white ${
                    product.badge.text === "25% OFF"
                      ? "bg-[#F3DE6D] text-gray-900"
                      : product.badge.text === "SALE"
                        ? "bg-[#2AAA5E]"
                        : product.badge.color
                  }`}
                >
                  {product.badge.text}
                </span>
              )}

              {/* Product Image */}
              <Link
                to={`/product/${product.id}`}
                className="block relative w-full h-32 md:h-40 mb-4 overflow-hidden mt-6"
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-contain mix-blend-multiply transition-transform duration-500 group-hover:scale-105"
                />
              </Link>

              {/* Product Info */}
              <div className="flex flex-col flex-grow justify-end">
                {/* Rating */}
                <div className="flex items-center gap-1 mb-2">
                  <StarRating rating={product.rating} />
                  <span className="text-[11px] text-gray-400 ml-1">
                    ({product.reviews})
                  </span>
                </div>

                {/* Title */}
                <Link
                  to={`/product/${product.id}`}
                  className="hover:text-orange-500 transition-colors"
                >
                  <h3 className="text-gray-800 text-xs md:text-[13px] font-medium mb-2 line-clamp-2 leading-tight">
                    {product.name}
                  </h3>
                </Link>

                {/* Price */}
                <div className="flex items-center gap-1.5 mt-auto">
                  {product.oldPrice && (
                    <span className="text-gray-400 line-through text-[11px] md:text-xs">
                      ${product.oldPrice}
                    </span>
                  )}
                  <span className="text-[#2DB2FF] font-semibold text-sm">
                    ${product.price}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* =========================================
            Right Side: Vertical Banners (1 Column Width)
           ========================================= */}
        <div className="lg:col-span-1 flex flex-col gap-6">
          {/* Top Banner (Yellow) */}
          <div className="bg-[#FBE8A4] rounded-sm p-6 flex flex-col items-center text-center h-1/2 justify-center hover:-translate-y-1 transition-transform duration-300">
            <img
              src="https://images.unsplash.com/photo-1590658268037-6f116412ae8a?auto=format&fit=crop&q=80&w=200"
              alt="Earbuds"
              className="w-24 h-24 object-contain mb-4 mix-blend-multiply"
            />
            <h3 className="text-xl font-bold text-gray-900 mb-2 leading-tight">
              Xiaomi True <br /> Wireless Earbuds
            </h3>
            <p className="text-gray-600 text-sm mb-4 leading-relaxed">
              Escape the noise, It's time to hear the magic with Xiaomi Earbuds.
            </p>
            <div className="flex items-center gap-2 mb-4 text-sm">
              <span className="text-gray-600">Only for:</span>
              <span className="bg-white px-3 py-1 font-bold text-gray-900 rounded-sm shadow-sm">
                $299 USD
              </span>
            </div>
            <Link
              to="/shop"
              className="w-full bg-[#FA8232] hover:bg-[#E57328] text-white font-bold py-3 rounded-sm flex justify-center items-center gap-2 transition-colors uppercase text-sm"
            >
              Shop Now <ArrowRight size={18} />
            </Link>
          </div>

          {/* Bottom Banner (Dark Blue) */}
          <div className="bg-[#12415D] rounded-sm p-6 flex flex-col items-center text-center h-1/2 justify-center hover:-translate-y-1 transition-transform duration-300">
            <span className="bg-white/10 text-white text-[10px] font-bold px-3 py-1 uppercase tracking-wider mb-4 rounded-sm">
              Summer Sales
            </span>
            <h3 className="text-3xl font-bold text-white mb-2">37% DISCOUNT</h3>
            <p className="text-gray-300 text-sm mb-6">
              only for{" "}
              <span className="text-[#F3DE6D] font-medium">SmartPhone</span>{" "}
              product.
            </p>
            <Link
              to="/shop"
              className="w-full bg-[#2DB2FF] hover:bg-[#209CE6] text-white font-bold py-3 rounded-sm flex justify-center items-center gap-2 transition-colors uppercase text-sm"
            >
              Shop Now <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
