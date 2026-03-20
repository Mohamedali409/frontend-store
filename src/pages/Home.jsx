import React from "react";
import HeroSection from "../components/HeroSection";
import FeaturesBar from "../components/FeaturesBar";
import BestDeals from "../components/BestDeals";
import ShopByCategory from "../components/ShopByCategory";
import PromoBanners from "../components/PromoBanners";
import ComputerAccessories from "../components/ComputerAccessories";
import MacbookPromo from "../components/MacbookPromo";
import LatestNews from "../components/LatestNews";
import Newsletter from "../components/Newsletter";

const Home = () => {
  return (
    <div>
      <HeroSection />
      <FeaturesBar />
      <BestDeals />
      <ShopByCategory />
      <PromoBanners />
      <ComputerAccessories />
      <MacbookPromo />
      <LatestNews />
      <Newsletter />
    </div>
  );
};

export default Home;
