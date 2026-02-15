"use client";
import React from "react";
import { useParams } from "next/navigation";

import { useEffect, useState } from "react";
import { getOrderById } from "@/services/OrderService";
import { useAuth } from "@/components/AuthProvider";

export default function OrderDetailPage() {
  const params = useParams();
  const orderId = params.order;
  const { user } = useAuth();
  const [order, setOrder] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!orderId) return;
    setLoading(true);
    setError(null);
    getOrderById(orderId as string)
      .then((data) => {
        // Optionally, check if user is allowed to view this order
        if (user && data && data.user_id && data.user_id !== user.id) {
          setError("You are not authorized to view this order.");
          setOrder(null);
        } else {
          setOrder(data);
        }
      })
      .catch((e) => {
        setError("Order not found.");
        setOrder(null);
      })
      .finally(() => setLoading(false));
  }, [orderId, user]);

  let items: any[] = [];
  try {
    items = Array.isArray(order?.items)
      ? order.items
      : order?.items
        ? JSON.parse(order.items)
        : [];
  } catch {
    items = [];
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FDFBF7] text-brandblack">
        <div className="bg-white p-10 rounded shadow text-center">
          Loading...
        </div>
      </div>
    );
  }
  if (error || !order) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FDFBF7] text-brandblack">
        <div className="bg-white p-10 rounded shadow text-center">
          <h2 className="font-serif text-2xl mb-4">Order Not Found</h2>
          <p className="text-gray-500">
            {error || `We couldn't find an order with ID: ${orderId}`}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-brandblack">
      <div className="max-w-3xl mx-auto px-6 py-16">
        {/* Order Header */}
        <div className="mb-10">
          <h1 className="font-serif text-3xl mb-2">
            Order #{order.order_seq || order.id}
          </h1>
          <div className="flex flex-col md:flex-row md:items-center gap-4 text-gray-500 text-sm">
            <span>
              Date:{" "}
              {order.created_at
                ? new Date(order.created_at).toLocaleDateString()
                : ""}
            </span>
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
                {order.total ? `₹${order.total}` : ""}
              </span>
            </span>
          </div>
        </div>

        {/* Customer Info */}
        <div className="mb-8 bg-white p-4 rounded shadow">
          <h2 className="font-serif text-xl mb-2">Customer</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <span className="font-semibold">Name:</span> {order.first_name}{" "}
              {order.last_name}
            </div>
            <div>
              <span className="font-semibold">Email:</span> {order.email}
            </div>
            <div>
              <span className="font-semibold">Phone:</span> {order.phone}
            </div>
          </div>
        </div>

        {/* Shipping Info */}
        <div className="mb-8 bg-white p-4 rounded shadow">
          <h2 className="font-serif text-xl mb-2">Shipping</h2>
          <div className="text-sm mb-2">
            <span className="font-semibold">Address:</span> {order.address1}{" "}
            {order.address2 ? `, ${order.address2}` : ""}, {order.city},{" "}
            {order.postal}
          </div>
          {order.selected_shop && (
            <div className="text-sm mb-2">
              <span className="font-semibold">Shop:</span> {order.selected_shop}
            </div>
          )}
          <div className="text-sm mb-2">
            <span className="font-semibold">Shipping Fee:</span>{" "}
            {order.shipping ? `₹${order.shipping}` : "Included"}
          </div>
        </div>

        {/* Voucher/Coupon Info */}
        {(order.add_crafting_voucher || order.coupon_code) && (
          <div className="mb-8 bg-white p-4 rounded shadow">
            <h2 className="font-serif text-xl mb-2">Voucher & Coupon</h2>
            {order.add_crafting_voucher && (
              <div className="text-sm mb-2">
                <span className="font-semibold">Crafting Voucher:</span> Yes
                {order.voucher_price && <span> (₹{order.voucher_price})</span>}
              </div>
            )}
            {order.coupon_code && (
              <div className="text-sm mb-2">
                <span className="font-semibold">Coupon:</span>{" "}
                {order.coupon_code}
                {order.coupon_discount && (
                  <span> (Discount: ₹{order.coupon_discount})</span>
                )}
              </div>
            )}
          </div>
        )}

        {/* Product Items */}
        <div className="mb-8 bg-white p-4 rounded shadow">
          <h2 className="font-serif text-xl mb-2">Products</h2>
          <div className="space-y-4">
            {items.length > 0 ? (
              items.map((item, idx) => (
                <div
                  key={idx}
                  className="flex flex-col md:flex-row md:items-center gap-4 border-b pb-4 last:border-b-0 last:pb-0"
                >
                  <div className="font-serif text-base">
                    {item.product_name}
                  </div>
                  <div className="text-sm text-gray-500">
                    Quantity: {item.quantity}
                  </div>
                  <div className="text-sm text-gray-500">
                    Price: ₹{item.price}
                  </div>
                  {item.needs_certificate && (
                    <div className="text-xs text-blue-600">
                      Certificate Required
                    </div>
                  )}
                </div>
              ))
            ) : (
              <div className="text-sm text-gray-400">No products found.</div>
            )}
          </div>
        </div>

        {/* Payment Info */}
        <div className="mb-8 bg-white p-4 rounded shadow">
          <h2 className="font-serif text-xl mb-2">Payment</h2>
          <div className="text-sm mb-2">
            <span className="font-semibold">Method:</span>{" "}
            {order.payment_method}
          </div>
          {order.payment_slip_url && (
            <div className="text-sm mb-2">
              <span className="font-semibold">Payment Slip:</span>{" "}
              <a
                href={order.payment_slip_url}
                target="_blank"
                rel="noopener noreferrer"
                className="underline text-brandblack"
              >
                View
              </a>
            </div>
          )}
        </div>

        {/* Timestamps */}
        <div className="text-xs text-gray-400 mt-8">
          <div>
            Created:{" "}
            {order.created_at
              ? new Date(order.created_at).toLocaleString()
              : ""}
          </div>
          <div>
            Last Updated:{" "}
            {order.updated_at
              ? new Date(order.updated_at).toLocaleString()
              : ""}
          </div>
        </div>
      </div>
    </div>
  );
}
