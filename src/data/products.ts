
export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
  featured: boolean;
  rating: number;
  stock: number;
}

export const categories = [
  "All",
  "Clothing",
  "Electronics",
  "Accessories",
  "Home & Kitchen"
];

// These are just initial data that will be used only if no data in localStorage
export const products: Product[] = [
  {
    id: "1",
    name: "Wireless Bluetooth Headphones",
    description: "High-quality sound with noise cancellation and long battery life. Perfect for music lovers and professionals alike.",
    price: 129.99,
    category: "Electronics",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e",
    featured: true,
    rating: 4.5,
    stock: 15
  },
  {
    id: "2",
    name: "Premium Cotton T-Shirt",
    description: "Soft, comfortable cotton t-shirt with a modern fit. Available in various colors and sizes.",
    price: 24.99,
    category: "Clothing",
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab",
    featured: true,
    rating: 4.2,
    stock: 50
  },
  {
    id: "3",
    name: "Smart Watch",
    description: "Track your fitness, receive notifications, and more with this advanced smartwatch. Water-resistant and long battery life.",
    price: 199.99,
    category: "Electronics",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30",
    featured: true,
    rating: 4.7,
    stock: 8
  },
  {
    id: "4",
    name: "Leather Wallet",
    description: "Genuine leather wallet with multiple card slots and compartments. Slim design fits perfectly in your pocket.",
    price: 39.99,
    category: "Accessories",
    image: "https://images.unsplash.com/photo-1627123424574-724758594e93",
    featured: false,
    rating: 4.0,
    stock: 25
  },
  {
    id: "5",
    name: "Stainless Steel Water Bottle",
    description: "Keep your drinks hot or cold for hours with this insulated water bottle. Eco-friendly and durable.",
    price: 29.99,
    category: "Home & Kitchen",
    image: "https://images.unsplash.com/photo-1589365278144-c9e705f843ba",
    featured: true,
    rating: 4.3,
    stock: 30
  },
  {
    id: "6",
    name: "Wireless Charging Pad",
    description: "Fast wireless charging for compatible devices. Sleek, modern design complements any desk or nightstand.",
    price: 34.99,
    category: "Electronics",
    image: "https://images.unsplash.com/photo-1582568742002-499ac333642c",
    featured: false,
    rating: 4.1,
    stock: 20
  },
  {
    id: "7",
    name: "Denim Jeans",
    description: "Classic denim jeans with a comfortable fit. Durable and stylish for everyday wear.",
    price: 59.99,
    category: "Clothing",
    image: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246",
    featured: false,
    rating: 4.4,
    stock: 40
  },
  {
    id: "8",
    name: "Coffee Maker",
    description: "Programmable coffee maker with timer and auto shut-off. Makes up to 12 cups of delicious coffee.",
    price: 49.99,
    category: "Home & Kitchen",
    image: "https://images.unsplash.com/photo-1520970519539-8156e9ac1de6",
    featured: true,
    rating: 4.6,
    stock: 12
  }
];

// These direct export functions are kept for backward compatibility
// but the actual implementations use the context
export const getProductById = (id: string): Product | undefined => {
  const savedProducts = localStorage.getItem("ecommerceProducts");
  const productsList = savedProducts ? JSON.parse(savedProducts) : products;
  return productsList.find((product: Product) => product.id === id);
};

export const getFeaturedProducts = (): Product[] => {
  const savedProducts = localStorage.getItem("ecommerceProducts");
  const productsList = savedProducts ? JSON.parse(savedProducts) : products;
  return productsList.filter((product: Product) => product.featured);
};

export const getProductsByCategory = (category: string): Product[] => {
  const savedProducts = localStorage.getItem("ecommerceProducts");
  const productsList = savedProducts ? JSON.parse(savedProducts) : products;
  if (category === "All") return productsList;
  return productsList.filter((product: Product) => product.category === category);
};
