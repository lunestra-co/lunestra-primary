"use client";
import React from "react";
import { useAdmin } from "../AdminContext";
import Link from "next/link";
import { Eye } from "lucide-react";

export default function Orders() {
  const { orders } = useAdmin();

  return (
    <div className="bg-white border border-gray-100 rounded-sm shadow-sm overflow-x-auto">
      <table className="w-full text-left text-xs">
        <thead className="bg-gray-50 text-xs uppercase text-gray-500 font-medium border-b sticky top-0">
          <tr>
            <th className="px-6 py-4 whitespace-nowrap">Order #</th>
            <th className="px-6 py-4 whitespace-nowrap">Customer</th>
            <th className="px-6 py-4 whitespace-nowrap">Email</th>
            <th className="px-6 py-4 whitespace-nowrap">Total</th>
            <th className="px-6 py-4 whitespace-nowrap">Status</th>
            <th className="px-6 py-4 whitespace-nowrap">Date</th>
            <th className="px-6 py-4 text-right whitespace-nowrap">Action</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {orders.map((order) => (
            <tr key={order.id} className="hover:bg-gray-50">
              <td className="px-6 py-4 font-medium whitespace-nowrap">
                ORD-{order.order_seq}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                {order.first_name} {order.last_name}
              </td>
              <td className="px-6 py-4 text-xs">{order.email}</td>
              <td className="px-6 py-4 font-medium whitespace-nowrap">
                Rs.{(order.total || 0).toLocaleString()}
              </td>
              <td className="px-6 py-4">
                <span
                  className={`px-2 py-1 text-xs rounded inline-block whitespace-nowrap ${
                    order.status?.toLowerCase() === "delivered"
                      ? "bg-green-50 text-green-600"
                      : order.status?.toLowerCase() === "shipped"
                        ? "bg-blue-50 text-blue-600"
                        : order.status?.toLowerCase() === "cancelled"
                          ? "bg-red-50 text-red-600"
                          : "bg-yellow-50 text-yellow-600"
                  }`}
                >
                  {order.status}
                </span>
              </td>
              <td className="px-6 py-4 text-xs text-gray-500 whitespace-nowrap">
                {new Date(order.created_at || "").toLocaleDateString()}
              </td>
              <td className="px-6 py-4 text-right">
                <Link
                  href={`/admin/orders/${order.id}`}
                  className="inline-flex items-center gap-2 px-3 py-2 text-blue-600 hover:bg-blue-50 rounded transition-colors"
                >
                  <Eye className="w-4 h-4" />
                  <span className="text-xs">View</span>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
