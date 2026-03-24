import React from "react";
import { ArrowRight, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function MacbookPromo() {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === "ar";

  return (
    <section className="max-w-7xl mx-auto px-4 py-16 md:py-24">
      {/* الحاوية الرئيسية: خلفية فاتحة جداً، تدرج ناعم، وظل عميق */}
      <div
        className={`relative overflow-hidden rounded-3xl bg-gradient-to-b from-white via-[#FFF8F5] to-[#FFF1EB] shadow-2xl shadow-orange-100/50 flex flex-col ${
          isRTL ? "md:flex-row-reverse" : "md:flex-row"
        } items-center min-h-[500px] border border-orange-50/50`}
      >
        {/* عنصر ديكوري خلفي (دائرة برتقالية ناعمة جداً) */}
        <div
          className={`absolute ${isRTL ? "-left-20" : "-right-20"} -bottom-20 w-96 h-96 bg-[#FCE5D8]/40 rounded-full blur-3xl pointer-events-none`}
        />

        {/* 1. محتوى النصوص: مساحات أكبر، خطوط أفخم */}
        <div
          className={`w-full md:w-1/2 p-12 md:p-20 lg:p-24 z-10 flex flex-col ${
            isRTL ? "items-end text-right" : "items-start text-left"
          }`}
        >
          {/* شارة التوفير: أنيقة وبسيطة */}
          <span className="bg-[#EBF8FF] text-[#2DB2FF] text-xs font-bold px-4 py-2 uppercase tracking-widest rounded-full mb-8 inline-block shadow-inner">
            {t("MacbookPromo.save_badge")}
          </span>

          {/* العنوان: ضخم، مسافات ضيقة بين الحروف، لون أسود غني */}
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-black text-gray-950 mb-6 tracking-tighter leading-[0.95]">
            {t("MacbookPromo.title")}
          </h2>

          {/* الوصف: لون رمادي غامق، وزن متوسط، مقروئية عالية */}
          <p className="text-gray-700 text-lg md:text-xl mb-12 max-w-md leading-relaxed font-medium">
            {t("MacbookPromo.desc")}
          </p>

          {/* الزر: تصميم Minimalist، أنيق وعصري */}
          <Link
            to="/shop"
            className="group inline-flex items-center gap-3 bg-[#FA8232] hover:bg-gray-950 text-white text-base font-bold py-4.5 px-12 rounded-full transition-all duration-300 hover:shadow-2xl hover:shadow-gray-300 uppercase tracking-wider active:scale-95"
          >
            {t("MacbookPromo.shop_now")}
            <span
              className={`transition-transform duration-300 ${isRTL ? "group-hover:-translate-x-2" : "group-hover:translate-x-2"}`}
            >
              {isRTL ? <ArrowLeft size={20} /> : <ArrowRight size={20} />}
            </span>
          </Link>
        </div>

        {/* 2. منطقة الصورة: تركيز كامل على المنتج */}
        <div className="w-full md:w-1/2 relative flex items-center justify-center p-10 md:p-16 h-full">
          {/* تأثير توهج خلف الصورة مباشرة لإبراز الـ PNG */}
          <div className="absolute inset-0 m-auto w-3/4 h-3/4 bg-orange-200/30 rounded-full blur-3xl" />

          {/* شارة السعر: تصميم "Floating" مع Blur بسيط وزوايا ناعمة */}
          <div
            className={`absolute ${
              isRTL ? "left-10 md:left-20" : "right-10 md:right-20"
            } bottom-10 md:bottom-20 z-20 bg-white/70 backdrop-blur-lg border border-white/50 px-6 py-4 rounded-2xl shadow-xl flex flex-col items-center rotate-3 hover:rotate-0 transition-all duration-500`}
          >
            <span className="text-[10px] text-gray-400 uppercase font-bold tracking-widest mb-1">
              {isRTL ? "فقط" : "ONLY"}
            </span>
            <span className="text-2xl md:text-3xl font-black text-[#FA8232] tracking-tight">
              {t("MacbookPromo.price")}
            </span>
          </div>

          <img
            // تم استبدال الصورة بصورة PNG شفافة (افترضت وجود هذا الرابط)
            src="https://www.pngmart.com/files/15/Apple-MacBook-Pro-PNG-Photo.png"
            alt="Macbook Pro"
            // استخدمنا Drop Shadow قوي بدل الـ Mix Blend عشان الـ PNG تظهر فخمة
            className="relative w-full max-w-xl object-contain z-10 drop-shadow-[0_25px_25px_rgba(0,0,0,0.15)] hover:scale-105 transition-transform duration-700 pointer-events-none"
          />
        </div>
      </div>
    </section>
  );
}
