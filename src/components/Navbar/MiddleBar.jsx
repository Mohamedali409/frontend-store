import React, { useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Search, ShoppingCart, Heart, User, Menu, X } from "lucide-react";
import CartMenu from "./Dropdowns/CartMenu";
import LoginMenu from "./Dropdowns/LoginMenu";
import useClickOutside from "../../hooks/useClickOutside";

export default function MiddleBar() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);

  const cartRef = useRef(null);
  const loginRef = useRef(null);
  const mobileMenuRef = useRef(null);

  useClickOutside(cartRef, () => setCartOpen(false));
  useClickOutside(loginRef, () => setLoginOpen(false));
  useClickOutside(mobileMenuRef, () => setIsMobileMenuOpen(false));

  const handleSearch = () => {
    if (searchQuery.trim()) {
      navigate(`/category/${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <div className="bg-[#0B5C8F] text-white py-4 px-4 md:px-8 relative z-30">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4">
        {/* اللوجو وزر الموبايل */}
        <div className="flex items-center gap-4" ref={mobileMenuRef}>
          <button
            className="md:hidden text-white"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
          <Link
            to="/"
            className="flex items-center gap-2 text-2xl font-bold tracking-wider"
          >
            <div className="w-8 h-8 border-4 border-white rounded-full flex items-center justify-center">
              <div className="w-3 h-3 bg-white rounded-full"></div>
            </div>
            CLICON
          </Link>

          {/* قائمة الموبايل */}
          {isMobileMenuOpen && (
            <div className="absolute top-full left-0 w-full bg-white text-black shadow-xl border-t z-50 flex flex-col font-medium md:hidden">
              <Link
                to="/track-order"
                className="p-4 border-b hover:text-[#FA8232]"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Track Order
              </Link>
              <Link
                to="/compare"
                className="p-4 border-b hover:text-[#FA8232]"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Compare
              </Link>
              <Link
                to="/support"
                className="p-4 border-b hover:text-[#FA8232]"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Customer Support
              </Link>
              <Link
                to="/help"
                className="p-4 hover:text-[#FA8232]"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Need Help
              </Link>
            </div>
          )}
        </div>

        {/* شريط البحث */}
        <div className="w-full md:flex-1 md:max-w-2xl order-3 md:order-2">
          <div className="relative text-black">
            <input
              type="text"
              placeholder="Search for anything..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              className="w-full rounded-sm py-2.5 pl-4 pr-12 outline-none focus:ring-2 focus:ring-[#FA8232]"
            />
            <button
              onClick={handleSearch}
              className="absolute right-0 top-0 h-full px-4 text-gray-500 hover:text-[#FA8232]"
            >
              <Search size={20} />
            </button>
          </div>
        </div>

        {/* الأيقونات */}
        <div className="flex items-center gap-5 md:gap-6 order-2 md:order-3">
          <div className="relative" ref={cartRef}>
            <div
              className="relative cursor-pointer hover:text-[#FA8232] transition"
              onClick={() => setCartOpen(!cartOpen)}
            >
              <ShoppingCart size={24} />
              <span className="absolute -top-2 -right-2 bg-white text-[#0B5C8F] text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                2
              </span>
            </div>
            {cartOpen && <CartMenu />}
          </div>

          <Link to="/wishlist" className="hover:text-[#FA8232] transition">
            <Heart size={24} />
          </Link>

          <div className="relative" ref={loginRef}>
            <button
              className="hover:text-[#FA8232] transition"
              onClick={() => setLoginOpen(!loginOpen)}
            >
              <User size={24} />
            </button>
            {loginOpen && <LoginMenu />}
          </div>
        </div>
      </div>
    </div>
  );
}
