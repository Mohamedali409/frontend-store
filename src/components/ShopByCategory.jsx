import React, { useRef, useState, useEffect } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import api from "../utils/api";

import Accessories from "../assets/image/Category/Accessories.png";
import CameraPhoto from "../assets/image/Category/Camera & Photo.png";
import ComputerAndLaptop from "../assets/image/Category/Computer & Laptop.png";
import Headphones from "../assets/image/Category/Headphones.png";
import SmartPhone from "../assets/image/Category/SmartPhone.png";
import TVHomes from "../assets/image/Category/TV & Homes.png";

const fallbackCategories = [
  {
    id: 1,
    name: "Computer & Laptop",
    image: ComputerAndLaptop,
  },
  {
    id: 2,
    name: "Smartphones & Tablets",
    image: SmartPhone,
  },
  {
    id: 3,
    name: "Audio & Headphones",
    image: Headphones,
  },
  {
    id: 4,
    name: "Accessories",
    image: Accessories,
  },
  {
    id: 5,
    name: "Camera & Photo",
    image: CameraPhoto,
  },
  {
    id: 6,
    name: "TV & Homes",
    image: TVHomes,
  },
];

export default function ShopByCategory() {
  const scrollRef = useRef(null);

  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await api.get("/category");

        const fetchedData = response.data.categories || response.data;

        if (fetchedData && fetchedData.length > 0) {
          setCategories(fetchedData);
        } else {
          setCategories(fallbackCategories);
        }
      } catch (error) {
        console.error("Error fetching categories, using fallback:", error);
        setCategories(fallbackCategories);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = direction === "left" ? -300 : 300;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  return (
    <section className="max-w-7xl mx-auto px-4 py-12 md:py-16 bg-white">
      <div className="flex items-center justify-between mb-10">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
          Shop with Categories
        </h2>
      </div>

      <div className="relative group">
        {!isLoading && (
          <button
            onClick={() => scroll("left")}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-3 md:-translate-x-5 z-10 w-10 h-10 md:w-12 md:h-12 bg-[#FA8232] text-white rounded-full flex items-center justify-center shadow-lg hover:bg-[#E57328] transition-colors opacity-0 md:group-hover:opacity-100 focus:opacity-100"
          >
            <ArrowLeft size={20} strokeWidth={2.5} />
          </button>
        )}

        <div
          ref={scrollRef}
          className="flex items-center gap-4 overflow-x-auto snap-x snap-mandatory scroll-smooth pb-4 pt-2 
                     [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
        >
          {isLoading
            ? //
              Array.from({ length: 6 }).map((_, idx) => (
                <div
                  key={idx}
                  className="flex-none w-[180px] md:w-[200px] h-[200px] bg-gray-100 border border-gray-100 rounded-sm animate-pulse p-5 flex flex-col items-center justify-between"
                >
                  <div className="w-full h-32 bg-gray-200 rounded-sm mb-4"></div>
                  <div className="w-3/4 h-4 bg-gray-200 rounded-sm"></div>
                </div>
              ))
            : categories.map((category) => (
                <Link
                  key={category.id || category._id}
                  to={`/products?category=${encodeURIComponent(category.name)}`}
                  className="flex-none w-[180px] md:w-[200px] bg-white border border-gray-100 rounded-sm hover:border-[#FA8232] hover:shadow-md transition-all duration-300 snap-center p-5 flex flex-col items-center justify-between group/card cursor-pointer"
                >
                  <div className="w-full h-32 mb-4 flex items-center justify-center overflow-hidden relative">
                    <img
                      src={category.image}
                      alt={category.name}
                      className="w-full h-full object-contain mix-blend-multiply group-hover/card:scale-110 transition-transform duration-500"
                      onError={(e) => {
                        e.target.src =
                          "https://via.placeholder.com/300?text=No+Image";
                      }}
                    />
                  </div>
                  <h3 className="text-gray-800 text-sm font-medium text-center group-hover/card:text-[#FA8232] transition-colors line-clamp-2">
                    {category.name}
                  </h3>
                </Link>
              ))}
        </div>

        {!isLoading && (
          <button
            onClick={() => scroll("right")}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-3 md:translate-x-5 z-10 w-10 h-10 md:w-12 md:h-12 bg-[#FA8232] text-white rounded-full flex items-center justify-center shadow-lg hover:bg-[#E57328] transition-colors opacity-0 md:group-hover:opacity-100 focus:opacity-100"
          >
            <ArrowRight size={20} strokeWidth={2.5} />
          </button>
        )}
      </div>
    </section>
  );
}
