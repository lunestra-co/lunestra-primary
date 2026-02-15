"use client";
import React from "react";
import { useRouter, useParams } from "next/navigation";
import { useAdmin } from "../../AdminContext";
import { ArrowLeft, DollarSign } from "lucide-react";
import Link from "next/link";

export default function OrderDetail() {
  const router = useRouter();
  const params = useParams();
  const orderId = params?.orderId as string;
  const { orders, updateOrderStatus } = useAdmin();

  const order = orders.find((o) => o.id === orderId);

  const items = React.useMemo(() => {
    if (!order) return [];
    try {
      if (Array.isArray(order.items)) {
        return order.items;
      }
      if (typeof order.items === "string") {
        return JSON.parse(order.items);
      }
      return [];
    } catch (e) {
      return [];
    }
  }, [order, order?.items]);

  if (!order) {
    return (
      <div className="space-y-6">
        <Link
          href="/admin/orders"
          className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Orders
        </Link>
        <div className="bg-white p-6 rounded-sm border border-gray-100 text-center">
          <p className="text-gray-500">Order not found</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Link
        href="/admin/orders"
        className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Orders
      </Link>

      {/* General Info Header */}
      <div className="bg-white border border-gray-100 rounded-sm shadow-sm p-6">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h1 className="text-2xl">ORD-{order.order_seq}</h1>
            <p className="text-sm text-gray-500 mt-1">Order ID: {order.id}</p>
            <p className="text-sm text-gray-500 mt-1">
              Order Number: {order.order_number || "-"}
            </p>
            <p className="text-sm text-gray-500 mt-1">
              User ID: {order.user_id || "-"}
            </p>
            <p className="text-sm text-gray-500 mt-1">
              Created:{" "}
              {new Date(order.created_at || "").toLocaleString("en-IN")}
            </p>
            <p className="text-sm text-gray-500 mt-1">
              Updated:{" "}
              {new Date(order.updated_at || "").toLocaleString("en-IN")}
            </p>
          </div>
          <div className="text-right">
            <p className="text-xs text-gray-500 uppercase mb-2">Status</p>
            <select
              value={order.status}
              onChange={(e) => updateOrderStatus(order.id, e.target.value)}
              className="px-3 py-2 border rounded text-sm font-medium"
            >
              <option value="pending">Pending</option>
              <option value="Processing">Processing</option>
              <option value="Shipped">Shipped</option>
              <option value="Delivered">Delivered</option>
              <option value="Cancelled">Cancelled</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div>
            <p className="text-xs text-gray-500 uppercase mb-1">Total</p>
            <p className="text-2xl text-brandblack">
              Rs.{(order.total || 0).toLocaleString()}
            </p>
          </div>
          <div>
            <p className="text-xs text-gray-500 uppercase mb-1">Status</p>
            <p className="text-lg font-medium">{order.status}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500 uppercase mb-1">
              Payment Method
            </p>
            <p className="text-lg font-medium">{order.payment_method || "-"}</p>
          </div>
        </div>
      </div>

      {/* Customer Information */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white border border-gray-100 rounded-sm shadow-sm p-6">
          <h3 className="text-lg mb-4">Customer Information</h3>
          <div className="space-y-3">
            <div>
              <p className="text-xs text-gray-500 uppercase">Name</p>
              <p className="font-medium">
                {order.first_name} {order.last_name}
              </p>
            </div>
            <div>
              <p className="text-xs text-gray-500 uppercase">Email</p>
              <p className="text-sm">{order.email}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500 uppercase">Phone</p>
              <p className="text-sm">{order.phone}</p>
            </div>
          </div>
        </div>

        <div className="bg-white border border-gray-100 rounded-sm shadow-sm p-6">
          <h3 className="text-lg mb-4">Shipping Address</h3>
          <div className="space-y-3 text-sm">
            <p>{order.address1}</p>
            {order.address2 && <p>{order.address2}</p>}
            <p>
              {order.city}, {order.postal}
            </p>
          </div>
        </div>
      </div>

      {/* Order Items */}
      <div className="bg-white border border-gray-100 rounded-sm shadow-sm overflow-hidden">
        <div className="p-6 border-b border-gray-100">
          <h3 className="text-lg">Order Items</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-50 text-xs uppercase text-gray-500 font-medium border-b">
              <tr>
                <th className="px-6 py-4">Product</th>
                <th className="px-6 py-4">Size</th>
                <th className="px-6 py-4">Price</th>
                <th className="px-6 py-4">Qty</th>
                <th className="px-6 py-4">Certificate</th>
                <th className="px-6 py-4">Cert Price</th>
                <th className="px-6 py-4 text-right">Subtotal</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {items.length > 0 ? (
                items.map((item: any, idx: number) => (
                  <tr key={idx} className="hover:bg-gray-50">
                    <td className="px-6 py-4 font-medium">
                      {item.product_name}
                    </td>
                    <td className="px-6 py-4 text-xs">
                      {item.selected_size || "-"}
                    </td>
                    <td className="px-6 py-4">
                      Rs.{(item.price || 0).toLocaleString()}
                    </td>
                    <td className="px-6 py-4">{item.quantity}</td>
                    <td className="px-6 py-4 text-xs">
                      {item.needs_certificate ? "Yes" : "No"}
                    </td>
                    <td className="px-6 py-4">
                      {item.certificate_price
                        ? `Rs.${(item.certificate_price || 0).toLocaleString()}`
                        : "-"}
                    </td>
                    <td className="px-6 py-4 text-right font-medium">
                      Rs.
                      {(
                        ((item.price || 0) * (item.quantity || 1)) as number
                      ).toLocaleString()}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={7}
                    className="px-6 py-4 text-center text-gray-500"
                  >
                    No items found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Payment & Shipping Details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white border border-gray-100 rounded-sm shadow-sm p-6">
          <h3 className="text-lg mb-4">Payment Details</h3>
          <div className="space-y-3">
            <div className="flex justify-between pb-3 border-b border-gray-100">
              <span className="text-sm text-gray-600">Payment Method:</span>
              <span className="font-medium">{order.payment_method}</span>
            </div>
            {order.payment_slip_url && (
              <div className="flex justify-between pb-3 border-b border-gray-100">
                <span className="text-sm text-gray-600">Payment Slip:</span>
                <a
                  href={order.payment_slip_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-blue-600 hover:underline text-xs"
                >
                  View Slip
                </a>
              </div>
            )}
            {order.coupon_code && (
              <>
                <div className="flex justify-between pb-3 border-b border-gray-100">
                  <span className="text-sm text-gray-600">Coupon Code:</span>
                  <span className="font-medium">{order.coupon_code}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Discount:</span>
                  <span className="font-medium text-green-600">
                    -Rs.{(order.coupon_discount || 0).toLocaleString()}
                  </span>
                </div>
              </>
            )}
          </div>
        </div>

        <div className="bg-white border border-gray-100 rounded-sm shadow-sm p-6">
          <h3 className="text-lg mb-4">Add-ons & Services</h3>
          <div className="space-y-3">
            <div className="flex justify-between pb-3 border-b border-gray-100">
              <span className="text-sm text-gray-600">Crafting Voucher:</span>
              <span className="font-medium">
                {order.add_crafting_voucher ? "Yes" : "No"}
              </span>
            </div>
            {order.voucher_price && (
              <div className="flex justify-between pb-3 border-b border-gray-100">
                <span className="text-sm text-gray-600">Voucher Price:</span>
                <span className="font-medium">
                  Rs.{order.voucher_price.toLocaleString()}
                </span>
              </div>
            )}
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Selected Shop:</span>
              <span className="font-medium">{order.selected_shop || "-"}</span>
            </div>
          </div>
        </div>
      </div>
      {/* Order Summary */}
      <div className="bg-white border border-gray-100 rounded-sm shadow-sm p-6">
        <h3 className="text-lg mb-4">Order Summary</h3>
        <div className="space-y-3 border-b border-gray-100 pb-3 mb-3">
          <div className="flex justify-between text-sm">
            <span>Subtotal:</span>
            <span>
              Rs.
              {(
                (order.total || 0) -
                (order.shipping || 0) -
                (order.coupon_discount || 0)
              ).toLocaleString()}
            </span>
          </div>
          <div className="flex justify-between text-sm">
            <span>Shipping:</span>
            <span>Rs.{(order.shipping || 0).toLocaleString()}</span>
          </div>
          {order.coupon_discount && (
            <div className="flex justify-between text-sm text-green-600">
              <span>Coupon Discount:</span>
              <span>-Rs.{order.coupon_discount.toLocaleString()}</span>
            </div>
          )}
          {order.voucher_price && (
            <div className="flex justify-between text-sm">
              <span>Crafting Voucher:</span>
              <span>Rs.{order.voucher_price.toLocaleString()}</span>
            </div>
          )}
        </div>
        <div className="flex justify-between text-2xl font-semibold">
          <span>Total:</span>
          <span>Rs.{(order.total || 0).toLocaleString()}</span>
        </div>
      </div>
    </div>
  );
}
