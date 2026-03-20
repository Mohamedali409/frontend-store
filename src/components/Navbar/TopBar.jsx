import React from "react";
import { ChevronDown } from "lucide-react";

export default function TopBar() {
  return (
    <div className="hidden md:flex bg-[#004268] text-gray-300 text-xs py-2 px-4 md:px-8 justify-between items-center border-b border-[#0B5C8F]">
      <div>Welcome to Clicon online eCommerce store.</div>
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-1 cursor-pointer hover:text-white">
          Eng <ChevronDown size={14} />
        </div>
        <div className="flex items-center gap-1 cursor-pointer hover:text-white">
          USD <ChevronDown size={14} />
        </div>
      </div>
    </div>
  );
}
