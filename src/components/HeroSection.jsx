import React, { useState, useEffect } from "react";
import { ArrowRight } from "lucide-react";

// استيراد الصور (تأكد من المسارات)
import XboxImg from "../assets/image/Xbox.png";
import pixelImg from "../assets/image/pixelPhone.png";
import smaiaImg from "../assets/image/smaia.png";

const slidesData = [
  {
    id: 1,
    tag: "THE BEST PLACE TO PLAY",
    title: "Xbox Consoles",
    description:
      "Save up to 50% on select Xbox games. Get 3 months of PC Game Pass for $2 USD.",
    price: "$299",
    image: XboxImg,
  },
  {
    id: 2,
    tag: "NEXT GEN GAMING",
    title: "PlayStation 5",
    description:
      "Experience lightning-fast loading with an ultra-high speed SSD and immersive 3D audio.",
    price: "$499",
    image:
      "https://images.unsplash.com/photo-1606813907291-d86efa9b94db?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: 3,
    tag: "PLAY ANYWHERE",
    title: "Nintendo Switch",
    description:
      "Play at home on the TV or on-the-go with a vibrant 7-inch OLED screen.",
    price: "$349",
    image:
      "https://images.unsplash.com/photo-1617096200347-cb04ae810b1d?auto=format&fit=crop&q=80&w=800",
  },
];

export default function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) =>
        prev === slidesData.length - 1 ? 0 : prev + 1,
      );
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="max-w-7xl mx-auto px-4 py-4 md:py-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* ========================================================
            Main Banner (Carousel)
           ======================================================== */}
        <div className="lg:col-span-2 bg-[#F8F9FA] rounded-xl overflow-hidden relative min-h-[550px] sm:min-h-[500px] md:min-h-[420px]">
          {slidesData.map((slide, index) => (
            <div
              key={slide.id}
              className={`absolute inset-0 w-full h-full p-6 md:p-10 flex flex-col md:flex-row items-center justify-between transition-all duration-1000 ease-in-out ${
                currentSlide === index
                  ? "opacity-100 translate-x-0 z-10"
                  : "opacity-0 translate-x-10 z-0 pointer-events-none"
              }`}
            >
              {/* النصوص - تظهر في الأعلى في الموبايل */}
              <div className="w-full md:w-1/2 text-center md:text-left z-20 order-2 md:order-1 mt-6 md:mt-0">
                <div className="flex items-center justify-center md:justify-start gap-2 mb-3">
                  <div className="w-6 h-0.5 bg-[#2DB2FF]"></div>
                  <span className="text-[10px] md:text-xs font-bold text-[#2DB2FF] tracking-wider uppercase">
                    {slide.tag}
                  </span>
                </div>
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-gray-900 mb-3 leading-tight">
                  {slide.title}
                </h1>
                <p className="text-sm text-gray-500 mb-6 max-w-sm mx-auto md:mx-0 leading-relaxed">
                  {slide.description}
                </p>
                <button className="bg-[#FA8232] hover:bg-[#E5762B] text-white text-sm font-bold px-8 py-3.5 rounded-lg flex items-center justify-center gap-2 transition-all hover:gap-4 mx-auto md:mx-0 shadow-lg shadow-orange-200">
                  SHOP NOW <ArrowRight size={18} />
                </button>
              </div>

              {/* الصورة - تظهر في المنتصف في الموبايل وبحجم مناسب */}
              <div className="w-full md:w-1/2 flex items-center justify-center relative order-1 md:order-2">
                <div className="relative w-full max-w-[250px] md:max-w-full h-[220px] md:h-[320px]">
                  <img
                    src={slide.image}
                    alt={slide.title}
                    className="w-full h-full object-contain drop-shadow-2xl"
                  />
                  {/* دائرة السعر المصغرة */}
                  <div className="absolute -top-2 -right-2 md:top-0 md:-right-4 w-16 h-16 md:w-20 md:h-20 bg-[#2DB2FF] rounded-full flex flex-col items-center justify-center shadow-xl border-4 border-white">
                    <span className="text-white font-black text-sm md:text-lg tracking-tighter">
                      {slide.price}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {/* Slider Dots */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 md:left-10 md:translate-x-0 flex gap-2 z-30">
            {slidesData.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`transition-all duration-300 rounded-full ${
                  currentSlide === index
                    ? "w-8 h-2 bg-gray-900"
                    : "w-2 h-2 bg-gray-300 hover:bg-gray-400"
                }`}
              />
            ))}
          </div>
        </div>

        {/* ========================================================
            Right Side Promos (تحسين العرض في الموبايل)
           ======================================================== */}
        <div className="lg:col-span-1 flex flex-col sm:grid sm:grid-cols-2 lg:flex lg:flex-col gap-4">
          {/* Promo 1: Google Pixel */}
          <div className="bg-[#191C1F] rounded-xl p-6 flex items-center justify-between relative overflow-hidden group min-h-[180px]">
            <div className="z-10 w-3/5">
              <span className="text-[10px] font-bold text-[#EBC80C] tracking-widest uppercase opacity-80">
                SUMMER SALES
              </span>
              <h3 className="text-white font-bold text-xl mt-1">
                New Google <br /> Pixel 6 Pro
              </h3>
              <button className="mt-4 text-[#FA8232] text-xs font-bold flex items-center gap-2 hover:gap-3 transition-all">
                SHOP NOW <ArrowRight size={14} />
              </button>
            </div>
            <div className="w-2/5 h-32 relative">
              <img
                src={pixelImg}
                className="w-full h-full object-contain transform group-hover:scale-110 transition-transform duration-500"
                alt="Pixel"
              />
            </div>
            {/* Badge */}
            <div className="absolute top-4 right-0 bg-[#EBC80C] text-gray-900 text-[10px] font-black px-3 py-1 rounded-l-md">
              29% OFF
            </div>
          </div>

          {/* Promo 2: Xiaomi */}
          <div className="bg-[#F2F4F5] rounded-xl p-6 flex items-center justify-between group min-h-[180px]">
            <div className="w-2/5 h-28">
              <img
                src={smaiaImg}
                className="w-full h-full object-contain transform group-hover:rotate-12 transition-transform duration-500"
                alt="Earbuds"
              />
            </div>
            <div className="w-3/5 text-right md:text-left pl-4">
              <h3 className="text-gray-900 font-bold text-lg leading-tight">
                Xiaomi <br /> FlipBuds Pro
              </h3>
              <p className="text-[#2DB2FF] font-black mt-1">$299 USD</p>
              <button className="mt-3 bg-[#FA8232] text-white p-2 rounded-md inline-flex items-center justify-center hover:bg-[#E5762B] transition-colors">
                <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
