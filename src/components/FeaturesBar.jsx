import React from "react";
// استيراد الأيقونات من مكتبة lucide-react
import { Package, Trophy, CreditCard, Headphones } from "lucide-react";

const featuresData = [
  {
    id: 1,
    icon: <Package size={36} className="text-gray-800" strokeWidth={1.5} />,
    title: "FASTED DELIVERY",
    subtitle: "Delivery in 24/H",
  },
  {
    id: 2,
    icon: <Trophy size={36} className="text-gray-800" strokeWidth={1.5} />,
    title: "24 HOURS RETURN",
    subtitle: "100% money-back guarantee",
  },
  {
    id: 3,
    icon: <CreditCard size={36} className="text-gray-800" strokeWidth={1.5} />,
    title: "SECURE PAYMENT",
    subtitle: "Your money is safe",
  },
  {
    id: 4,
    icon: <Headphones size={36} className="text-gray-800" strokeWidth={1.5} />,
    title: "SUPPORT 24/7",
    subtitle: "Live contact/message",
  },
];

export default function FeaturesBar() {
  return (
    <section className="max-w-7xl mx-auto px-4 py-4">
      {/* الحاوية الرئيسية للقسم */}
      <div className="bg-white border border-gray-200 rounded-md p-6 lg:p-8 flex flex-col md:flex-row items-center justify-between gap-6 md:gap-0">
        {featuresData.map((feature, index) => (
          <React.Fragment key={feature.id}>
            {/* عنصر الميزة الواحد */}
            <div className="flex items-center gap-4 w-full md:w-auto justify-start md:justify-center px-2">
              <div className="flex-shrink-0">{feature.icon}</div>
              <div>
                <h4 className="text-gray-900 font-bold text-sm lg:text-base tracking-wide">
                  {feature.title}
                </h4>
                <p className="text-gray-500 text-sm mt-0.5">
                  {feature.subtitle}
                </p>
              </div>
            </div>

            {/* الخط الفاصل بين العناصر (بيظهر في الشاشات الكبيرة بس) */}
            {index !== featuresData.length - 1 && (
              <div className="hidden md:block w-px h-12 bg-gray-200"></div>
            )}

            {/* خط فاصل أفقي للموبايل (بيختفي في الشاشات الكبيرة) */}
            {index !== featuresData.length - 1 && (
              <div className="block md:hidden w-full h-px bg-gray-100 my-1"></div>
            )}
          </React.Fragment>
        ))}
      </div>
    </section>
  );
}
