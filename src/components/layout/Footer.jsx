import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#191C1F] pt-16 pb-6">
      <div className="max-w-7xl mx-auto px-4">
        {/* =========================================
            الجزء العلوي: الأعمدة الأربعة
           ========================================= */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8 mb-16">
          {/* 1. معلومات التواصل (Column 1) */}
          <div className="lg:col-span-1">
            {/* اللوجو */}
            <div className="flex items-center gap-3 mb-6">
              {/* تصميم اللوجو بالـ CSS */}
              <div className="w-10 h-10 rounded-full border-[5px] border-[#FA8232] flex items-center justify-center">
                <div className="w-2.5 h-2.5 bg-[#FA8232] rounded-full"></div>
              </div>
              <span className="text-white text-2xl font-bold tracking-wide">
                CLICON
              </span>
            </div>

            <div className="text-gray-400 text-sm flex flex-col gap-4">
              <p>Customer Supports:</p>
              <p className="text-white text-lg font-medium">(629) 555-0129</p>
              <p className="leading-relaxed">
                4517 Washington Ave.
                <br />
                Manchester, Kentucky 39495
              </p>
              <p className="text-white font-medium mt-1">info@kinbo.com</p>
            </div>
          </div>

          {/* 2. أفضل الفئات (Column 2) */}
          <div className="lg:col-span-1">
            <h3 className="text-white font-semibold text-sm tracking-wider uppercase mb-6">
              Top Category
            </h3>
            <ul className="text-gray-400 text-sm flex flex-col gap-3">
              <li>
                <Link
                  to="/category"
                  className="hover:text-white transition-colors"
                >
                  Computer & Laptop
                </Link>
              </li>
              <li>
                <Link
                  to="/category"
                  className="hover:text-white transition-colors"
                >
                  SmartPhone
                </Link>
              </li>
              <li>
                <Link
                  to="/category"
                  className="hover:text-white transition-colors"
                >
                  Headphone
                </Link>
              </li>
              {/* العنصر النشط (Active) */}
              <li className="text-white font-medium flex items-center">
                <span className="w-4 h-0.5 bg-[#EBC80C] mr-2"></span>
                Accessories
              </li>
              <li>
                <Link
                  to="/category"
                  className="hover:text-white transition-colors"
                >
                  Camera & Photo
                </Link>
              </li>
              <li>
                <Link
                  to="/category"
                  className="hover:text-white transition-colors"
                >
                  TV & Homes
                </Link>
              </li>
            </ul>
            <Link
              to="/shop"
              className="text-[#EBC80C] text-sm font-medium flex items-center gap-2 mt-4 hover:gap-3 transition-all"
            >
              Browse All Product <ArrowRight size={16} />
            </Link>
          </div>

          {/* 3. روابط سريعة (Column 3) */}
          <div className="lg:col-span-1">
            <h3 className="text-white font-semibold text-sm tracking-wider uppercase mb-6">
              Quick Links
            </h3>
            <ul className="text-gray-400 text-sm flex flex-col gap-3">
              <li>
                <Link to="/shop" className="hover:text-white transition-colors">
                  Shop Product
                </Link>
              </li>
              <li>
                <Link to="/cart" className="hover:text-white transition-colors">
                  Shoping Cart
                </Link>
              </li>
              <li>
                <Link
                  to="/wishlist"
                  className="hover:text-white transition-colors"
                >
                  Wishlist
                </Link>
              </li>
              <li>
                <Link
                  to="/compare"
                  className="hover:text-white transition-colors"
                >
                  Compare
                </Link>
              </li>
              <li>
                <Link
                  to="/track"
                  className="hover:text-white transition-colors"
                >
                  Track Order
                </Link>
              </li>
              <li>
                <Link to="/help" className="hover:text-white transition-colors">
                  Customer Help
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className="hover:text-white transition-colors"
                >
                  About Us
                </Link>
              </li>
            </ul>
          </div>

          {/* 4. تحميل التطبيق والكلمات المفتاحية (Column 4 - Spans 2 cols) */}
          <div className="lg:col-span-2 flex flex-col lg:flex-row gap-10 lg:gap-8">
            {/* Download App */}
            <div className="flex-1">
              <h3 className="text-white font-semibold text-sm tracking-wider uppercase mb-6">
                Download App
              </h3>
              <div className="flex flex-col gap-3">
                {/* Google Play Button */}
                <a
                  href="#"
                  className="bg-[#303639] hover:bg-gray-700 transition-colors flex items-center gap-3 px-4 py-3 rounded-sm w-44"
                >
                  <svg
                    className="w-6 h-6 text-white"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      d="M3.609 1.814L13.792 12l-10.183 10.186a1.996 1.996 0 0 1-.609-1.428V3.242c0-.525.195-1.01.609-1.428zm11.597 10.186L5.807 2.6A1.998 1.998 0 0 1 7.218 2h9.564a2 2 0 0 1 1.414.586l-2.99 2.99-6.393 6.424h6.393zm0 0l-2.99 2.99 2.99 2.99 6.393-6.393-6.393-6.393zm0 0l-9.399 9.399a1.998 1.998 0 0 0 1.411.586h9.564a2 2 0 0 0 1.414-.586l-2.99-2.99z"
                      fillRule="evenodd"
                      clipRule="evenodd"
                    />
                  </svg>
                  <div className="flex flex-col text-left">
                    <span className="text-[10px] text-gray-400 leading-none">
                      Get it now
                    </span>
                    <span className="text-sm font-semibold text-white leading-tight">
                      Google Play
                    </span>
                  </div>
                </a>

                {/* App Store Button */}
                <a
                  href="#"
                  className="bg-[#303639] hover:bg-gray-700 transition-colors flex items-center gap-3 px-4 py-3 rounded-sm w-44"
                >
                  <svg
                    className="w-7 h-7 text-white"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M16.365 21.43c-1.127.665-2.227 1.258-3.483 1.258-1.282 0-2.382-.593-3.483-1.258-1.474-.88-2.673-1.598-4.48-1.598-1.564 0-3.155.702-4.502 1.584C-.626 15.65-.181 8.944 3.42 6.43c1.76-1.229 3.435-1.527 4.904-1.527 1.346 0 2.508.47 3.518.89 1.144.475 2.112.877 3.122.877.962 0 1.94-.384 3.09-.858 1.047-.432 2.251-.93 3.619-.93 1.13 0 2.553.228 3.868 1.037-1.164.835-2.126 1.91-2.607 3.235-.486 1.341-.453 2.76.126 3.97.667 1.396 1.83 2.454 3.143 3.078-1.077 3.011-2.937 4.962-4.838 5.228zM14.07 1.35c-1.332.39-2.738 1.432-3.617 2.65-.898 1.246-1.526 2.72-1.272 4.198 1.37-.123 2.875-.85 3.844-1.956 1.038-1.18 1.626-2.64 1.421-4.108-.142-.055-.262-.122-.376-.2-.041-.027-.083-.049-.126-.076-.234-.141-.482-.258-.737-.348a2.59 2.59 0 0 0-.137-.058v-.058l1.047-.034-.047-.008z" />
                  </svg>
                  <div className="flex flex-col text-left">
                    <span className="text-[10px] text-gray-400 leading-none">
                      Get it now
                    </span>
                    <span className="text-sm font-semibold text-white leading-tight">
                      App Store
                    </span>
                  </div>
                </a>
              </div>
            </div>

            {/* Popular Tags */}
            <div className="flex-1 lg:max-w-[300px]">
              <h3 className="text-white font-semibold text-sm tracking-wider uppercase mb-6">
                Popular Tag
              </h3>
              <div className="flex flex-wrap gap-2">
                {[
                  "Game",
                  "iPhone",
                  "TV",
                  "Asus Laptops",
                  "Macbook",
                  "SSD",
                  "Graphics Card",
                  "Power Bank",
                  "Smart TV",
                  "Speaker",
                  "Tablet",
                  "Microwave",
                  "Samsung",
                ].map((tag) => (
                  <Link
                    key={tag}
                    to={`/tag/${tag.toLowerCase()}`}
                    className={`border px-3 py-1.5 rounded-sm text-xs font-medium transition-colors ${
                      tag === "Graphics Card"
                        ? "border-white text-white" // العنصر النشط
                        : "border-gray-700 text-gray-400 hover:border-gray-400 hover:text-white"
                    }`}
                  >
                    {tag}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* =========================================
            الجزء السفلي: حقوق النشر (Copyright)
           ========================================= */}
        <div className="border-t border-gray-800 pt-6 flex flex-col items-center justify-center text-center">
          <p className="text-gray-400 text-sm">
            Kinbo - eCommerce Template © 2021. Design by Templatecookie
          </p>
        </div>
      </div>
    </footer>
  );
}
