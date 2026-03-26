import React, { useEffect } from "react";
import Footer from "./Footer";
import { Outlet, useNavigation } from "react-router-dom";
import Banners from "./Headers/Banners";
import Header from "./Headers/Navbar";
import ScrollToTop from "../ScrollToTop";
import nprogress from "nprogress";
import "nprogress/nprogress.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Layout() {
  const navigation = useNavigation();
  const isLoading = navigation.state === "loading";

  useEffect(() => {
    if (isLoading) {
      nprogress.start();
    } else {
      nprogress.done();
    }
  }, [isLoading]);

  return (
    <div className="flex flex-col min-h-screen relative bg-white w-full overflow-x-hidden">
      <ScrollToTop />

      {isLoading && <PageLoader />}

      <Banners />
      <Header />

      <main className="flex-grow flex flex-col w-full">
        <Outlet />
      </main>

      <Footer />
      <ToastContainer position="top-right" autoClose={3000} theme="colored" />
    </div>
  );
}

export default Layout;
