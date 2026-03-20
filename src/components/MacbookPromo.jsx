import React from "react";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

export default function MacbookPromo() {
  return (
    <section className="max-w-7xl mx-auto px-4 py-8 md:py-12">
      {/* حاوية البنر باللون الخوخي/البرتقالي الفاتح */}
      <div className="bg-[#FCE5D8] rounded-sm flex flex-col md:flex-row items-center overflow-hidden relative">
        {/* =========================================
            1. الجزء الأيسر: النصوص والزر
           ========================================= */}
        <div className="w-full md:w-1/2 p-8 md:p-12 lg:pl-16 z-10 flex flex-col items-start">
          {/* شارة التخفيض (Blue Badge) */}
          <span className="bg-[#2DB2FF] text-white text-[10px] md:text-xs font-bold px-3 py-1.5 uppercase tracking-wide rounded-sm mb-5 inline-block">
            Save up to $200.00
          </span>

          {/* العنوان الرئيسي */}
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Macbook Pro
          </h2>

          {/* الوصف */}
          <p className="text-gray-800 text-sm md:text-base lg:text-lg mb-8 max-w-sm leading-relaxed">
            Apple M1 Max Chip. 32GB Unified Memory, 1TB SSD Storage
          </p>

          {/* الزر البرتقالي */}
          <Link
            to="/shop"
            className="inline-flex items-center gap-2 bg-[#FA8232] hover:bg-[#E57328] text-white text-sm font-bold py-3.5 px-6 rounded-sm transition-colors uppercase"
          >
            Shop Now <ArrowRight size={18} />
          </Link>
        </div>

        {/* =========================================
            2. الجزء الأيمن: صورة المنتج وشارة السعر
           ========================================= */}
        <div className="w-full md:w-1/2 relative min-h-[300px] md:min-h-[400px] flex items-center justify-center md:justify-end pr-8 lg:pr-16 pb-8 md:pb-0">
          {/* شارة السعر الدائرية (Price Badge) */}
          <div className="absolute top-4 md:top-1/4 left-8 md:-left-8 z-20 w-20 h-20 md:w-24 md:h-24 bg-[#FBCBB0] border-[4px] border-white rounded-full flex items-center justify-center font-bold text-gray-900 text-lg md:text-xl shadow-sm">
            $1999
          </div>

          {/* صورة اللابتوب */}
          <img
            // صورة تقريبية للابتوب مشابهة للتصميم
            src="https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&q=80&w=800"
            alt="Macbook Pro"
            className="w-full max-w-md object-contain z-10 mix-blend-multiply hover:scale-105 transition-transform duration-500"
          />
        </div>
      </div>
    </section>
  );
}
