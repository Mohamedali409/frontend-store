import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, Home } from "lucide-react";

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center px-4 py-12 text-center">
      {/* الصورة الإيضاحية */}
      <div className="mb-8">
        <img
          src="https://cdni.iconscout.com/illustration/premium/thumb/404-error-3702359-3119148.png"
          alt="404 Error"
          className="w-full max-w-sm h-auto opacity-80"
        />
      </div>

      <h1 className="text-3xl md:text-4xl font-bold text-[#191C1F] mb-4">
        404, Page not found
      </h1>

      <p className="text-[#5F6C72] max-w-lg mb-8 leading-relaxed">
        Something went wrong. It looks like your requested page could not be
        found. It might be a broken link or the page has been removed.
      </p>

      <div className="flex flex-col sm:flex-row gap-4">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center justify-center gap-2 bg-[#FA8232] text-white px-8 py-3 rounded-md font-bold hover:bg-[#e0722a] transition-all shadow-lg active:scale-95 uppercase text-sm"
        >
          <ArrowLeft size={18} />
          Go Back
        </button>

        <Link
          to="/"
          className="flex items-center justify-center gap-2 border-2 border-[#FFE7D6] text-[#FA8232] px-8 py-3 rounded-md font-bold hover:bg-[#FFE7D6] transition-all uppercase text-sm"
        >
          <Home size={18} />
          Go to Home
        </Link>
      </div>
    </div>
  );
}
