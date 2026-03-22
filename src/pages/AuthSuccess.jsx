import React, { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext"; // تأكد إن مسار الاستدعاء صح بناءً على هيكلة ملفاتك

export default function AuthSuccess() {
  const location = useLocation();
  const navigate = useNavigate();
  const { handleGoogleCallback } = useAuth();

  useEffect(() => {
    // جلب التوكن من الـ URL
    const params = new URLSearchParams(location.search);
    const token = params.get("token");

    if (token) {
      // لو لقينا توكن، نحفظه ونحدث الـ Context
      handleGoogleCallback(token);
      navigate("/"); // تحويل للرئيسية
    } else {
      // لو مفيش توكن، نرجعه لصفحة الدخول
      navigate("/login");
    }
  }, [location, navigate, handleGoogleCallback]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-[#FA8232] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-gray-600 font-semibold">Authenticating...</p>
      </div>
    </div>
  );
}
