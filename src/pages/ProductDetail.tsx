
import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getProductById } from "../data/products";
import Layout from "../components/Layout";
import { useCart } from "../context/CartContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart, Plus, Minus, Search, ZoomIn, ZoomOut } from "lucide-react";
import { toast } from "sonner";

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const product = id ? getProductById(id) : undefined;
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [zoomed, setZoomed] = useState(false);

  if (!product) {
    // Product not found, redirect to products page
    setTimeout(() => {
      navigate("/products");
    }, 3000);

    return (
      <Layout>
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-3xl font-bold mb-4">Product Not Found</h1>
          <p className="mb-8">The product you're looking for does not exist. Redirecting to products page...</p>
          <Button onClick={() => navigate("/products")}>
            View All Products
          </Button>
        </div>
      </Layout>
    );
  }

  const handleQuantityChange = (value: number) => {
    if (value >= 1 && value <= product.stock) {
      setQuantity(value);
    }
  };

  const handleAddToCart = () => {
    if (product.stock > 0) {
      addToCart(product, quantity);
    } else {
      toast.error("Sorry, this product is out of stock!");
    }
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Product Image */}
          <div className="relative overflow-hidden rounded-lg bg-gray-100">
            <div 
              className={`relative ${zoomed ? 'cursor-zoom-out' : 'cursor-zoom-in'}`}
              onClick={() => setZoomed(!zoomed)}
            >
              <img
                src={product.image}
                alt={product.name}
                className={`w-full h-auto object-cover transition-transform duration-300 ${zoomed ? 'scale-150' : 'scale-100'}`}
              />
              <div className="absolute bottom-4 right-4">
                <Button variant="outline" size="icon" className="bg-white/70" onClick={(e) => {
                  e.stopPropagation();
                  setZoomed(!zoomed);
                }}>
                  {zoomed ? <ZoomOut /> : <ZoomIn />}
                </Button>
              </div>
            </div>
          </div>

          {/* Product Details */}
          <div>
            <div className="mb-2">
              <Badge className="bg-shop-blue">{product.category}</Badge>
            </div>
            <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
            <div className="flex items-center mb-4">
              {[...Array(5)].map((_, i) => (
                <span key={i} className="text-yellow-400">
                  {i < Math.floor(product.rating) ? "★" : "☆"}
                </span>
              ))}
              <span className="text-gray-500 ml-2">({product.rating})</span>
            </div>
            <p className="text-3xl font-bold text-shop-blue mb-6">${product.price.toFixed(2)}</p>
            <div className={`mb-4 text-sm font-semibold ${product.stock > 0 ? 'text-shop-green' : 'text-shop-red'}`}>
              {product.stock > 0 ? `In Stock (${product.stock} available)` : 'Out of Stock'}
            </div>
            <p className="text-gray-700 mb-6">{product.description}</p>

            {/* Quantity and Add to Cart */}
            <div className="mb-6">
              <label className="block mb-2 font-medium">Quantity</label>
              <div className="flex items-center">
                <Button
                  variant="outline"
                  size="icon"
                  disabled={quantity <= 1}
                  onClick={() => handleQuantityChange(quantity - 1)}
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <Input
                  type="number"
                  min="1"
                  max={product.stock}
                  value={quantity}
                  onChange={(e) => handleQuantityChange(parseInt(e.target.value) || 1)}
                  className="w-16 mx-2 text-center"
                />
                <Button
                  variant="outline"
                  size="icon"
                  disabled={quantity >= product.stock}
                  onClick={() => handleQuantityChange(quantity + 1)}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <Button 
              onClick={handleAddToCart} 
              disabled={product.stock === 0}
              size="lg"
              className="w-full bg-shop-blue hover:bg-blue-700"
            >
              <ShoppingCart className="mr-2 h-5 w-5" /> Add to Cart
            </Button>
          </div>
        </div>

        {/* Product Reviews Section */}
        <div className="mt-12 border-t pt-8">
          <h2 className="text-2xl font-bold mb-6">Customer Reviews</h2>
          {/* You can add real reviews here in a future update */}
          <div className="bg-gray-50 p-6 rounded-lg">
            <p className="text-gray-500 text-center">
              No reviews yet. Be the first to review this product!
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ProductDetail;
