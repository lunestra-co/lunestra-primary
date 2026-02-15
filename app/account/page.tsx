"use client";
import React, { useState } from "react";
import { useAuth } from "@/components/AuthProvider";
import AuthForm from "@/components/AuthForm";
import ProfileForm from "@/components/ProfileForm";
import { createClient } from "@/lib/supabase/client";
import { useEffect, useCallback } from "react";
import { getUserOrders } from "@/services/OrderService";
import type { Order } from "@/services/OrderService";
import { useRef } from "react";

export default function ProfilePage() {
  const { user, loading } = useAuth();
  const [tab, setTab] = useState("orders");
  const [orders, setOrders] = useState<Order[]>([]);
  const [ordersLoading, setOrdersLoading] = useState(false);
  const [ordersError, setOrdersError] = useState<string | null>(null);
  const [profileLoading, setProfileLoading] = useState(false);
  const [profileExists, setProfileExists] = useState<boolean | null>(null);
  const [profile, setProfile] = useState<{
    first_name?: string;
    last_name?: string;
  } | null>(null);

  const fetchOrders = useCallback(async () => {
    if (!user) return;
    setOrdersLoading(true);
    setOrdersError(null);
    try {
      // Fetch orders for the current user
      const userOrders = await getUserOrders(user.id);
      setOrders(userOrders || []);
    } catch (e) {
      setOrdersError("Failed to load orders");
    } finally {
      setOrdersLoading(false);
    }
  }, [user]);

  useEffect(() => {
    if (user) fetchOrders();
  }, [user, fetchOrders]);

  useEffect(() => {
    const checkProfile = async () => {
      if (!user) return;
      setProfileLoading(true);
      const supabase = createClient();
      const { data, error } = await supabase
        .from("profiles")
        .select("id, first_name, last_name")
        .eq("id", user.id)
        .single();
      setProfileExists(!!data && !error);
      setProfile(data || null);
      setProfileLoading(false);
    };
    if (user) checkProfile();
  }, [user]);

  if (loading || profileLoading) {
    return <div className="text-center py-20">Loading...</div>;
  }
  if (!user) {
    return (
      <div className="min-h-screen bg-[#FDFBF7] text-brandblack flex items-center justify-center">
        <AuthForm />
      </div>
    );
  }
  if (profileExists === false) {
    return (
      <div className="min-h-screen bg-[#FDFBF7] text-brandblack flex items-center justify-center">
        <ProfileForm onSaved={() => setProfileExists(true)} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-brandblack">
      <div className="max-w-5xl mx-auto px-6 py-20">
        {/* User Info Bar */}
        <div className="flex items-center justify-between bg-white rounded-lg shadow px-6 py-4 mb-8">
          <div className="flex items-center gap-4">
            <img
              src={`https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(
                (profile?.first_name || "U") +
                  " " +
                  (profile?.last_name || "S"),
              )}`}
              alt="User Avatar"
              className="w-12 h-12 rounded-full border"
            />
            <div>
              <div className="font-serif text-lg">
                Hey{" "}
                {profile?.first_name
                  ? profile.first_name
                  : user.email?.split("@")[0] || "User"}
                !
              </div>
              <div className="text-gray-500 text-sm">{user.email}</div>
            </div>
          </div>
        </div>
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

        {tab === "orders" && (
          <div>
            <h2 className="font-serif text-2xl mb-8">Your Orders</h2>
            {ordersLoading ? (
              <div className="text-gray-400 italic">Loading orders...</div>
            ) : ordersError ? (
              <div className="text-red-500 italic">{ordersError}</div>
            ) : orders.length === 0 ? (
              <div className="text-gray-400 italic">No orders found.</div>
            ) : (
              <div className="space-y-12">
                {orders.map((order) => {
                  let items: any[] = [];
                  try {
                    items = Array.isArray(order.items)
                      ? order.items
                      : order.items
                        ? JSON.parse(order.items as any)
                        : [];
                  } catch {
                    items = [];
                  }
                  return (
                    <div
                      key={order.id}
                      className="bg-white shadow border-l-4 border-gold p-6 rounded-lg mb-4"
                    >
                      <div className="flex justify-between items-center mb-4">
                        <div>
                          <span className="font-serif text-lg mr-4">
                            Order #{order.order_seq}
                          </span>
                          <span className="text-xs text-gray-500 mr-4">
                            {order.created_at
                              ? new Date(order.created_at).toLocaleDateString()
                              : ""}
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
                        <div className="text-lg font-serif">
                          {order.total ? `₹${order.total}` : ""}
                        </div>
                      </div>
                      <div className="text-sm text-gray-500 mb-2">
                        {items.length > 0
                          ? items.map((item, idx) => (
                              <span key={idx}>
                                {item.product_name}
                                {item.quantity ? ` × ${item.quantity}` : ""}
                                {idx < items.length - 1 ? ", " : ""}
                              </span>
                            ))
                          : "No products"}
                      </div>
                      <div className="mt-6 flex justify-end">
                        <a
                          href={`/account/${order.id}`}
                          className="inline-block px-5 py-2 bg-gold text-white font-serif rounded shadow hover:bg-yellow-600 transition-colors text-sm"
                        >
                          View Order
                        </a>
                      </div>
                    </div>
                  );
                })}
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
