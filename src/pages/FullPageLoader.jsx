import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Smartphone,
  Laptop,
  Headphones,
  Watch,
  Gamepad2,
  ShoppingCart,
} from "lucide-react";

// قائمة الأيقونات التي ستتبدل (يمكنك تغييرها حسب فئات موقعك)
const iconsData = [
  { id: 1, icon: Smartphone, label: "Smartphones" },
  { id: 2, icon: Laptop, label: "Laptops" },
  { id: 3, icon: Headphones, label: "Audio" },
  { id: 4, icon: Watch, label: "Wearables" },
  { id: 5, icon: Gamepad2, label: "Gaming" },
  { id: 6, icon: ShoppingCart, label: "Ready to Shop!" },
];

export default function FullPageLoader({ onFinished }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    // تبديل الأيقونات كل نصف ثانية لحركة سريعة وممتعة
    const iconInterval = setInterval(() => {
      setIndex((prev) => (prev + 1) % iconsData.length);
    }, 600);

    // الوقت الكلي لعرض شاشة التحميل (3 ثواني)
    const totalTimer = setTimeout(onFinished, 3500);

    return () => {
      clearInterval(iconInterval);
      clearTimeout(totalTimer);
    };
  }, [onFinished]);

  const CurrentIcon = iconsData[index].icon;
  const currentLabel = iconsData[index].label;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 1 }}
        exit={{
          opacity: 0,
          scale: 1.1, // يتكبر قليلاً وهو يختفي
          filter: "blur(8px)", // يعمل بلور ناعم
          transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
        }}
        // خلفية داكنة فخمة جداً (Deep Dark)
        className="fixed inset-0 z-[9999] bg-[#0B101A] flex flex-col items-center justify-center overflow-hidden"
      >
        {/* تأثير إضاءة خلفي (Glow) برتقالي ناعم جداً */}
        <div className="absolute w-[400px] h-[400px] bg-orange-500/5 blur-[120px] rounded-full" />

        {/* الحاوية المركزية للأيقونات */}
        <div className="relative mb-14 flex flex-col items-center justify-center">
          {/* تأثير نبض ضوئي خلف الحاوية */}
          <motion.div
            animate={{
              scale: [1, 1.1, 1],
              opacity: [0.2, 0.4, 0.2],
            }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -inset-6 bg-orange-500 rounded-full blur-3xl opacity-20"
          />

          {/* الإطار المربع المصنفر (Glassmorphism) */}
          <div className="w-28 h-28 bg-[#161C29]/60 backdrop-blur-xl rounded-[2.5rem] flex items-center justify-center shadow-[0_20px_50px_rgba(0,0,0,0.4),inset_0_1px_1px_rgba(255,255,255,0.03)] border border-white/5 relative z-10 overflow-hidden">
            {/* أنيميشن تبديل الأيقونات بـ Framer Motion */}
            <AnimatePresence mode="wait">
              <motion.div
                key={index}
                initial={{ y: 20, opacity: 0, scale: 0.8 }}
                animate={{ y: 0, opacity: 1, scale: 1 }}
                exit={{ y: -20, opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.35, ease: [0.23, 1, 0.32, 1] }}
                className="text-orange-500" // لون الأيقونة
              >
                <CurrentIcon size={48} strokeWidth={1.2} />
              </motion.div>
            </AnimatePresence>

            {/* خط ضوء خفيف يمر فوق الإطار (اختياري) */}
            <motion.div
              animate={{ x: ["-100%", "100%"] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: "linear" }}
              className="absolute top-0 bottom-0 w-1/2 bg-gradient-to-r from-transparent via-white/5 to-transparent rotate-12"
            />
          </div>
        </div>

        {/* نصوص متغيرة أسفل الأيقونة */}
        <div className="text-center relative h-16">
          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-2xl font-black text-white tracking-tighter"
          >
            AlyShope
          </motion.h1>

          {/* نص الفئة المتغير بنعومة */}
          <AnimatePresence mode="wait">
            <motion.p
              key={index}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 0.4, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              transition={{ duration: 0.3 }}
              className="text-[11px] uppercase tracking-[0.6em] font-medium text-gray-400 mt-2.5"
            >
              {currentLabel}
            </motion.p>
          </AnimatePresence>
        </div>

        {/* مؤشر تحميل غير مزعج تماماً */}
        <div className="absolute bottom-16 left-1/2 -translate-x-1/2 w-40 px-6">
          <div className="h-[2px] w-full bg-white/5 rounded-full overflow-hidden relative">
            <motion.div
              animate={{
                left: ["-100%", "100%"],
              }}
              transition={{
                duration: 1.8,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute top-0 bottom-0 w-1/2 bg-gradient-to-r from-transparent via-orange-500 to-transparent shadow-[0_0_10px_rgba(250,130,50,0.5)]"
            />
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
