import { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";
import { motion, AnimatePresence } from "framer-motion";
import api from "../../../utils/api";
import { useTranslation } from "react-i18next";
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
  MessageCircle,
  Globe,
} from "lucide-react";

const mockCategories = [
  {
    name: "Computer & Laptop",
    icon: <Monitor size={18} />,
    subcategories: [
      "MacBooks",
      "Gaming Laptops",
      "Desktops",
      "Monitors",
      "PC Components",
      "Keyboards & Mice",
    ],
    image:
      "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?q=80&w=300&auto=format&fit=crop",
  },
  {
    name: "Smartphones & Tablets",
    icon: <Smartphone size={18} />,
    subcategories: [
      "Apple iPhones",
      "Samsung Galaxy",
      "Android Tablets",
      "iPads",
      "Phone Cases",
      "Power Banks",
    ],
    image:
      "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=300&auto=format&fit=crop",
  },
  {
    name: "Camera & Photo",
    icon: <Camera size={18} />,
    subcategories: [
      "DSLR Cameras",
      "Mirrorless",
      "Lenses",
      "Tripods",
      "Drones",
      "Camera Bags",
    ],
    image:
      "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=300&auto=format&fit=crop",
  },
  {
    name: "Audio & Headphones",
    icon: <Headphones size={18} />,
    subcategories: [
      "Wireless Earbuds",
      "Over-Ear Headphones",
      "Bluetooth Speakers",
      "Home Theater",
      "Microphones",
      "Cables",
    ],
    image:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=300&auto=format&fit=crop",
  },
  {
    name: "Wearable Electronics",
    icon: <Watch size={18} />,
    subcategories: [
      "Apple Watches",
      "Fitness Trackers",
      "Smart Rings",
      "VR Headsets",
      "Watch Bands",
      "Screen Protectors",
    ],
    image:
      "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?q=80&w=300&auto=format&fit=crop",
  },
  {
    name: "Gaming Console",
    icon: <Gamepad2 size={18} />,
    subcategories: [
      "PlayStation 5",
      "Xbox Series X",
      "Nintendo Switch",
      "Gaming Controllers",
      "Video Games",
      "Gaming Chairs",
    ],
    image:
      "https://images.unsplash.com/photo-1486401899868-0e435ed85128?q=80&w=300&auto=format&fit=crop",
  },
];

export default function Header() {
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();

  // استدعاء الـ hooks الخاصة باللغة
  const { t, i18n } = useTranslation();
  const isRtl = i18n.language === "ar";

  const [categoryOpen, setCategoryOpen] = useState(false);
  const [userOpen, setUserOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileCategoryOpen, setMobileCategoryOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [cartCount, setCartCount] = useState(0);
  const [activeCategory, setActiveCategory] = useState(mockCategories[0]);

  const userRef = useRef(null);
  const categoryRef = useRef(null);

  const whatsappNumber = "201284040815";
  const welcomeMessage = "مرحباً فريق AlyShope، أود الاستفسار عن...";
  const whatsappLink = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(welcomeMessage)}`;

  useEffect(() => {
    document.dir = isRtl ? "rtl" : "ltr";
    document.documentElement.lang = i18n.language;
  }, [i18n.language, isRtl]);

  // دالة تغيير اللغة
  const toggleLanguage = () => {
    const newLang = i18n.language === "en" ? "ar" : "en";
    i18n.changeLanguage(newLang);
  };

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

  const fetchCartCount = async () => {
    if (!isAuthenticated) return setCartCount(0);
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
      setSearchQuery("");
    }
  };

  return (
    <div className="sticky top-0 z-[100] w-full bg-white shadow-sm border-b border-gray-100 transition-all">
      {/* 1. Top Bar */}
      <div className="hidden md:block bg-[#1B6392] text-white py-1.5 text-xs font-medium">
        <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
          <p className="opacity-90 tracking-wide">
            {t("welcome_msg", "Welcome to Aly Shope online store!")}
          </p>
          <div className="flex gap-6 items-center">
            <button
              onClick={toggleLanguage}
              className="flex items-center gap-1.5 hover:text-orange-400 transition-colors bg-white/10 px-2 py-0.5 rounded-md"
            >
              <Globe size={14} />
              {isRtl ? "English" : "العربية"}
            </button>
            <Link
              to="/track-order"
              className="hover:text-orange-400 transition-colors"
            >
              {t("track_order", "Track Order")}
            </Link>
            <Link
              to="/help"
              className="hover:text-orange-400 transition-colors"
            >
              {t("need_help", "Need Help")}
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-3 md:py-4 flex items-center justify-between gap-4 md:gap-8">
        <div className="flex items-center gap-3">
          <button
            className="md:hidden p-2 -ms-2 text-gray-700 hover:bg-gray-100 rounded-full transition-colors"
            onClick={() => setMobileMenuOpen(true)}
          >
            <Menu size={24} />
          </button>
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-9 h-9 md:w-10 md:h-10 bg-[#FA8232] rounded-xl flex items-center justify-center shadow-md group-hover:rotate-6 transition-transform">
              <span className="text-white font-black text-xl md:text-2xl italic">
                A
              </span>
            </div>
            <span className="text-xl md:text-2xl font-black text-[#191C1F] tracking-tighter hidden sm:block">
              AlyShope
            </span>
          </Link>
        </div>

        {/* Desktop Search Input */}
        <div className="hidden md:flex flex-1 max-w-2xl relative">
          <input
            type="text"
            placeholder={t("search_placeholder", "Search for anything...")}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            className="w-full bg-gray-50 border border-gray-200 rounded-xl py-2.5 px-5 pe-14 text-sm focus:bg-white focus:ring-2 focus:ring-[#FA8232]/30 focus:border-[#FA8232] transition-all outline-none"
          />
          <button
            onClick={handleSearch}
            className="absolute end-2 top-1/2 -translate-y-1/2 p-1.5 bg-[#FA8232] text-white rounded-lg hover:bg-[#e5762b] transition-colors"
          >
            <Search size={18} />
          </button>
        </div>

        <div className="flex items-center gap-2 md:gap-4">
          <Link
            to="/wishlist"
            className="p-2 text-gray-600 hover:text-[#FA8232] hover:bg-orange-50 rounded-full transition-all hidden sm:flex"
          >
            <Heart size={22} />
          </Link>

          <Link
            to="/cart"
            className="p-2 text-gray-600 hover:text-[#FA8232] hover:bg-orange-50 rounded-full transition-all relative"
          >
            <ShoppingCart size={22} />
            {cartCount > 0 && (
              <span className="absolute top-0 end-0 bg-red-500 text-white text-[10px] w-4 h-4 md:w-4.5 md:h-4.5 rounded-full flex items-center justify-center font-bold border-2 border-white">
                {cartCount}
              </span>
            )}
          </Link>

          <div className="relative" ref={userRef}>
            <button
              onClick={() => setUserOpen(!userOpen)}
              className="flex items-center gap-2 p-1 md:pe-3 md:bg-gray-50 md:hover:bg-gray-100 rounded-full transition-all border border-transparent md:border-gray-100"
            >
              <div
                className={`w-8 h-8 rounded-full overflow-hidden flex items-center justify-center ${isAuthenticated ? "bg-[#FA8232]" : "bg-gray-200"}`}
              >
                {isAuthenticated && user?.image ? (
                  <img
                    src={user.image}
                    alt={user.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <User
                    size={16}
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
                  className="absolute top-full end-0 mt-3 w-60 bg-white border border-gray-100 rounded-2xl shadow-xl overflow-hidden py-2"
                >
                  {isAuthenticated ? (
                    <>
                      <div className="px-5 py-3 border-b border-gray-50 mb-1 bg-gray-50/50">
                        <p className="text-sm font-bold text-gray-900 truncate">
                          {user?.name}
                        </p>
                        <p className="text-[11px] text-gray-500 truncate">
                          {user?.email}
                        </p>
                      </div>
                      <Link
                        to="/profile"
                        onClick={() => setUserOpen(false)}
                        className="flex items-center gap-3 px-4 py-2 text-sm text-gray-600 hover:bg-orange-50 hover:text-[#FA8232]"
                      >
                        <UserCircle size={18} /> {t("my_profile", "My Profile")}
                      </Link>
                      <Link
                        to="/orders"
                        onClick={() => setUserOpen(false)}
                        className="flex items-center gap-3 px-4 py-2 text-sm text-gray-600 hover:bg-orange-50 hover:text-[#FA8232]"
                      >
                        <Package size={18} /> {t("my_orders", "My Orders")}
                      </Link>
                      <button
                        onClick={() => {
                          logout();
                          setUserOpen(false);
                          setCartCount(0);
                        }}
                        className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-500 hover:bg-red-50 font-semibold border-t border-gray-50 mt-1"
                      >
                        <LogOut size={18} /> {t("sign_out", "Sign Out")}
                      </button>
                    </>
                  ) : (
                    <div className="p-4">
                      <Link
                        to="/login"
                        onClick={() => setUserOpen(false)}
                        className="block w-full bg-[#FA8232] text-white text-center py-2.5 rounded-xl font-bold hover:bg-[#e5762b] shadow-md"
                      >
                        {t("login_register", "Login / Register")}
                      </Link>
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      <div className="hidden md:block border-t border-gray-50">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between">
          <div className="flex items-center gap-8">
            <div className="relative" ref={categoryRef}>
              <button
                onClick={() => setCategoryOpen(!categoryOpen)}
                className={`flex items-center gap-3 py-3 px-6 text-sm font-bold transition-all ${categoryOpen ? "bg-[#FA8232] text-white" : "text-gray-900 hover:text-[#FA8232] bg-gray-50"}`}
              >
                <Menu size={18} /> {t("all_categories", "ALL CATEGORIES")}
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
                    className="absolute top-full start-0 w-[800px] bg-white border border-gray-100 shadow-2xl rounded-b-2xl flex overflow-hidden"
                  >
                    <div className="w-1/3 border-e border-gray-100 bg-gray-50/50 py-2">
                      {mockCategories.map((cat) => (
                        <div
                          key={cat.name}
                          onMouseEnter={() => setActiveCategory(cat)}
                          onClick={() => {
                            navigate(`/products?category=${cat.name}`);
                            setCategoryOpen(false);
                          }}
                          className={`flex items-center justify-between px-6 py-3.5 text-sm cursor-pointer transition-colors ${
                            activeCategory.name === cat.name
                              ? "bg-white text-[#FA8232] font-bold border-s-4 border-[#FA8232] shadow-sm relative z-10"
                              : "text-gray-600 hover:bg-orange-50 hover:text-[#FA8232] border-s-4 border-transparent"
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <span
                              className={
                                activeCategory.name === cat.name
                                  ? "text-[#FA8232]"
                                  : "text-gray-400"
                              }
                            >
                              {cat.icon}
                            </span>

                            {t(cat.name)}
                          </div>
                          <ChevronRight
                            size={16}
                            className={`transition-all ${isRtl ? "rotate-180" : ""} ${activeCategory.name === cat.name ? "opacity-100 text-[#FA8232]" : "opacity-0"}`}
                          />
                        </div>
                      ))}
                    </div>

                    <div className="w-2/3 p-8 bg-white flex flex-col justify-between">
                      <div>
                        <h3 className="font-bold text-lg text-gray-900 border-b border-gray-100 pb-3 mb-5 flex items-center justify-between">
                          {/* تم إضافة الترجمة هنا */}
                          {t(activeCategory.name)}
                          <span className="text-xs text-[#FA8232] font-semibold cursor-pointer hover:underline">
                            {t("view_all", "View All")}
                          </span>
                        </h3>
                        <div className="grid grid-cols-2 gap-x-6 gap-y-4">
                          {activeCategory.subcategories.map((sub) => (
                            <Link
                              key={sub}
                              to={`/products?category=${activeCategory.name}&subcategory=${sub}`}
                              onClick={() => setCategoryOpen(false)}
                              className={`text-sm text-gray-600 hover:text-[#FA8232] transition-transform flex items-center gap-2 before:content-[''] before:w-1 before:h-1 before:bg-gray-300 before:rounded-full hover:before:bg-[#FA8232] ${isRtl ? "hover:-translate-x-1" : "hover:translate-x-1"}`}
                            >
                              {t(sub)}
                            </Link>
                          ))}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <nav className="flex gap-8 text-sm font-semibold text-gray-600">
              <Link
                to="/products"
                className="hover:text-[#FA8232] transition-colors"
              >
                {t("shop_all", "Shop All")}
              </Link>
              <Link
                to="/hot-deals"
                className="hover:text-[#FA8232] flex items-center gap-1.5 text-red-500"
              >
                <span className="w-1.5 h-1.5 bg-red-500 rounded-full animate-ping"></span>{" "}
                {t("hot_deals", "Hot Deals")}
              </Link>
              <Link
                to="/about"
                className="hover:text-[#FA8232] transition-colors"
              >
                {t("about_us", "About Us")}
              </Link>
              <Link to="/customer-support" className="hover:text-[#FA8232]">
                {t("support", "Support")}
              </Link>
            </nav>
          </div>

          <a
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-2 text-gray-900 font-bold hover:text-green-600 transition-colors"
          >
            <div className="bg-green-50 group-hover:bg-green-100 p-2 rounded-full transition-colors">
              <Phone size={16} className="text-green-600" />
            </div>
            <span className="text-sm" dir="ltr">
              +20-128-404-0815
            </span>
          </a>
        </div>
      </div>

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
              initial={{ x: isRtl ? "100%" : "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: isRtl ? "100%" : "-100%" }}
              transition={{ type: "tween", duration: 0.3 }}
              className="fixed top-0 start-0 bottom-0 w-[85%] max-w-sm bg-white z-[120] flex flex-col shadow-2xl"
            >
              {/* Mobile Header Inside Menu */}
              <div className="p-5 flex justify-between items-center border-b border-gray-100">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-[#FA8232] rounded-lg flex items-center justify-center">
                    <span className="text-white font-black text-xl italic">
                      A
                    </span>
                  </div>
                  <span className="text-[#191C1F] font-black text-xl tracking-tighter">
                    AlyShope
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={toggleLanguage}
                    className="flex items-center gap-1 text-sm font-bold text-[#FA8232] bg-orange-50 px-2 py-1 rounded-md"
                  >
                    <Globe size={16} />
                    {isRtl ? "EN" : "عربي"}
                  </button>
                  <button
                    className="bg-gray-100 p-2 rounded-full hover:bg-gray-200 transition"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <X size={20} className="text-gray-500" />
                  </button>
                </div>
              </div>

              <div className="p-5 border-b border-gray-100 bg-gray-50/50">
                <div className="relative">
                  <input
                    type="text"
                    placeholder={t("search_placeholder", "Search products...")}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                    className="w-full bg-white border border-gray-200 rounded-xl py-2.5 px-4 pe-12 text-sm focus:outline-none focus:border-[#FA8232]"
                  />
                  <button
                    onClick={handleSearch}
                    className="absolute end-0 top-0 bottom-0 px-3 text-gray-400 hover:text-[#FA8232] bg-transparent"
                  >
                    <Search size={18} />
                  </button>
                </div>
              </div>

              <div className="flex-1 overflow-y-auto p-5 space-y-4 font-bold text-gray-800">
                <Link
                  to="/"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block hover:text-[#FA8232]"
                >
                  {t("home", "Home")}
                </Link>
                <Link
                  to="/products"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block hover:text-[#FA8232]"
                >
                  {t("shop_all", "Shop All")}
                </Link>

                {/* Categories in Mobile */}
                <div className="border-t border-b border-gray-100 py-2 my-2">
                  <button
                    onClick={() => setMobileCategoryOpen(!mobileCategoryOpen)}
                    className="flex items-center justify-between w-full py-2 hover:text-[#FA8232]"
                  >
                    <span>{t("categories", "Categories")}</span>
                    <ChevronDown
                      size={16}
                      className={`transition-transform ${mobileCategoryOpen ? "rotate-180" : ""}`}
                    />
                  </button>
                  <AnimatePresence>
                    {mobileCategoryOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden"
                      >
                        <div className="ps-4 py-2 space-y-3 font-semibold text-sm text-gray-600">
                          {mockCategories.map((cat) => (
                            <Link
                              key={cat.name}
                              to={`/products?category=${cat.name}`}
                              onClick={() => setMobileMenuOpen(false)}
                              className="block hover:text-[#FA8232]"
                            >
                              {t(cat.name)}
                            </Link>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <Link
                  to="/about"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block hover:text-[#FA8232]"
                >
                  {t("about_us", "About Us")}
                </Link>

                <hr className="border-gray-100 my-4" />

                {!isAuthenticated ? (
                  <Link
                    to="/login"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block w-full bg-[#FA8232] text-white text-center py-3 rounded-xl shadow-lg shadow-orange-100"
                  >
                    {t("login_register", "Login / Register")}
                  </Link>
                ) : (
                  <div className="space-y-4 bg-gray-50 p-4 rounded-xl">
                    <p className="text-xs text-gray-400 uppercase tracking-widest border-b pb-2">
                      {t("my_account", "My Account")}
                    </p>
                    <Link
                      to="/profile"
                      onClick={() => setMobileMenuOpen(false)}
                      className="block text-sm"
                    >
                      {t("my_profile", "My Profile")}
                    </Link>
                    <Link
                      to="/orders"
                      onClick={() => setMobileMenuOpen(false)}
                      className="block text-sm"
                    >
                      {t("my_orders", "My Orders")}
                    </Link>
                    <button
                      onClick={() => {
                        logout();
                        setMobileMenuOpen(false);
                      }}
                      className="text-red-500 text-sm flex items-center gap-2 pt-2 border-t w-full"
                    >
                      <LogOut size={16} /> {t("sign_out", "Logout")}
                    </button>
                  </div>
                )}
              </div>

              <div className="p-5 bg-gray-50 border-t border-gray-200">
                <a
                  href={whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full bg-[#25D366] text-white py-3 rounded-xl font-bold hover:bg-[#1da851] transition-colors shadow-md"
                >
                  <MessageCircle size={20} />{" "}
                  {t("whatsapp_contact", "تواصل معنا واتساب")}
                </a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
