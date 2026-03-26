import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingCart, Heart, Eye, Star, ArrowRight, X } from "lucide-react";

const CountdownTimer = ({ targetDateString }) => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const targetDate = new Date(targetDateString).getTime();

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate - now;

      if (distance <= 0) {
        clearInterval(interval);
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      } else {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor(
            (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
          ),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000),
        });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [targetDateString]);

  const formatTime = (time) => String(time).padStart(2, "0");

  return (
    <div className="bg-[#F3DE6D] text-gray-900 font-medium px-3 py-1.5 text-sm min-w-[160px] text-center rounded-sm">
      {timeLeft.days}d : {formatTime(timeLeft.hours)}h :{" "}
      {formatTime(timeLeft.minutes)}m : {formatTime(timeLeft.seconds)}s
    </div>
  );
};

const featuredProduct = {
  id: "f1",
  name: "Xbox Series S - 512GB SSD Console with Wireless Controller - EU Versio...",
  description:
    "Games built using the Xbox Series X|S development kit showcase unparalleled load times, visuals.",
  price: 442.12,
  oldPrice: 865.99,
  rating: 5,
  reviews: "52,677",
  discount: "32% OFF",
  hot: true,
  image:
    "https://images.unsplash.com/photo-1606813907291-d86efa9b94db?auto=format&fit=crop&q=80&w=600",
};

const smallProducts = [
  {
    id: "1",
    name: "Bose Sport Earbuds - Wireless Earphones",
    price: 2300,
    soldOut: true,
    image:
      "https://images.unsplash.com/photo-1590658268037-6f116412ae8a?auto=format&fit=crop&q=80&w=400",
  },
  {
    id: "2",
    name: "Simple Mobile 4G LTE Prepaid Smartphone",
    price: 220,
    image:
      "https://images.unsplash.com/photo-1598327105666-5b89351cb31b?auto=format&fit=crop&q=80&w=400",
  },
  {
    id: "3",
    name: "4K UHD LED Smart TV with Chromecast",
    price: 150,
    oldPrice: 865,
    discount: "19% OFF",
    image:
      "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?auto=format&fit=crop&q=80&w=400",
  },
  {
    id: "4",
    name: "Sony High Zoom Point & Shoot Camera",
    price: 1200,
    image:
      "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&q=80&w=400",
  },
  {
    id: "5",
    name: "Dell Optiplex 7000x7480 All-in-One Computer",
    price: 299,
    image:
      "https://images.unsplash.com/photo-1593640408182-31c70c8268f5?auto=format&fit=crop&q=80&w=400",
  },
  {
    id: "6",
    name: "Portable Washing Machine, 11lbs capacity",
    price: 70,
    oldPrice: 865.99,
    image:
      "https://images.unsplash.com/photo-1626806787461-102c1bfaaea1?auto=format&fit=crop&q=80&w=400",
  },
  {
    id: "7",
    name: "2-Barrel Carburetor Carb 2100 Engine",
    price: 160,
    hot: true,
    image:
      "https://images.unsplash.com/photo-1587202372616-b43abea06c2a?auto=format&fit=crop&q=80&w=400",
  },
  {
    id: "8",
    name: "JBL FLIP 4 - Waterproof Portable Speaker",
    price: 250,
    oldPrice: 360,
    discount: "32% OFF",
    image:
      "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?auto=format&fit=crop&q=80&w=400",
  },
];

export default function BestDeals() {
  const [quickViewProduct, setQuickViewProduct] = useState(null);

  const openQuickView = (e, product) => {
    e.preventDefault();
    e.stopPropagation();
    setQuickViewProduct(product);
  };

  const closeQuickView = () => setQuickViewProduct(null);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") closeQuickView();
    };

    if (quickViewProduct) {
      window.addEventListener("keydown", handleKeyDown);
    }

    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [quickViewProduct]);

  return (
    <section className="max-w-7xl mx-auto px-4 py-8 md:py-12 bg-white">
      {/* Header & Timer Section */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
        <div className="flex flex-wrap items-center gap-4">
          <h2 className="text-xl md:text-2xl font-bold text-gray-900">
            Best Deals
          </h2>
          <div className="flex items-center gap-2 text-sm">
            <span className="text-gray-600">Deals ends in</span>
            {/* تم تحديد تاريخ نهاية الخصم هنا */}
            <CountdownTimer targetDateString="2026-04-10T23:59:59" />
          </div>
        </div>
        <Link
          to="/products"
          className="text-[#2DB2FF] font-medium text-sm flex items-center gap-1.5 hover:gap-2 transition-all focus:outline-none focus:ring-2 focus:ring-[#2DB2FF] rounded-sm"
        >
          Browse All Product <ArrowRight size={16} />
        </Link>
      </div>

      {/* Grid Layout Container */}
      <div className="border border-gray-200 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 bg-white rounded-sm overflow-hidden">
        <div className="col-span-2 md:col-span-4 lg:col-span-1 lg:row-span-2 border-b lg:border-b-0 lg:border-r border-gray-200 p-5 flex flex-col relative group bg-white">
          {/* Badges */}
          <div className="absolute top-5 left-5 z-10 flex flex-col gap-1.5 items-start">
            {featuredProduct.discount && (
              <span className="bg-[#F3DE6D] text-gray-900 text-[11px] font-bold px-2 py-1 rounded-sm">
                {featuredProduct.discount}
              </span>
            )}
            {featuredProduct.hot && (
              <span className="bg-[#EF5151] text-white text-[11px] font-bold px-2 py-1 rounded-sm">
                HOT
              </span>
            )}
          </div>

          <Link
            to={`/product/${featuredProduct.id}`}
            className="block relative overflow-hidden mb-5 mt-4 focus:outline-none focus:ring-2 focus:ring-[#2DB2FF]"
          >
            <img
              src={featuredProduct.image}
              alt={featuredProduct.name}
              className="w-full h-56 sm:h-72 lg:h-[18rem] object-contain mx-auto mix-blend-multiply group-hover:scale-105 transition-transform duration-500"
              loading="lazy"
            />
          </Link>

          <div className="flex flex-col flex-grow">
            <div className="flex items-center gap-1 mb-2">
              <div className="flex gap-0.5 text-[#F3DE6D]">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={16} fill="currentColor" stroke="none" />
                ))}
              </div>
              <span className="text-sm text-gray-400 ml-1">
                ({featuredProduct.reviews})
              </span>
            </div>

            <Link
              to={`/product/${featuredProduct.id}`}
              className="hover:text-orange-500 transition-colors focus:outline-none"
            >
              <h3 className="text-gray-800 text-[15px] md:text-base font-medium mb-3 line-clamp-2 leading-snug">
                {featuredProduct.name}
              </h3>
            </Link>

            <div className="flex items-center gap-2 mb-3">
              {featuredProduct.oldPrice && (
                <span className="text-gray-400 line-through text-base">
                  ${featuredProduct.oldPrice}
                </span>
              )}
              <span className="text-[#2DB2FF] font-semibold text-xl">
                ${featuredProduct.price}
              </span>
            </div>

            <p className="text-[13px] text-gray-500 mb-6 line-clamp-3 leading-relaxed">
              {featuredProduct.description}
            </p>

            <div className="flex items-center gap-2 mt-auto w-full">
              <button
                aria-label="Add to Favorites"
                className="w-10 h-10 bg-[#FFE5D3] text-gray-800 hover:bg-orange-200 rounded-sm flex items-center justify-center transition-colors flex-shrink-0 focus:outline-none focus:ring-2 focus:ring-orange-500"
              >
                <Heart size={18} strokeWidth={1.5} />
              </button>

              <button className="flex-grow h-10 bg-[#FA8232] hover:bg-[#E57328] text-white font-bold rounded-sm flex items-center justify-center gap-1.5 transition-colors text-[13px] focus:outline-none focus:ring-2 focus:ring-orange-500">
                <ShoppingCart size={16} strokeWidth={2} />
                <span>ADD TO CART</span>
              </button>

              <button
                aria-label="Quick View"
                onClick={(e) => openQuickView(e, featuredProduct)}
                className="w-10 h-10 bg-[#FFE5D3] text-gray-800 hover:bg-orange-200 rounded-sm flex items-center justify-center transition-colors flex-shrink-0 focus:outline-none focus:ring-2 focus:ring-orange-500"
              >
                <Eye size={18} strokeWidth={1.5} />
              </button>
            </div>
          </div>
        </div>

        {smallProducts.map((product, index) => (
          <div
            key={product.id}
            className={`p-4 relative group flex flex-col justify-between hover:shadow-[inset_0_0_0_1px_#FA8232] transition-shadow bg-white ${
              (index + 1) % 4 !== 0
                ? "border-r border-b border-gray-200"
                : "border-b border-gray-200"
            }`}
          >
            <div className="absolute top-3 left-3 z-10 flex flex-col gap-1 items-start">
              {product.soldOut && (
                <span className="bg-gray-400 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-sm">
                  SOLD OUT
                </span>
              )}
              {product.discount && (
                <span className="bg-[#F3DE6D] text-gray-900 text-[10px] font-bold px-1.5 py-0.5 rounded-sm">
                  {product.discount}
                </span>
              )}
              {product.hot && (
                <span className="bg-[#EF5151] text-white text-[10px] font-bold px-1.5 py-0.5 rounded-sm">
                  HOT
                </span>
              )}
            </div>

            <div className="relative mb-3 h-32 md:h-36 flex items-center justify-center overflow-hidden">
              <Link
                to={`/product/${product.id}`}
                className="block w-full h-full focus:outline-none"
              >
                <img
                  src={product.image}
                  alt={product.name}
                  loading="lazy"
                  className="w-full h-full object-contain mix-blend-multiply transition-transform duration-500 group-hover:scale-110"
                />
              </Link>

              <div className="absolute inset-0 bg-black/5 opacity-0 lg:group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 pointer-events-none hidden lg:flex">
                <div className="flex gap-2 pointer-events-auto transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                  <button
                    aria-label="Add to Favorites"
                    className="w-9 h-9 bg-[#FA8232] text-white rounded-full flex items-center justify-center shadow-md hover:bg-[#E57328] transition-colors focus:outline-none"
                  >
                    <Heart size={16} />
                  </button>
                  <button
                    aria-label="Add to Cart"
                    className="w-9 h-9 bg-white text-gray-800 rounded-full flex items-center justify-center shadow-md hover:bg-gray-50 transition-colors focus:outline-none"
                  >
                    <ShoppingCart size={16} />
                  </button>
                  <button
                    aria-label="Quick View"
                    onClick={(e) => openQuickView(e, product)}
                    className="w-9 h-9 bg-white text-gray-800 rounded-full flex items-center justify-center shadow-md hover:bg-gray-50 transition-colors focus:outline-none"
                  >
                    <Eye size={16} />
                  </button>
                </div>
              </div>
            </div>

            <div className="mt-auto">
              <Link
                to={`/product/${product.id}`}
                className="hover:text-orange-500 transition-colors focus:outline-none"
              >
                <h3 className="text-gray-800 text-[13px] md:text-sm font-medium mb-1 line-clamp-2 leading-tight min-h-[2.5rem]">
                  {product.name}
                </h3>
              </Link>

              <div className="flex items-center gap-1.5 mt-2">
                {product.oldPrice && (
                  <span className="text-gray-400 line-through text-[11px] md:text-xs">
                    ${product.oldPrice}
                  </span>
                )}
                <span className="text-[#2DB2FF] font-semibold text-sm md:text-base">
                  ${product.price}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <AnimatePresence>
        {quickViewProduct && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 sm:p-6 md:p-10">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeQuickView}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />
            <motion.div
              role="dialog"
              aria-modal="true"
              initial={{ scale: 0.95, opacity: 0, y: 10 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 10 }}
              className="relative bg-white rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] md:max-h-[85vh] overflow-y-auto flex flex-col md:flex-row z-10"
            >
              <button
                aria-label="Close modal"
                onClick={closeQuickView}
                className="absolute top-3 right-3 p-2 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors z-20 focus:outline-none focus:ring-2 focus:ring-gray-400"
              >
                <X size={20} />
              </button>

              <div className="w-full md:w-1/2 p-6 md:p-8 bg-gray-50 flex items-center justify-center min-h-[250px] md:min-h-0 border-b md:border-b-0 md:border-r border-gray-100">
                <img
                  src={quickViewProduct.image}
                  alt={quickViewProduct.name}
                  className="max-w-full max-h-[250px] md:max-h-[400px] object-contain mix-blend-multiply"
                />
              </div>

              <div className="w-full md:w-1/2 p-6 md:p-8 flex flex-col justify-center">
                <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-3">
                  {quickViewProduct.name}
                </h2>
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-2xl md:text-3xl font-bold text-[#2DB2FF]">
                    ${quickViewProduct.price}
                  </span>
                  {quickViewProduct.oldPrice && (
                    <span className="text-base md:text-lg text-gray-400 line-through">
                      ${quickViewProduct.oldPrice}
                    </span>
                  )}
                </div>
                <p className="text-sm text-gray-500 mb-6 leading-relaxed line-clamp-4">
                  {quickViewProduct.description ||
                    "Premium quality product with excellent features."}
                </p>
                <div className="flex gap-3">
                  <button className="flex-1 bg-[#FA8232] hover:bg-[#E57328] text-white font-bold py-3 rounded-sm flex items-center justify-center gap-2 transition-colors focus:outline-none focus:ring-2 focus:ring-orange-500">
                    <ShoppingCart size={18} /> ADD TO CART
                  </button>
                  <button
                    aria-label="Add to Favorites"
                    className="w-12 h-12 flex items-center justify-center bg-[#FFE5D3] text-gray-800 hover:bg-orange-200 rounded-sm transition-colors focus:outline-none focus:ring-2 focus:ring-orange-500"
                  >
                    <Heart size={20} />
                  </button>
                </div>
                <Link
                  to={`/product/${quickViewProduct.id}`}
                  className="mt-6 text-center text-sm font-semibold text-gray-500 hover:text-[#FA8232] underline transition-colors focus:outline-none"
                >
                  View Full Details
                </Link>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
