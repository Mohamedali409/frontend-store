import React, { useRef, useState, useEffect } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import api from "../utils/api";

const fallbackCategories = [
  {
    id: 1,
    name: "Computer & Laptop",
    image:
      "https://images.unsplash.com/photo-1593640408182-31c70c8268f5?auto=format&fit=crop&q=80&w=300",
  },
  {
    id: 2,
    name: "Smartphones & Tablets",
    image:
      "https://images.unsplash.com/photo-1598327105666-5b89351cb31b?auto=format&fit=crop&q=80&w=300",
  },
  {
    id: 3,
    name: "Audio & Headphones",
    image:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=300",
  },
  {
    id: 4,
    name: "Accessories",
    image:
      "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?auto=format&fit=crop&q=80&w=300",
  },
  {
    id: 5,
    name: "Camera & Photo",
    image:
      "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&q=80&w=300",
  },
  {
    id: 6,
    name: "TV & Homes",
    image:
      "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?auto=format&fit=crop&q=80&w=300",
  },
  {
    id: 7,
    name: "Wearable Electronics",
    image:
      "https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&q=80&w=300",
  },
];

export default function ShopByCategory() {
  const scrollRef = useRef(null);

  const [categories, setCategories] = useState(fallbackCategories);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await api.get("/categories");

        if (
          response.data &&
          response.data.categories &&
          response.data.categories.length > 0
        ) {
          setCategories(response.data.categories);
        }
      } catch (error) {
        console.warn(
          "Server is unreachable or returned an error. Using fallback categories.",
          error,
        );
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
        {isLoading && (
          <span className="text-sm text-gray-400 animate-pulse">
            Loading updates...
          </span>
        )}
      </div>

      <div className="relative group">
        <button
          onClick={() => scroll("left")}
          className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-3 md:-translate-x-5 z-10 w-10 h-10 md:w-12 md:h-12 bg-[#FA8232] text-white rounded-full flex items-center justify-center shadow-lg hover:bg-[#E57328] transition-colors opacity-0 md:group-hover:opacity-100 focus:opacity-100"
          aria-label="Scroll Left"
        >
          <ArrowLeft size={20} strokeWidth={2.5} />
        </button>

        <div
          ref={scrollRef}
          className="flex items-center gap-4 overflow-x-auto snap-x snap-mandatory scroll-smooth pb-4 pt-2 
                      [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
        >
          {categories.map((category) => (
            <Link
              key={category.id || category._id}
              to={`/products?category=${encodeURIComponent(category.name)}`}
              className="flex-none w-[180px] md:w-[200px] bg-white border border-gray-100 rounded-sm hover:border-[#FA8232] hover:shadow-md transition-all duration-300 snap-center p-5 flex flex-col items-center justify-between group/card cursor-pointer"
            >
              <div className="w-full h-32 mb-4 flex items-center justify-center overflow-hidden">
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

              <h3 className="text-gray-800 text-sm font-medium text-center group-hover/card:text-[#FA8232] transition-colors">
                {category.name}
              </h3>
            </Link>
          ))}
        </div>

        <button
          onClick={() => scroll("right")}
          className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-3 md:translate-x-5 z-10 w-10 h-10 md:w-12 md:h-12 bg-[#FA8232] text-white rounded-full flex items-center justify-center shadow-lg hover:bg-[#E57328] transition-colors opacity-0 md:group-hover:opacity-100 focus:opacity-100"
          aria-label="Scroll Right"
        >
          <ArrowRight size={20} strokeWidth={2.5} />
        </button>
      </div>
    </section>
  );
}
