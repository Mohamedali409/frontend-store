import React from "react";
import { ArrowRight } from "lucide-react";

export default function Newsletter() {
  return (
    // الخلفية الزرقاء الداكنة
    <section className="bg-[#1B6392] py-16 md:py-20">
      <div className="max-w-4xl mx-auto px-4 text-center">
        {/* =========================================
            1. النصوص (العنوان والوصف)
           ========================================= */}
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
          Subscribe to our newsletter
        </h2>
        <p className="text-white/80 text-sm md:text-base max-w-2xl mx-auto mb-10 leading-relaxed">
          Praesent fringilla erat a lacinia egestas. Donec vehicula tempor
          libero et cursus. Donec non quam urna. Quisque vitae porta ipsum.
        </p>

        {/* =========================================
            2. نموذج الإدخال (Email Form)
           ========================================= */}
        <form
          onSubmit={(e) => e.preventDefault()}
          className="bg-white p-1.5 rounded-sm flex items-center max-w-xl mx-auto shadow-lg mb-12"
        >
          <input
            type="email"
            placeholder="Email address"
            required
            className="flex-grow px-4 py-2 outline-none text-gray-700 text-sm bg-transparent w-full"
          />
          <button
            type="submit"
            className="bg-[#FA8232] hover:bg-[#E57328] text-white px-6 py-3 rounded-sm text-sm font-bold flex items-center gap-2 uppercase transition-colors shrink-0"
          >
            Subscribe <ArrowRight size={18} />
          </button>
        </form>

        {/* =========================================
            3. شريط العلامات التجارية (Brands Logos)
           ========================================= */}
        {/* خط فاصل شفاف */}
        <hr className="border-white/10 w-3/4 max-w-lg mx-auto mb-8" />

        {/* اللوجوهات (استخدمنا نصوص معدلة لتعطي إيحاء اللوجو لعدم وجود صور فعلية) */}
        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12 opacity-80">
          {/* Google */}
          <span className="text-white text-xl md:text-2xl font-medium tracking-tight">
            Google
          </span>

          {/* Amazon */}
          <span className="text-white text-xl md:text-2xl font-bold tracking-tighter flex items-end">
            amazon
          </span>

          {/* Philips */}
          <span className="text-white text-lg md:text-xl font-bold tracking-widest uppercase">
            PHILIPS
          </span>

          {/* Toshiba */}
          <span className="text-white text-lg md:text-xl font-bold tracking-wider uppercase">
            TOSHIBA
          </span>

          {/* Samsung */}
          <span
            className="text-white text-lg md:text-xl font-bold tracking-widest uppercase"
            style={{ transform: "scaleY(0.9)" }}
          >
            SAMSUNG
          </span>
        </div>
      </div>
    </section>
  );
}
