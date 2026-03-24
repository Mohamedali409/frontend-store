import React from "react";
import { ArrowRight, ArrowLeft } from "lucide-react"; // استيراد السهمين
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function PromoBanners() {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === "ar";

  return (
    <section className="max-w-7xl mx-auto px-4 py-8 md:py-12">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Banner 1: Apple */}
        <div className="bg-[#F2F4F5] rounded-sm p-8 md:p-12 flex items-center relative overflow-hidden min-h-[320px] group">
          <div className="relative z-10 w-3/5">
            <span className="bg-[#2DB2FF] text-white text-[10px] md:text-xs font-bold px-2 py-1 uppercase tracking-wider mb-4 inline-block rounded-sm">
              {t("Promos.introducing")}
            </span>
            <h3 className="text-2xl md:text-4xl font-bold text-gray-900 mb-4 leading-tight">
              {t("Promos.apple_title")}
            </h3>
            <p className="text-gray-500 text-sm md:text-base mb-8 max-w-xs">
              {t("Promos.apple_desc")}
            </p>
            <Link
              to="/shop"
              className="inline-flex items-center gap-2 bg-[#FA8232] hover:bg-[#E57328] text-white text-sm font-bold py-3 px-6 rounded-sm transition-colors uppercase"
            >
              {t("Promos.shop_now")}
              {isRTL ? <ArrowLeft size={18} /> : <ArrowRight size={18} />}
            </Link>
          </div>
          {/* الصورة: نستخدم left-0 في حالة العربي و right-0 في الإنجليزي */}
          <div
            className={`absolute ${isRTL ? "left-0" : "right-0"} top-1/2 -translate-y-1/2 w-2/5 h-[80%] flex justify-end pr-4 md:pr-8`}
          >
            <img
              src="https://images.unsplash.com/photo-1589003077984-894e133dabab?auto=format&fit=crop&q=80&w=400"
              alt="Apple Homepod Mini"
              className="object-contain h-full mix-blend-multiply group-hover:scale-105 transition-transform duration-500"
            />
          </div>
        </div>

        {/* Banner 2: Xiaomi */}
        <div className="bg-[#191C1F] rounded-sm p-8 md:p-12 flex items-center relative overflow-hidden min-h-[320px] group">
          <div className="relative z-10 w-3/5">
            <span className="bg-[#F3DE6D] text-gray-900 text-[10px] md:text-xs font-bold px-2 py-1 uppercase tracking-wider mb-4 inline-block rounded-sm">
              {t("Promos.introducing")}
            </span>
            <h3 className="text-2xl md:text-4xl font-bold text-white mb-4 leading-tight">
              {t("Promos.xiaomi_title")}
            </h3>
            <p className="text-gray-400 text-xs md:text-sm mb-8 max-w-xs leading-relaxed">
              {t("Promos.xiaomi_desc")}
            </p>
            <Link
              to="/shop"
              className="inline-flex items-center gap-2 bg-[#FA8232] hover:bg-[#E57328] text-white text-sm font-bold py-3 px-6 rounded-sm transition-colors uppercase"
            >
              {t("Promos.shop_now")}
              {isRTL ? <ArrowLeft size={18} /> : <ArrowRight size={18} />}
            </Link>
          </div>

          <div
            className={`absolute ${isRTL ? "left-0" : "right-0"} bottom-0 w-2/5 h-[90%] flex justify-end items-end`}
          >
            {/* دائرة السعر: نعكس مكانها برضه */}
            <div
              className={`absolute top-4 ${isRTL ? "left-4 md:left-8" : "right-4 md:right-8"} z-20 bg-[#2DB2FF] text-white w-16 h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center font-bold text-lg md:text-xl shadow-lg transform ${isRTL ? "-rotate-12" : "rotate-12"} group-hover:rotate-0 transition-transform duration-300`}
            >
              $590
            </div>
            <img
              src="https://images.unsplash.com/photo-1598327105666-5b89351cb31b?auto=format&fit=crop&q=80&w=400"
              alt="Xiaomi Mi 11 Ultra"
              className="object-contain h-full group-hover:scale-105 transition-transform duration-500"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
