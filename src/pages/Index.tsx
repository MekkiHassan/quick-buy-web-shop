
import React from "react";
import Layout from "../components/Layout";
import Banner from "../components/Banner";
import FeaturedProducts from "../components/FeaturedProducts";
import CategorySection from "../components/CategorySection";

const Index: React.FC = () => {
  return (
    <Layout>
      <Banner />
      <FeaturedProducts />
      <CategorySection />
    </Layout>
  );
};

export default Index;
