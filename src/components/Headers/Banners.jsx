import React, { useState } from "react";
import { XMarkIcon } from "@heroicons/react/20/solid";
import { Link } from "react-router-dom";

const Banners = () => {
  // إضافة State للتحكم في ظهور البانر
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className="relative isolate flex items-center gap-x-6 overflow-hidden bg-[#191C1F] px-6 py-2.5 sm:px-3.5 sm:before:flex-1">
      {/* الـ Gradient الخلفي الأيسر - تم تغيير الألوان لـ Orange و White */}
      <div
        aria-hidden="true"
        className="absolute top-1/2 left-[max(-7rem,calc(50%-52rem))] -z-10 -translate-y-1/2 transform-gpu blur-2xl opacity-30"
      >
        <div
          style={{
            clipPath:
              "polygon(74.8% 41.9%, 97.2% 73.2%, 100% 34.9%, 92.5% 0.4%, 87.5% 0%, 75% 28.6%, 58.5% 54.6%, 50.1% 56.8%, 46.9% 44%, 48.3% 17.4%, 24.7% 53.9%, 0% 27.9%, 11.9% 74.2%, 24.9% 54.1%, 68.6% 100%, 74.8% 41.9%)",
          }}
          className="aspect-[577/310] w-[72.125rem] bg-gradient-to-r from-[#FA8232] to-[#ffffff]"
        />
      </div>

      {/* الـ Gradient الخلفي الأيمن */}
      <div
        aria-hidden="true"
        className="absolute top-1/2 left-[max(45rem,calc(50%+8rem))] -z-10 -translate-y-1/2 transform-gpu blur-2xl opacity-30"
      >
        <div
          style={{
            clipPath:
              "polygon(74.8% 41.9%, 97.2% 73.2%, 100% 34.9%, 92.5% 0.4%, 87.5% 0%, 75% 28.6%, 58.5% 54.6%, 50.1% 56.8%, 46.9% 44%, 48.3% 17.4%, 24.7% 53.9%, 0% 27.9%, 11.9% 74.2%, 24.9% 54.1%, 68.6% 100%, 74.8% 41.9%)",
          }}
          className="aspect-[577/310] w-[72.125rem] bg-gradient-to-r from-[#FA8232] to-[#ffffff]"
        />
      </div>

      {/* المحتوى النصي والزرار */}
      <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
        <p className="text-sm leading-6 text-white flex items-center gap-2">
          <strong className="font-semibold text-[#FA8232]">SUMMER SALE</strong>
          <svg
            viewBox="0 0 2 2"
            aria-hidden="true"
            className="mx-2 inline h-0.5 w-0.5 fill-current opacity-40"
          >
            <circle r={1} cx={1} cy={1} />
          </svg>
          خصم يصل إلى <span className="text-[#FA8232] font-bold">50%</span> على
          أحدث الإلكترونيات.
        </p>

        {/* زر الـ CTA - تم تغيير لونه للبرتقالي */}
        <Link
          to="/products"
          className="flex-none rounded-full bg-[#FA8232] px-3.5 py-1 text-sm font-bold text-white shadow-sm hover:bg-orange-600 transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-500"
        >
          تسوق الآن <span aria-hidden="true">&rarr;</span>
        </Link>
      </div>

      {/* زر الإغلاق */}
      <div className="flex flex-1 justify-end">
        <button
          onClick={() => setIsVisible(false)} // تشغيل دالة الإغلاق
          type="button"
          className="-m-3 p-3 focus-visible:outline-offset-[-4px] group"
        >
          <span className="sr-only">Dismiss</span>
          <XMarkIcon
            aria-hidden="true"
            className="h-5 w-5 text-white opacity-60 group-hover:opacity-100"
          />
        </button>
      </div>
    </div>
  );
};

export default Banners;
