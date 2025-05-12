
import React, { useState } from "react";
import Layout from "../components/Layout";
import { products as initialProducts, Product, categories as initialCategories } from "../data/products";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { Checkbox } from "@/components/ui/checkbox";
import { Trash, Pencil, Plus, Upload, ChevronLeft, Search } from "lucide-react";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";

const AdminPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [categories, setCategories] = useState<string[]>(initialCategories);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [activeTab, setActiveTab] = useState<string>("products");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [newCategory, setNewCategory] = useState<string>("");
  const [editingCategory, setEditingCategory] = useState<{index: number, value: string} | null>(null);
  const [formData, setFormData] = useState<Partial<Product>>({
    name: "",
    description: "",
    price: 0,
    category: "Electronics",
    image: "",
    featured: false,
    rating: 0,
    stock: 0
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>("");

  // Filter products based on search term
  const filteredProducts = products.filter(product => 
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    
    setFormData({
      ...formData,
      [name]: type === "number" ? parseFloat(value) : value
    });
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleCheckboxChange = (name: string, checked: boolean) => {
    setFormData({
      ...formData,
      [name]: checked
    });
  };

  const handleEditProduct = (product: Product) => {
    setEditingProduct(product);
    setFormData({ ...product });
    setActiveTab("add-product");
    // If there's an image, set image preview
    if (product.image) {
      setImagePreview(product.image);
    }
  };

  const handleDeleteProduct = (productId: string) => {
    setProducts(products.filter(product => product.id !== productId));
    toast.success("Product deleted successfully!");
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setImagePreview(result);
        setFormData({
          ...formData,
          image: result
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.description || formData.price === undefined || !formData.category) {
      toast.error("Please fill in all required fields");
      return;
    }

    if (editingProduct) {
      // Update existing product
      setProducts(products.map(product => 
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
      
      setProducts([...products, newProduct]);
      toast.success("Product added successfully!");
    }
    
    // Reset form
    resetForm();
    
    // Navigate to products tab
    setActiveTab("products");
  };

  const resetForm = () => {
    setFormData({
      name: "",
      description: "",
      price: 0,
      category: "Electronics",
      image: "",
      featured: false,
      rating: 0,
      stock: 0
    });
    setEditingProduct(null);
    setImageFile(null);
    setImagePreview("");
  };

  const handleAddCategory = () => {
    if (!newCategory.trim()) {
      toast.error("Category name cannot be empty");
      return;
    }
    
    if (categories.includes(newCategory)) {
      toast.error("Category already exists");
      return;
    }
    
    setCategories([...categories, newCategory]);
    setNewCategory("");
    toast.success("Category added successfully!");
  };

  const handleDeleteCategory = (categoryToDelete: string) => {
    if (categoryToDelete === "All") {
      toast.error("Cannot delete the 'All' category");
      return;
    }
    
    setCategories(categories.filter(category => category !== categoryToDelete));
    toast.success("Category deleted successfully!");
  };

  const handleEditCategoryStart = (index: number, value: string) => {
    setEditingCategory({ index, value });
  };

  const handleEditCategoryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (editingCategory) {
      setEditingCategory({ ...editingCategory, value: e.target.value });
    }
  };

  const handleEditCategorySave = () => {
    if (!editingCategory) return;
    
    if (!editingCategory.value.trim()) {
      toast.error("Category name cannot be empty");
      return;
    }
    
    if (categories.includes(editingCategory.value) && categories[editingCategory.index] !== editingCategory.value) {
      toast.error("Category already exists");
      return;
    }
    
    const newCategories = [...categories];
    newCategories[editingCategory.index] = editingCategory.value;
    setCategories(newCategories);
    setEditingCategory(null);
    toast.success("Category updated successfully!");
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
            <TabsTrigger value="orders" disabled>Orders</TabsTrigger>
          </TabsList>

          <TabsContent value="products">
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-semibold">Manage Products</h2>
                  <div className="flex gap-4">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-4 w-4" />
                      <Input 
                        placeholder="Search products..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10 w-64"
                      />
                    </div>
                    <Button 
                      onClick={() => { 
                        resetForm(); 
                        setActiveTab("add-product"); 
                      }}
                      className="bg-shop-blue hover:bg-blue-700"
                    >
                      <Plus className="h-4 w-4 mr-2" /> Add New Product
                    </Button>
                  </div>
                </div>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Category</TableHead>
                        <TableHead>Price</TableHead>
                        <TableHead>Stock</TableHead>
                        <TableHead>Featured</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredProducts.map((product) => (
                        <TableRow key={product.id} className="hover:bg-gray-50">
                          <TableCell>
                            <div className="flex items-center">
                              <div className="w-10 h-10 flex-shrink-0 mr-3">
                                <img 
                                  src={product.image}
                                  alt={product.name}
                                  className="w-10 h-10 rounded-full object-cover"
                                />
                              </div>
                              <div className="font-medium text-gray-900">{product.name}</div>
                            </div>
                          </TableCell>
                          <TableCell>{product.category}</TableCell>
                          <TableCell>${product.price.toFixed(2)}</TableCell>
                          <TableCell>{product.stock}</TableCell>
                          <TableCell>{product.featured ? "Yes" : "No"}</TableCell>
                          <TableCell>
                            <div className="flex space-x-2">
                              <Button 
                                variant="outline" 
                                size="sm" 
                                onClick={() => handleEditProduct(product)}
                              >
                                <Pencil className="h-4 w-4 mr-1" /> Edit
                              </Button>
                              <Button 
                                variant="destructive" 
                                size="sm"
                                onClick={() => handleDeleteProduct(product.id)}
                              >
                                <Trash className="h-4 w-4 mr-1" /> Delete
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                  
                  {filteredProducts.length === 0 && (
                    <div className="text-center py-8">
                      <p className="text-lg text-gray-500">No products found</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="add-product">
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="p-6">
                <div className="flex items-center mb-6">
                  <Button 
                    variant="outline" 
                    onClick={() => setActiveTab("products")} 
                    className="mr-4"
                  >
                    <ChevronLeft className="h-4 w-4 mr-1" /> Back to Products
                  </Button>
                  <h2 className="text-2xl font-semibold">
                    {editingProduct ? "Edit Product" : "Add New Product"}
                  </h2>
                </div>
                <form onSubmit={handleSubmit}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="name">Product Name *</Label>
                      <Input
                        id="name"
                        name="name"
                        value={formData.name || ""}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="price">Price *</Label>
                      <Input
                        id="price"
                        name="price"
                        type="number"
                        step="0.01"
                        min="0"
                        value={formData.price || ""}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="category">Category *</Label>
                      <Select
                        value={formData.category || "Electronics"}
                        onValueChange={(value) => handleSelectChange("category", value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select a category" />
                        </SelectTrigger>
                        <SelectContent>
                          {categories.filter(cat => cat !== "All").map((category) => (
                            <SelectItem key={category} value={category}>
                              {category}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="stock">Stock *</Label>
                      <Input
                        id="stock"
                        name="stock"
                        type="number"
                        min="0"
                        value={formData.stock || ""}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="image">Product Image</Label>
                      <div className="flex flex-col gap-4">
                        <div className="flex items-center gap-4">
                          <Button 
                            type="button" 
                            variant="outline" 
                            onClick={() => document.getElementById('image-upload')?.click()}
                            className="flex items-center gap-2"
                          >
                            <Upload size={16} /> Upload Image
                          </Button>
                          <Input
                            id="image-upload"
                            name="image-upload"
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={handleImageUpload}
                          />
                          <Input
                            id="image-url"
                            name="image"
                            value={formData.image || ""}
                            onChange={handleInputChange}
                            placeholder="Or enter image URL"
                            className="flex-1"
                          />
                        </div>
                        {imagePreview && (
                          <div className="mt-2 relative w-32 h-32">
                            <img 
                              src={imagePreview} 
                              alt="Preview" 
                              className="w-full h-full object-cover rounded-md"
                            />
                          </div>
                        )}
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="rating">Rating</Label>
                      <Input
                        id="rating"
                        name="rating"
                        type="number"
                        step="0.1"
                        min="0"
                        max="5"
                        value={formData.rating || ""}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="md:col-span-2">
                      <Label htmlFor="description">Description *</Label>
                      <Textarea
                        id="description"
                        name="description"
                        value={formData.description || ""}
                        onChange={handleInputChange}
                        className="min-h-20"
                        required
                      />
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="featured"
                        checked={formData.featured || false}
                        onCheckedChange={(checked) => handleCheckboxChange("featured", !!checked)}
                      />
                      <Label htmlFor="featured">Featured Product</Label>
                    </div>
                  </div>
                  <div className="flex justify-end space-x-4 mt-6">
                    <Button 
                      type="button" 
                      variant="outline" 
                      onClick={() => {
                        resetForm();
                        setActiveTab("products");
                      }}
                    >
                      Cancel
                    </Button>
                    <Button type="submit" className="bg-shop-blue hover:bg-blue-700">
                      {editingProduct ? "Update Product" : "Add Product"}
                    </Button>
                  </div>
                </form>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="categories">
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="p-6">
                <h2 className="text-2xl font-semibold mb-6">Manage Categories</h2>
                
                <div className="flex items-end gap-4 mb-6">
                  <div className="flex-1">
                    <Label htmlFor="new-category">New Category</Label>
                    <Input
                      id="new-category"
                      value={newCategory}
                      onChange={(e) => setNewCategory(e.target.value)}
                      placeholder="Enter category name"
                    />
                  </div>
                  <Button 
                    onClick={handleAddCategory}
                    className="bg-shop-blue hover:bg-blue-700"
                  >
                    <Plus className="h-4 w-4 mr-2" /> Add Category
                  </Button>
                </div>
                
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Category Name</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {categories.map((category, index) => (
                        <TableRow key={category}>
                          <TableCell>
                            {editingCategory && editingCategory.index === index ? (
                              <Input
                                value={editingCategory.value}
                                onChange={handleEditCategoryChange}
                                autoFocus
                                onBlur={handleEditCategorySave}
                                onKeyDown={(e) => {
                                  if (e.key === 'Enter') handleEditCategorySave();
                                  if (e.key === 'Escape') setEditingCategory(null);
                                }}
                              />
                            ) : (
                              category
                            )}
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end space-x-2">
                              {category !== "All" && (
                                <>
                                  <Button 
                                    variant="outline" 
                                    size="sm" 
                                    onClick={() => handleEditCategoryStart(index, category)}
                                    disabled={editingCategory !== null}
                                  >
                                    <Pencil className="h-4 w-4 mr-1" /> Edit
                                  </Button>
                                  <Button 
                                    variant="destructive" 
                                    size="sm"
                                    onClick={() => handleDeleteCategory(category)}
                                    disabled={editingCategory !== null}
                                  >
                                    <Trash className="h-4 w-4 mr-1" /> Delete
                                  </Button>
                                </>
                              )}
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default AdminPage;
