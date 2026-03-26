import React from "react";
import { ArrowRight, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Xiaomi from "../assets/image/Xiaomi.png";
import AppleHomepodMini from "../assets/image/AppleHomepodMini.png";

export default function PromoBanners() {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === "ar";

  return (
    <section
      className="max-w-7xl mx-auto px-4 py-8 md:py-12"
      dir={isRTL ? "rtl" : "ltr"}
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-[#F2F4F5] rounded-lg p-8 md:p-12 flex items-center relative overflow-hidden min-h-[340px] group transition-all duration-300 hover:shadow-lg">
          <div className="relative z-10 w-full md:w-3/5 flex flex-col items-start">
            <span className="bg-[#2DB2FF] text-white text-[10px] md:text-xs font-bold px-3 py-1 uppercase tracking-widest mb-4 inline-block rounded-sm">
              {t("Promos.introducing")}
            </span>
            <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-4 leading-tight">
              {t("Promos.apple_title")}
            </h3>
            <p className="text-gray-600 text-sm md:text-base mb-8 max-w-[260px] leading-relaxed">
              {t("Promos.apple_desc")}
            </p>
            <Link
              to="/shop"
              className="inline-flex items-center gap-2 bg-[#FA8232] hover:bg-gray-900 text-white text-sm font-bold py-3.5 px-7 rounded-md transition-all duration-300 uppercase tracking-wide active:scale-95 shadow-md hover:shadow-orange-200"
            >
              {t("Promos.shop_now")}
              {isRTL ? <ArrowLeft size={18} /> : <ArrowRight size={18} />}
            </Link>
          </div>

          <div
            className={`absolute ${isRTL ? "left-0" : "right-0"} top-1/2 -translate-y-1/2 w-[45%] h-full flex items-center justify-center p-4`}
          >
            <img
              src={AppleHomepodMini}
              alt="Apple Homepod Mini"
              className="object-contain max-h-[80%] w-full transition-transform duration-700 group-hover:scale-110 drop-shadow-xl"
            />
          </div>
        </div>

        <div className="bg-[#191C1F] rounded-lg p-8 md:p-12 flex items-center relative overflow-hidden min-h-[340px] group transition-all duration-300 hover:shadow-lg">
          <div className="relative z-10 w-full md:w-3/5 flex flex-col items-start text-right">
            <span className="bg-[#F3DE6D] text-gray-900 text-[10px] md:text-xs font-bold px-3 py-1 uppercase tracking-widest mb-4 inline-block rounded-sm">
              {t("Promos.introducing")}
            </span>
            <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-4 leading-tight text-start">
              {t("Promos.xiaomi_title")}
            </h3>
            <p className="text-gray-400 text-sm md:text-base mb-8 max-w-[260px] leading-relaxed text-start">
              {t("Promos.xiaomi_desc")}
            </p>
            <Link
              to="/shop"
              className="inline-flex items-center gap-2 bg-[#FA8232] hover:bg-white hover:text-gray-900 text-white text-sm font-bold py-3.5 px-7 rounded-md transition-all duration-300 uppercase tracking-wide active:scale-95 shadow-md"
            >
              {t("Promos.shop_now")}
              {isRTL ? <ArrowLeft size={18} /> : <ArrowRight size={18} />}
            </Link>
          </div>

          <div
            className={`absolute ${isRTL ? "left-0" : "right-0"} bottom-0 w-[45%] h-full flex items-end justify-center`}
          >
            <div
              className={`absolute top-10 ${isRTL ? "left-6 md:left-12" : "right-6 md:right-12"} z-20 bg-[#2DB2FF] text-white w-16 h-16 md:w-20 md:h-20 rounded-full flex flex-col items-center justify-center font-bold shadow-2xl border-4 border-[#191C1F] transform ${isRTL ? "-rotate-12" : "rotate-12"} group-hover:rotate-0 transition-transform duration-500`}
            >
              <span className="text-[10px] opacity-80 leading-none">ONLY</span>
              <span className="text-lg md:text-xl">$590</span>
            </div>

            <img
              src={Xiaomi}
              alt="Xiaomi Mi 11 Ultra"
              className="object-contain h-[85%] w-full transition-transform duration-700 group-hover:scale-105 drop-shadow-2xl"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
