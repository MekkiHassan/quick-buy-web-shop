
import React from "react";
import { Link } from "react-router-dom";
import { Product } from "../data/products";
import { useCart } from "../context/CartContext";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useCart();

  return (
    <div className="product-card flex flex-col h-full">
      <Link to={`/product/${product.id}`} className="block flex-grow">
        <div className="h-48 overflow-hidden">
          <img 
            src={product.image} 
            alt={product.name} 
            className="w-full h-full object-cover transition-transform hover:scale-105 duration-300"
          />
        </div>
        <div className="p-4 flex flex-col flex-grow">
          <h3 className="text-lg font-semibold mb-1 hover:text-shop-blue transition-colors">{product.name}</h3>
          <div className="flex items-center mt-1 mb-2">
            {[...Array(5)].map((_, i) => (
              <span key={i} className="text-yellow-400 text-sm">
                {i < Math.floor(product.rating) ? "★" : "☆"}
              </span>
            ))}
            <span className="text-gray-500 text-sm ml-1">({product.rating})</span>
          </div>
          <p className="text-gray-500 text-sm mb-3 line-clamp-2 flex-grow">
            {product.description}
          </p>
          <div className="mt-auto">
            <div className="flex justify-between items-center">
              <span className="text-xl font-bold text-shop-blue">${product.price.toFixed(2)}</span>
              <span className={`text-sm ${product.stock > 0 ? 'text-shop-green' : 'text-shop-red'}`}>
                {product.stock > 0 ? `In Stock (${product.stock})` : 'Out of Stock'}
              </span>
            </div>
          </div>
        </div>
      </Link>
      <div className="px-4 pb-4">
        <Button 
          onClick={() => addToCart(product, 1)} 
          disabled={product.stock === 0}
          className="w-full bg-shop-blue hover:bg-blue-700"
        >
          <ShoppingCart className="mr-2 h-4 w-4" /> Add to Cart
        </Button>
      </div>
    </div>
  );
};

export default ProductCard;
