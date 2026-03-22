import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Eye, EyeOff, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function AuthPage() {
  const { login, register, loadingAuth } = useAuth();
  const navigate = useNavigate();

  const [isLogin, setIsLogin] = useState(true);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [agreeTerms, setAgreeTerms] = useState(false);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");

    if (isLogin) {
      const result = await login(email, password);
      if (result.success) {
        navigate("/");
      } else {
        setErrorMsg(result.message);
      }
    } else {
      if (password !== confirmPassword) {
        return setErrorMsg("كلمات المرور غير متطابقة!");
      }
      if (!agreeTerms) {
        return setErrorMsg("يجب الموافقة على الشروط والأحكام");
      }

      const result = await register(name, email, password, confirmPassword);
      if (result.success) {
        setIsLogin(true);
        navigate("/");
      } else {
        setErrorMsg(result.message);
      }
    }
  };

  // دالة توجيه المستخدم لصفحة جوجل في الباك إند
  const handleGoogleAuth = () => {
    // غير 5000 لو الباك إند بتاعك شغال على بورت مختلف
    window.location.href = "http://localhost:3000/api/auth/google";
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full bg-white rounded-md shadow-sm border border-gray-200">
        <div className="flex border-b border-gray-200">
          <button
            onClick={() => {
              setIsLogin(true);
              setErrorMsg("");
            }}
            className={`flex-1 py-4 text-center font-semibold text-lg transition-colors ${
              isLogin
                ? "border-b-2 border-[#FA8232] text-gray-900"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            Sign In
          </button>
          <button
            onClick={() => {
              setIsLogin(false);
              setErrorMsg("");
            }}
            className={`flex-1 py-4 text-center font-semibold text-lg transition-colors ${
              !isLogin
                ? "border-b-2 border-[#FA8232] text-gray-900"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            Sign Up
          </button>
        </div>

        <div className="p-8">
          {errorMsg && (
            <div className="bg-red-50 text-red-600 p-3 rounded mb-4 text-sm text-center border border-red-200">
              {errorMsg}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <div>
                <label className="block text-sm text-gray-700 mb-1">Name</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-sm focus:outline-none focus:ring-1 focus:ring-[#FA8232] focus:border-[#FA8232]"
                />
              </div>
            )}

            <div>
              <label className="block text-sm text-gray-700 mb-1">
                Email Address
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-sm focus:outline-none focus:ring-1 focus:ring-[#FA8232] focus:border-[#FA8232]"
              />
            </div>

            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="block text-sm text-gray-700">Password</label>
                {isLogin && (
                  <a
                    href="#"
                    className="text-sm text-[#2DB2FF] hover:underline"
                  >
                    Forget Password
                  </a>
                )}
              </div>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder={!isLogin ? "8+ characters" : ""}
                  className="w-full px-3 py-2 border border-gray-300 rounded-sm focus:outline-none focus:ring-1 focus:ring-[#FA8232] focus:border-[#FA8232]"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            {!isLogin && (
              <div>
                <label className="block text-sm text-gray-700 mb-1">
                  Confirm Password
                </label>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-sm focus:outline-none focus:ring-1 focus:ring-[#FA8232] focus:border-[#FA8232]"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600"
                  >
                    {showConfirmPassword ? (
                      <EyeOff size={20} />
                    ) : (
                      <Eye size={20} />
                    )}
                  </button>
                </div>
              </div>
            )}

            {!isLogin && (
              <div className="flex items-start mt-2">
                <input
                  type="checkbox"
                  id="terms"
                  checked={agreeTerms}
                  onChange={(e) => setAgreeTerms(e.target.checked)}
                  className="mt-1 h-4 w-4 text-[#FA8232] focus:ring-[#FA8232] border-gray-300 rounded"
                />
                <label htmlFor="terms" className="ml-2 text-sm text-gray-600">
                  Are you agree to Clicon{" "}
                  <a href="#" className="text-[#2DB2FF]">
                    Terms of Condition
                  </a>{" "}
                  and{" "}
                  <a href="#" className="text-[#2DB2FF]">
                    Privacy Policy.
                  </a>
                </label>
              </div>
            )}

            <button
              type="submit"
              disabled={loadingAuth}
              className="w-full bg-[#FA8232] hover:bg-[#E5762B] text-white font-bold py-3 px-4 rounded-sm transition-colors flex items-center justify-center gap-2 mt-6"
            >
              {loadingAuth ? (
                "Processing..."
              ) : (
                <>
                  {isLogin ? "SIGN IN" : "SIGN UP"}
                  <ArrowRight size={20} />
                </>
              )}
            </button>
          </form>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">or</span>
            </div>
          </div>

          <div className="space-y-3">
            {/* زرار جوجل بعد التعديل */}
            <button
              type="button"
              onClick={handleGoogleAuth}
              className="w-full flex items-center justify-center gap-2 py-2.5 border border-gray-300 rounded-sm text-gray-700 hover:bg-gray-50 transition-colors"
            >
              <img
                src="https://www.svgrepo.com/show/475656/google-color.svg"
                alt="Google"
                className="w-5 h-5"
              />
              {isLogin ? "Login with Google" : "Sign up with Google"}
            </button>
            <button
              type="button"
              className="w-full flex items-center justify-center gap-2 py-2.5 border border-gray-300 rounded-sm text-gray-700 hover:bg-gray-50 transition-colors"
            >
              <img
                src="https://www.svgrepo.com/show/511330/apple-173.svg"
                alt="Apple"
                className="w-5 h-5"
              />
              {isLogin ? "Login with Apple" : "Sign up with Apple"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
