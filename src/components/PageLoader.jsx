import React from "react";

export default function PageLoader() {
  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-white/80 backdrop-blur-sm">
      <div className="flex flex-col items-center gap-4">
        {/* Spinner Loader */}
        <div className="w-12 h-12 border-4 border-gray-200 border-t-orange-500 rounded-full animate-spin"></div>

        {/* Logo or Text */}
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 bg-orange-500 rounded-sm flex items-center justify-center">
            <span className="text-white font-bold text-[10px]">A</span>
          </div>
          <p className="text-sm font-bold text-gray-700 animate-pulse">
            AlyShope is loading...
          </p>
        </div>
      </div>
    </div>
  );
}
