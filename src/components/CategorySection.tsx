
import React from "react";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { useProducts } from "@/context/ProductContext";

const CategorySection: React.FC = () => {
  const { categories } = useProducts();
  
  // Remove "All" from categories for this section
  const displayCategories = categories.filter(cat => cat !== "All");
  
  const categoryImages: Record<string, string> = {
    "Clothing": "https://images.unsplash.com/photo-1523381210434-271e8be1f52b",
    "Electronics": "https://images.unsplash.com/photo-1550009158-9ebf69173e03",
    "Accessories": "https://images.unsplash.com/photo-1606760227091-3dd870d97f1d",
    "Home & Kitchen": "https://images.unsplash.com/photo-1556911220-bff31c812dba"
  };

  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8 text-center">Shop by Category</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {displayCategories.map((category) => (
            <Link to={`/products?category=${category}`} key={category}>
              <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg">
                <div className="h-40 overflow-hidden">
                  <img
                    src={categoryImages[category] || "https://images.unsplash.com/photo-1472851294608-062f824d29cc"}
                    alt={category}
                    className="w-full h-full object-cover transition-transform hover:scale-105 duration-300"
                  />
                </div>
                <CardContent className="p-4 text-center">
                  <h3 className="text-xl font-semibold">{category}</h3>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategorySection;
