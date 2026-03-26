import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  X,
  Minus,
  Plus,
  ArrowLeft,
  ArrowRight,
  ShoppingCart,
} from "lucide-react";
import { useTranslation } from "react-i18next";
import api from "../utils/api.js";

export default function Cart() {
  const { t, i18n } = useTranslation();
  const [cartItems, setCartItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const isArabic = i18n.language === "ar";

  const getImageUrl = (imagePath) => {
    if (!imagePath)
      return "https://placehold.co/150x150/f3f4f6/6b7280?text=No+Image";
    if (imagePath.startsWith("http")) return imagePath;
    return `http://localhost:3000/${imagePath}`;
  };

  const fetchCart = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await api.get("/cart");
      if (response.data.success && response.data.cart) {
        setCartItems(response.data.cart.items || []);
      }
    } catch (err) {
      console.error("Error fetching cart:", err);
      setError(t("Cart.failed_load_cart"));
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const updateQuantity = async (productId, currentQuantity, change) => {
    const newQuantity = currentQuantity + change;
    if (newQuantity < 1) return;

    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.productId._id === productId
          ? { ...item, quantity: newQuantity }
          : item,
      ),
    );

    try {
      await api.post("/cart", {
        productId: productId,
        quantity: change,
      });
      window.dispatchEvent(new Event("cartUpdated"));
    } catch (err) {
      console.error("Error updating quantity:", err);
      fetchCart();
    }
  };

  const removeItem = async (productId) => {
    setCartItems((prevItems) =>
      prevItems.filter((item) => item.productId._id !== productId),
    );

    try {
      await api.delete(`/cart/${productId}`);
      window.dispatchEvent(new Event("cartUpdated"));
    } catch (err) {
      console.error("Error removing item:", err);
      fetchCart();
      alert(t("Cart.failed_remove"));
    }
  };

  const subTotal = cartItems.reduce(
    (acc, item) => acc + (item.productId?.price || 0) * item.quantity,
    0,
  );
  const shipping = 0;
  const tax = subTotal * 0.14;
  const total = subTotal + shipping + tax;

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-[#FA8232] font-bold text-xl flex items-center gap-3">
          <ShoppingCart className="animate-bounce" size={28} />{" "}
          {t("Cart.loading_cart")}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-500 font-bold">
        {error}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white pb-20">
      <div className="bg-[#F2F4F5] py-4">
        <div className="max-w-7xl mx-auto px-4 text-sm text-gray-500 flex items-center gap-2">
          <Link
            to="/"
            className="hover:text-[#FA8232] transition-colors flex items-center gap-2"
          >
            {t("home")}{" "}
            {isArabic ? (
              <ArrowLeft size={14} className="text-gray-400" />
            ) : (
              <ArrowRight size={14} className="text-gray-400" />
            )}
          </Link>
          <span className="text-[#FA8232] font-medium">
            {t("Cart.shopping_cart")}
          </span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 mt-10">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8">
          {t("Cart.shopping_cart")}
        </h1>

        {cartItems.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 border border-gray-200 rounded-lg bg-gray-50">
            <ShoppingCart size={80} className="text-gray-300 mb-6" />
            <h2 className="text-2xl font-bold text-gray-900 mb-3">
              {t("Cart.cart_empty")}
            </h2>
            <p className="text-gray-500 mb-8">{t("Cart.cart_browse")}</p>
            <Link
              to="/products"
              className="bg-[#FA8232] hover:bg-[#E57328] text-white px-8 py-3.5 rounded-sm font-bold text-sm uppercase transition-colors"
            >
              {t("Cart.start_shopping")}
            </Link>
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row gap-8 items-start">
            <div className="w-full lg:w-2/3 border border-gray-200 rounded-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left min-w-[600px]">
                  <thead className="bg-[#F2F4F5] text-gray-600 text-xs uppercase font-semibold">
                    <tr>
                      <th className="px-6 py-4">{t("Cart.products")}</th>
                      <th className="px-6 py-4 w-32">{t("Cart.price")}</th>
                      <th className="px-6 py-4 w-40">{t("Cart.quantity")}</th>
                      <th className="px-6 py-4 w-32">{t("Cart.sub_total")}</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {cartItems.map((item) => {
                      const product = item.productId;
                      if (!product) return null;

                      return (
                        <tr key={item._id} className="group">
                          <td className="px-6 py-5">
                            <div className="flex items-center gap-4">
                              <button
                                onClick={() => removeItem(product._id)}
                                className="text-gray-400 hover:text-red-500 transition-colors"
                              >
                                <X size={20} />
                              </button>
                              <img
                                src={getImageUrl(
                                  product.image || product.imageCover,
                                )}
                                alt={product.name}
                                className="w-16 h-16 object-cover rounded-sm border border-gray-100 mix-blend-multiply"
                              />
                              <Link
                                to={`/product/${product._id}`}
                                className="text-sm font-medium text-gray-800 line-clamp-2 max-w-[250px] hover:text-[#FA8232]"
                              >
                                {product.name}
                              </Link>
                            </div>
                          </td>
                          <td className="px-6 py-5">
                            <span className="text-sm text-gray-600">
                              ${(product.price || 0).toFixed(2)}
                            </span>
                          </td>
                          <td className="px-6 py-5">
                            <div className="flex items-center w-max border border-gray-200 rounded-sm">
                              <button
                                onClick={() =>
                                  updateQuantity(product._id, item.quantity, -1)
                                }
                                className="px-3 py-2 text-gray-500 hover:bg-gray-50 transition-colors"
                              >
                                <Minus size={16} />
                              </button>
                              <span className="w-10 text-center text-sm font-medium text-gray-800">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() =>
                                  updateQuantity(product._id, item.quantity, 1)
                                }
                                className="px-3 py-2 text-gray-500 hover:bg-gray-50 transition-colors"
                              >
                                <Plus size={16} />
                              </button>
                            </div>
                          </td>
                          <td className="px-6 py-5">
                            <span className="text-sm font-bold text-gray-900">
                              $
                              {((product.price || 0) * item.quantity).toFixed(
                                2,
                              )}
                            </span>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
              <div className="px-6 py-5 border-t border-gray-200">
                <Link
                  to="/products"
                  className="inline-flex items-center gap-2 text-sm font-bold text-[#FA8232] border-2 border-[#FFE5D3] px-6 py-2.5 rounded-sm hover:bg-[#FA8232] hover:text-white transition-colors uppercase tracking-wide"
                >
                  {isArabic ? (
                    <ArrowRight size={16} />
                  ) : (
                    <ArrowLeft size={16} />
                  )}{" "}
                  {t("Cart.return_to_shop")}
                </Link>
              </div>
            </div>

            <div className="w-full lg:w-1/3 bg-white border border-gray-200 rounded-sm p-6 lg:sticky lg:top-6">
              <h2 className="text-lg font-bold text-gray-900 mb-6">
                {t("Cart.cart_totals")}
              </h2>
              <div className="flex flex-col gap-4 text-sm text-gray-600 mb-6">
                <div className="flex justify-between items-center">
                  <span>{t("Cart.sub_total")}</span>
                  <span className="font-medium text-gray-900">
                    ${subTotal.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span>{t("Cart.shipping")}</span>
                  <span className="font-medium text-gray-900">
                    {t("Cart.free")}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span>{t("Cart.tax")}</span>
                  <span className="font-medium text-gray-900">
                    ${tax.toFixed(2)}
                  </span>
                </div>
              </div>
              <hr className="border-gray-200 mb-6" />
              <div className="flex justify-between items-center mb-8">
                <span className="text-base font-bold text-gray-900">
                  {t("Cart.total")}
                </span>
                <span className="text-xl font-bold text-[#FA8232]">
                  ${total.toFixed(2)}
                </span>
              </div>
              <Link
                to="/checkout"
                className="w-full flex items-center justify-center gap-2 bg-[#FA8232] hover:bg-[#E57328] text-white px-6 py-3.5 rounded-sm font-bold text-sm uppercase transition-colors"
              >
                {t("Cart.proceed_to_checkout")}{" "}
                {isArabic ? <ArrowLeft size={18} /> : <ArrowRight size={18} />}
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
