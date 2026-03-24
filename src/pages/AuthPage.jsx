import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";
import { Eye, EyeOff, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next"; // ضفنا سطر الترجمة هنا

export default function AuthPage() {
  const { t, i18n } = useTranslation(); // استخراج الترجمة واللغة
  const isRTL = i18n.language === "ar"; // تحديد لو اللغة عربي عشان الاتجاه

  const { login, register: registerAuth, loadingAuth } = useAuth();
  const navigate = useNavigate();

  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm({
    mode: "onChange",
  });

  const onSubmit = async (data) => {
    setErrorMsg("");

    if (isLogin) {
      const result = await login(data.email, data.password);
      if (result.success) {
        navigate("/");
      } else {
        setErrorMsg(result.message || t("Auth.loginFailed"));
      }
    } else {
      const result = await registerAuth(
        data.name,
        data.email,
        data.password,
        data.confirmPassword,
      );
      if (result.success) {
        setIsLogin(true);
        reset();
        navigate("/");
      } else {
        setErrorMsg(result.message || t("Auth.registerFailed"));
      }
    }
  };

  const handleTabSwitch = (mode) => {
    setIsLogin(mode);
    setErrorMsg("");
    reset();
  };

  const handleGoogleAuth = () => {
    window.location.href = "http://localhost:3000/api/auth/google";
  };

  return (
    // ضفنا dir عشان يقلب الصفحة يمين وشمال حسب اللغة
    <div
      className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8"
      dir={isRTL ? "rtl" : "ltr"}
    >
      <div className="max-w-md w-full bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        {/* Tabs Header */}
        <div className="flex border-b border-gray-200 bg-gray-50/50">
          <button
            onClick={() => handleTabSwitch(true)}
            className={`flex-1 py-4 text-center font-semibold text-lg transition-colors focus:outline-none ${
              isLogin
                ? "border-b-2 border-[#FA8232] text-gray-900 bg-white"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            {t("Auth.signIn")}
          </button>
          <button
            onClick={() => handleTabSwitch(false)}
            className={`flex-1 py-4 text-center font-semibold text-lg transition-colors focus:outline-none ${
              !isLogin
                ? "border-b-2 border-[#FA8232] text-gray-900 bg-white"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            {t("Auth.signUp")}
          </button>
        </div>

        <div className="p-8">
          {errorMsg && (
            <div className="bg-red-50 text-red-600 p-3 rounded-md mb-6 text-sm text-center border border-red-200">
              {errorMsg}
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            {/* Name Field - Only for Sign Up */}
            {!isLogin && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {t("Auth.name")}
                </label>
                <input
                  type="text"
                  {...register("name", { required: t("Auth.nameRequired") })}
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#FA8232]/50 focus:border-[#FA8232] transition-colors ${
                    errors.name ? "border-red-500 bg-red-50" : "border-gray-300"
                  }`}
                  placeholder={t("Auth.namePlaceholder")}
                />
                {errors.name && (
                  <span className="text-red-500 text-xs mt-1 block">
                    {errors.name.message}
                  </span>
                )}
              </div>
            )}

            {/* Email Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {t("Auth.email")}
              </label>
              <input
                type="email"
                {...register("email", {
                  required: t("Auth.emailRequired"),
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: t("Auth.emailInvalid"),
                  },
                })}
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#FA8232]/50 focus:border-[#FA8232] transition-colors ${
                  errors.email ? "border-red-500 bg-red-50" : "border-gray-300"
                }`}
                placeholder="example@email.com"
              />
              {errors.email && (
                <span className="text-red-500 text-xs mt-1 block">
                  {errors.email.message}
                </span>
              )}
            </div>

            {/* Password Field */}
            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="block text-sm font-medium text-gray-700">
                  {t("Auth.password")}
                </label>
                {isLogin && (
                  <a
                    href="#"
                    className="text-sm text-[#2DB2FF] hover:underline"
                  >
                    {t("Auth.forgetPassword")}
                  </a>
                )}
              </div>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  {...register("password", {
                    required: t("Auth.passwordRequired"),
                    minLength: {
                      value: 8,
                      message: t("Auth.passwordMin"),
                    },
                  })}
                  placeholder={
                    !isLogin ? t("Auth.passwordPlaceholderSignup") : "••••••••"
                  }
                  className={`w-full px-3 py-2 pe-10 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#FA8232]/50 focus:border-[#FA8232] transition-colors ${
                    errors.password
                      ? "border-red-500 bg-red-50"
                      : "border-gray-300"
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute end-3 top-2.5 text-gray-400 hover:text-gray-600 focus:outline-none"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              {errors.password && (
                <span className="text-red-500 text-xs mt-1 block">
                  {errors.password.message}
                </span>
              )}
            </div>

            {/* Confirm Password Field - Only for Sign Up */}
            {!isLogin && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {t("Auth.confirmPassword")}
                </label>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    {...register("confirmPassword", {
                      required: t("Auth.confirmPasswordRequired"),
                      validate: (value) =>
                        value === watch("password") ||
                        t("Auth.passwordsNotMatch"),
                    })}
                    placeholder="••••••••"
                    className={`w-full px-3 py-2 pe-10 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#FA8232]/50 focus:border-[#FA8232] transition-colors ${
                      errors.confirmPassword
                        ? "border-red-500 bg-red-50"
                        : "border-gray-300"
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute end-3 top-2.5 text-gray-400 hover:text-gray-600 focus:outline-none"
                  >
                    {showConfirmPassword ? (
                      <EyeOff size={20} />
                    ) : (
                      <Eye size={20} />
                    )}
                  </button>
                </div>
                {errors.confirmPassword && (
                  <span className="text-red-500 text-xs mt-1 block">
                    {errors.confirmPassword.message}
                  </span>
                )}
              </div>
            )}

            {/* Terms Checkbox - Only for Sign Up */}
            {!isLogin && (
              <div>
                <div className="flex items-start mt-2">
                  <div className="flex items-center h-5">
                    <input
                      type="checkbox"
                      id="terms"
                      {...register("agreeTerms", {
                        required: t("Auth.termsRequired"),
                      })}
                      className="h-4 w-4 text-[#FA8232] focus:ring-[#FA8232] border-gray-300 rounded"
                    />
                  </div>
                  <label
                    htmlFor="terms"
                    className="ms-2 text-sm text-gray-600 leading-snug"
                  >
                    {t("Auth.agreeTo")}{" "}
                    <a href="#" className="text-[#2DB2FF] hover:underline">
                      {t("Auth.terms")}
                    </a>{" "}
                    {t("Auth.and")}{" "}
                    <a href="#" className="text-[#2DB2FF] hover:underline">
                      {t("Auth.privacy")}
                    </a>
                  </label>
                </div>
                {errors.agreeTerms && (
                  <span className="text-red-500 text-xs mt-1 block">
                    {errors.agreeTerms.message}
                  </span>
                )}
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loadingAuth}
              className="w-full bg-[#FA8232] hover:bg-[#E5762B] text-white font-bold py-3 px-4 rounded-md transition-colors flex items-center justify-center gap-2 mt-6 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {loadingAuth ? (
                <span className="animate-pulse">{t("Auth.processing")}</span>
              ) : (
                <>
                  {isLogin ? t("Auth.signInBtn") : t("Auth.signUpBtn")}
                  <ArrowRight size={20} className={isRTL ? "rotate-180" : ""} />
                </>
              )}
            </button>
          </form>

          {/* Social Logins */}
          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-3 bg-white text-gray-500 font-medium">
                {t("Auth.or")}
              </span>
            </div>
          </div>

          <div className="space-y-3">
            <button
              type="button"
              onClick={handleGoogleAuth}
              className="w-full flex items-center justify-center gap-3 py-2.5 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 hover:border-gray-400 transition-all font-medium"
            >
              <img
                src="https://www.svgrepo.com/show/475656/google-color.svg"
                alt="Google"
                className="w-5 h-5"
              />
              {isLogin ? t("Auth.googleLogin") : t("Auth.googleSignup")}
            </button>
            <button
              type="button"
              className="w-full flex items-center justify-center gap-3 py-2.5 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 hover:border-gray-400 transition-all font-medium"
            >
              <img
                src="https://www.svgrepo.com/show/511330/apple-173.svg"
                alt="Apple"
                className="w-5 h-5"
              />
              {isLogin ? t("Auth.appleLogin") : t("Auth.appleSignup")}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
