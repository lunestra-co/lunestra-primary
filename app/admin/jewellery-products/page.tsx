"use client";
import React, { useState } from "react";
import { useAdmin } from "../AdminContext";
import Button from "@/components/Button";
import { Plus, Search, Eye } from "lucide-react";
import Link from "next/link";

export default function JewelleryProducts() {
  const { jewelleryProducts } = useAdmin();
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="relative w-96">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search jewellery..."
            className="w-full pl-10 pr-4 py-2 border text-sm"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Link href="/admin/jewellery-products/add">
          <Button className="bg-brandblack text-white hover:bg-gold flex items-center gap-2 text-xs py-3 px-6">
            <Plus className="w-4 h-4" /> Add Jewellery
          </Button>
        </Link>
      </div>

      <div className="bg-white border border-gray-100 rounded-sm shadow-sm overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead className="bg-gray-50 text-xs uppercase text-gray-500 font-medium border-b sticky top-0">
            <tr>
              <th className="px-6 py-4 whitespace-nowrap">Name</th>
              <th className="px-6 py-4 whitespace-nowrap">Price</th>
              <th className="px-6 py-4 whitespace-nowrap">Metal Type</th>
              <th className="px-6 py-4 whitespace-nowrap">Primary Gem</th>
              <th className="px-6 py-4 whitespace-nowrap">Style</th>
              <th className="px-6 py-4 whitespace-nowrap">Available</th>
              <th className="px-6 py-4 text-right whitespace-nowrap">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {jewelleryProducts
              .filter((p) =>
                p.name?.toLowerCase().includes(searchTerm.toLowerCase()),
              )
              .map((product) => (
                <tr key={product.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 font-medium">{product.name}</td>
                  <td className="px-6 py-4">Rs.{product.price}</td>
                  <td className="px-6 py-4">{product.metal_type || "-"}</td>
                  <td className="px-6 py-4">
                    {product.primary_gem_type || "-"}
                  </td>
                  <td className="px-6 py-4">{product.style || "-"}</td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-2 py-1 text-xs rounded inline-block whitespace-nowrap ${
                        product.available
                          ? "bg-green-50 text-green-600"
                          : "bg-red-50 text-red-600"
                      }`}
                    >
                      {product.available ? "Yes" : "No"}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <Link
                      href={`/admin/jewellery-products/${product.id}`}
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
    </div>
  );
}
