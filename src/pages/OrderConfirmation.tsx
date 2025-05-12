
import React from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";

const OrderConfirmation: React.FC = () => {
  const navigate = useNavigate();
  const orderId = `ORD-${Math.random().toString(36).substring(2, 10).toUpperCase()}`;

  return (
    <Layout>
      <div className="container mx-auto px-4 py-16 text-center">
        <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-8">
          <div className="mb-6 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
              <CheckCircle className="h-8 w-8 text-shop-green" />
            </div>
            <h1 className="text-2xl font-bold text-gray-800">Order Confirmed!</h1>
          </div>
          
          <div className="text-left mb-6">
            <p className="text-gray-600 mb-4">
              Thank you for your purchase. Your order has been received and is being processed.
            </p>
            <div className="bg-gray-50 p-4 rounded-md mb-4">
              <p className="text-sm text-gray-500">Order ID</p>
              <p className="font-semibold">{orderId}</p>
            </div>
            <p className="text-sm text-gray-500">
              You will receive an email confirmation shortly.
            </p>
          </div>
          
          <div className="flex flex-col space-y-3">
            <Button onClick={() => navigate("/")} className="bg-shop-blue hover:bg-blue-700">
              Continue Shopping
            </Button>
            <Button variant="outline" onClick={() => navigate("/products")}>
              Explore More Products
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default OrderConfirmation;
