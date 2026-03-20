import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Search,
  ChevronDown,
  X,
  Star,
  ShoppingCart,
  Heart,
  Eye,
  ArrowRight,
  ArrowLeft,
} from "lucide-react";

// --- Mock Data ---
const categories = [
  "Electronics Devices",
  "Computer & Laptop",
  "Computer Accessories",
  "SmartPhone",
  "Headphone",
  "Mobile Accessories",
  "Gaming Console",
  "Camera & Photo",
  "TV & Homes Appliances",
  "Watchs & Accessories",
  "GPS & Navigation",
  "Warable Technology",
];

const brands = [
  "Apple",
  "Google",
  "Microsoft",
  "Samsung",
  "Dell",
  "HP",
  "Symphony",
  "Xiaomi",
  "Sony",
  "Panasonic",
  "LG",
  "Intel",
];
const tags = [
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
];

const products = [
  {
    id: 1,
    name: "TOZO T6 True Wireless Earbuds Bluetooth Headphon...",
    price: 70,
    oldPrice: null,
    rating: 5,
    reviews: 738,
    badge: "HOT",
    badgeColor: "bg-red-500",
    img: "https://placehold.co/300x300/f3f4f6/6b7280?text=Earbuds",
  },
  {
    id: 2,
    name: "Samsung Electronics Samsung Galaxy S21 5G",
    price: 2300,
    oldPrice: null,
    rating: 4.5,
    reviews: 536,
    badge: null,
    img: "https://placehold.co/300x300/f3f4f6/6b7280?text=Phone",
  },
  {
    id: 3,
    name: "Amazon Basics High-Speed HDMI Cable (18 Gbps, 4K/6...",
    price: 360,
    oldPrice: null,
    rating: 4,
    reviews: 423,
    badge: "BEST DEALS",
    badgeColor: "bg-blue-500",
    img: "https://placehold.co/300x300/f3f4f6/6b7280?text=Monitor",
  },
  {
    id: 4,
    name: "Portable Wshing Machine, 11lbs capacity Model 18NMF...",
    price: 80,
    oldPrice: null,
    rating: 4,
    reviews: 816,
    badge: null,
    img: "https://placehold.co/300x300/f3f4f6/6b7280?text=Headphone",
  },
  {
    id: 5,
    name: "Wired Over-Ear Gaming Headphones with USB",
    price: 1500,
    oldPrice: null,
    rating: 5,
    reviews: 647,
    badge: null,
    img: "https://placehold.co/300x300/f3f4f6/6b7280?text=Drone",
  },
  {
    id: 6,
    name: "Polaroid 57-Inch Photo/Video Tripod with Deluxe Tripod Ca...",
    price: 1200,
    oldPrice: 1600,
    rating: 4,
    reviews: 877,
    badge: "25% OFF",
    badgeColor: "bg-yellow-400 text-gray-900",
    img: "https://placehold.co/300x300/f3f4f6/6b7280?text=Smart+TV",
  },
  {
    id: 7,
    name: "Dell Optiplex 7000x7480 All-in-One Computer Monitor",
    price: 250,
    oldPrice: null,
    rating: 5,
    reviews: 426,
    badge: null,
    img: "https://placehold.co/300x300/f3f4f6/6b7280?text=iMac",
  },
  {
    id: 8,
    name: "4K UHD LED Smart TV with Chromecast Built-in",
    price: 220,
    oldPrice: null,
    rating: 5,
    reviews: 583,
    badge: "SALE",
    badgeColor: "bg-green-500",
    img: "https://placehold.co/300x300/f3f4f6/6b7280?text=Sony+Phone",
  },
  {
    id: 9,
    name: "Amazon Basics High-Speed HDMI Cable (18 Gbps, 4K/6...",
    price: 360,
    oldPrice: null,
    rating: 4,
    reviews: 994,
    badge: "BEST DEALS",
    badgeColor: "bg-blue-500",
    img: "https://placehold.co/300x300/f3f4f6/6b7280?text=OnePlus",
  },
  {
    id: 10,
    name: "Dell Optiplex 7000x7480 All-in-One Computer Monitor",
    price: 250,
    oldPrice: null,
    rating: 4.5,
    reviews: 492,
    badge: null,
    img: "https://placehold.co/300x300/f3f4f6/6b7280?text=Macbook",
  },
  {
    id: 11,
    name: "Portable Wshing Machine, 11lbs capacity Model 18NMF...",
    price: 80,
    oldPrice: 124,
    rating: 4,
    reviews: 798,
    badge: null,
    img: "https://placehold.co/300x300/f3f4f6/6b7280?text=iPhone+11",
  },
  {
    id: 12,
    name: "TOZO T6 True Wireless Earbuds Bluetooth Headphon...",
    price: 70,
    oldPrice: null,
    rating: 5,
    reviews: 600,
    badge: "HOT",
    badgeColor: "bg-red-500",
    img: "https://placehold.co/300x300/f3f4f6/6b7280?text=Macbook+Air",
  },
];

export default function Products() {
  const [activeCategory, setActiveCategory] = useState("Electronics Devices");
  const [priceRange, setPriceRange] = useState("All Price");

  return (
    <div className="bg-white min-h-screen pb-16">
      {/* Breadcrumb */}
      <div className="bg-gray-50 py-4 px-4">
        <div className="max-w-7xl mx-auto flex items-center gap-2 text-sm text-gray-500">
          <Link
            to="/"
            className="hover:text-orange-500 flex items-center gap-1"
          >
            Home
          </Link>
          <span>›</span>
          <Link to="/shop" className="hover:text-orange-500">
            Shop
          </Link>
          <span>›</span>
          <Link to="/shop-grid" className="hover:text-orange-500">
            Shop Grid
          </Link>
          <span>›</span>
          <span className="text-orange-500 font-medium">
            Electronics Devices
          </span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 mt-8 flex flex-col lg:flex-row gap-8">
        {/* --- Sidebar (Filters) --- */}
        <aside className="w-full lg:w-[280px] flex-shrink-0 space-y-8">
          {/* CATEGORY */}
          <div>
            <h3 className="text-sm font-bold text-gray-900 uppercase mb-4 tracking-wider">
              Category
            </h3>
            <div className="space-y-3">
              {categories.map((cat) => (
                <label
                  key={cat}
                  className="flex items-center gap-3 cursor-pointer group"
                >
                  <div
                    className={`w-4 h-4 rounded-full border flex items-center justify-center transition-colors ${activeCategory === cat ? "border-orange-500" : "border-gray-300 group-hover:border-orange-500"}`}
                  >
                    {activeCategory === cat && (
                      <div className="w-2 h-2 bg-orange-500 rounded-full" />
                    )}
                  </div>
                  <span
                    className={`text-sm ${activeCategory === cat ? "text-gray-900 font-medium" : "text-gray-600 group-hover:text-gray-900"}`}
                  >
                    {cat}
                  </span>
                </label>
              ))}
            </div>
          </div>

          <hr className="border-gray-100" />

          {/* PRICE RANGE */}
          <div>
            <h3 className="text-sm font-bold text-gray-900 uppercase mb-4 tracking-wider">
              Price Range
            </h3>
            {/* Visual Slider Mockup */}
            <div className="px-2 mb-6">
              <div className="h-1 bg-gray-200 rounded-full relative">
                <div className="absolute left-[20%] right-[40%] h-full bg-orange-500"></div>
                <div className="absolute left-[20%] top-1/2 -translate-y-1/2 w-4 h-4 bg-white border-2 border-orange-500 rounded-full cursor-pointer shadow-sm"></div>
                <div className="absolute right-[40%] top-1/2 -translate-y-1/2 w-4 h-4 bg-white border-2 border-orange-500 rounded-full cursor-pointer shadow-sm"></div>
              </div>
            </div>
            {/* Min Max Inputs */}
            <div className="flex items-center gap-3 mb-6">
              <input
                type="text"
                placeholder="Min price"
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-orange-500"
              />
              <input
                type="text"
                placeholder="Max price"
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-orange-500"
              />
            </div>
            {/* Price Options */}
            <div className="space-y-3">
              {[
                "All Price",
                "Under $20",
                "$25 to $100",
                "$100 to $300",
                "$300 to $500",
                "$500 to $1,000",
                "$1,000 to $10,000",
              ].map((price) => (
                <label
                  key={price}
                  className="flex items-center gap-3 cursor-pointer group"
                >
                  <div
                    className={`w-4 h-4 rounded-full border flex items-center justify-center transition-colors ${priceRange === price ? "border-orange-500" : "border-gray-300 group-hover:border-orange-500"}`}
                  >
                    {priceRange === price && (
                      <div className="w-2 h-2 bg-orange-500 rounded-full" />
                    )}
                  </div>
                  <span
                    className={`text-sm ${priceRange === price ? "text-gray-900 font-medium" : "text-gray-600 group-hover:text-gray-900"}`}
                  >
                    {price}
                  </span>
                </label>
              ))}
            </div>
          </div>

          <hr className="border-gray-100" />

          {/* POPULAR BRANDS */}
          <div>
            <h3 className="text-sm font-bold text-gray-900 uppercase mb-4 tracking-wider">
              Popular Brands
            </h3>
            <div className="grid grid-cols-2 gap-3">
              {brands.map((brand) => (
                <label
                  key={brand}
                  className="flex items-center gap-2 cursor-pointer group"
                >
                  <input
                    type="checkbox"
                    className="w-4 h-4 text-orange-500 border-gray-300 rounded focus:ring-orange-500 cursor-pointer"
                  />
                  <span className="text-sm text-gray-600 group-hover:text-gray-900">
                    {brand}
                  </span>
                </label>
              ))}
            </div>
          </div>

          <hr className="border-gray-100" />

          {/* POPULAR TAG */}
          <div>
            <h3 className="text-sm font-bold text-gray-900 uppercase mb-4 tracking-wider">
              Popular Tag
            </h3>
            <div className="flex flex-wrap gap-2">
              {tags.map((tag) => (
                <button
                  key={tag}
                  className={`px-3 py-1.5 border rounded-lg text-sm transition-colors ${tag === "Graphics Card" ? "border-orange-500 text-orange-500 bg-orange-50" : "border-gray-200 text-gray-600 hover:border-orange-500 hover:text-orange-500"}`}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>

          {/* PROMO BANNER */}
          <div className="border-2 border-orange-100 bg-orange-50/30 rounded-xl p-6 text-center">
            <img
              src="https://placehold.co/150x150/transparent/fa8232?text=Apple+Watch"
              alt="Apple Watch"
              className="mx-auto mb-4 w-32 object-contain"
            />
            <div className="text-xl font-bold text-gray-900 leading-tight mb-2">
              Heavy on Features.
              <br />
              Light on Price.
            </div>
            <div className="text-sm text-gray-600 mb-4 flex items-center justify-center gap-1">
              Only for:{" "}
              <span className="font-bold bg-yellow-300 px-2 py-0.5 rounded text-gray-900">
                $299 USD
              </span>
            </div>
            <button className="w-full bg-orange-500 text-white font-bold py-3 rounded-lg flex items-center justify-center gap-2 hover:bg-orange-600 transition-colors mb-2">
              <ShoppingCart size={18} /> ADD TO CART
            </button>
            <button className="w-full border border-orange-200 text-orange-500 font-bold py-3 rounded-lg flex items-center justify-center gap-2 hover:bg-orange-50 transition-colors">
              VIEW DETAILS <ArrowRight size={16} />
            </button>
          </div>
        </aside>

        {/* --- Main Content --- */}
        <main className="flex-1">
          {/* Top Bar (Search & Sort) */}
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-6">
            <div className="relative w-full sm:w-[400px]">
              <input
                type="text"
                placeholder="Search for anything..."
                className="w-full border border-gray-200 rounded-lg py-2.5 px-4 pr-10 text-sm focus:outline-none focus:border-orange-500"
              />
              <Search
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                size={18}
              />
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto">
              <span className="text-sm text-gray-500">Sort by:</span>
              <div className="relative border border-gray-200 rounded-lg px-4 py-2 text-sm flex items-center justify-between w-full sm:w-48 cursor-pointer hover:border-gray-300 bg-white">
                Most Popular <ChevronDown size={16} className="text-gray-500" />
              </div>
            </div>
          </div>

          {/* Active Filters Bar */}
          <div className="bg-gray-50 rounded-lg p-3 flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
            <div className="flex items-center gap-4 text-sm w-full sm:w-auto">
              <span className="text-gray-500">Active Filters:</span>
              <div className="flex items-center gap-1 text-gray-900 font-medium">
                Electronics Devices{" "}
                <button className="text-gray-400 hover:text-red-500">
                  <X size={14} />
                </button>
              </div>
              <div className="flex items-center gap-1 text-gray-900 font-medium">
                5 Star Rating{" "}
                <button className="text-gray-400 hover:text-red-500">
                  <X size={14} />
                </button>
              </div>
            </div>
            <div className="text-sm text-gray-500 font-medium whitespace-nowrap">
              <strong className="text-gray-900">65,867</strong> Results found.
            </div>
          </div>

          {/* Product Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {products.map((product) => (
              <div
                key={product.id}
                className="group border border-gray-100 rounded-xl bg-white p-4 hover:shadow-xl hover:border-orange-200 transition-all duration-300 relative flex flex-col h-full"
              >
                {/* Badges */}
                {product.badge && (
                  <span
                    className={`absolute top-4 left-4 z-10 px-2 py-1 text-[10px] font-bold rounded ${product.badgeColor || "bg-orange-500"} text-white`}
                  >
                    {product.badge}
                  </span>
                )}

                {/* Image & Hover Actions */}
                <div className="relative w-full h-48 mb-4 rounded-lg overflow-hidden flex items-center justify-center bg-gray-50">
                  <img
                    src={product.img}
                    alt={product.name}
                    className="max-w-full max-h-full object-contain mix-blend-multiply"
                  />

                  {/* Hover Overlay Icons */}
                  <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                    <button className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-gray-700 hover:bg-orange-500 hover:text-white transition-colors shadow-lg">
                      <Heart size={18} />
                    </button>
                    <button className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-gray-700 hover:bg-orange-500 hover:text-white transition-colors shadow-lg">
                      <ShoppingCart size={18} />
                    </button>
                    <button className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-gray-700 hover:bg-orange-500 hover:text-white transition-colors shadow-lg">
                      <Eye size={18} />
                    </button>
                  </div>
                </div>

                {/* Content */}
                <div className="flex flex-col flex-1">
                  {/* Rating */}
                  <div className="flex items-center gap-1 mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={14}
                        className={
                          i < Math.floor(product.rating)
                            ? "fill-yellow-400 text-yellow-400"
                            : "fill-gray-200 text-gray-200"
                        }
                      />
                    ))}
                    <span className="text-xs text-gray-400 ml-1">
                      ({product.reviews})
                    </span>
                  </div>

                  {/* Title */}
                  <Link
                    to={`/product/${product.id}`}
                    className="text-sm text-gray-700 font-medium leading-snug hover:text-orange-500 transition-colors mb-3 line-clamp-2"
                  >
                    {product.name}
                  </Link>

                  {/* Price */}
                  <div className="mt-auto flex items-center gap-2">
                    {product.oldPrice && (
                      <span className="text-sm text-gray-400 line-through">
                        ${product.oldPrice}
                      </span>
                    )}
                    <span className="text-base font-bold text-blue-500">
                      ${product.price}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-center gap-2 mt-12">
            <button className="w-10 h-10 rounded-full border border-orange-500 text-orange-500 flex items-center justify-center hover:bg-orange-50 transition-colors">
              <ArrowLeft size={18} />
            </button>
            <button className="w-10 h-10 rounded-full bg-orange-500 text-white font-bold flex items-center justify-center shadow-md shadow-orange-200">
              01
            </button>
            <button className="w-10 h-10 rounded-full border border-gray-200 text-gray-600 font-medium flex items-center justify-center hover:border-orange-500 hover:text-orange-500 transition-colors">
              02
            </button>
            <button className="w-10 h-10 rounded-full border border-gray-200 text-gray-600 font-medium flex items-center justify-center hover:border-orange-500 hover:text-orange-500 transition-colors">
              03
            </button>
            <span className="text-gray-400 mx-1">...</span>
            <button className="w-10 h-10 rounded-full border border-gray-200 text-gray-600 font-medium flex items-center justify-center hover:border-orange-500 hover:text-orange-500 transition-colors">
              06
            </button>
            <button className="w-10 h-10 rounded-full border border-orange-500 text-orange-500 flex items-center justify-center hover:bg-orange-50 transition-colors">
              <ArrowRight size={18} />
            </button>
          </div>
        </main>
      </div>
    </div>
  );
}
