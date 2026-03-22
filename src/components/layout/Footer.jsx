import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Phone, Mail, MapPin } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#191C1F] pt-16 pb-8 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4">
        {/* الجزء العلوي: الأربعة أعمدة */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">
          {/* 1. Brand & Contact info */}
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center gap-3 mb-6 group">
              <div className="w-10 h-10 bg-orange-500 rounded-xl flex items-center justify-center shadow-lg group-hover:rotate-6 transition-transform">
                <span className="text-white font-black text-xl italic">A</span>
              </div>
              <span className="text-white text-2xl font-black tracking-tighter">
                AlyShope
              </span>
            </Link>

            <div className="flex flex-col gap-4">
              <div className="space-y-1">
                <p className="text-gray-500 text-[13px] uppercase tracking-wider">
                  Customer Support
                </p>
                <p className="text-white text-lg font-bold hover:text-orange-500 transition-colors cursor-pointer">
                  +1-202-555-0104
                </p>
              </div>

              <div className="flex items-start gap-3 text-gray-400 text-sm">
                <MapPin size={18} className="text-orange-500 shrink-0 mt-1" />
                <p className="leading-relaxed">
                  4517 Washington Ave. <br />
                  Mansoura, Egypt
                </p>
              </div>

              <div className="flex items-center gap-3 text-gray-400 text-sm">
                <Mail size={18} className="text-orange-500 shrink-0" />
                <p className="text-white font-medium">support@alyshope.com</p>
              </div>
            </div>
          </div>

          {/* 2. Top Category */}
          <div className="lg:col-span-1">
            <h3 className="text-white font-bold text-sm tracking-widest uppercase mb-6 border-l-2 border-orange-500 pl-3">
              Top Category
            </h3>
            <ul className="text-gray-400 text-sm flex flex-col gap-3">
              {[
                "Computer & Laptop",
                "Smartphones",
                "Headphones",
                "Camera & Photo",
                "TV & Homes",
              ].map((item) => (
                <li key={item}>
                  <Link
                    to={`/products?category=${item}`}
                    className="hover:text-orange-500 transition-all hover:translate-x-1 inline-block"
                  >
                    {item}
                  </Link>
                </li>
              ))}
              <li className="text-orange-500 font-bold flex items-center gap-2 mt-2">
                <span className="w-4 h-0.5 bg-orange-500"></span>
                Accessories
              </li>
            </ul>
          </div>

          {/* 3. Quick Links */}
          <div className="lg:col-span-1">
            <h3 className="text-white font-bold text-sm tracking-widest uppercase mb-6 border-l-2 border-orange-500 pl-3">
              Quick Links
            </h3>
            <ul className="text-gray-400 text-sm flex flex-col gap-3">
              {[
                { name: "Shop Product", path: "/products" },
                { name: "Shopping Cart", path: "/cart" },
                { name: "Wishlist", path: "/wishlist" },
                { name: "Track Order", path: "/track-order" },
                { name: "Customer Help", path: "/help" },
                { name: "About Us", path: "/about" },
              ].map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="hover:text-orange-500 transition-all hover:translate-x-1 inline-block"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* 4. Download App & Tags (Spans 2 cols) */}
          <div className="lg:col-span-2 space-y-10">
            {/* Download App Buttons */}
            <div>
              <h3 className="text-white font-bold text-sm tracking-widest uppercase mb-6">
                Download Our App
              </h3>
              <div className="flex flex-wrap gap-4">
                <button className="bg-gray-800 hover:bg-orange-600 transition-all flex items-center gap-3 px-5 py-3 rounded-xl w-48 group">
                  <div className="text-white group-hover:scale-110 transition-transform">
                    {/* Google Play Icon SVG */}
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.61 3,21.09 3,20.5M16.81,15.12L18.66,16.05C19.15,16.3 19.34,16.91 19.09,17.4C18.84,17.89 18.23,18.08 17.74,17.83L15.38,16.64L14.39,15.65L16.81,15.12M16.81,8.88L14.39,8.35L15.38,7.36L17.74,6.17C18.23,5.92 18.84,6.11 19.09,6.6C19.34,7.09 19.15,7.7 18.66,7.95L16.81,8.88M15.1,12L18.04,13.47L20.5,14.7C21.03,14.96 21.25,15.61 21,16.14C20.75,16.67 20.1,16.89 19.57,16.64L16.5,15.11L15.1,12M15.1,12L16.5,8.89L19.57,7.36C20.1,7.11 20.75,7.33 21,7.86C21.25,8.39 21.03,9.04 20.5,9.3L18.04,10.53L15.1,12Z" />
                    </svg>
                  </div>
                  <div className="text-left leading-tight">
                    <p className="text-[10px] text-gray-400">Get it now</p>
                    <p className="text-sm font-bold text-white">Google Play</p>
                  </div>
                </button>
                <button className="bg-gray-800 hover:bg-orange-600 transition-all flex items-center gap-3 px-5 py-3 rounded-xl w-48 group">
                  <div className="text-white group-hover:scale-110 transition-transform">
                    {/* Apple Icon SVG */}
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M18.71,19.5C17.88,20.74 17,21.95 15.66,21.97C14.32,22 13.89,21.18 12.37,21.18C10.84,21.18 10.37,21.95 9.1,22C7.79,22.05 6.8,20.68 5.96,19.47C4.25,17 2.94,12.45 4.7,9.39C5.57,7.87 7.13,6.91 8.82,6.88C10.1,6.86 11.32,7.75 12.11,7.75C12.89,7.75 14.37,6.68 15.92,6.84C16.57,6.87 18.39,7.1 19.56,8.82C19.47,8.88 17.39,10.1 17.41,12.63C17.44,15.65 20.06,16.66 20.09,16.67C20.06,16.74 19.67,18.11 18.71,19.5M13,3.5C13.73,2.67 14.94,2.04 15.94,2C16.07,3.17 15.6,4.35 14.9,5.19C14.21,6.04 13.07,6.7 11.95,6.61C11.8,5.46 12.36,4.26 13,3.5Z" />
                    </svg>
                  </div>
                  <div className="text-left leading-tight">
                    <p className="text-[10px] text-gray-400">Download on</p>
                    <p className="text-sm font-bold text-white">App Store</p>
                  </div>
                </button>
              </div>
            </div>

            {/* Popular Tags */}
            <div>
              <h3 className="text-white font-bold text-sm tracking-widest uppercase mb-6">
                Popular Tags
              </h3>
              <div className="flex flex-wrap gap-2">
                {[
                  "iPhone",
                  "Laptops",
                  "Macbook",
                  "SSD",
                  "Graphics Card",
                  "Smart TV",
                  "Samsung",
                  "Gaming",
                ].map((tag) => (
                  <Link
                    key={tag}
                    to={`/products?search=${tag}`}
                    className="bg-gray-800/50 border border-gray-700 px-3 py-1.5 rounded-lg text-xs font-medium text-gray-400 hover:border-orange-500 hover:text-white transition-all"
                  >
                    {tag}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* الجزء السفلي: Copyright */}
        <div className="border-t border-gray-800/50 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-gray-500 text-sm">
            <span className="text-orange-500 font-bold">AlyShope</span> -
            eCommerce Store © {currentYear}. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg"
              alt="Visa"
              className="h-4 opacity-50 hover:opacity-100 transition-opacity grayscale hover:grayscale-0 cursor-pointer"
            />
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg"
              alt="Mastercard"
              className="h-6 opacity-50 hover:opacity-100 transition-opacity grayscale hover:grayscale-0 cursor-pointer"
            />
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg"
              alt="Paypal"
              className="h-5 opacity-50 hover:opacity-100 transition-opacity grayscale hover:grayscale-0 cursor-pointer"
            />
          </div>
        </div>
      </div>
    </footer>
  );
}
