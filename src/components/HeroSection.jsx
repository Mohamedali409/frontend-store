import React, { useState, useEffect } from "react";
import { ArrowRight, ChevronLeft, ChevronRight, ArrowLeft } from "lucide-react";
import { useTranslation } from "react-i18next";

import XboxImg from "../assets/image/Xbox.png";
import PlayStation5 from "../assets/image/PlayStation5.png";
import NintendoSwitch from "../assets/image/NintendoSwitch.png";
import pixelImg from "../assets/image/pixelPhone.png";
import smaiaImg from "../assets/image/smaia.png";

export default function HeroSection() {
  const { t, i18n } = useTranslation();
  const isRtl = i18n.language === "ar";
  const [currentSlide, setCurrentSlide] = useState(0);

  const slidesData = [
    {
      id: 1,
      tag: t("hero.xbox.tag", "THE BEST PLACE TO PLAY"),
      title: t("hero.xbox.title", "Xbox Consoles"),
      description: t(
        "hero.xbox.desc",
        "Save up to 50% on select Xbox games. Get 3 months of PC Game Pass for $2 USD.",
      ),
      price: "$299",
      image: XboxImg,
    },
    {
      id: 2,
      tag: t("hero.ps5.tag", "NEXT GEN GAMING"),
      title: t("hero.ps5.title", "PlayStation 5"),
      description: t(
        "hero.ps5.desc",
        "Experience lightning-fast loading with an ultra-high speed SSD and immersive 3D audio.",
      ),
      price: "$499",
      image: PlayStation5,
    },
    {
      id: 3,
      tag: t("hero.nintendo.tag", "PLAY ANYWHERE"),
      title: t("hero.nintendo.title", "Nintendo Switch"),
      description: t(
        "hero.nintendo.desc",
        "Play at home on the TV or on-the-go with a vibrant 7-inch OLED screen.",
      ),
      price: "$349",
      image: NintendoSwitch,
    },
  ];

  const nextSlide = () =>
    setCurrentSlide((prev) => (prev === slidesData.length - 1 ? 0 : prev + 1));
  const prevSlide = () =>
    setCurrentSlide((prev) => (prev === 0 ? slidesData.length - 1 : prev - 1));

  useEffect(() => {
    const timer = setInterval(nextSlide, 5000);
    return () => clearInterval(timer);
  }, [currentSlide]);

  return (
    <section
      className="max-w-7xl mx-auto px-4 py-4 md:py-8 overflow-hidden"
      dir={isRtl ? "rtl" : "ltr"}
    >
      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeInScale {
          from { opacity: 0; transform: scale(0.9); }
          to { opacity: 1; transform: scale(1); }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-15px); }
        }
        
        .animate-reveal { animation: fadeInUp 0.8s ease-out forwards; opacity: 0; }
        .animate-scale { animation: fadeInScale 0.8s ease-out forwards; opacity: 0; }
        .animate-img { animation: float 4s ease-in-out infinite; }
        
        .delay-1 { animation-delay: 0.2s; }
        .delay-2 { animation-delay: 0.4s; }
        .delay-3 { animation-delay: 0.6s; }
        .delay-4 { animation-delay: 0.8s; }
      `}</style>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <div className="lg:col-span-2 bg-gradient-to-br from-[#F2F4F5] to-[#E5E7EB] rounded-[2rem] overflow-hidden relative min-h-[550px] sm:min-h-[500px] md:min-h-[450px] shadow-sm group animate-scale">
          {slidesData.map((slide, index) => (
            <div
              key={slide.id}
              className={`absolute inset-0 w-full h-full p-8 md:p-14 flex flex-col md:flex-row items-center justify-between transition-all duration-700 ease-in-out ${
                currentSlide === index
                  ? "opacity-100 translate-x-0 z-10"
                  : `opacity-0 ${isRtl ? "translate-x-full" : "-translate-x-full"} z-0 pointer-events-none`
              }`}
            >
              <div
                className={`w-full md:w-1/2 z-20 order-2 md:order-1 mt-8 md:mt-0 ${isRtl ? "text-center md:text-right" : "text-center md:text-left"}`}
              >
                <div
                  className={`flex items-center justify-center gap-3 mb-4 animate-reveal delay-1 ${isRtl ? "md:justify-start" : "md:justify-start"}`}
                >
                  <span className="w-8 h-1 bg-[#2DB2FF] rounded-full"></span>
                  <span className="text-xs font-black text-[#2DB2FF] tracking-[0.2em] uppercase">
                    {slide.tag}
                  </span>
                </div>
                <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-gray-900 mb-5 leading-[1.15] tracking-tight animate-reveal delay-2">
                  {slide.title}
                </h1>
                <p className="text-sm md:text-base text-gray-600 mb-8 max-w-sm mx-auto md:mx-0 leading-relaxed font-medium animate-reveal delay-3">
                  {slide.description}
                </p>
                <button className="animate-reveal delay-4 group/btn bg-[#FA8232] hover:bg-[#E5762B] text-white text-sm font-black px-8 py-4 rounded-xl flex items-center justify-center gap-3 transition-all hover:shadow-lg hover:shadow-orange-500/30 active:scale-95 mx-auto md:mx-0 uppercase tracking-wider">
                  {t("hero.shop_now")}
                  {isRtl ? (
                    <ArrowLeft
                      size={20}
                      className="group-hover/btn:-translate-x-1.5 transition-transform"
                    />
                  ) : (
                    <ArrowRight
                      size={20}
                      className="group-hover/btn:translate-x-1.5 transition-transform"
                    />
                  )}
                </button>
              </div>

              <div className="w-full md:w-1/2 flex items-center justify-center relative order-1 md:order-2 animate-scale delay-3">
                <div className="relative w-full max-w-[280px] md:max-w-[90%] h-[250px] md:h-[350px] animate-img">
                  <img
                    src={slide.image}
                    alt={slide.title}
                    className="w-full h-full object-contain drop-shadow-2xl"
                  />
                  <div
                    className={`absolute -top-4 w-20 h-20 bg-white/80 backdrop-blur-md rounded-full flex flex-col items-center justify-center shadow-xl border border-white transform transition-transform hover:rotate-0 cursor-default ${isRtl ? "-left-2 md:top-4 md:-left-4 -rotate-12" : "-right-2 md:top-4 md:-right-4 rotate-12"}`}
                  >
                    <span className="text-[#2DB2FF] font-black text-xl tracking-tighter">
                      {slide.price}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}

          <button
            onClick={isRtl ? nextSlide : prevSlide}
            className={`absolute ${isRtl ? "right-4" : "left-4"} top-1/2 -translate-y-1/2 z-30 w-10 h-10 bg-white/70 backdrop-blur-sm rounded-full flex items-center justify-center text-gray-800 hover:bg-white hover:text-[#FA8232] shadow-md opacity-0 group-hover:opacity-100 transition-all duration-300`}
          >
            {isRtl ? <ChevronRight size={24} /> : <ChevronLeft size={24} />}
          </button>
          <button
            onClick={isRtl ? prevSlide : nextSlide}
            className={`absolute ${isRtl ? "left-4" : "right-4"} top-1/2 -translate-y-1/2 z-30 w-10 h-10 bg-white/70 backdrop-blur-sm rounded-full flex items-center justify-center text-gray-800 hover:bg-white hover:text-[#FA8232] shadow-md opacity-0 group-hover:opacity-100 transition-all duration-300`}
          >
            {isRtl ? <ChevronLeft size={24} /> : <ChevronRight size={24} />}
          </button>
        </div>

        <div className="lg:col-span-1 flex flex-col gap-5">
          <div className="animate-reveal delay-3 group bg-gradient-to-br from-[#191C1F] to-[#2d3238] rounded-[2rem] p-8 flex items-center justify-between relative overflow-hidden flex-1 min-h-[220px] cursor-pointer shadow-sm">
            <div className="z-10 relative">
              <span className="text-[11px] font-black text-[#EBC80C] tracking-[0.2em] uppercase opacity-90">
                {t("hero.summer_sale")}
              </span>
              <h3 className="text-white font-bold text-2xl md:text-3xl mt-2 tracking-tight leading-tight">
                {t("hero.pixel.title")} <br /> {t("hero.pixel.model")}
              </h3>
              <button className="mt-5 text-[#FA8232] text-xs font-black flex items-center gap-2 group-hover:gap-3 transition-all uppercase">
                {t("hero.shop_now")}{" "}
                {isRtl ? <ArrowLeft size={16} /> : <ArrowRight size={16} />}
              </button>
            </div>
            <div className="w-5/12 h-40 relative z-10">
              <img
                src={pixelImg}
                className={`w-full h-full object-contain transform group-hover:scale-110 transition-all duration-500 ${isRtl ? "group-hover:rotate-6" : "group-hover:-rotate-6"}`}
                alt="Pixel"
              />
            </div>
            <div
              className={`absolute top-6 bg-[#EBC80C] text-black text-xs font-black px-4 py-2 shadow-lg ${isRtl ? "left-0 rounded-r-full" : "right-0 rounded-l-full"}`}
            >
              29% {t("hero.off")}
            </div>
          </div>

          <div className="animate-reveal delay-4 group bg-white rounded-[2rem] p-8 flex items-center justify-between flex-1 min-h-[220px] border border-gray-100 hover:shadow-xl transition-all cursor-pointer">
            <div className="w-5/12 h-36 relative">
              <img
                src={smaiaImg}
                className={`w-full h-full object-contain transform group-hover:scale-110 transition-all duration-500 ${isRtl ? "group-hover:-rotate-6" : "group-hover:rotate-6"}`}
                alt="Earbuds"
              />
            </div>
            <div
              className={`${isRtl ? "text-left" : "text-right"} flex flex-col ${isRtl ? "items-start" : "items-end"}`}
            >
              <h3 className="text-gray-900 font-bold text-xl md:text-2xl leading-tight tracking-tight">
                Xiaomi <br /> FlipBuds Pro
              </h3>
              <p className="text-[#2DB2FF] font-black text-xl mt-2">$299</p>
              <button className="mt-4 bg-gray-50 text-gray-900 w-12 h-12 rounded-full flex items-center justify-center group-hover:bg-[#FA8232] group-hover:text-white transition-all duration-300 shadow-sm">
                {isRtl ? (
                  <ArrowLeft size={20} className="group-hover:rotate-45" />
                ) : (
                  <ArrowRight size={20} className="group-hover:-rotate-45" />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
