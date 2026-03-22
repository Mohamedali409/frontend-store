import { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { motion, AnimatePresence } from "framer-motion";
import api from "../../utils/api";
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
  Info, // أيقونة إضافية لصفحة About
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
  const [userOpen, setUserOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [cartCount, setCartCount] = useState(0);

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

  // جلب عدد المنتجات
  const fetchCartCount = async () => {
    if (!isAuthenticated) {
      setCartCount(0);
      return;
    }
    try {
      const response = await api.get("/cart");
      if (response.data.success && response.data.cart) {
        setCartCount(response.data.cart.items.length || 0);
      }
    } catch (error) {
      console.error("Error fetching cart count:", error);
    }
  };

  useEffect(() => {
    fetchCartCount();
    const handleCartUpdate = () => fetchCartCount();
    window.addEventListener("cartUpdated", handleCartUpdate);
    return () => window.removeEventListener("cartUpdated", handleCartUpdate);
  }, [isAuthenticated]);

  const handleSearch = () => {
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
      setMobileMenuOpen(false);
    }
  };

  return (
    <div className="bg-white relative z-[100] shadow-sm border-b border-gray-100">
      {/* 1. Top Bar */}
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

      {/* 2. Main Header */}
      <div className="max-w-7xl mx-auto px-4 py-3 md:py-5 flex items-center justify-between gap-4 md:gap-8">
        <div className="flex items-center gap-3">
          <button
            className="md:hidden p-2 -ml-2 text-gray-700 hover:bg-gray-100 rounded-full"
            onClick={() => setMobileMenuOpen(true)}
          >
            <Menu size={24} />
          </button>
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-9 h-9 md:w-11 md:h-11 bg-orange-500 rounded-xl flex items-center justify-center shadow-lg group-hover:rotate-6 transition-transform">
              <span className="text-white font-black text-xl md:text-2xl italic">
                A
              </span>
            </div>
            <span className="text-xl md:text-2xl font-black text-[#191C1F] tracking-tighter hidden sm:block">
              AlyShope
            </span>
          </Link>
        </div>

        {/* Search Input */}
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
            className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 text-gray-400 hover:text-orange-500"
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

          <Link
            to="/cart"
            className="p-2 text-gray-600 hover:text-orange-500 hover:bg-orange-50 rounded-full transition-all relative"
          >
            <ShoppingCart size={24} />
            {cartCount > 0 && (
              <span className="absolute top-1 right-1 bg-orange-600 text-white text-[10px] w-4 h-4 md:w-5 md:h-5 rounded-full flex items-center justify-center font-bold border-2 border-white">
                {cartCount}
              </span>
            )}
          </Link>

          {/* User Account Section */}
          <div className="relative" ref={userRef}>
            <button
              onClick={() => setUserOpen(!userOpen)}
              className="flex items-center gap-2 p-1 md:bg-gray-50 md:hover:bg-gray-100 rounded-full transition-all border border-transparent md:border-gray-100"
            >
              <div
                className={`w-8 h-8 md:w-9 md:h-9 rounded-full overflow-hidden flex items-center justify-center ${isAuthenticated ? "bg-orange-500" : "bg-gray-200"}`}
              >
                {isAuthenticated && user?.image ? (
                  <img
                    src={user.image}
                    alt={user.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <User
                    size={18}
                    className={isAuthenticated ? "text-white" : "text-gray-500"}
                    strokeWidth={2.5}
                  />
                )}
              </div>
              <ChevronDown
                size={14}
                className={`hidden md:block transition-transform ${userOpen ? "rotate-180" : ""}`}
              />
            </button>

            <AnimatePresence>
              {userOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute top-full right-0 mt-3 w-64 bg-white border border-gray-100 rounded-2xl shadow-2xl overflow-hidden py-2"
                >
                  {isAuthenticated ? (
                    <>
                      <div className="px-5 py-3 border-b border-gray-50 mb-1 bg-gray-50/50">
                        <p className="text-sm font-bold text-gray-900 truncate">
                          {" "}
                          {user?.name}{" "}
                        </p>
                        <p className="text-[11px] text-gray-500 truncate">
                          {" "}
                          {user?.email}{" "}
                        </p>
                      </div>
                      <Link
                        to="/profile"
                        onClick={() => setUserOpen(false)}
                        className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-600 hover:bg-orange-50 hover:text-orange-600"
                      >
                        <UserCircle size={18} /> My Profile
                      </Link>
                      <Link
                        to="/orders"
                        onClick={() => setUserOpen(false)}
                        className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-600 hover:bg-orange-50 hover:text-orange-600"
                      >
                        <Package size={18} /> My Orders
                      </Link>
                      <button
                        onClick={() => {
                          logout();
                          setUserOpen(false);
                          setCartCount(0);
                        }}
                        className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-500 hover:bg-red-50 font-semibold border-t border-gray-50 mt-1"
                      >
                        <LogOut size={18} /> Sign Out
                      </button>
                    </>
                  ) : (
                    <div className="p-4">
                      <Link
                        to="/login"
                        onClick={() => setUserOpen(false)}
                        className="block w-full bg-orange-500 text-white text-center py-2.5 rounded-xl font-bold hover:bg-orange-600 shadow-md"
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

      {/* 3. Categories & Navigation Bar */}
      <div className="hidden md:block border-t border-gray-50">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between">
          <div className="flex items-center gap-8">
            <div className="relative" ref={categoryRef}>
              <button
                onClick={() => setCategoryOpen(!categoryOpen)}
                className={`flex items-center gap-3 py-3 px-6 text-sm font-bold transition-all ${categoryOpen ? "bg-orange-500 text-white" : "text-gray-900 hover:text-orange-500 bg-gray-50"}`}
              >
                <Menu size={18} /> ALL CATEGORIES
                <ChevronDown
                  size={16}
                  className={`transition-transform ${categoryOpen ? "rotate-180" : ""}`}
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
                        className="flex items-center justify-between px-6 py-3.5 text-sm text-gray-600 hover:bg-orange-50 hover:text-orange-500 group"
                      >
                        <div className="flex items-center gap-3">
                          <span className="text-gray-400 group-hover:text-orange-500">
                            {cat.icon}
                          </span>
                          {cat.name}
                        </div>
                        <ChevronRight
                          size={14}
                          className="opacity-0 group-hover:opacity-100 transition-all"
                        />
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Desktop Navigation مع إضافة About Us */}
            <nav className="flex gap-8 text-sm font-semibold text-gray-500">
              <Link
                to="/products"
                className="hover:text-orange-500 transition-colors"
              >
                Shop All
              </Link>
              <Link
                to="/hot-deals"
                className="hover:text-orange-500 flex items-center gap-1.5"
              >
                <span className="w-1.5 h-1.5 bg-red-500 rounded-full animate-ping"></span>{" "}
                Hot Deals
              </Link>
              <Link
                to="/about"
                className="hover:text-orange-500 transition-colors"
              >
                About Us
              </Link>
              <Link to="/customer-support" className="hover:text-orange-500">
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

      {/* 4. Mobile Side Menu */}
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
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              className="fixed top-0 left-0 bottom-0 w-[80%] max-w-xs bg-white z-[120] p-6 shadow-2xl"
            >
              <div className="flex justify-between items-center mb-8 border-b pb-4">
                <span className="text-orange-500 font-black text-2xl italic tracking-tighter">
                  AlyShope
                </span>
                <div
                  className="bg-gray-100 p-2 rounded-full cursor-pointer"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <X size={20} className="text-gray-500" />
                </div>
              </div>
              <div className="flex flex-col gap-6 font-bold text-gray-800">
                <Link
                  to="/"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-3 hover:text-orange-500"
                >
                  Home
                </Link>
                <Link
                  to="/products"
                  onClick={() => setMobileMenuOpen(false)}
                  className="hover:text-orange-500"
                >
                  Shop
                </Link>
                {/* لينك About Us في الموبايل */}
                <Link
                  to="/about"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-3 hover:text-orange-500"
                >
                  About Us
                </Link>
                <Link
                  to="/cart"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex justify-between items-center hover:text-orange-500"
                >
                  Cart{" "}
                  <span className="bg-orange-100 text-orange-600 px-3 py-1 rounded-full text-xs">
                    {cartCount}
                  </span>
                </Link>

                <hr className="border-gray-100" />

                {!isAuthenticated ? (
                  <Link
                    to="/login"
                    onClick={() => setMobileMenuOpen(false)}
                    className="mt-4 bg-orange-500 text-white text-center py-3 rounded-xl shadow-lg shadow-orange-100"
                  >
                    Login / Register
                  </Link>
                ) : (
                  <div className="space-y-4">
                    <p className="text-xs text-gray-400 uppercase tracking-widest">
                      Account
                    </p>
                    <Link
                      to="/profile"
                      onClick={() => setMobileMenuOpen(false)}
                      className="block text-sm"
                    >
                      My Profile
                    </Link>
                    <button
                      onClick={() => {
                        logout();
                        setMobileMenuOpen(false);
                      }}
                      className="text-red-500 text-sm flex items-center gap-2 pt-2"
                    >
                      <LogOut size={16} /> Logout
                    </button>
                  </div>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
