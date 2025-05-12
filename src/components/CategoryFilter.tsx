
import React from "react";
import { Button } from "@/components/ui/button";
import { useProducts } from "@/context/ProductContext";

interface CategoryFilterProps {
  activeCategory: string;
  onCategoryChange: (category: string) => void;
}

const CategoryFilter: React.FC<CategoryFilterProps> = ({
  activeCategory,
  onCategoryChange,
}) => {
  const { categories } = useProducts();
  
  return (
    <div className="mb-6">
      <h2 className="text-xl font-semibold mb-3">Categories</h2>
      <div className="flex flex-wrap gap-2">
        {categories.map((category) => (
          <Button
            key={category}
            variant={activeCategory === category ? "default" : "outline"}
            onClick={() => onCategoryChange(category)}
            className={
              activeCategory === category
                ? "bg-shop-blue hover:bg-blue-700"
                : ""
            }
          >
            {category}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default CategoryFilter;
