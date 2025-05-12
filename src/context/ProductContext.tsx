
import React, { createContext, useContext, useState, useEffect } from "react";
import { Product, categories as initialCategories } from "../data/products";
import { toast } from "sonner";

interface ProductContextType {
  products: Product[];
  categories: string[];
  updateProducts: (newProducts: Product[]) => void;
  updateCategories: (newCategories: string[]) => void;
  addProduct: (product: Product) => void;
  editProduct: (product: Product) => void;
  deleteProduct: (productId: string) => void;
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export const useProducts = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error("useProducts must be used within a ProductProvider");
  }
  return context;
};

export const ProductProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Initialize state from localStorage if available, otherwise use default data
  const [products, setProducts] = useState<Product[]>(() => {
    const savedProducts = localStorage.getItem("ecommerceProducts");
    return savedProducts ? JSON.parse(savedProducts) : [];
  });
  
  const [categories, setCategories] = useState<string[]>(() => {
    const savedCategories = localStorage.getItem("ecommerceCategories");
    return savedCategories ? JSON.parse(savedCategories) : initialCategories;
  });

  // Load initial product data if none exist in localStorage
  useEffect(() => {
    if (products.length === 0) {
      import("../data/products").then((module) => {
        setProducts(module.products);
      });
    }
  }, [products.length]);

  // Save products to localStorage whenever they change
  useEffect(() => {
    if (products.length > 0) {
      localStorage.setItem("ecommerceProducts", JSON.stringify(products));
    }
  }, [products]);

  // Save categories to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("ecommerceCategories", JSON.stringify(categories));
  }, [categories]);

  const updateProducts = (newProducts: Product[]) => {
    setProducts(newProducts);
  };

  const updateCategories = (newCategories: string[]) => {
    setCategories(newCategories);
  };

  const addProduct = (product: Product) => {
    setProducts([...products, product]);
  };

  const editProduct = (updatedProduct: Product) => {
    setProducts(products.map(product => 
      product.id === updatedProduct.id ? updatedProduct : product
    ));
  };

  const deleteProduct = (productId: string) => {
    setProducts(products.filter(product => product.id !== productId));
  };

  return (
    <ProductContext.Provider value={{ 
      products, 
      categories, 
      updateProducts, 
      updateCategories,
      addProduct,
      editProduct,
      deleteProduct
    }}>
      {children}
    </ProductContext.Provider>
  );
};

// Utility functions moved from data/products.ts to use the context data
export const getProductById = (products: Product[], id: string): Product | undefined => {
  return products.find(product => product.id === id);
};

export const getFeaturedProducts = (products: Product[]): Product[] => {
  return products.filter(product => product.featured);
};

export const getProductsByCategory = (products: Product[], category: string): Product[] => {
  if (category === "All") return products;
  return products.filter(product => product.category === category);
};
