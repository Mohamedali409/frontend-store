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
import About from "../pages/About";
import Support from "../pages/Support";
import AuthSuccess from "../pages/AuthSuccess";
import NeedHelp from "../pages/NeedHelp";

// تأكد إن الاسم هنا "router" سمول
export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },

      { path: "products", element: <Products /> },
      { path: "product/:id", element: <ProductDetails /> },

      { path: "about", element: <About /> },
      { path: "customer-support", element: <Support /> },
      { path: "help", element: <NeedHelp /> },

      {
        path: "login",
        element: (
          <AuthRoute>
            <AuthPage />
          </AuthRoute>
        ),
      },

      {
        path: "auth/callback",
        element: <AuthSuccess />, // شيلنا الـ AuthRoute والكومنت
      },

      {
        path: "profile",
        element: (
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        ),
      },

      {
        path: "cart",
        element: (
          <ProtectedRoute>
            <Cart />
          </ProtectedRoute>
        ),
      },

      { path: "*", element: <NotFound /> },
    ],
  },
]);
