"use client";
import React from "react";
import { useAdmin } from "./AdminContext";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { DollarSign, ShoppingBag, Package, MessageSquare } from "lucide-react";

export default function Dashboard() {
  const { orders, gemProducts, jewelleryProducts, inquiries } = useAdmin();

  // Derived Stats
  const totalRevenue = orders.reduce((acc, curr) => acc + (curr.total || 0), 0);
  const activeOrders = orders.filter(
    (o) => o.status === "Processing" || o.status === "Shipped",
  ).length;
  const totalProducts = gemProducts.length + jewelleryProducts.length;
  const newInquiries = inquiries.filter((i) => i.status === "New").length;

  // Chart Data
  const revenueData = React.useMemo(() => {
    const last6Months = Array.from({ length: 6 }, (_, i) => {
      const d = new Date();
      d.setMonth(d.getMonth() - i);
      return {
        month: d.toLocaleString("default", { month: "short" }),
        amount: 0,
      };
    }).reverse();

    return last6Months.map((m) => ({
      name: m.month,
      revenue: Math.floor(Math.random() * 50000) + 10000,
    }));
  }, [orders]);

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          {
            label: "Revenue",
            value: `Rs.${totalRevenue.toLocaleString()}`,
            icon: DollarSign,
          },
          {
            label: "Active Orders",
            value: activeOrders,
            icon: ShoppingBag,
          },
          {
            label: "Total Products",
            value: totalProducts,
            icon: Package,
          },
          {
            label: "New Inquiries",
            value: newInquiries,
            icon: MessageSquare,
          },
        ].map(({ label, value, icon: Icon }) => (
          <div
            key={label}
            className="bg-white p-6 rounded-sm border border-gray-100 shadow-sm flex justify-between"
          >
            <div>
              <p className="text-xs text-gray-500 uppercase">{label}</p>
              <h3 className="text-2xl mt-2">{value}</h3>
            </div>
            <div className="p-3 bg-gray-50 rounded-full text-brandblack">
              <Icon className="w-5 h-5" />
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white p-6 rounded-sm border border-gray-100 shadow-sm">
        <h3 className="text-lg mb-6">Revenue Trend</h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="name" />
              <YAxis tickFormatter={(v) => `Rs.${v / 1000}k`} />
              <Tooltip />
              <Bar dataKey="revenue" fill="#1a1a1a" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-white border border-gray-100 rounded-sm shadow-sm overflow-hidden">
        <div className="p-6 border-b border-gray-100">
          <h3 className="text-lg">Recent Orders</h3>
        </div>
        <table className="w-full text-left text-sm">
          <thead className="bg-gray-50 text-xs uppercase text-gray-500 font-medium">
            <tr>
              <th className="px-6 py-4">Order ID</th>
              <th className="px-6 py-4">Customer</th>
              <th className="px-6 py-4">Total</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4">Date</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {orders.slice(0, 5).map((order) => (
              <tr key={order.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 font-medium">ORD-{order.order_seq}</td>
                <td className="px-6 py-4">
                  {order.first_name} {order.last_name}
                </td>
                <td className="px-6 py-4 font-medium">
                  Rs.{(order.total || 0).toLocaleString()}
                </td>
                <td className="px-6 py-4">
                  <span className="px-2 py-1 bg-blue-50 text-blue-600 text-xs rounded">
                    {order.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-xs text-gray-500">
                  {new Date(order.created_at).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
