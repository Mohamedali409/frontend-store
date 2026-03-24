import React from "react";
import { Link } from "react-router-dom";
import { Phone, Mail, MapPin } from "lucide-react";
import { useTranslation } from "react-i18next";

export default function Footer() {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === "ar";
  const currentYear = new Date().getFullYear();

  const categories = t("Footer.cat_list", { returnObjects: true });
  const quickLinks = [
    { name: t("Footer.links_list.shop"), path: "/products" },
    { name: t("Footer.links_list.cart"), path: "/cart" },
    { name: t("Footer.links_list.wishlist"), path: "/wishlist" },
    { name: t("Footer.links_list.track"), path: "/track-order" },
    { name: t("Footer.links_list.help"), path: "/help" },
    { name: t("Footer.links_list.about"), path: "/about" },
  ];

  return (
    <footer className="bg-[#191C1F] pt-16 pb-8 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4">
        <div
          className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16 ${isRTL ? "text-right" : "text-left"}`}
        >
          {/* 1. Brand & Contact */}
          <div className="lg:col-span-1">
            <Link
              to="/"
              className={`flex items-center gap-3 mb-6 group ${isRTL ? "flex-row-reverse" : ""}`}
            >
              <div className="w-10 h-10 bg-[#FA8232] rounded-xl flex items-center justify-center shadow-lg group-hover:rotate-6 transition-transform">
                <span className="text-white font-black text-xl italic">A</span>
              </div>
              <span className="text-white text-2xl font-black tracking-tighter">
                AlyShope
              </span>
            </Link>

            <div className="flex flex-col gap-5">
              <div>
                <p className="text-gray-500 text-[11px] uppercase tracking-[0.2em] mb-1">
                  {t("Footer.support")}
                </p>
                <p className="text-white text-lg font-bold hover:text-[#FA8232] transition-colors cursor-pointer dir-ltr">
                  +1-202-555-0104
                </p>
              </div>

              <div
                className={`flex items-start gap-3 text-gray-400 text-sm ${isRTL ? "flex-row-reverse" : ""}`}
              >
                <MapPin size={20} className="text-[#FA8232] shrink-0 mt-1" />
                <p className="leading-relaxed opacity-80">
                  {t("Footer.address")}
                </p>
              </div>

              <div
                className={`flex items-center gap-3 text-gray-400 text-sm ${isRTL ? "flex-row-reverse" : ""}`}
              >
                <Mail size={18} className="text-[#FA8232] shrink-0" />
                <p className="text-white font-medium">support@alyshope.com</p>
              </div>
            </div>
          </div>

          {/* 2. Top Category */}
          <div className="lg:col-span-1">
            <h3
              className={`text-white font-bold text-sm tracking-widest uppercase mb-6 border-[#FA8232] ${isRTL ? "border-r-2 pr-3" : "border-l-2 pl-3"}`}
            >
              {t("Footer.categories")}
            </h3>
            <ul className="text-gray-400 text-sm flex flex-col gap-3">
              {categories.map((item) => (
                <li key={item}>
                  <Link
                    to={`/products?category=${item}`}
                    className={`hover:text-[#FA8232] transition-all inline-block ${isRTL ? "hover:-translate-x-1" : "hover:translate-x-1"}`}
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* 3. Quick Links */}
          <div className="lg:col-span-1">
            <h3
              className={`text-white font-bold text-sm tracking-widest uppercase mb-6 border-[#FA8232] ${isRTL ? "border-r-2 pr-3" : "border-l-2 pl-3"}`}
            >
              {t("Footer.quick_links")}
            </h3>
            <ul className="text-gray-400 text-sm flex flex-col gap-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className={`hover:text-[#FA8232] transition-all inline-block ${isRTL ? "hover:-translate-x-1" : "hover:translate-x-1"}`}
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* 4. Apps & Tags */}
          <div className="lg:col-span-2 space-y-10">
            <div>
              <h3 className="text-white font-bold text-sm tracking-widest uppercase mb-6">
                {t("Footer.download_app")}
              </h3>
              <div
                className={`flex flex-wrap gap-4 ${isRTL ? "justify-end" : "justify-start"}`}
              >
                <AppButton
                  type="play"
                  topText="Get it now"
                  bottomText="Google Play"
                />
                <AppButton
                  type="apple"
                  topText="Download on"
                  bottomText="App Store"
                />
              </div>
            </div>

            <div>
              <h3 className="text-white font-bold text-sm tracking-widest uppercase mb-6">
                {t("Footer.popular_tags")}
              </h3>
              <div
                className={`flex flex-wrap gap-2 ${isRTL ? "flex-row-reverse" : ""}`}
              >
                {["iPhone", "Laptops", "Macbook", "SSD", "Gaming"].map(
                  (tag) => (
                    <Link
                      key={tag}
                      to={`/products?search=${tag}`}
                      className="bg-gray-800/40 border border-gray-700/50 px-4 py-2 rounded-lg text-xs text-gray-400 hover:border-[#FA8232] hover:text-white transition-all"
                    >
                      {tag}
                    </Link>
                  ),
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div
          className={`border-t border-gray-800/50 pt-8 flex flex-col md:flex-row items-center justify-between gap-6 ${isRTL ? "md:flex-row-reverse" : ""}`}
        >
          <p className="text-gray-500 text-sm text-center md:text-left">
            <span className="text-[#FA8232] font-bold">AlyShope</span> -
            eCommerce Store © {currentYear}. {t("Footer.rights")}
          </p>
          <div className="flex items-center gap-6 opacity-40 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-500">
            <PaymentIcon
              src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg"
              alt="Visa"
              h="h-3"
            />
            <PaymentIcon
              src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg"
              alt="Mastercard"
              h="h-5"
            />
            <PaymentIcon
              src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg"
              alt="Paypal"
              h="h-4"
            />
          </div>
        </div>
      </div>
    </footer>
  );
}

// مكونات فرعية صغيرة للتنظيم
const AppButton = ({ type, topText, bottomText }) => (
  <button className="bg-gray-800/80 hover:bg-[#FA8232] transition-all flex items-center gap-3 px-5 py-3 rounded-xl w-44 group border border-gray-700/30">
    <div className="text-white group-hover:scale-110 transition-transform">
      {type === "play" ? (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
          <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.61 3,21.09 3,20.5Z" />
        </svg>
      ) : (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
          <path d="M18.71,19.5C17.88,20.74 17,21.95 15.66,21.97C14.32,22 13.89,21.18 12.37,21.18C10.84,21.18 10.37,21.95 9.1,22C7.79,22.05 6.8,20.68 5.96,19.47M13,3.5C13.73,2.67 14.94,2.04 15.94,2Z" />
        </svg>
      )}
    </div>
    <div className="text-left leading-tight">
      <p className="text-[9px] text-gray-400 group-hover:text-orange-100">
        {topText}
      </p>
      <p className="text-sm font-bold text-white">{bottomText}</p>
    </div>
  </button>
);

const PaymentIcon = ({ src, alt, h }) => (
  <img src={src} alt={alt} className={`${h} cursor-pointer`} />
);
