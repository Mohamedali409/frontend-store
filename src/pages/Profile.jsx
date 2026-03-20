import React from "react";
import { motion } from "framer-motion";
import { useAuth } from "../context/AuthContext"; // تأكد من مسار الـ Context
import {
  User,
  Mail,
  MapPin,
  Phone,
  CalendarDays,
  Edit2,
  LogOut,
  Package,
  Heart,
  Bell,
} from "lucide-react";

// مكون فرعي لبطاقات الإحصائيات السريعة
const StatCard = ({ icon: Icon, label, value, color }) => (
  <motion.div
    whileHover={{ y: -5, boxShadow: "0 25px 50px -12px rgba(0,0,0,0.05)" }}
    className="bg-white p-6 rounded-3xl border border-gray-100 flex items-center gap-5 shadow-sm transition-all"
  >
    <div
      className={`w-14 h-14 rounded-2xl flex items-center justify-center ${color} bg-opacity-10 text-xl`}
    >
      <Icon
        className={`${color.replace("bg-", "text-")}`}
        size={28}
        strokeWidth={1.5}
      />
    </div>
    <div>
      <p className="text-sm font-medium text-gray-400">{label}</p>
      <p className="text-2xl font-black text-gray-900 mt-1">{value}</p>
    </div>
  </motion.div>
);

// مكون فرعي لصفوف البيانات الشخصية
const InfoRow = ({ icon: Icon, label, value }) => (
  <div className="flex items-center gap-4 py-4 border-b border-gray-50 last:border-b-0">
    <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center text-gray-400 border border-gray-100">
      <Icon size={20} strokeWidth={1.5} />
    </div>
    <div className="flex-grow">
      <p className="text-xs font-medium text-gray-400 uppercase tracking-wider">
        {label}
      </p>
      <p className="text-sm font-semibold text-gray-800 mt-0.5">
        {value || "Not provided"}
      </p>
    </div>
    <motion.button
      whileHover={{ scale: 1.1 }}
      className="text-gray-300 hover:text-orange-500 transition-colors"
    >
      <Edit2 size={16} />
    </motion.button>
  </div>
);

export default function Profile() {
  const { user, logout } = useAuth(); // جلب بيانات اليوزر ودالة تسجيل الخروج

  // أنيميشن ظهور العناصر ورا بعض (Stagger)
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1, // التأخير بين كل عنصر والتاني
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
    },
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="min-h-screen bg-[#FBFBFE] pt-10 pb-20"
    >
      <div className="container mx-auto px-4 max-w-7xl">
        {/* هيدر الصفحة بتصميم عصري (البلور والخلفية الداكنة) */}
        <motion.div
          variants={itemVariants}
          className="relative rounded-[3rem] overflow-hidden mb-10 shadow-lg shadow-gray-100"
        >
          {/* الخلفية المتدرجة (Cover Image) */}
          <div className="absolute inset-0 bg-gradient-to-r from-orange-600 via-orange-500 to-amber-400" />

          {/* طبقة مصنفرة (Glassmorphism) فوق التدرج */}
          <div className="relative bg-white/5 backdrop-blur-sm p-10 flex flex-col md:flex-row items-center gap-8 text-center md:text-left">
            {/* الصورة الشخصية (الـ Avatar) */}
            <div className="relative group">
              <div className="w-32 h-32 rounded-full bg-white p-1 shadow-2xl ring-4 ring-white/20 overflow-hidden">
                {user?.avatar ? (
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="w-full h-full object-cover rounded-full"
                  />
                ) : (
                  <div className="w-full h-full rounded-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center text-gray-400">
                    <User size={60} strokeWidth={1} />
                  </div>
                )}
              </div>
              <motion.button
                whileHover={{ scale: 1.1 }}
                className="absolute bottom-1 right-1 bg-white p-2 rounded-full text-orange-500 shadow-md border border-gray-100 opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <Edit2 size={16} />
              </motion.button>
            </div>

            {/* اسم اليوزر وتاريخ الانضمام */}
            <div className="flex-grow">
              <h1 className="text-4xl font-black text-white tracking-tighter">
                {user?.name || "Guest User"}
              </h1>
              <p className="text-orange-50 mt-2 flex items-center gap-2 justify-center md:justify-start">
                <CalendarDays size={16} />
                Joined{" "}
                {user?.createdAt
                  ? new Date(user.createdAt).toLocaleDateString("en-US", {
                      month: "long",
                      year: "numeric",
                    })
                  : "Recently"}
              </p>
            </div>

            {/* أزرار الأكشن السريعة */}
            <div className="flex items-center gap-3">
              <motion.button
                whileHover={{ y: -3 }}
                className="bg-white/10 hover:bg-white/20 text-white px-6 py-3 rounded-full font-bold text-sm flex items-center gap-2.5 transition-colors"
              >
                <Edit2 size={16} />
                Edit Profile
              </motion.button>
              <motion.button
                whileHover={{ y: -3 }}
                onClick={logout}
                className="bg-white hover:bg-red-50 text-red-600 px-6 py-3 rounded-full font-bold text-sm flex items-center gap-2.5 transition-colors shadow-sm"
              >
                <LogOut size={16} />
                Logout
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* شبكة الإحصائيات السريعة (Stats Grid) */}
        <motion.div
          variants={itemVariants}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10"
        >
          <StatCard
            icon={Package}
            label="Total Orders"
            value={user?.totalOrders || "0"}
            color="bg-orange-500"
          />
          <StatCard
            icon={Heart}
            label="Wishlist Items"
            value={user?.wishlistCount || "0"}
            color="bg-red-500"
          />
          <StatCard
            icon={Bell}
            label="Notifications"
            value={user?.notificationsCount || "0"}
            color="bg-blue-500"
          />
          <StatCard
            icon={MapPin}
            label="Saved Addresses"
            value={user?.addressesCount || "0"}
            color="bg-amber-500"
          />
        </motion.div>

        {/* الجزء السفلي: البيانات التفصيلية والقائمة الجانبية */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* بطاقة البيانات الشخصية (الرئيسية) */}
          <motion.div
            variants={itemVariants}
            className="lg:col-span-2 bg-white p-10 rounded-[2.5rem] border border-gray-100 shadow-sm shadow-gray-50"
          >
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-black text-gray-900 tracking-tight flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-orange-100 text-orange-500 flex items-center justify-center">
                  <User size={18} />
                </div>
                Personal Information
              </h2>
              <p className="text-sm text-gray-400">Manage your details</p>
            </div>

            {/* صفوف البيانات */}
            <InfoRow icon={User} label="Full Name" value={user?.name} />
            <InfoRow icon={Mail} label="Email Address" value={user?.email} />
            <InfoRow icon={Phone} label="Phone Number" value={user?.phone} />
            <InfoRow
              icon={MapPin}
              label="Default Address"
              value={user?.defaultAddress}
            />
          </motion.div>

          {/* قائمة جانبية سريعة (Navigation) */}
          <motion.div
            variants={itemVariants}
            className="bg-white p-10 rounded-[2.5rem] border border-gray-100 shadow-sm shadow-gray-50"
          >
            <h3 className="text-xl font-black text-gray-900 mb-8 tracking-tight">
              Quick Actions
            </h3>
            <div className="flex flex-col gap-2">
              {[
                { label: "My Orders", icon: Package },
                { label: "Payment Methods", icon: Heart },
                { label: "Security Settings", icon: User },
                { label: "Notifications", icon: Bell },
              ].map((item, i) => (
                <motion.button
                  key={i}
                  whileHover={{ x: 5, bg: "#FFF7ED" }}
                  className="w-full p-4 rounded-xl flex items-center gap-4 text-left group transition-colors"
                >
                  <div className="w-10 h-10 rounded-xl bg-gray-50 group-hover:bg-white text-gray-400 group-hover:text-orange-500 flex items-center justify-center border border-gray-100 group-hover:border-orange-100 transition-colors">
                    <item.icon size={18} />
                  </div>
                  <span className="text-sm font-semibold text-gray-700 group-hover:text-orange-600 transition-colors">
                    {item.label}
                  </span>
                  <div className="flex-grow text-right text-gray-300 group-hover:text-orange-300 transition-colors">
                    →
                  </div>
                </motion.button>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
