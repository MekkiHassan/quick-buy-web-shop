
import React from "react";
import { Link } from "react-router-dom";
import ProductCard from "./ProductCard";
import { Button } from "@/components/ui/button";
import { useProducts } from "@/context/ProductContext";
import { getFeaturedProducts } from "@/context/ProductContext";

const FeaturedProducts: React.FC = () => {
  const { products } = useProducts();
  const featuredProducts = getFeaturedProducts(products);

  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold">Featured Products</h2>
          <Button variant="outline" className="border-shop-blue text-shop-blue hover:bg-shop-blue hover:text-white">
            <Link to="/products">View All</Link>
          </Button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {featuredProducts.slice(0, 4).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
          {featuredProducts.length === 0 && (
            <div className="col-span-full text-center py-10">
              <p className="text-gray-500">No featured products available</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
