import React, { useState } from "react";
import { Link } from "react-router-dom";
import { X, Minus, Plus, ArrowLeft, ArrowRight } from "lucide-react";

// =========================================
// بيانات وهمية مبدئية لسلة المشتريات
// =========================================
const initialCart = [
  {
    id: 1,
    name: "Wired Over-Ear Gaming Headphones with USB",
    price: 14.0,
    quantity: 3,
    image:
      "https://images.unsplash.com/photo-1593640408182-31c70c8268f5?auto=format&fit=crop&q=80&w=150",
  },
  {
    id: 2,
    name: "4K UHD LED Smart TV with Chromecast Built-in",
    price: 250.0,
    quantity: 1,
    image:
      "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?auto=format&fit=crop&q=80&w=150",
  },
];

export default function Cart() {
  const [cartItems, setCartItems] = useState(initialCart);

  // تحديث الكمية
  const updateQuantity = (id, newQuantity) => {
    if (newQuantity < 1) return; // منع الكمية من أن تكون أقل من 1
    setCartItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, quantity: newQuantity } : item,
      ),
    );
  };

  // حذف منتج
  const removeItem = (id) => {
    setCartItems((items) => items.filter((item) => item.id !== id));
  };

  // حساب الإجماليات
  const subTotal = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0,
  );
  const shipping = 0; // شحن مجاني حسب التصميم
  const discount = 24; // خصم كمثال
  const tax = 61.99; // ضريبة كمثال
  const total = subTotal + shipping - discount + tax;

  return (
    <div className="min-h-screen bg-white pb-20">
      {/* =========================================
          Breadcrumb (شريط المسار)
         ========================================= */}
      <div className="bg-[#F2F4F5] py-4">
        <div className="max-w-7xl mx-auto px-4 text-sm text-gray-500 flex items-center gap-2">
          <Link
            to="/"
            className="hover:text-[#FA8232] transition-colors flex items-center gap-2"
          >
            Home <ArrowRight size={14} className="text-gray-400" />
          </Link>
          <span className="text-[#FA8232] font-medium">Shopping Cart</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 mt-10">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8">
          Shopping Cart
        </h1>

        <div className="flex flex-col lg:flex-row gap-8 items-start">
          {/* =========================================
              الجزء الأيسر: جدول المنتجات
             ========================================= */}
          <div className="w-full lg:w-2/3 border border-gray-200 rounded-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left min-w-[600px]">
                {/* رأس الجدول */}
                <thead className="bg-[#F2F4F5] text-gray-600 text-xs uppercase font-semibold">
                  <tr>
                    <th className="px-6 py-4">Products</th>
                    <th className="px-6 py-4 w-32">Price</th>
                    <th className="px-6 py-4 w-40">Quantity</th>
                    <th className="px-6 py-4 w-32">Sub-Total</th>
                  </tr>
                </thead>

                {/* جسم الجدول */}
                <tbody className="divide-y divide-gray-200">
                  {cartItems.map((item) => (
                    <tr key={item.id} className="group">
                      {/* معلومات المنتج */}
                      <td className="px-6 py-5">
                        <div className="flex items-center gap-4">
                          <button
                            onClick={() => removeItem(item.id)}
                            className="text-gray-400 hover:text-red-500 transition-colors"
                          >
                            <X size={20} />
                          </button>
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-16 h-16 object-cover rounded-sm border border-gray-100 mix-blend-multiply"
                          />
                          <span className="text-sm font-medium text-gray-800 line-clamp-2 max-w-[250px]">
                            {item.name}
                          </span>
                        </div>
                      </td>

                      {/* السعر */}
                      <td className="px-6 py-5">
                        <span className="text-sm text-gray-600">
                          ${item.price.toFixed(2)}
                        </span>
                      </td>

                      {/* الكمية */}
                      <td className="px-6 py-5">
                        <div className="flex items-center w-max border border-gray-200 rounded-sm">
                          <button
                            onClick={() =>
                              updateQuantity(item.id, item.quantity - 1)
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
                              updateQuantity(item.id, item.quantity + 1)
                            }
                            className="px-3 py-2 text-gray-500 hover:bg-gray-50 transition-colors"
                          >
                            <Plus size={16} />
                          </button>
                        </div>
                      </td>

                      {/* الإجمالي الفرعي للمنتج */}
                      <td className="px-6 py-5">
                        <span className="text-sm font-bold text-gray-900">
                          ${(item.price * item.quantity).toFixed(2)}
                        </span>
                      </td>
                    </tr>
                  ))}

                  {/* في حالة السلة فارغة */}
                  {cartItems.length === 0 && (
                    <tr>
                      <td
                        colSpan="4"
                        className="px-6 py-12 text-center text-gray-500"
                      >
                        Your cart is empty.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* أزرار أسفل الجدول */}
            <div className="px-6 py-5 border-t border-gray-200 flex flex-wrap items-center justify-between gap-4">
              <Link
                to="/shop"
                className="flex items-center gap-2 text-sm font-bold text-[#FA8232] border-2 border-[#FFE5D3] px-6 py-2.5 rounded-sm hover:bg-[#FA8232] hover:text-white transition-colors uppercase tracking-wide"
              >
                <ArrowLeft size={16} /> Return to Shop
              </Link>
              <button className="text-sm font-bold text-[#FA8232] border-2 border-[#FFE5D3] px-6 py-2.5 rounded-sm hover:bg-[#FA8232] hover:text-white transition-colors uppercase tracking-wide">
                Update Cart
              </button>
            </div>
          </div>

          {/* =========================================
              الجزء الأيمن: ملخص الطلب (Cart Totals)
             ========================================= */}
          <div className="w-full lg:w-1/3 bg-white border border-gray-200 rounded-sm p-6 lg:sticky lg:top-6">
            <h2 className="text-lg font-bold text-gray-900 mb-6">
              Cart Totals
            </h2>

            <div className="flex flex-col gap-4 text-sm text-gray-600 mb-6">
              <div className="flex justify-between items-center">
                <span>Sub-total</span>
                <span className="font-medium text-gray-900">
                  ${subTotal.toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span>Shipping</span>
                <span className="font-medium text-gray-900">Free</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Discount</span>
                <span className="font-medium text-gray-900">
                  ${discount.toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span>Tax</span>
                <span className="font-medium text-gray-900">
                  ${tax.toFixed(2)}
                </span>
              </div>
            </div>

            <hr className="border-gray-200 mb-6" />

            <div className="flex justify-between items-center mb-8">
              <span className="text-base font-bold text-gray-900">Total</span>
              <span className="text-xl font-bold text-[#FA8232]">
                ${total.toFixed(2)}
              </span>
            </div>

            <Link
              to="/checkout"
              className="w-full flex items-center justify-center gap-2 bg-[#FA8232] hover:bg-[#E57328] text-white px-6 py-3.5 rounded-sm font-bold text-sm uppercase transition-colors"
            >
              Proceed to Checkout <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
