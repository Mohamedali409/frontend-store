import React, { useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { useTranslation } from "react-i18next"; // استيراد الترجمة
import {
  Headphones,
  Mail,
  Send,
  MessageSquare,
  HelpCircle,
  Loader2,
} from "lucide-react";

export default function Support() {
  const { t } = useTranslation(); // تهيئة الترجمة
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.5 } },
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await axios.post(
        "http://localhost:3000/api/support",
        formData,
      );

      if (response.data.success) {
        alert(t("Support.successMsg"));
        setFormData({ name: "", email: "", subject: "", message: "" });
      }
    } catch (error) {
      console.error("Error submitting support ticket:", error);
      alert(error.response?.data?.message || t("Support.errorMsg"));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="min-h-screen bg-[#F8F9FD] pt-10 pb-20"
    >
      <div className="container mx-auto px-4 max-w-7xl">
        <motion.div variants={itemVariants} className="text-center mb-16">
          <div className="w-20 h-20 bg-orange-100 text-orange-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <Headphones size={40} strokeWidth={1.5} />
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-gray-900 mb-4 italic">
            {t("Support.title")}
          </h1>
          <p className="text-gray-500 text-lg">{t("Support.subtitle")}</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          <motion.div
            variants={itemVariants}
            className="lg:col-span-1 space-y-6"
          >
            <div className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-sm">
              <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                <MessageSquare className="text-orange-500" />{" "}
                {t("Support.getInTouch")}
              </h3>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-orange-50 text-orange-500 rounded-xl flex items-center justify-center shrink-0">
                    <Mail size={20} />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-gray-400 uppercase">
                      {t("Support.emailUs")}
                    </p>
                    <p className="text-sm font-semibold text-gray-900 mt-1">
                      support@alyshope.com
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-[#1A1A1A] p-8 rounded-[2rem] text-white shadow-xl">
              <h3 className="text-xl font-bold mb-6 flex items-center gap-2 text-orange-400">
                <HelpCircle /> {t("Support.quickFaq")}
              </h3>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-sm mb-1">
                    {t("Support.faq1_q")}
                  </h4>
                  <p className="text-xs text-gray-400 leading-relaxed">
                    {t("Support.faq1_a")}
                  </p>
                </div>
                <div className="h-px w-full bg-white/10" />
                <div>
                  <h4 className="font-semibold text-sm mb-1">
                    {t("Support.faq2_q")}
                  </h4>
                  <p className="text-xs text-gray-400 leading-relaxed">
                    {t("Support.faq2_a")}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="lg:col-span-2 bg-white p-10 rounded-[3rem] border border-gray-100 shadow-xl shadow-gray-100/50"
          >
            <h2 className="text-2xl font-black text-gray-900 mb-2 italic">
              {t("Support.sendMessage")}
            </h2>
            <p className="text-gray-500 text-sm mb-8">
              {t("Support.formSubtitle")}
            </p>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-500 uppercase">
                    {t("Support.yourName")}
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500 transition-all text-sm font-medium"
                    placeholder={t("Support.namePlaceholder")}
                    disabled={isSubmitting}
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-500 uppercase">
                    {t("Support.emailAddress")}
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500 transition-all text-sm font-medium"
                    placeholder={t("Support.emailPlaceholder")}
                    disabled={isSubmitting}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-500 uppercase">
                  {t("Support.subject")}
                </label>
                <input
                  type="text"
                  required
                  value={formData.subject}
                  onChange={(e) =>
                    setFormData({ ...formData, subject: e.target.value })
                  }
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500 transition-all text-sm font-medium"
                  placeholder={t("Support.subjectPlaceholder")}
                  disabled={isSubmitting}
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-500 uppercase">
                  {t("Support.yourMessage")}
                </label>
                <textarea
                  required
                  rows="6"
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500 transition-all text-sm font-medium resize-none"
                  placeholder={t("Support.messagePlaceholder")}
                  disabled={isSubmitting}
                ></textarea>
              </div>

              <motion.button
                whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                type="submit"
                disabled={isSubmitting}
                className={`w-full text-white py-4 rounded-xl font-black text-sm flex items-center justify-center gap-2 transition-colors shadow-lg ${
                  isSubmitting
                    ? "bg-gray-400 cursor-not-allowed shadow-none"
                    : "bg-[#FA8232] hover:bg-[#E57328] shadow-orange-500/30"
                }`}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 size={18} className="animate-spin" />{" "}
                    {t("Support.sending")}
                  </>
                ) : (
                  <>
                    <Send size={18} /> {t("Support.submitBtn")}
                  </>
                )}
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
