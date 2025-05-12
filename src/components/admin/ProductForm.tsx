
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { ChevronLeft, Upload } from "lucide-react";
import { Product } from "@/data/products";
import { toast } from "sonner";

interface ProductFormProps {
  editingProduct: Product | null;
  categories: string[];
  onSubmit: (product: Partial<Product>) => void;
  onCancel: () => void;
}

const ProductForm: React.FC<ProductFormProps> = ({ 
  editingProduct, 
  categories, 
  onSubmit, 
  onCancel 
}) => {
  const [formData, setFormData] = useState<Partial<Product>>(
    editingProduct || {
      name: "",
      description: "",
      price: 0,
      category: "Electronics",
      image: "",
      featured: false,
      rating: 0,
      stock: 0
    }
  );
  
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>(editingProduct?.image || "");

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
    
    onSubmit(formData);
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="p-6">
        <div className="flex items-center mb-6">
          <Button 
            variant="outline" 
            onClick={onCancel} 
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
              onClick={onCancel}
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
  );
};

export default ProductForm;
