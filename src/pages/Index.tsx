
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
import Banner from "../components/Banner";
import FeaturedProducts from "../components/FeaturedProducts";
import CategorySection from "../components/CategorySection";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";

const Index: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchTerm)}`);
    }
  };

  return (
    <Layout>
      <Banner />
      
      <div className="container mx-auto px-4 py-6">
        <div className="max-w-xl mx-auto mb-12">
          <form onSubmit={handleSearch} className="flex gap-2">
            <Input
              type="text"
              placeholder="Search for products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-1"
            />
            <Button type="submit" className="bg-shop-blue hover:bg-blue-700">
              <Search className="h-4 w-4 mr-2" /> Search
            </Button>
          </form>
        </div>
      </div>

      <FeaturedProducts />
      <CategorySection />
    </Layout>
  );
};

export default Index;
