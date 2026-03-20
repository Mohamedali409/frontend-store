import { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  ShoppingCart,
  Heart,
  User,
  ChevronDown,
  Phone,
  Menu,
  X,
  Monitor,
  Smartphone,
  Camera,
  Headphones,
  Watch,
  Gamepad2,
  LogOut,
  UserCircle,
  Package,
  ChevronRight,
} from "lucide-react";

const mockCategories = [
  { name: "Computer & Laptop", icon: <Monitor size={18} /> },
  { name: "Smartphones & Tablets", icon: <Smartphone size={18} /> },
  { name: "Camera & Photo", icon: <Camera size={18} /> },
  { name: "Audio & Headphones", icon: <Headphones size={18} /> },
  { name: "Wearable Electronics", icon: <Watch size={18} /> },
  { name: "Gaming Console", icon: <Gamepad2 size={18} /> },
];

export default function Header() {
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();

  const [categoryOpen, setCategoryOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [userOpen, setUserOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const userRef = useRef(null);
  const categoryRef = useRef(null);

  // إغلاق القوائم عند الضغط بالخارج
  useEffect(() => {
    function handleClickOutside(e) {
      if (userRef.current && !userRef.current.contains(e.target))
        setUserOpen(false);
      if (categoryRef.current && !categoryRef.current.contains(e.target))
        setCategoryOpen(false);
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearch = () => {
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
      setMobileMenuOpen(false);
    }
  };

  return (
    <div className="bg-white relative z-[100] shadow-sm border-b border-gray-100">
      {/* 1. Top Bar (Hidden on Mobile) */}
      <div className="hidden md:block bg-[#1B6392] text-white py-2 text-[11px] font-medium">
        <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
          <p className="opacity-90 tracking-wide">
            Welcome to Aly Shope online store!
          </p>
          <div className="flex gap-6">
            <Link
              to="/track-order"
              className="hover:text-orange-400 transition-colors"
            >
              Track Order
            </Link>
            <Link
              to="/help"
              className="hover:text-orange-400 transition-colors"
            >
              Need Help
            </Link>
          </div>
        </div>
      </div>

      {/* 2. Main Header Container */}
      <div className="max-w-7xl mx-auto px-4 py-3 md:py-5 flex items-center justify-between gap-4 md:gap-8">
        {/* Logo & Mobile Menu Toggle */}
        <div className="flex items-center gap-3">
          <button
            className="md:hidden p-2 -ml-2 text-gray-700 hover:bg-gray-100 rounded-full transition-colors"
            onClick={() => setMobileMenuOpen(true)}
          >
            <Menu size={24} />
          </button>
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-9 h-9 md:w-11 md:h-11 bg-orange-500 rounded-xl flex items-center justify-center shadow-lg shadow-orange-200 group-hover:rotate-6 transition-transform">
              <span className="text-white font-black text-xl md:text-2xl italic">
                A
              </span>
            </div>
            <span className="text-xl md:text-2xl font-black text-[#191C1F] tracking-tighter hidden sm:block">
              AlyShope
            </span>
          </Link>
        </div>

        {/* Search Bar (Centered) */}
        <div className="hidden md:flex flex-1 max-w-2xl relative">
          <input
            type="text"
            placeholder="Search for anything..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            className="w-full bg-gray-50 border border-gray-200 rounded-xl py-2.5 px-5 pr-12 text-sm focus:bg-white focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all outline-none"
          />
          <button
            onClick={handleSearch}
            className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 text-gray-400 hover:text-orange-500 transition-colors"
          >
            <Search size={20} />
          </button>
        </div>

        {/* Action Icons */}
        <div className="flex items-center gap-2 md:gap-5">
          <Link
            to="/wishlist"
            className="p-2 text-gray-600 hover:text-orange-500 hover:bg-orange-50 rounded-full transition-all hidden sm:flex"
          >
            <Heart size={24} />
          </Link>

          {/* Cart Icon (مربوط بصفحة السلة مباشرة) */}
          <Link
            to="/cart"
            className="p-2 text-gray-600 hover:text-orange-500 hover:bg-orange-50 rounded-full transition-all relative"
          >
            <ShoppingCart size={24} />
            <span className="absolute top-1 right-1 bg-orange-600 text-white text-[10px] w-4 h-4 md:w-5 md:h-5 rounded-full flex items-center justify-center font-bold border-2 border-white">
              2
            </span>
          </Link>

          {/* User Account */}
          <div className="relative" ref={userRef}>
            <button
              onClick={() => setUserOpen(!userOpen)}
              className="flex items-center gap-2 p-1 md:pl-2 md:pr-1 md:py-1 md:bg-gray-50 md:hover:bg-gray-100 rounded-full transition-all border border-transparent md:border-gray-100"
            >
              <div
                className={`w-8 h-8 md:w-9 md:h-9 rounded-full flex items-center justify-center ${isAuthenticated ? "bg-orange-500 text-white" : "bg-gray-200 text-gray-500"}`}
              >
                <User size={18} strokeWidth={2.5} />
              </div>
              <ChevronDown
                size={14}
                className={`hidden md:block transition-transform ${userOpen ? "rotate-180" : ""}`}
              />
            </button>

            {/* User Dropdown */}
            <AnimatePresence>
              {userOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  className="absolute top-full right-0 mt-3 w-64 bg-white border border-gray-100 rounded-2xl shadow-2xl overflow-hidden py-2"
                >
                  {isAuthenticated ? (
                    <>
                      <div className="px-5 py-3 border-b border-gray-50 mb-1">
                        <p className="text-sm font-bold text-gray-900 truncate">
                          {user?.name}
                        </p>
                        <p className="text-xs text-gray-400 truncate">
                          {user?.email}
                        </p>
                      </div>
                      <Link
                        to="/profile"
                        onClick={() => setUserOpen(false)}
                        className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-600 hover:bg-orange-50 hover:text-orange-600 transition-colors"
                      >
                        <UserCircle size={18} /> My Profile
                      </Link>
                      <Link
                        to="/orders"
                        onClick={() => setUserOpen(false)}
                        className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-600 hover:bg-orange-50 hover:text-orange-600 transition-colors"
                      >
                        <Package size={18} /> My Orders
                      </Link>
                      <button
                        onClick={() => {
                          logout();
                          setUserOpen(false);
                        }}
                        className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-500 hover:bg-red-50 font-semibold mt-1 border-t border-gray-50"
                      >
                        <LogOut size={18} /> Sign Out
                      </button>
                    </>
                  ) : (
                    <div className="p-4">
                      <p className="text-xs text-center text-gray-500 mb-4">
                        Sign in to sync your wishlist and orders across devices.
                      </p>
                      <Link
                        to="/login"
                        onClick={() => setUserOpen(false)}
                        className="block w-full bg-orange-500 text-white text-center py-2.5 rounded-xl font-bold hover:bg-orange-600 transition-all shadow-md shadow-orange-100"
                      >
                        Login / Register
                      </Link>
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* 3. Mobile Search Bar */}
      <div className="md:hidden px-4 pb-4">
        <div className="relative">
          <input
            type="text"
            placeholder="Search products..."
            className="w-full bg-gray-100 border-none rounded-xl py-2.5 px-4 pr-12 text-sm focus:ring-2 focus:ring-orange-500 transition-all outline-none"
          />
          <Search
            size={18}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
          />
        </div>
      </div>

      {/* 4. Desktop Navigation (Bottom Row) */}
      <div className="hidden md:block border-t border-gray-50">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between">
          <div className="flex items-center gap-8">
            {/* Categories Dropdown */}
            <div className="relative" ref={categoryRef}>
              <button
                onClick={() => setCategoryOpen(!categoryOpen)}
                className={`flex items-center gap-3 py-3 px-6 text-sm font-bold transition-all ${categoryOpen ? "bg-orange-500 text-white" : "text-gray-900 hover:text-orange-500 bg-gray-50"}`}
              >
                <Menu size={18} /> ALL CATEGORIES
                <ChevronDown
                  size={16}
                  className={`transition-transform duration-300 ${categoryOpen ? "rotate-180" : ""}`}
                />
              </button>

              <AnimatePresence>
                {categoryOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 15 }}
                    className="absolute top-full left-0 w-72 bg-white border border-gray-100 shadow-2xl rounded-b-2xl py-2"
                  >
                    {mockCategories.map((cat) => (
                      <Link
                        key={cat.name}
                        to={`/products?category=${cat.name}`}
                        onClick={() => setCategoryOpen(false)}
                        className="flex items-center justify-between px-6 py-3.5 text-sm text-gray-600 hover:bg-orange-50 hover:text-orange-500 group transition-all"
                      >
                        <div className="flex items-center gap-3">
                          <span className="text-gray-400 group-hover:text-orange-500 transition-colors">
                            {cat.icon}
                          </span>
                          {cat.name}
                        </div>
                        <ChevronRight
                          size={14}
                          className="opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all"
                        />
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <nav className="flex gap-8 text-sm font-semibold text-gray-500">
              <Link
                to="/products"
                className="hover:text-orange-500 transition-colors"
              >
                Shop All
              </Link>
              <Link
                to="/hot-deals"
                className="hover:text-orange-500 flex items-center gap-1.5 transition-colors"
              >
                <span className="w-1.5 h-1.5 bg-red-500 rounded-full animate-ping"></span>{" "}
                Hot Deals
              </Link>
              <Link
                to="/customer-support"
                className="hover:text-orange-500 transition-colors"
              >
                Support
              </Link>
            </nav>
          </div>

          <div className="flex items-center gap-2 text-gray-900 font-bold">
            <Phone size={18} className="text-orange-500" />
            <span className="text-sm">+1-202-555-0104</span>
          </div>
        </div>
      </div>

      {/* 5. Mobile Sidebar Drawer (تم التعديل هنا) */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[110]"
            />
            {/* إضافة flex و flex-col علشان الـ mt-auto تشتغل صح تحت */}
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 left-0 bottom-0 w-[80%] max-w-xs bg-white z-[120] shadow-2xl overflow-y-auto flex flex-col"
            >
              <div className="p-6 bg-orange-500 text-white flex items-center justify-between">
                <span className="text-xl font-black italic tracking-tighter">
                  AlyShope
                </span>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-1 hover:bg-white/20 rounded-full transition-colors"
                >
                  <X size={24} />
                </button>
              </div>

              <div className="p-4 flex-grow">
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-4 px-2">
                  Main Navigation
                </p>
                <div className="space-y-1">
                  <Link
                    to="/"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center gap-4 px-3 py-3 text-gray-700 font-bold hover:bg-gray-50 rounded-xl"
                  >
                    Home
                  </Link>
                  <Link
                    to="/products"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center gap-4 px-3 py-3 text-gray-700 font-bold hover:bg-gray-50 rounded-xl"
                  >
                    Shop All
                  </Link>
                  {/* زر السلة في قائمة الموبايل */}
                  <Link
                    to="/cart"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center gap-4 px-3 py-3 text-gray-700 font-bold hover:bg-gray-50 rounded-xl"
                  >
                    My Cart
                  </Link>
                  <Link
                    to="/profile"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center gap-4 px-3 py-3 text-gray-700 font-bold hover:bg-gray-50 rounded-xl"
                  >
                    My Account
                  </Link>
                  <Link
                    to="/hot-deals"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center gap-4 px-3 py-3 text-red-600 font-bold hover:bg-red-50 rounded-xl"
                  >
                    Hot Deals 🔥
                  </Link>
                </div>

                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-4 mt-8 px-2">
                  Top Categories
                </p>
                <div className="grid grid-cols-1 gap-1">
                  {mockCategories.map((cat) => (
                    <Link
                      key={cat.name}
                      to={`/products?category=${cat.name}`}
                      onClick={() => setMobileMenuOpen(false)}
                      className="flex items-center gap-4 px-3 py-3 text-sm text-gray-600 hover:bg-orange-50 hover:text-orange-500 rounded-xl transition-colors"
                    >
                      <span className="text-gray-400">{cat.icon}</span>
                      {cat.name}
                    </Link>
                  ))}
                </div>
              </div>

              {/* هذا الجزء سينزل للأسفل بفضل الـ flex flex-col و mt-auto */}
              <div className="mt-auto p-6 border-t border-gray-100 bg-gray-50">
                <div className="flex items-center gap-3 text-gray-900 font-bold mb-4">
                  <Phone size={20} className="text-orange-500" />
                  <span>+1-202-555-0104</span>
                </div>
                <p className="text-xs text-gray-400">
                  © 2024 AlyShope. All rights reserved.
                </p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
