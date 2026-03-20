import React from "react";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

export default function PromoBanners() {
  return (
    <section className="max-w-7xl mx-auto px-4 py-8 md:py-12">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* =========================================
            1. Left Banner (Light Theme - Apple)
           ========================================= */}
        <div className="bg-[#F2F4F5] rounded-sm p-8 md:p-12 flex items-center relative overflow-hidden min-h-[320px] group">
          {/* محتوى النص */}
          <div className="relative z-10 w-3/5">
            <span className="bg-[#2DB2FF] text-white text-[10px] md:text-xs font-bold px-2 py-1 uppercase tracking-wider mb-4 inline-block rounded-sm">
              Introducing
            </span>
            <h3 className="text-2xl md:text-4xl font-bold text-gray-900 mb-4 leading-tight">
              New Apple <br /> Homepod Mini
            </h3>
            <p className="text-gray-500 text-sm md:text-base mb-8 max-w-xs">
              Jam-packed with innovation, HomePod mini delivers unexpectedly.
            </p>
            <Link
              to="/shop"
              className="inline-flex items-center gap-2 bg-[#FA8232] hover:bg-[#E57328] text-white text-sm font-bold py-3 px-6 rounded-sm transition-colors uppercase"
            >
              Shop Now <ArrowRight size={18} />
            </Link>
          </div>

          {/* الصورة */}
          <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2/5 h-[80%] flex justify-end pr-4 md:pr-8">
            <img
              // صورة تقريبية لـ Smart Speaker مشابهة للتصميم
              src="https://images.unsplash.com/photo-1589003077984-894e133dabab?auto=format&fit=crop&q=80&w=400"
              alt="Apple Homepod Mini"
              className="object-contain h-full mix-blend-multiply group-hover:scale-105 transition-transform duration-500"
            />
          </div>
        </div>

        {/* =========================================
            2. Right Banner (Dark Theme - Xiaomi)
           ========================================= */}
        <div className="bg-[#191C1F] rounded-sm p-8 md:p-12 flex items-center relative overflow-hidden min-h-[320px] group">
          {/* محتوى النص */}
          <div className="relative z-10 w-3/5">
            <span className="bg-[#F3DE6D] text-gray-900 text-[10px] md:text-xs font-bold px-2 py-1 uppercase tracking-wider mb-4 inline-block rounded-sm">
              Introducing New
            </span>
            <h3 className="text-2xl md:text-4xl font-bold text-white mb-4 leading-tight">
              Xiaomi Mi 11 Ultra <br /> 12GB+256GB
            </h3>
            <p className="text-gray-400 text-xs md:text-sm mb-8 max-w-xs leading-relaxed">
              *Data provided by internal laboratories. Industry measurment.
            </p>
            <Link
              to="/shop"
              className="inline-flex items-center gap-2 bg-[#FA8232] hover:bg-[#E57328] text-white text-sm font-bold py-3 px-6 rounded-sm transition-colors uppercase"
            >
              Shop Now <ArrowRight size={18} />
            </Link>
          </div>

          {/* الصورة وتسعيرة الدائرة */}
          <div className="absolute right-0 bottom-0 w-2/5 h-[90%] flex justify-end items-end">
            {/* الشارة الزرقاء الدائرية (Price Badge) */}
            <div className="absolute top-4 right-4 md:right-8 z-20 bg-[#2DB2FF] text-white w-16 h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center font-bold text-lg md:text-xl shadow-lg transform rotate-12 group-hover:rotate-0 transition-transform duration-300">
              $590
            </div>

            <img
              // صورة تقريبية للهاتف
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
