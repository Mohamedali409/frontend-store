import axios from "axios";

// 1. إنشاء نسخة من axios مع الرابط الأساسي للـ Backend بتاعك
const api = axios.create({
  baseURL: "http://localhost:3000/api",
  // تقدر تضيف هنا headers ثابتة لو حابب
  headers: {
    "Content-Type": "application/json",
  },
});

// 2. عمل Interceptor للـ Requests (عشان نحقن الـ Token لو موجود)
api.interceptors.request.use(
  (config) => {
    // هنجيب التوكن من الـ localStorage (المكان اللي هنحفظه فيه بعد الـ Login)
    const token = localStorage.getItem("token");

    // لو التوكن موجود، ضيفه في الـ Header بتاع الطلب
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// 3. تصدير الـ api عشان نستخدمه في أي مكان في المشروع
export default api;
