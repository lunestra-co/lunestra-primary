"use client";
import React from "react";
import { useAdmin } from "../AdminContext";
import { Eye } from "lucide-react";
import Link from "next/link";

export default function Inquiries() {
  const { inquiries, updateInquiryStatus } = useAdmin();

  return (
    <div className="bg-white border border-gray-100 rounded-sm shadow-sm overflow-x-auto">
      <table className="w-full text-left text-xs">
        <thead className="bg-gray-50 text-xs uppercase text-gray-500 font-medium border-b sticky top-0">
          <tr>
            <th className="px-6 py-4 whitespace-nowrap">Inquiry #</th>
            <th className="px-6 py-4 whitespace-nowrap">Customer</th>
            <th className="px-6 py-4 whitespace-nowrap">Email</th>
            <th className="px-6 py-4 whitespace-nowrap">WhatsApp</th>
            <th className="px-6 py-4 whitespace-nowrap">Product Type</th>
            <th className="px-6 py-4 whitespace-nowrap">Product Name</th>
            <th className="px-6 py-4 whitespace-nowrap">Status</th>
            <th className="px-6 py-4 whitespace-nowrap">Date</th>
            <th className="px-6 py-4 text-right whitespace-nowrap">Action</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {inquiries.map((inquiry) => (
            <tr key={inquiry.id} className="hover:bg-gray-50">
              <td className="px-6 py-4 font-medium whitespace-nowrap">
                #{inquiry.inquiry_seq}
              </td>
              <td className="px-6 py-4 font-medium whitespace-nowrap">
                {inquiry.customer_name}
              </td>
              <td className="px-6 py-4 text-xs">{inquiry.email}</td>
              <td className="px-6 py-4 text-xs whitespace-nowrap">
                {inquiry.whatsapp_number}
              </td>
              <td className="px-6 py-4 text-xs whitespace-nowrap">
                {inquiry.product_type}
              </td>
              <td className="px-6 py-4 text-xs">{inquiry.product_name}</td>
              <td className="px-6 py-4">
                <select
                  value={inquiry.status}
                  onChange={(e) =>
                    updateInquiryStatus(inquiry.id, e.target.value)
                  }
                  className="px-2 py-1 border text-xs rounded"
                >
                  <option>New</option>
                  <option>In Progress</option>
                  <option>Resolved</option>
                  <option>Closed</option>
                </select>
              </td>
              <td className="px-6 py-4 text-xs text-gray-500 whitespace-nowrap">
                {new Date(inquiry.created_at).toLocaleDateString()}
              </td>
              <td className="px-6 py-4 text-right">
                <Link
                  href={`/admin/inquiries/${inquiry.id}`}
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
