"use client";
import React, { useEffect, useState, use } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import Button from "@/components/Button";
import { CheckCircle2, Download, Home, Eye } from "lucide-react";

export default function OrderSuccessPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const searchParams = useSearchParams();
  const router = useRouter();
  const orderNumber = searchParams.get("orderNumber");

  const [order, setOrder] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const supabase = createClient();
        const { data, error: fetchError } = await supabase
          .from("orders")
          .select("*")
          .eq("id", id)
          .single();

        if (fetchError) {
          setError("Failed to load order details");
          return;
        }

        setOrder(data);
      } catch (err) {
        setError("An error occurred while loading your order");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [id]);

  if (loading) {
    return (
      <div className="pt-32 pb-24 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brandblack mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your order...</p>
        </div>
      </div>
    );
  }

  if (error || !order) {
    return (
      <div className="pt-32 pb-24 min-h-screen flex items-center justify-center">
        <div className="text-center max-w-md">
          <p className="text-red-600 mb-6 text-lg">
            {error || "Order not found"}
          </p>
          <Button variant="primary" onClick={() => router.push("/")}>
            Return to Home
          </Button>
        </div>
      </div>
    );
  }

  // Calculate subtotal if not present
  let subtotal = 0;
  if (order.items && Array.isArray(order.items)) {
    subtotal = order.items.reduce(
      (sum: number, item: any) =>
        sum + (typeof item.price === "number" ? item.price : 0),
      0,
    );
    if (order.add_crafting_voucher && order.voucher_price) {
      subtotal += order.voucher_price;
    }
  }

  return (
    <div className="pt-32 pb-24 bg-gray-50 min-h-screen font-sans">
      <div className="max-w-3xl mx-auto px-6 lg:px-12">
        {/* Success Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-6">
            <CheckCircle2 className="w-16 h-16 text-green-600" />
          </div>
          <h1 className="font-serif text-4xl text-brandblack mb-3">
            Order Confirmed!
          </h1>
          <p className="text-gray-600 text-lg">
            Thank you for your purchase. Your order has been successfully
            created.
          </p>
        </div>

        {/* Order Summary Card */}
        <div className="bg-white p-8 shadow-sm border border-gray-100 mb-8 rounded">
          <div className="grid grid-cols-2 gap-8 mb-8 pb-8 border-b border-gray-200">
            <div>
              <p className="text-xs font-semibold text-gray-500 uppercase mb-2">
                Order Number
              </p>
              <p className="font-serif text-xl font-bold text-brandblack">
                {order.order_number ||
                  `ORD-${order.order_seq}` ||
                  orderNumber ||
                  order.id}
              </p>
            </div>
            <div>
              <p className="text-xs font-semibold text-gray-500 uppercase mb-2">
                Order Date
              </p>
              <p className="font-serif text-xl text-brandblack">
                {new Date(order.created_at).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
            </div>
            <div>
              <p className="text-xs font-semibold text-gray-500 uppercase mb-2">
                Payment Status
              </p>
              <p className="text-sm font-semibold text-blue-600 uppercase tracking-wide">
                {order.payment_status || "Pending"}
              </p>
            </div>
            <div>
              <p className="text-xs font-semibold text-gray-500 uppercase mb-2">
                Order Status
              </p>
              <p className="text-sm font-semibold text-blue-600 uppercase tracking-wide">
                {order.status || "Pending"}
              </p>
            </div>
          </div>

          {/* Items */}
          <div className="mb-8 pb-8 border-b border-gray-200">
            <h3 className="font-serif text-lg font-bold mb-4">Order Items</h3>
            {order.items && Array.isArray(order.items) ? (
              <ul className="space-y-3">
                {order.items.map((item: any, idx: number) => (
                  <li key={idx} className="flex justify-between text-sm">
                    <span className="text-gray-700">
                      {item.product_name}
                      {item.needs_certificate && (
                        <span className="ml-2 text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded border border-blue-200">
                          + Certificate
                        </span>
                      )}
                    </span>
                    <span className="font-semibold">
                      LKR{" "}
                      {item.price.toLocaleString("en-US", {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}
                    </span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-600 text-sm">No items found</p>
            )}
          </div>

          {/* Shipping Info */}
          <div className="mb-8 pb-8 border-b border-gray-200">
            <h3 className="font-serif text-lg font-bold mb-4">
              Shipping Address
            </h3>
            <div className="text-sm text-gray-700 space-y-1">
              <p>
                {order.first_name} {order.last_name}
              </p>
              <p>{order.address1 || order.address_line_1}</p>
              {(order.address2 || order.address_line_2) && (
                <p>{order.address2 || order.address_line_2}</p>
              )}
              <p>
                {order.city}, {order.postal || order.postal_code}
              </p>
              <p className="pt-2">
                <span className="font-semibold">Phone:</span> {order.phone}
              </p>
              <p>
                <span className="font-semibold">Email:</span> {order.email}
              </p>
            </div>
          </div>

          {/* Order Total */}
          <div className="flex justify-end mb-8 pb-8 border-b border-gray-200">
            <div className="w-64">
              <div className="flex justify-between mb-2">
                <span className="text-gray-600">Subtotal</span>
                <span>
                  LKR{" "}
                  {subtotal.toLocaleString("en-US", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </span>
              </div>
              <div className="flex justify-between mb-4">
                <span className="text-gray-600">Shipping</span>
                <span className="text-green-700 font-semibold">Free</span>
              </div>
              <div className="flex justify-between items-center pt-4 border-t border-gray-200">
                <span className="font-serif text-lg font-bold">Total</span>
                <span className="font-serif text-2xl font-bold text-brandblack">
                  LKR{" "}
                  {order.total.toLocaleString("en-US", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </span>
              </div>
            </div>
          </div>

          {/* Payment Method */}
          <div className="mb-8">
            <h3 className="font-serif text-lg font-bold mb-3">
              Payment Method
            </h3>
            <p className="text-gray-700 font-semibold">
              {order.payment_method}
            </p>
            {order.payment_slip_url && (
              <div className="mt-3 p-3 bg-blue-50 border border-blue-200 rounded">
                <p className="text-sm text-blue-700 mb-2">
                  ✓ Payment slip uploaded and received
                </p>
                <a
                  href={order.payment_slip_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-blue-600 hover:underline flex items-center gap-1"
                >
                  <Eye className="w-3 h-3" />
                  View Payment Slip
                </a>
              </div>
            )}
          </div>
        </div>

        {/* Next Steps */}
        <div className="bg-blue-50 border border-blue-200 rounded p-6 mb-8">
          <h3 className="font-serif text-lg font-bold mb-3 text-brandblack">
            What's Next?
          </h3>
          <ul className="space-y-2 text-sm text-gray-700">
            <li>✓ Your order has been created successfully</li>
            <li>
              ✓ A confirmation email has been sent to{" "}
              <span className="font-semibold">{order.email}</span>
            </li>
            <li>• You will receive a payment request shortly</li>
            <li>
              • Once payment is confirmed, your order will be processed for
              shipment
            </li>
            <li>• You can track your order from your account dashboard</li>
          </ul>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            variant="primary"
            onClick={() => router.push("/account")}
            className="flex items-center justify-center gap-2"
          >
            <Eye className="w-4 h-4" />
            View My Orders
          </Button>
          <Button
            variant="secondary"
            onClick={() => router.push("/")}
            className="flex items-center justify-center gap-2"
          >
            <Home className="w-4 h-4" />
            Continue Shopping
          </Button>
        </div>

        {/* Support */}
        <div className="mt-12 pt-8 border-t border-gray-200 text-center text-sm text-gray-600">
          <p>
            Need help?{" "}
            <a href="/contact" className="text-sapphire hover:underline">
              Contact our support team
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
