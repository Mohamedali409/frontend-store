import React from "react";
import { Link } from "react-router-dom";
import { ChevronDown } from "lucide-react";

export default function CategoryMenu({ closeMenu }) {
  return (
    <div className="absolute top-full left-0 w-64 bg-white border-x border-b shadow-lg z-50 rounded-b flex flex-col py-2 cursor-default">
      <Link
        to="/category/computer"
        onClick={closeMenu}
        className="px-6 py-2.5 text-gray-600 hover:bg-gray-100 hover:text-black"
      >
        Computer & Laptop
      </Link>
      <Link
        to="/category/accessories"
        onClick={closeMenu}
        className="px-6 py-2.5 text-gray-600 hover:bg-gray-100 hover:text-black"
      >
        Computer Accessories
      </Link>
      <Link
        to="/category/smartphone"
        onClick={closeMenu}
        className="px-6 py-2.5 bg-gray-100 font-semibold flex justify-between items-center text-black"
      >
        SmartPhone <ChevronDown size={14} className="-rotate-90" />
      </Link>
      <Link
        to="/category/headphones"
        onClick={closeMenu}
        className="px-6 py-2.5 text-gray-600 hover:bg-gray-100 hover:text-black"
      >
        Headphone
      </Link>
      <Link
        to="/category/camera"
        onClick={closeMenu}
        className="px-6 py-2.5 text-gray-600 hover:bg-gray-100 hover:text-black"
      >
        Camera & Photo
      </Link>
    </div>
  );
}
