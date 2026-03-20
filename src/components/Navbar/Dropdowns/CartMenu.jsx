import React from "react";
import { Link } from "react-router-dom";
import { X } from "lucide-react";

export default function CartMenu() {
  return (
    <div className="absolute top-full right-[-60px] sm:right-0 mt-4 w-[300px] sm:w-80 bg-white text-black shadow-2xl border rounded-sm z-50 cursor-default">
      <div className="p-4 font-semibold text-lg border-b">
        Shopping Cart <span className="text-gray-500 font-normal">(02)</span>
      </div>
      <div className="p-4 flex flex-col gap-4 border-b">
        <div className="flex items-center gap-3">
          <div className="w-16 h-16 bg-gray-100 border rounded flex-shrink-0"></div>
          <div className="flex-1 text-sm">
            <p className="truncate w-40">Canon EOS DSLR Camera...</p>
            <p className="text-gray-500 mt-1">
              1 x <span className="text-blue-500 font-semibold">$1,500</span>
            </p>
          </div>
          <X
            size={18}
            className="text-gray-400 cursor-pointer hover:text-red-500"
          />
        </div>
      </div>
      <div className="p-4">
        <div className="flex justify-between items-center mb-4">
          <span className="text-gray-500">Sub-Total:</span>
          <span className="font-bold text-lg">$2038.00 USD</span>
        </div>
        <Link
          to="/checkout"
          className="w-full bg-[#FA8232] text-white py-3 rounded-sm font-semibold mb-2 flex justify-center hover:bg-orange-600 transition"
        >
          CHECKOUT NOW →
        </Link>
        <Link
          to="/cart"
          className="w-full border border-[#FA8232] text-[#FA8232] py-3 rounded-sm font-semibold flex justify-center hover:bg-orange-50 transition"
        >
          VIEW CART
        </Link>
      </div>
    </div>
  );
}
