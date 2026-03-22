import React, { useState, useEffect } from "react";
import { ArrowRight } from "lucide-react";

// استيراد الصور اللي أنت بعتها
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
    <section className="max-w-7xl mx-auto px-4 py-4 md:py-6 overflow-hidden">
      {/* ستايل بسيط للحركة الانسيابية */}
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-15px); }
        }
        .animate-img { animation: float 4s ease-in-out infinite; }
      `}</style>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* ========================================================
            Main Banner (Carousel)
           ======================================================== */}
        <div className="lg:col-span-2 bg-[#F2F4F5] rounded-3xl overflow-hidden relative min-h-[550px] sm:min-h-[500px] md:min-h-[420px] shadow-sm">
          {slidesData.map((slide, index) => (
            <div
              key={slide.id}
              className={`absolute inset-0 w-full h-full p-6 md:p-12 flex flex-col md:flex-row items-center justify-between transition-all duration-700 ease-in-out ${
                currentSlide === index
                  ? "opacity-100 translate-x-0 z-10"
                  : "opacity-0 -translate-x-full z-0 pointer-events-none"
              }`}
            >
              {/* النصوص */}
              <div className="w-full md:w-1/2 text-center md:text-left z-20 order-2 md:order-1 mt-6 md:mt-0">
                <div className="flex items-center justify-center md:justify-start gap-3 mb-4">
                  <span className="w-10 h-1 bg-[#2DB2FF] rounded-full"></span>
                  <span className="text-[11px] md:text-xs font-black text-[#2DB2FF] tracking-[0.15em] uppercase">
                    {slide.tag}
                  </span>
                </div>
                <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-gray-900 mb-4 leading-[1.1] tracking-tight">
                  {slide.title}
                </h1>
                <p className="text-base text-gray-500 mb-8 max-w-sm mx-auto md:mx-0 leading-relaxed font-medium">
                  {slide.description}
                </p>
                <button className="group bg-[#FA8232] hover:bg-[#E5762B] text-white text-sm font-black px-10 py-4 rounded-xl flex items-center justify-center gap-3 transition-all hover:shadow-xl hover:shadow-orange-200 active:scale-95 mx-auto md:mx-0 uppercase tracking-wider">
                  Shop Now{" "}
                  <ArrowRight
                    size={20}
                    className="group-hover:translate-x-1 transition-transform"
                  />
                </button>
              </div>

              {/* الصورة مع دائرة السعر الاحترافية */}
              <div className="w-full md:w-1/2 flex items-center justify-center relative order-1 md:order-2">
                <div className="relative w-full max-w-[280px] md:max-w-full h-[250px] md:h-[320px] animate-img">
                  <img
                    src={slide.image}
                    alt={slide.title}
                    className="w-full h-full object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.1)]"
                  />
                  {/* دائرة السعر (Glassmorphism) */}
                  <div className="absolute -top-4 -right-2 md:top-0 md:-right-6 w-20 h-20 bg-[#2DB2FF] rounded-full flex flex-col items-center justify-center shadow-[0_10px_30px_rgba(45,178,255,0.4)] border-4 border-white transform rotate-12 transition-transform hover:rotate-0 cursor-default">
                    <span className="text-white font-black text-lg tracking-tighter">
                      {slide.price}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {/* Slider Dots مطورة */}
          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 md:left-12 md:translate-x-0 flex gap-3 z-30">
            {slidesData.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`transition-all duration-500 rounded-full ${
                  currentSlide === index
                    ? "w-10 h-2.5 bg-gray-900 shadow-sm"
                    : "w-2.5 h-2.5 bg-gray-300 hover:bg-gray-400"
                }`}
              />
            ))}
          </div>
        </div>

        {/* ========================================================
            Right Side Promos (باستخدام بياناتك الأصلية)
           ======================================================== */}
        <div className="lg:col-span-1 flex flex-col gap-4">
          {/* Promo 1: Google Pixel */}
          <div className="group bg-[#191C1F] rounded-3xl p-8 flex items-center justify-between relative overflow-hidden flex-1 min-h-[200px] cursor-pointer">
            <div className="z-10 relative">
              <span className="text-[10px] font-black text-[#EBC80C] tracking-[0.2em] uppercase opacity-90">
                SUMMER SALES
              </span>
              <h3 className="text-white font-bold text-2xl mt-2 tracking-tight">
                New Google <br /> Pixel 6 Pro
              </h3>
              <button className="mt-5 text-[#FA8232] text-xs font-black flex items-center gap-2 group-hover:gap-4 transition-all uppercase">
                Shop Now <ArrowRight size={16} />
              </button>
            </div>
            <div className="w-2/5 h-36 relative z-10">
              <img
                src={pixelImg}
                className="w-full h-full object-contain transform group-hover:scale-110 group-hover:-rotate-6 transition-all duration-500"
                alt="Pixel"
              />
            </div>
            {/* Badge */}
            <div className="absolute top-6 right-0 bg-[#EBC80C] text-black text-[10px] font-black px-4 py-1.5 rounded-l-full shadow-lg">
              29% OFF
            </div>
          </div>

          {/* Promo 2: Xiaomi */}
          <div className="group bg-white rounded-3xl p-8 flex items-center justify-between flex-1 min-h-[200px] border border-gray-100 hover:shadow-2xl hover:shadow-gray-100 transition-all cursor-pointer">
            <div className="w-1/3 h-32 relative">
              <img
                src={smaiaImg}
                className="w-full h-full object-contain transform group-hover:scale-110 group-hover:rotate-12 transition-all duration-500"
                alt="Earbuds"
              />
            </div>
            <div className="text-right">
              <h3 className="text-gray-900 font-bold text-xl leading-tight tracking-tight">
                Xiaomi <br /> FlipBuds Pro
              </h3>
              <p className="text-[#2DB2FF] font-black text-xl mt-2">$299 USD</p>
              <button className="mt-4 bg-[#FA8232] text-white w-12 h-12 rounded-2xl inline-flex items-center justify-center hover:bg-[#E5762B] transition-all shadow-lg hover:rotate-12">
                <ArrowRight size={22} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
