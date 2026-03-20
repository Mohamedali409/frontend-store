import React from "react";
import { Link } from "react-router-dom";
import { Eye } from "lucide-react";

export default function LoginMenu() {
  return (
    <div className="absolute top-full right-0 mt-4 w-[300px] sm:w-80 bg-white text-black shadow-2xl border rounded-sm p-6 z-50 cursor-default">
      <h3 className="text-xl font-semibold text-center mb-6">
        Sign in to your account
      </h3>
      <div className="mb-4">
        <label className="block text-gray-600 text-sm mb-1">
          Email Address
        </label>
        <input
          type="email"
          className="w-full border rounded p-2 outline-none focus:border-[#FA8232]"
        />
      </div>
      <div className="mb-4">
        <div className="flex justify-between items-center mb-1 text-sm">
          <label className="text-gray-600">Password</label>
          <Link to="/forgot" className="text-blue-500 text-xs hover:underline">
            Forget Password
          </Link>
        </div>
        <div className="relative">
          <input
            type="password"
            className="w-full border rounded p-2 outline-none focus:border-[#FA8232]"
          />
          <Eye
            size={18}
            className="absolute right-3 top-3 text-gray-400 cursor-pointer hover:text-gray-600"
          />
        </div>
      </div>
      <button className="w-full bg-[#FA8232] text-white font-semibold py-3 rounded-sm mb-4 hover:bg-orange-600 transition">
        LOGIN →
      </button>
      <div className="text-center border-t pt-4">
        <p className="text-gray-500 text-sm mb-2">Don't have account?</p>
        <Link
          to="/register"
          className="w-full block border border-[#FA8232] text-[#FA8232] font-semibold py-2 rounded-sm hover:bg-orange-50 transition"
        >
          CREATE ACCOUNT
        </Link>
      </div>
    </div>
  );
}
