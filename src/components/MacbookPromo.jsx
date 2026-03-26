import React from "react";
import { ArrowRight, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import MacbookPro from "../assets/image/MacbookPro.png";

export default function MacbookPromo() {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === "ar";

  return (
    <section
      className="max-w-7xl mx-auto px-4 py-16 md:py-24"
      dir={isRTL ? "rtl" : "ltr"}
    >
      <div className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-b from-white via-[#FFF8F5] to-[#FFF1EB] shadow-2xl shadow-orange-100/50 flex flex-col md:flex-row items-center min-h-[500px] border border-orange-50/50">
        <div
          className={`absolute ${isRTL ? "-right-20" : "-left-20"} -bottom-20 w-96 h-96 bg-[#FCE5D8]/40 rounded-full blur-3xl pointer-events-none`}
        />

        <div
          className={`w-full md:w-1/2 p-10 md:p-16 lg:p-20 z-10 flex flex-col ${
            isRTL ? "items-start text-right" : "items-start text-left"
          }`}
        >
          <span className="bg-[#EBF8FF] text-[#2DB2FF] text-xs font-bold px-4 py-2 uppercase tracking-widest rounded-full mb-8 inline-block shadow-inner">
            {t("MacbookPromo.save_badge")}
          </span>

          <h2 className="text-4xl md:text-6xl lg:text-7xl font-black text-gray-950 mb-6 tracking-tight leading-[1.1] md:leading-[0.95]">
            {t("MacbookPromo.title")}
          </h2>

          <p className="text-gray-700 text-lg md:text-xl mb-10 max-w-md leading-relaxed font-medium">
            {t("MacbookPromo.desc")}
          </p>

          <Link
            to="/products"
            className="group inline-flex items-center gap-3 bg-[#FA8232] hover:bg-gray-950 text-white text-base font-bold py-4 px-10 rounded-full transition-all duration-300 hover:shadow-2xl hover:shadow-orange-200 uppercase tracking-wider active:scale-95"
          >
            {t("MacbookPromo.shop_now")}
            <span
              className={`transition-transform duration-300 ${isRTL ? "group-hover:-translate-x-2" : "group-hover:translate-x-2"}`}
            >
              {isRTL ? <ArrowLeft size={20} /> : <ArrowRight size={20} />}
            </span>
          </Link>
        </div>

        <div className="w-full md:w-1/2 relative flex items-center justify-center p-8 md:p-12 h-full">
          <div className="absolute inset-0 m-auto w-3/4 h-3/4 bg-orange-200/20 rounded-full blur-3xl" />

          <div
            className={`absolute z-20 bg-white/80 backdrop-blur-lg border border-white/50 px-6 py-4 rounded-2xl shadow-xl flex flex-col items-center transition-all duration-500 hover:rotate-0 ${
              isRTL
                ? "right-10 md:right-auto md:left-10 bottom-10 -rotate-3"
                : "right-10 bottom-10 rotate-3"
            }`}
          >
            <span className="text-[10px] text-gray-400 uppercase font-bold tracking-widest mb-1">
              {isRTL ? "فقط بـ" : "ONLY"}
            </span>
            <span className="text-2xl md:text-3xl font-black text-[#FA8232] tracking-tight">
              {t("MacbookPromo.price")}
            </span>
          </div>

          <img
            src={MacbookPro}
            alt="Macbook Pro"
            className={`relative w-full max-w-lg object-contain z-10 drop-shadow-[0_25px_25px_rgba(0,0,0,0.15)] hover:scale-105 transition-transform duration-700 pointer-events-none ${
              isRTL ? "-scale-x-100" : ""
            }`}
          />
        </div>
      </div>
    </section>
  );
}
