import React from "react";
import { ArrowRight, ArrowLeft } from "lucide-react";
import { useTranslation } from "react-i18next";

export default function Newsletter() {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === "ar";

  return (
    // خلفية متدرجة (Gradient) لتعطي إحساساً بالفخامة والعمق
    <section className="bg-gradient-to-r from-[#1B6392] to-[#12415D] py-20 md:py-28 relative overflow-hidden">
      {/* عناصر ديكورية خلفية (دوائر ناعمة) */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-black/10 rounded-full blur-3xl translate-x-1/3 translate-y-1/3" />

      <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
        {/* 1. النصوص */}
        <h2 className="text-4xl md:text-5xl font-black text-white mb-6 tracking-tight">
          {t("Newsletter.title")}
        </h2>
        <p className="text-blue-100/80 text-base md:text-lg max-w-2xl mx-auto mb-12 leading-relaxed font-medium">
          {t("Newsletter.desc")}
        </p>

        {/* 2. نموذج الإدخال (Modern Glass Form) */}
        <form
          onSubmit={(e) => e.preventDefault()}
          className={`bg-white p-2 rounded-full flex items-center max-w-2xl mx-auto shadow-2xl shadow-black/20 ${
            isRTL ? "flex-row-reverse" : "flex-row"
          }`}
        >
          <input
            type="email"
            placeholder={t("Newsletter.placeholder")}
            required
            className={`flex-grow px-6 py-3 outline-none text-gray-800 text-sm md:text-base bg-transparent w-full ${
              isRTL ? "text-right" : "text-left"
            }`}
          />
          <button
            type="submit"
            className="bg-[#FA8232] hover:bg-gray-950 text-white px-8 md:px-10 py-4 rounded-full text-sm md:text-base font-black flex items-center gap-3 uppercase transition-all duration-300 active:scale-95 shadow-lg shadow-orange-500/20"
          >
            {t("Newsletter.button")}
            <span className="transition-transform duration-300">
              {isRTL ? <ArrowLeft size={20} /> : <ArrowRight size={20} />}
            </span>
          </button>
        </form>

        {/* 3. شريط العلامات التجارية (Brands) بتنسيق راقي */}
        <div className="mt-20">
          <div className="flex items-center justify-center gap-4 mb-10">
            <div className="h-px bg-white/10 w-12 md:w-20"></div>
            <span className="text-white/40 text-xs font-bold uppercase tracking-[0.3em]">
              Trusted by Global Brands
            </span>
            <div className="h-px bg-white/10 w-12 md:w-20"></div>
          </div>

          <div className="flex flex-wrap justify-center items-center gap-10 md:gap-16 opacity-50 grayscale hover:grayscale-0 transition-all duration-700">
            <span className="text-white text-2xl md:text-3xl font-semibold tracking-tighter">
              Google
            </span>
            <span className="text-white text-2xl md:text-3xl font-black tracking-tighter italic">
              amazon
            </span>
            <span className="text-white text-xl md:text-2xl font-bold tracking-[0.2em] uppercase">
              Philips
            </span>
            <span className="text-white text-xl md:text-2xl font-black tracking-wider uppercase">
              Toshiba
            </span>
            <span className="text-white text-xl md:text-2xl font-extrabold tracking-[0.1em] uppercase">
              Samsung
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
