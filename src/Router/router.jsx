import { createBrowserRouter } from "react-router-dom";
import Layout from "../components/layout/Layout";
import Home from "../pages/Home";
import Products from "../pages/Products";
import Profile from "../pages/Profile";
import AuthPage from "../pages/AuthPage";
import NotFound from "../pages/NotFound";
import { ProtectedRoute, AuthRoute } from "../components/AuthRoutes";
import Cart from "../pages/Cart";
import ProductDetails from "../pages/ProductDetails";

// تأكد إن الاسم هنا "router" سمول
export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },

      // مسارات المنتجات
      { path: "products", element: <Products /> },
      { path: "product/:id", element: <ProductDetails /> },

      // مسار تسجيل الدخول (محمي: متاح فقط لغير المسجلين)
      {
        path: "login",
        element: (
          <AuthRoute>
            <AuthPage />
          </AuthRoute>
        ),
      },

      // مسار البروفايل (محمي: متاح فقط للمسجلين)
      {
        path: "profile", // شلنا الـ :userId
        element: (
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        ),
      },

      // مسار سلة المشتريات (محمي: متاح فقط للمسجلين)
      {
        path: "cart", // شلنا الـ :userId
        element: (
          <ProtectedRoute>
            <Cart />
          </ProtectedRoute>
        ),
      },

      // صفحة 404 لأي مسار غير موجود
      { path: "*", element: <NotFound /> },
    ],
  },
]);
