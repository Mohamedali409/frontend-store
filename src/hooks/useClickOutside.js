import { useEffect } from "react";

export default function useClickOutside(ref, handler) {
  useEffect(() => {
    const listener = (event) => {
      // إذا كان الضغط داخل العنصر نفسه، لا تفعل شيئاً
      if (!ref.current || ref.current.contains(event.target)) {
        return;
      }
      // إذا كان الضغط بالخارج، قم بتشغيل دالة الإغلاق
      handler(event);
    };

    // الاستماع لضغطات الماوس أو اللمس في الموبايل
    document.addEventListener("mousedown", listener);
    document.addEventListener("touchstart", listener);

    // تنظيف الأحداث عند إغلاق المكون
    return () => {
      document.removeEventListener("mousedown", listener);
      document.removeEventListener("touchstart", listener);
    };
  }, [ref, handler]);
}
