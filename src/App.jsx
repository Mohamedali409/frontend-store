import { RouterProvider } from "react-router-dom";
import { router } from "./Router/router"; // تأكد من الـ r سمول هنا وهنا
import "flowbite";
import { useTranslation } from "react-i18next";
import { useEffect } from "react";

function App() {
  const { i18n } = useTranslation();

  useEffect(() => {
    // تحديث اتجاه الصفحة ولغة الـ HTML بناءً على اللغة المختارة
    document.documentElement.dir = i18n.language === "ar" ? "rtl" : "ltr";
    document.documentElement.lang = i18n.language;
  }, [i18n.language]);
  return <RouterProvider router={router} />;
}

export default App;
