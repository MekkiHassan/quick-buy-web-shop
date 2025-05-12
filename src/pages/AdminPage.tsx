
import React, { useState } from "react";
import Layout from "../components/Layout";
import { Product } from "../data/products";
import { toast } from "sonner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ProductList from "@/components/admin/ProductList";
import ProductForm from "@/components/admin/ProductForm";
import CategoryManager from "@/components/admin/CategoryManager";
import OrdersList from "@/components/admin/OrdersList"; // New component for orders
import { useProducts } from "@/context/ProductContext";

const AdminPage: React.FC = () => {
  const { products, categories, updateProducts, updateCategories } = useProducts();
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [activeTab, setActiveTab] = useState<string>("products");

  const handleEditProduct = (product: Product) => {
    setEditingProduct(product);
    setActiveTab("add-product");
  };

  const handleDeleteProduct = (productId: string) => {
    updateProducts(products.filter(product => product.id !== productId));
    toast.success("Product deleted successfully!");
  };

  const handleSubmitProduct = (formData: Partial<Product>) => {
    if (editingProduct) {
      // Update existing product
      updateProducts(products.map(product => 
        product.id === editingProduct.id ? { ...product, ...formData } as Product : product
      ));
      toast.success("Product updated successfully!");
    } else {
      // Add new product
      const newProduct: Product = {
        id: `${Date.now()}`,
        name: formData.name || "",
        description: formData.description || "",
        price: formData.price || 0,
        category: formData.category || "Electronics",
        image: formData.image || "https://images.unsplash.com/photo-1505740420928-5e560c06d30e",
        featured: formData.featured || false,
        rating: formData.rating || 0,
        stock: formData.stock || 0
      };
      
      updateProducts([...products, newProduct]);
      toast.success("Product added successfully!");
    }
    
    // Reset form and navigate to products tab
    resetForm();
    setActiveTab("products");
  };

  const resetForm = () => {
    setEditingProduct(null);
  };

  const handleAddNewClick = () => {
    resetForm();
    setActiveTab("add-product");
  };

  const handleCancelEdit = () => {
    resetForm();
    setActiveTab("products");
  };

  const handleCategoryChange = (updatedCategories: string[]) => {
    updateCategories(updatedCategories);
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Admin Panel</h1>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-6">
            <TabsTrigger value="products">Products</TabsTrigger>
            <TabsTrigger value="add-product">Add/Edit Product</TabsTrigger>
            <TabsTrigger value="categories">Categories</TabsTrigger>
            <TabsTrigger value="orders">Orders</TabsTrigger>
          </TabsList>

          <TabsContent value="products">
            <ProductList 
              products={products}
              onAddNewClick={handleAddNewClick}
              onEditProduct={handleEditProduct}
              onDeleteProduct={handleDeleteProduct}
            />
          </TabsContent>

          <TabsContent value="add-product">
            <ProductForm 
              editingProduct={editingProduct}
              categories={categories}
              onSubmit={handleSubmitProduct}
              onCancel={handleCancelEdit}
            />
          </TabsContent>

          <TabsContent value="categories">
            <CategoryManager 
              categories={categories}
              onCategoryChange={handleCategoryChange}
            />
          </TabsContent>

          <TabsContent value="orders">
            <OrdersList />
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default AdminPage;
