import React, { useState } from "react";
import { motion } from "framer-motion";
import axios from "axios"; // تأكد من تثبيت axios: npm install axios
import {
  Headphones,
  Mail,
  MapPin,
  Send,
  MessageSquare,
  HelpCircle,
  Loader2,
} from "lucide-react";

export default function Support() {
  // 1. تحديث الـ State لتشمل الـ subject بناءً على الـ Backend Schema
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  // حالة للتحميل عشان نوقف الزرار وقت الإرسال
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
        alert("تم إرسال رسالتك بنجاح! راجع بريدك الإلكتروني لتأكيد الاستلام.");
        setFormData({ name: "", email: "", subject: "", message: "" });
      }
    } catch (error) {
      console.error("Error submitting support ticket:", error);
      alert(
        error.response?.data?.message ||
          "حدث خطأ أثناء إرسال الرسالة. يرجى المحاولة مرة أخرى.",
      );
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
            How Can We Help You?
          </h1>
          <p className="text-gray-500 text-lg">
            Our support team is available 24/7 to answer your queries.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          <motion.div
            variants={itemVariants}
            className="lg:col-span-1 space-y-6"
          >
            <div className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-sm">
              <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                <MessageSquare className="text-orange-500" /> Get in Touch
              </h3>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-orange-50 text-orange-500 rounded-xl flex items-center justify-center shrink-0">
                    <Mail size={20} />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-gray-400 uppercase">
                      Email Us
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
                <HelpCircle /> Quick FAQ
              </h3>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-sm mb-1">
                    Track my order?
                  </h4>
                  <p className="text-xs text-gray-400 leading-relaxed">
                    You can track your order from the 'My Orders' section in
                    your profile.
                  </p>
                </div>
                <div className="h-px w-full bg-white/10" />
                <div>
                  <h4 className="font-semibold text-sm mb-1">Return policy?</h4>
                  <p className="text-xs text-gray-400 leading-relaxed">
                    We accept returns within 14 days of delivery for unused
                    items.
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
              Send us a Message
            </h2>
            <p className="text-gray-500 text-sm mb-8">
              Fill out the form below and we'll reply as soon as possible.
            </p>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-500 uppercase">
                    Your Name
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500 transition-all text-sm font-medium"
                    placeholder="Mohamed Ali"
                    disabled={isSubmitting}
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-500 uppercase">
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500 transition-all text-sm font-medium"
                    placeholder="ahmed@example.com"
                    disabled={isSubmitting}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-500 uppercase">
                  Subject
                </label>
                <input
                  type="text"
                  required
                  value={formData.subject}
                  onChange={(e) =>
                    setFormData({ ...formData, subject: e.target.value })
                  }
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500 transition-all text-sm font-medium"
                  placeholder="Order Delay, Refund, Technical Issue..."
                  disabled={isSubmitting}
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-500 uppercase">
                  Your Message
                </label>
                <textarea
                  required
                  rows="6"
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500 transition-all text-sm font-medium resize-none"
                  placeholder="How can we help you today?"
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
                    <Loader2 size={18} className="animate-spin" /> Sending...
                  </>
                ) : (
                  <>
                    <Send size={18} /> Send Message
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
