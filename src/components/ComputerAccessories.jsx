import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, ArrowLeft, Star } from "lucide-react";
import { useTranslation } from "react-i18next";
import Xiaomi_True_Wireless_Earbuds from "../assets/image/Home/ComputerAccessories/Xiaomi_True_Wireless_Earbuds.png";

import webar from "../assets/image/Computer Accessories/a5935e4ae865aea09c3021d056c99782b3748bc2 (2).jpg";
import Amazon_Basics_High from "../assets/image/Computer Accessories/Amazon_Basics_High-Speed.png";
import Dell_Optiplex_7000x7480 from "../assets/image/Computer Accessories/Dell_Optiplex_7000x7480.png";
import K_UHD_LED_Smart_TV from "../assets/image/Computer Accessories/K_UHD_LED_Smart_TV.png";
import Polaroid_57 from "../assets/image/Computer Accessories/Polaroid_57-Inch.png";
import Portable_Wshing from "../assets/image/Computer Accessories/Portable_Wshing.png";
import Samsung_Electronics_Samsung_Galexy_S21_5G from "../assets/image/Computer Accessories/Samsung_Electronics_Samsung_Galexy_S21_5G.png";
import TOZO_T6_True_Wireless from "../assets/image/Computer Accessories/TOZO_T6_True_Wireless.png";
import Wired_Over_Ear_Gaming from "../assets/image/Computer Accessories/Wired_Over_Ear_Gaming.png";

const products = [
  {
    id: 1,
    name: "Amazon Basics High-Speed HDMI Cable (18 Gbps, 4K/6...",
    price: 360,
    rating: 4,
    reviews: 994,
    badge: { text: "BEST DEALS", color: "bg-[#2DB2FF]" },
    image: Amazon_Basics_High,
  },
  {
    id: 2,
    name: "Portable Wshing Machine, 11lbs capacity Model 18NMF...",
    price: 80,
    rating: 5,
    reviews: 798,
    image: Portable_Wshing,
  },
  {
    id: 3,
    name: "TOZO T6 True Wireless Earbuds Bluetooth Headphon...",
    price: 70,
    rating: 5,
    reviews: 600,
    badge: { text: "HOT", color: "bg-[#EF5151]" },
    image: TOZO_T6_True_Wireless,
  },
  {
    id: 4,
    name: "Dell Optiplex 7000x7480 All-in-One Computer Monitor",
    price: 250,
    rating: 4,
    reviews: 492,
    image: Dell_Optiplex_7000x7480,
  },
  {
    id: 5,
    name: "Samsung Electronics Samsung Galaxy S21 5G",
    price: 2300,
    rating: 4,
    reviews: 740,
    image: Samsung_Electronics_Samsung_Galexy_S21_5G,
  },
  {
    id: 6,
    name: "4K UHD LED Smart TV with Chromecast Built-in",
    price: 220,
    rating: 4,
    reviews: 556,
    badge: { text: "SALE", color: "bg-[#2DB2FF]" },
    image: K_UHD_LED_Smart_TV,
  },
  {
    id: 7,
    name: "Wired Over-Ear Gaming Headphones with USB",
    price: 1500,
    rating: 4,
    reviews: 536,
    image: Wired_Over_Ear_Gaming,
  },
  {
    id: 8,
    name: "Polaroid 57-Inch Photo/Video Tripod with Deluxe Tripod Ca...",
    price: 1200,
    oldPrice: 1600,
    rating: 3,
    reviews: 423,
    badge: { text: "25% OFF", color: "bg-[#F3DE6D]" },
    image: Polaroid_57,
  },
];

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

export default function ComputerAccessories() {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === "ar";

  const tabs = [
    { id: "all", label: "Accessories.tabs.all" },
    { id: "keyboard", label: "Accessories.tabs.keyboard" },
    { id: "headphone", label: "Accessories.tabs.headphone" },
    { id: "webcam", label: "Accessories.tabs.webcam" },
    { id: "printer", label: "Accessories.tabs.printer" },
  ];

  const [activeTabId, setActiveTabId] = useState("all");

  return (
    <section className="max-w-7xl mx-auto px-4 py-8 md:py-12 bg-white">
      <div
        className={`flex flex-col lg:flex-row lg:items-center justify-between mb-6 gap-4 border-b border-gray-100 pb-2 ${isRTL ? "text-right" : "text-left"}`}
      >
        <h2 className="text-xl md:text-2xl font-bold text-gray-900">
          {t("Accessories.title")}
        </h2>

        <div className="flex flex-wrap items-center gap-4 md:gap-6 text-sm font-medium">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTabId(tab.id)}
              className={`pb-2 transition-colors relative ${
                activeTabId === tab.id
                  ? "text-gray-900"
                  : "text-gray-500 hover:text-gray-900"
              }`}
            >
              {t(tab.label)}
              {activeTabId === tab.id && (
                <span className="absolute bottom-[-2px] left-0 w-full h-0.5 bg-[#FA8232]"></span>
              )}
            </button>
          ))}
          <Link
            to="/accessories"
            className={`text-[#FA8232] flex items-center gap-1.5 hover:gap-2 transition-all pb-2 ${isRTL ? "mr-auto lg:mr-4" : "ml-auto lg:ml-4"}`}
          >
            {t("Accessories.browse_all")}{" "}
            {isRTL ? <ArrowLeft size={16} /> : <ArrowRight size={16} />}
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-3 border border-gray-200 bg-white grid grid-cols-2 md:grid-cols-4">
          {products.map((product, index) => (
            <div
              key={product.id}
              className={`p-4 relative group flex flex-col hover:shadow-lg transition-shadow bg-white ${
                (index + 1) % 4 !== 0
                  ? "md:border-r border-b border-gray-200"
                  : "border-b border-gray-200"
              } ${index >= 4 ? "md:border-b-0" : ""}`}
            >
              {product.badge && (
                <span
                  className={`absolute top-3 ${isRTL ? "right-3" : "left-3"} z-10 text-[10px] font-bold px-2 py-1 rounded-sm text-white ${
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

              <div className="flex flex-col flex-grow justify-end">
                <div
                  className={`flex items-center gap-1 mb-2 ${isRTL ? "flex-row-reverse" : ""}`}
                >
                  <StarRating rating={product.rating} />
                  <span className="text-[11px] text-gray-400">
                    ({product.reviews})
                  </span>
                </div>
                <Link
                  to={`/product/${product.id}`}
                  className="hover:text-orange-500 transition-colors"
                >
                  <h3 className="text-gray-800 text-xs md:text-[13px] font-medium mb-2 line-clamp-2 leading-tight">
                    {product.name}
                  </h3>
                </Link>
                <div
                  className={`flex items-center gap-1.5 mt-auto ${isRTL ? "flex-row-reverse" : ""}`}
                >
                  <span className="text-[#2DB2FF] font-semibold text-sm">
                    ${product.price}
                  </span>
                  {product.oldPrice && (
                    <span className="text-gray-400 line-through text-[11px] md:text-xs">
                      ${product.oldPrice}
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
        {/* dddddddddddddddddddddddddddddddddddddddddddddddddddddddddd */}
        <div className="lg:col-span-1 flex flex-col gap-6">
          <div className="bg-[#FBE8A4] rounded-sm p-6 flex flex-col items-center text-center h-1/2 justify-center hover:-translate-y-1 transition-transform duration-300">
            <img
              src={Xiaomi_True_Wireless_Earbuds}
              alt="Earbuds"
              className="w-50 h-24 object-contain mb-4 mix-blend-multiply"
            />
            <h3 className="text-xl font-bold text-gray-900 mb-2 leading-tight">
              {t("Accessories.banners.xiaomi_title")}
            </h3>
            <p className="text-gray-600 text-sm mb-4 leading-relaxed">
              {t("Accessories.banners.xiaomi_desc")}
            </p>
            <div className="flex items-center gap-2 mb-4 text-sm">
              <span className="text-gray-600">
                {t("Accessories.banners.only_for")}
              </span>
              <span className="bg-white px-3 py-1 font-bold text-gray-900 rounded-sm shadow-sm">
                $299 USD
              </span>
            </div>
            <Link
              to="/shop"
              className="w-full bg-[#FA8232] hover:bg-[#E57328] text-white font-bold py-3 rounded-sm flex justify-center items-center gap-2 transition-colors uppercase text-sm"
            >
              {t("Promos.shop_now")}{" "}
              {isRTL ? <ArrowLeft size={18} /> : <ArrowRight size={18} />}
            </Link>
          </div>

          <div className="bg-[#12415D] rounded-sm p-6 flex flex-col items-center text-center h-1/2 justify-center hover:-translate-y-1 transition-transform duration-300">
            <span className="bg-white/10 text-white text-[10px] font-bold px-3 py-1 uppercase tracking-wider mb-4 rounded-sm">
              {t("Accessories.banners.summer_sales")}
            </span>
            <h3 className="text-3xl font-bold text-white mb-2">
              {t("Accessories.banners.discount")}
            </h3>
            <p className="text-gray-300 text-sm mb-6">
              {t("Accessories.banners.smartphone_promo")}
            </p>
            <Link
              to="/shop"
              className="w-full bg-[#2DB2FF] hover:bg-[#209CE6] text-white font-bold py-3 rounded-sm flex justify-center items-center gap-2 transition-colors uppercase text-sm"
            >
              {t("Promos.shop_now")}{" "}
              {isRTL ? <ArrowLeft size={18} /> : <ArrowRight size={18} />}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
