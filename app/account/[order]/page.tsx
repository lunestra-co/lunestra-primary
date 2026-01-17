"use client";
import React from "react";
import { useParams } from "next/navigation";

// Sample orders data (should be replaced with real data fetching in production)
const orders = [
  {
    id: "ORD-1001",
    date: "2024-01-10",
    status: "Delivered",
    total: "$12,500",
    items: [
      {
        name: "Royal Blue Sapphire Ring",
        image:
          "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80",
        price: "$8,000",
        qty: 1,
      },
      {
        name: "Emerald Pendant Necklace",
        image:
          "https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=400&q=80",
        price: "$4,500",
        qty: 1,
      },
    ],
    shipping: {
      address: "123 Park Avenue, New York, NY, USA",
      method: "FedEx Overnight",
      tracking: "FEDEX1234567890",
    },
    payment: {
      method: "Credit Card (Visa)",
      last4: "1234",
      paid: true,
    },
  },
  {
    id: "ORD-1000",
    date: "2023-11-22",
    status: "Delivered",
    total: "$3,200",
    items: [
      {
        name: "Classic Diamond Studs",
        image:
          "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80",
        price: "$3,200",
        qty: 1,
      },
    ],
    shipping: {
      address: "123 Park Avenue, New York, NY, USA",
      method: "UPS Ground",
      tracking: "UPS9876543210",
    },
    payment: {
      method: "Credit Card (Mastercard)",
      last4: "5678",
      paid: true,
    },
  },
];

export default function OrderDetailPage() {
  const params = useParams();
  const orderId = params.order;
  const order = orders.find((o) => o.id === orderId);

  if (!order) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FDFBF7] text-brandblack">
        <div className="bg-white p-10 rounded shadow text-center">
          <h2 className="font-serif text-2xl mb-4">Order Not Found</h2>
          <p className="text-gray-500">
            We couldn't find an order with ID: {orderId}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-brandblack">
      <div className="max-w-3xl mx-auto px-6 py-16">
        <div className="mb-10">
          <h1 className="font-serif text-3xl mb-2">Order #{order.id}</h1>
          <div className="flex flex-col md:flex-row md:items-center gap-4 text-gray-500 text-sm">
            <span>Date: {order.date}</span>
            <span>
              Status:{" "}
              <span
                className={`font-semibold px-2 py-1 rounded-full ${order.status === "Delivered" ? "bg-green-100 text-green-700" : order.status === "Cancelled" ? "bg-red-100 text-red-700" : "bg-yellow-100 text-yellow-700"}`}
              >
                {order.status}
              </span>
            </span>
            <span>
              Total:{" "}
              <span className="font-serif text-lg text-brandblack">
                {order.total}
              </span>
            </span>
          </div>
        </div>

        <div className="mb-10">
          <h2 className="font-serif text-xl mb-4">Products</h2>
          <div className="space-y-6">
            {order.items.map((item, idx) => (
              <div
                key={idx}
                className="flex items-center gap-6 bg-white p-4 rounded shadow"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-20 h-20 object-cover rounded border"
                />
                <div>
                  <div className="font-serif text-base mb-1">{item.name}</div>
                  <div className="text-sm text-gray-500">
                    {item.price} &times; {item.qty}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mb-10">
          <h2 className="font-serif text-xl mb-4">Shipping Details</h2>
          <div className="bg-white p-4 rounded shadow text-sm">
            <div>
              <span className="font-semibold">Address:</span>{" "}
              {order.shipping.address}
            </div>
            <div>
              <span className="font-semibold">Method:</span>{" "}
              {order.shipping.method}
            </div>
            <div>
              <span className="font-semibold">Tracking #:</span>{" "}
              {order.shipping.tracking}
            </div>
          </div>
        </div>

        <div>
          <h2 className="font-serif text-xl mb-4">Payment</h2>
          <div className="bg-white p-4 rounded shadow text-sm">
            <div>
              <span className="font-semibold">Method:</span>{" "}
              {order.payment.method}
            </div>
            <div>
              <span className="font-semibold">Card Last 4:</span>{" "}
              {order.payment.last4}
            </div>
            <div>
              <span className="font-semibold">Paid:</span>{" "}
              {order.payment.paid ? "Yes" : "No"}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
