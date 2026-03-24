import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  Search,
  Package,
  RefreshCw,
  CreditCard,
  Settings,
  Mail,
  MessageCircle,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

export default function NeedHelp() {
  const [activeFaq, setActiveFaq] = useState(null);
  const { t } = useTranslation();

  const toggleFaq = (index) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  const helpCategories = [
    {
      id: 1,
      title: t("help.categories.tracking"),
      icon: Package,
      desc: t("help.categories.trackingDesc"),
    },
    {
      id: 2,
      title: t("help.categories.returns"),
      icon: RefreshCw,
      desc: t("help.categories.returnsDesc"),
    },
    {
      id: 3,
      title: t("help.categories.payments"),
      icon: CreditCard,
      desc: t("help.categories.paymentsDesc"),
    },
    {
      id: 4,
      title: t("help.categories.settings"),
      icon: Settings,
      desc: t("help.categories.settingsDesc"),
    },
  ];

  const faqs = [
    { question: t("help.faqs.q1"), answer: t("help.faqs.a1") },
    { question: t("help.faqs.q2"), answer: t("help.faqs.a2") },
    { question: t("help.faqs.q3"), answer: t("help.faqs.a3") },
  ];

  return (
    <div className="min-h-screen bg-[#F8F9FA] py-12 md:py-20 w-full">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h1 className="text-4xl md:text-5xl font-black text-gray-900 mb-6 tracking-tight">
            {t("help.title")}
          </h1>
          <div className="relative group">
            <div className="absolute inset-y-0 ltr:left-0 rtl:right-0 ltr:pl-4 rtl:pr-4 flex items-center pointer-events-none">
              <Search className="h-6 w-6 text-gray-400" />
            </div>
            <input
              type="text"
              className="block w-full ltr:pl-12 rtl:pr-12 ltr:pr-4 rtl:pl-4 py-4 md:py-5 border border-gray-200 rounded-2xl text-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#FA8232]/20 focus:border-[#FA8232]"
              placeholder={t("help.searchPlaceholder")}
            />
            <button className="absolute inset-y-2 ltr:right-2 rtl:left-2 bg-[#FA8232] hover:bg-[#E5762B] text-white px-6 rounded-xl font-bold transition-colors">
              {t("help.searchBtn")}
            </button>
          </div>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {helpCategories.map((category) => {
            const Icon = category.icon;
            return (
              <div
                key={category.id}
                className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm cursor-pointer group hover:shadow-md transition-shadow"
              >
                <div className="w-14 h-14 bg-[#F2F4F5] rounded-2xl flex items-center justify-center mb-6">
                  <Icon className="text-gray-700" size={28} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {category.title}
                </h3>
                <p className="text-gray-500 text-sm">{category.desc}</p>
              </div>
            );
          })}
        </div>

        {/* FAQ & Contact */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-black text-gray-900 mb-6">
              {t("help.faqTitle")}
            </h2>
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div
                  key={index}
                  className="bg-white border rounded-2xl overflow-hidden shadow-sm"
                >
                  <button
                    className="w-full px-6 py-5 text-left flex items-center justify-between"
                    onClick={() => toggleFaq(index)}
                  >
                    <span className="font-bold text-lg ltr:text-left rtl:text-right">
                      {faq.question}
                    </span>
                    {activeFaq === index ? (
                      <ChevronUp size={20} />
                    ) : (
                      <ChevronDown size={20} />
                    )}
                  </button>
                  <div
                    className={`px-6 transition-all duration-300 ease-in-out ${activeFaq === index ? "max-h-40 pb-5 opacity-100" : "max-h-0 opacity-0"}`}
                  >
                    <p className="text-gray-600 border-t pt-4">{faq.answer}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-1 space-y-6">
            <h2 className="text-2xl font-black text-gray-900 mb-6">
              {t("help.stillNeedHelp")}
            </h2>
            <a
              href="https://wa.me/201000000000"
              target="_blank"
              rel="noreferrer"
              className="bg-[#191C1F] p-6 rounded-3xl flex items-center gap-4 text-white group"
            >
              <MessageCircle size={24} className="text-[#FA8232]" />
              <div>
                <p className="text-sm text-gray-400">
                  {t("help.chatWhatsapp")}
                </p>
                <p className="font-bold text-lg tracking-wider">
                  +20 100 000 0000
                </p>
              </div>
            </a>
            <a
              href="mailto:support@store.com"
              className="bg-white border p-6 rounded-3xl flex items-center gap-4"
            >
              <Mail size={24} className="text-[#FA8232]" />
              <div>
                <p className="text-sm text-gray-500">{t("help.emailUs")}</p>
                <p className="font-bold text-gray-900 text-lg">
                  support@store.com
                </p>
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
