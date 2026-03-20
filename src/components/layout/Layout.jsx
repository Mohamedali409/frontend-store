import React, { useEffect } from "react";
import Footer from "./Footer";
import { Outlet, useNavigation } from "react-router-dom"; // أضفنا useNavigation
import Banners from "../Headers/Banners";
import Header from "../Headers/NavbarTest";
import ScrollToTop from "../ScrollToTop";
import nprogress from "nprogress";
import "nprogress/nprogress.css"; // لازم تعمل import للـ CSS ده
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// مكون الـ Loading اللي هيظهر في نص الشاشة
const PageLoader = () => (
  <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-white/60 backdrop-blur-sm">
    <div className="relative w-16 h-16">
      {/* Spinner خارجي */}
      <div className="absolute inset-0 border-4 border-gray-100 border-t-orange-500 rounded-full animate-spin"></div>
      {/* Logo صغير في النص */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-6 h-6 bg-orange-500 rounded-sm rotate-45"></div>
      </div>
    </div>
    <p className="mt-4 text-sm font-bold text-gray-700 animate-pulse tracking-widest uppercase">
      Loading...
    </p>
  </div>
);

function Layout() {
  const navigation = useNavigation();

  // هل الصفحة حالياً بتتحمل؟
  const isLoading = navigation.state === "loading";

  useEffect(() => {
    if (isLoading) {
      nprogress.start();
    } else {
      nprogress.done();
    }
  }, [isLoading]);

  return (
    <div className="flex flex-col min-h-screen relative">
      <ScrollToTop />

      {/* لو الصفحة بتحمل اظهر الـ Loader */}
      {isLoading && <PageLoader />}

      <Banners />
      <Header />

      <main className="flex-grow container mx-auto px-4">
        {/* Outlet بيعرض محتوى الصفحة الحالية */}
        <Outlet />
      </main>

      <Footer />
      <ToastContainer position="top-right" autoClose={3000} theme="colored" />
    </div>
  );
}

export default Layout;
