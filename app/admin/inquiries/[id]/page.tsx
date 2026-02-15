"use client";
import React from "react";
import { useParams } from "next/navigation";
import { useAdmin } from "../../AdminContext";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function InquiryDetail() {
  const params = useParams();
  const inquiryId = params?.id as string;
  const { inquiries, updateInquiryStatus } = useAdmin();

  const inquiry = inquiries.find((i) => i.id === inquiryId);

  // Parse product details JSON if it exists
  let parsedProductDetails: Record<string, string> | null = null;
  if (inquiry?.product_details) {
    try {
      parsedProductDetails = JSON.parse(inquiry.product_details);
    } catch {
      parsedProductDetails = null;
    }
  }

  if (!inquiry) {
    return (
      <div className="space-y-6">
        <Link
          href="/admin/inquiries"
          className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Inquiries
        </Link>
        <div className="bg-white p-6 rounded-sm border border-gray-100 text-center">
          <p className="text-gray-500">Inquiry not found</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Link
        href="/admin/inquiries"
        className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Inquiries
      </Link>

      {/* General Info Header */}
      <div className="bg-white border border-gray-100 rounded-sm shadow-sm p-6">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h1 className="text-2xl">Inquiry #{inquiry.inquiry_seq}</h1>
            <p className="text-sm text-gray-500 mt-2">
              Inquiry ID: {inquiry.id}
            </p>
            <p className="text-sm text-gray-500 mt-2">
              Created:{" "}
              {new Date(inquiry.created_at || "").toLocaleString("en-IN")}
            </p>
            <p className="text-sm text-gray-500 mt-2">
              Updated:{" "}
              {new Date(inquiry.updated_at || "").toLocaleString("en-IN")}
            </p>
          </div>
          <div className="text-right">
            <p className="text-xs text-gray-500 uppercase mb-2">Status</p>
            <select
              value={inquiry.status}
              onChange={(e) => updateInquiryStatus(inquiry.id, e.target.value)}
              className="px-3 py-2 border rounded text-sm font-medium"
            >
              <option>New</option>
              <option>In Progress</option>
              <option>Resolved</option>
              <option>Closed</option>
            </select>
          </div>
        </div>
      </div>

      {/* Customer & Product Info */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Customer Information */}
        <div className="bg-white border border-gray-100 rounded-sm shadow-sm p-6">
          <h3 className="text-lg mb-4">Customer Information</h3>
          <div className="space-y-3">
            <div className="flex justify-between pb-3 border-b border-gray-100">
              <span className="text-gray-600">Name</span>
              <span className="font-medium">{inquiry.customer_name}</span>
            </div>
            <div className="flex justify-between pb-3 border-b border-gray-100">
              <span className="text-gray-600">Email</span>
              <span className="font-medium text-sm">{inquiry.email}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">WhatsApp</span>
              <span className="font-medium">{inquiry.whatsapp_number}</span>
            </div>
          </div>
        </div>

        {/* Product Information */}
        <div className="bg-white border border-gray-100 rounded-sm shadow-sm p-6">
          <h3 className="text-lg mb-4">Product Information</h3>
          <div className="space-y-3">
            {parsedProductDetails?.product_category && (
              <div className="flex justify-between pb-3 border-b border-gray-100">
                <span className="text-gray-600">Product Category</span>
                <span className="font-medium capitalize">
                  {parsedProductDetails.product_category}
                </span>
              </div>
            )}
            <div className="flex justify-between pb-3 border-b border-gray-100">
              <span className="text-gray-600">Product Type</span>
              <span className="font-medium">{inquiry.product_type}</span>
            </div>
            <div className="flex justify-between pb-3 border-b border-gray-100">
              <span className="text-gray-600">Product Name</span>
              <span className="font-medium">
                {parsedProductDetails?.product_name || inquiry.product_name}
              </span>
            </div>
            <div className="flex justify-between pb-3 border-b border-gray-100">
              <span className="text-gray-600">Product ID</span>
              <span className="font-medium text-sm">
                {parsedProductDetails?.product_id || inquiry.product_id}
              </span>
            </div>
            {parsedProductDetails?.selected_size && (
              <div className="flex justify-between">
                <span className="text-gray-600">Selected Size</span>
                <span className="font-medium">
                  {parsedProductDetails.selected_size}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Product Details JSON */}
      {inquiry.product_details && !parsedProductDetails && (
        <div className="bg-white border border-gray-100 rounded-sm shadow-sm p-6">
          <h3 className="text-lg mb-4">Product Details</h3>
          <p className="text-gray-700 text-sm">{inquiry.product_details}</p>
        </div>
      )}

      {/* Message */}
      {inquiry.message && (
        <div className="bg-white border border-gray-100 rounded-sm shadow-sm p-6">
          <h3 className="text-lg mb-4">Customer Message</h3>
          <p className="text-gray-700 text-sm whitespace-pre-wrap">
            {inquiry.message}
          </p>
        </div>
      )}

      {/* Status Timeline */}
      <div className="bg-white border border-gray-100 rounded-sm shadow-sm p-6">
        <h3 className="text-lg mb-4">Inquiry Status</h3>
        <div className="space-y-3">
          <div className="flex justify-between pb-3 border-b border-gray-100">
            <span className="text-gray-600">Current Status</span>
            <span
              className={`px-3 py-1 rounded text-sm font-medium ${
                inquiry.status === "New"
                  ? "bg-blue-50 text-blue-600"
                  : inquiry.status === "In Progress"
                    ? "bg-yellow-50 text-yellow-600"
                    : inquiry.status === "Resolved"
                      ? "bg-green-50 text-green-600"
                      : "bg-gray-50 text-gray-600"
              }`}
            >
              {inquiry.status}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
