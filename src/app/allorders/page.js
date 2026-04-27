"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function MyOrders() {
  const orders = [
    {
      id: "123456",
      orderStatus: "Shipped",
      expectedDelivery: "Feb 22, 2025",
      products: [
        {
          id: "prod1",
          name: "Wireless Bluetooth Headphones",
          price: "₹2,999",
          image: "https://via.placeholder.com/100",
        },
        {
          id: "prod2",
          name: "Smartwatch with Fitness Tracking",
          price: "₹4,499",
          image: "https://via.placeholder.com/100",
        },
      ],
    },
    {
      id: "654321",
      orderStatus: "Out for Delivery",
      expectedDelivery: "Feb 20, 2025",
      products: [
        {
          id: "prod3",
          name: "Gaming Keyboard with RGB Lights",
          price: "₹3,499",
          image: "https://via.placeholder.com/100",
        },
      ],
    },
  ];

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">My Orders</h1>
      <div className="space-y-6">
        {orders.map((order) => (
          <div
            key={order?.id}
            className="bg-white shadow-md p-4 rounded-lg border"
          >
            <div className="flex justify-between items-center border-b pb-3">
              <div>
                <p className="text-sm text-gray-600">Order ID: {order?.id}</p>
                <p className="text-sm font-medium text-blue-500">
                  {order?.orderStatus}
                </p>
                <p className="text-sm text-gray-500">
                  Expected Delivery: {order?.expectedDelivery}
                </p>
              </div>
              <button className="bg-blue-500 text-white px-4 py-1 rounded-md text-sm hover:bg-blue-600">
                View Details
              </button>
            </div>
            <div className="mt-4 space-y-3">
              {order.products.map((product) => (
                <div
                  key={product?.id}
                  className="flex items-center gap-4 border p-3 rounded-lg"
                >
                  <img
                    src={product?.image}
                    alt={product?.name}
                    className="w-16 h-16 object-cover rounded-md"
                  />
                  <div>
                    <p className="font-medium">{product?.name}</p>
                    <p className="text-gray-600">{product?.price}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
