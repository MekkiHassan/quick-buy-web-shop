
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Banner: React.FC = () => {
  return (
    <div className="relative bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-16 md:py-24">
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-2xl">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 animate-fade-in">
            Welcome to ShopEase
          </h1>
          <p className="text-xl opacity-90 mb-6 animate-fade-in" style={{ animationDelay: "0.2s" }}>
            Discover amazing products at unbeatable prices. Shop our latest collections and find exactly what you need.
          </p>
          <div className="flex flex-wrap gap-4 animate-fade-in" style={{ animationDelay: "0.4s" }}>
            <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 hover:text-blue-700">
              <Link to="/products">Shop Now</Link>
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/20">
              <Link to="/products?featured=true">Featured Items</Link>
            </Button>
          </div>
        </div>
      </div>
      <div className="absolute inset-0 opacity-20">
        <div className="absolute right-0 bottom-0 w-96 h-96 bg-white rounded-full -mr-40 -mb-40"></div>
        <div className="absolute left-0 top-0 w-64 h-64 bg-white rounded-full -ml-20 -mt-20"></div>
      </div>
    </div>
  );
};

export default Banner;
