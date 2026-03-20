import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { ChevronDown, Phone, MapPin } from "lucide-react";
import CategoryMenu from "./Dropdowns/CategoryMenu";
import useClickOutside from "../../hooks/useClickOutside";

export default function BottomBar() {
  const [categoryOpen, setCategoryOpen] = useState(false);
  const categoryRef = useRef(null);

  useClickOutside(categoryRef, () => setCategoryOpen(false));

  return (
    <div className="hidden md:block bg-white border-b shadow-sm relative z-20">
      <div className="max-w-7xl mx-auto px-4 md:px-8 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <div className="relative" ref={categoryRef}>
            <button
              onClick={() => setCategoryOpen(!categoryOpen)}
              className="bg-gray-100 flex items-center gap-2 px-6 py-4 font-medium text-gray-800 hover:bg-gray-200 transition"
            >
              All Category{" "}
              <ChevronDown
                size={18}
                className={`transition-transform ${categoryOpen ? "rotate-180" : ""}`}
              />
            </button>

            {categoryOpen && (
              <CategoryMenu closeMenu={() => setCategoryOpen(false)} />
            )}
          </div>

          <nav className="flex items-center gap-6 text-sm text-gray-600 font-medium">
            <Link
              to="/track-order"
              className="flex items-center gap-1.5 hover:text-[#FA8232] transition"
            >
              <MapPin size={16} /> Track Order
            </Link>
            <Link to="/compare" className="hover:text-[#FA8232] transition">
              Compare
            </Link>
            <Link to="/support" className="hover:text-[#FA8232] transition">
              Customer Support
            </Link>
            <Link to="/help" className="hover:text-[#FA8232] transition">
              Need Help
            </Link>
          </nav>
        </div>

        <a
          href="tel:+12025550104"
          className="flex items-center gap-2 text-lg font-medium text-gray-800 hover:text-[#FA8232] transition"
        >
          <Phone size={18} className="text-gray-500" /> +1-202-555-0104
        </a>
      </div>
    </div>
  );
}
