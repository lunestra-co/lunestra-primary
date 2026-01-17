"use client";
import React from "react";

// Mock user and orders data
const user = {
  name: "Mrs. Vanderbilt",
  email: "vanderbilt@email.com",
  phone: "+1 555-123-4567",
  joined: "January 2022",
  avatar:
    "https://images.unsplash.com/photo-1511367461989-f85a21fda167?auto=format&fit=crop&w=100&q=80",
};

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
  },
  {
    id: "ORD-0999",
    date: "2023-09-05",
    status: "Cancelled",
    total: "$2,000",
    items: [
      {
        name: "Ruby Tennis Bracelet",
        image:
          "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80",
        price: "$2,000",
        qty: 1,
      },
    ],
  },
];

import { useState } from "react";

export default function ProfilePage() {
  const [tab, setTab] = useState("orders");

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-brandblack">
      <div className="max-w-5xl mx-auto px-6 py-20">
        {/* Tabs */}
        <div className="flex border-b border-gold mb-12 gap-2">
          <button
            className={`px-6 py-3 font-serif text-lg border-b-2 transition-all duration-200 focus:outline-none ${
              tab === "orders"
                ? "border-gold text-brandblack bg-white"
                : "border-transparent text-gray-400 bg-transparent hover:text-brandblack"
            }`}
            onClick={() => setTab("orders")}
          >
            Orders
          </button>
          <button
            className={`px-6 py-3 font-serif text-lg border-b-2 transition-all duration-200 focus:outline-none ${
              tab === "certificates"
                ? "border-gold text-brandblack bg-white"
                : "border-transparent text-gray-400 bg-transparent hover:text-brandblack"
            }`}
            onClick={() => setTab("certificates")}
          >
            Certificates
          </button>
          <button
            className={`px-6 py-3 font-serif text-lg border-b-2 transition-all duration-200 focus:outline-none ${
              tab === "support"
                ? "border-gold text-brandblack bg-white"
                : "border-transparent text-gray-400 bg-transparent hover:text-brandblack"
            }`}
            onClick={() => setTab("support")}
          >
            Support
          </button>
        </div>

        {/* Tab Content */}
        {tab === "orders" && (
          <div>
            <h2 className="font-serif text-2xl mb-8">Order History</h2>
            {orders.length === 0 ? (
              <div className="text-gray-400 italic">No past orders found.</div>
            ) : (
              <div className="space-y-10">
                {orders.map((order) => (
                  <div
                    key={order.id}
                    className="bg-white shadow border-l-4 border-gold p-8 rounded-lg"
                  >
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-2">
                      <div className="flex flex-col md:flex-row md:items-center gap-4">
                        <span className="text-xs uppercase tracking-widest text-gray-400 font-bold">
                          Order #{order.id}
                        </span>
                        <span className="text-xs text-gray-400">
                          {order.date}
                        </span>
                        <span
                          className={`text-xs font-semibold px-2 py-1 rounded-full ${
                            order.status === "Delivered"
                              ? "bg-green-100 text-green-700"
                              : order.status === "Cancelled"
                                ? "bg-red-100 text-red-700"
                                : "bg-yellow-100 text-yellow-700"
                          }`}
                        >
                          {order.status}
                        </span>
                      </div>
                      <div className="text-lg font-serif">{order.total}</div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      {order.items.map((item, idx) => (
                        <div
                          key={idx}
                          className="flex items-center gap-4 bg-gray-50 p-4 rounded"
                        >
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-16 h-16 object-cover rounded border"
                          />
                          <div>
                            <div className="font-serif text-base mb-1">
                              {item.name}
                            </div>
                            <div className="text-sm text-gray-500">
                              {item.price} &times; {item.qty}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="mt-6 flex justify-end">
                      <a
                        href={`/private-vault/${order.id}`}
                        className="inline-block px-5 py-2 bg-gold text-white font-serif rounded shadow hover:bg-yellow-600 transition-colors text-sm"
                      >
                        View Order
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {tab === "certificates" && (
          <div>
            <h2 className="font-serif text-2xl mb-8">Certificates</h2>
            <div className="space-y-8">
              <div className="bg-white shadow border-l-4 border-gold p-6 rounded-lg flex items-center gap-6">
                <img
                  src="https://www.gia.edu/images/GIA-diamond-grading-report-2x.jpg"
                  alt="GIA Certificate"
                  className="w-24 h-32 object-cover rounded border"
                />
                <div>
                  <div className="font-serif text-lg mb-1">
                    GIA Diamond Grading Report
                  </div>
                  <div className="text-sm text-gray-500 mb-1">
                    Certificate #: 1234567890
                  </div>
                  <div className="text-sm text-gray-500 mb-1">
                    Issued: 2024-01-05
                  </div>
                  <div className="text-sm text-gray-500">
                    For: Classic Diamond Studs
                  </div>
                </div>
              </div>
              <div className="bg-white shadow border-l-4 border-gold p-6 rounded-lg flex items-center gap-6">
                <img
                  src="https://www.igi.org/images/igi-certificate-sample.jpg"
                  alt="IGI Certificate"
                  className="w-24 h-32 object-cover rounded border"
                />
                <div>
                  <div className="font-serif text-lg mb-1">
                    IGI Gemstone Report
                  </div>
                  <div className="text-sm text-gray-500 mb-1">
                    Certificate #: IGI-987654321
                  </div>
                  <div className="text-sm text-gray-500 mb-1">
                    Issued: 2023-11-25
                  </div>
                  <div className="text-sm text-gray-500">
                    For: Royal Blue Sapphire Ring
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {tab === "support" && (
          <div>
            <h2 className="font-serif text-2xl mb-8">Support</h2>
            <div className="text-gray-400 italic">
              For assistance, please contact our support team at{" "}
              <a
                href="mailto:support@lunestra.com"
                className="underline text-brandblack"
              >
                support@lunestra.com
              </a>
              .
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
