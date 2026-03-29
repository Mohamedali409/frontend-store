import React from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import {
  Target,
  ShieldCheck,
  Zap,
  Users,
  Award,
  TrendingUp,
} from "lucide-react";

export default function About() {
  const { t } = useTranslation();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.5 } },
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className=" min-h-screen bg-[#F8F9FD] pt-10 pb-20"
    >
      <div className="container mx-auto px-4 max-w-7xl">
        <motion.div
          variants={itemVariants}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="text-orange-500 font-bold tracking-widest uppercase text-sm mb-2 block">
            {t("About.our_story")}
          </span>
          <h1 className="text-4xl md:text-5xl font-black text-gray-900 mb-6 italic">
            {t("About.hero_title")}
          </h1>
          <p className="text-gray-500 text-lg leading-relaxed">
            {t("About.hero_desc")}
          </p>
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20"
        >
          {[
            { label: t("About.active_users"), value: "50K+", icon: Users },
            { label: t("About.products_stat"), value: "10K+", icon: Target },
            { label: t("About.awards_won"), value: "15", icon: Award },
            { label: t("About.growth"), value: "200%", icon: TrendingUp },
          ].map((stat, i) => (
            <div
              key={i}
              className="bg-white p-8 rounded-[2rem] text-center border border-gray-100 shadow-sm hover:-translate-y-2 transition-transform duration-300"
            >
              <div className="w-16 h-16 mx-auto bg-orange-50 text-orange-500 rounded-full flex items-center justify-center mb-4">
                <stat.icon size={32} strokeWidth={1.5} />
              </div>
              <h3 className="text-3xl font-black text-gray-900 mb-1">
                {stat.value}
              </h3>
              <p className="text-sm font-bold text-gray-400 uppercase tracking-widest">
                {stat.label}
              </p>
            </div>
          ))}
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="bg-white rounded-[3rem] p-10 md:p-16 border border-gray-100 shadow-xl shadow-gray-100"
        >
          <h2 className="text-3xl font-black text-center mb-12 italic">
            {t("About.why_choose_us")}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {[
              {
                title: t("About.secure_payments"),
                desc: t("About.secure_desc"),
                icon: ShieldCheck,
                color: "text-green-500",
                bg: "bg-green-50",
              },
              {
                title: t("About.fast_delivery"),
                desc: t("About.fast_desc"),
                icon: Zap,
                color: "text-orange-500",
                bg: "bg-orange-50",
              },
              {
                title: t("About.quality_guaranteed"),
                desc: t("About.quality_desc"),
                icon: Award,
                color: "text-blue-500",
                bg: "bg-blue-50",
              },
            ].map((feature, i) => (
              <div key={i} className="text-center">
                <div
                  className={`w-20 h-20 mx-auto ${feature.bg} ${feature.color} rounded-2xl flex items-center justify-center mb-6 transform rotate-3 hover:rotate-0 transition-transform`}
                >
                  <feature.icon size={40} strokeWidth={1.5} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-500 leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
