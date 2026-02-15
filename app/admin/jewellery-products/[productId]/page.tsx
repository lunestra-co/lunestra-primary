"use client";
import React from "react";
import { useParams } from "next/navigation";
import { useAdmin } from "../../AdminContext";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function JewelleryProductDetail() {
  const params = useParams();
  const productId = params?.productId as string;
  const { jewelleryProducts } = useAdmin();

  const product = jewelleryProducts.find((p) => p.id === productId);

  if (!product) {
    return (
      <div className="space-y-6">
        <Link
          href="/admin/jewellery-products"
          className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Jewellery Products
        </Link>
        <div className="bg-white p-6 rounded-sm border border-gray-100 text-center">
          <p className="text-gray-500">Product not found</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Link
        href="/admin/jewellery-products"
        className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Jewellery Products
      </Link>

      {/* General Info */}
      <div className="bg-white border border-gray-100 rounded-sm shadow-sm p-6">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h1 className="text-2xl">{product.name}</h1>
            <p className="text-sm text-gray-500 mt-2">Product ID: {product.id}</p>
            <p className="text-sm text-gray-500 mt-2">Slug: {product.slug || '-'}</p>
            <p className="text-sm text-gray-500 mt-2">Category ID: {product.category_id || '-'}</p>
          </div>
          <div className="text-right">
            <span
              className={`px-3 py-1 text-sm rounded inline-block ${
                product.available
                  ? "bg-green-50 text-green-600"
                  : "bg-red-50 text-red-600"
              }`}
            >
              {product.available ? "Available" : "Unavailable"}
            </span>
            {product.badge && (
              <span className="ml-2 px-2 py-1 text-xs rounded bg-yellow-100 text-yellow-800">
                {product.badge}
              </span>
            )}
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <p className="text-xs text-gray-500 uppercase mb-1">Price</p>
            <p className="text-2xl text-brandblack">
              Rs.{(product.price || 0).toLocaleString()}
            </p>
          </div>
          <div>
            <p className="text-xs text-gray-500 uppercase mb-1">Sale Price</p>
            <p className="text-2xl text-brandblack">
              {product.sale_price
                ? `Rs.${(product.sale_price || 0).toLocaleString()}`
                : "-"}
            </p>
          </div>
          <div>
            <p className="text-xs text-gray-500 uppercase mb-1">Pricing Type</p>
            <p className="text-lg font-medium">{product.pricing_type || "-"}</p>
          </div>
        </div>
      </div>

      {/* Metal & Collection */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white border border-gray-100 rounded-sm shadow-sm p-6">
          <h3 className="text-lg mb-4">Metal & Collection</h3>
          <div className="space-y-3">
            <div className="flex justify-between pb-3 border-b border-gray-100">
              <span className="text-gray-600">Metal Type</span>
              <span className="font-medium">{product.metal_type || "-"}</span>
            </div>
            <div className="flex justify-between pb-3 border-b border-gray-100">
              <span className="text-gray-600">Collection</span>
              <span className="font-medium">{product.collection || "-"}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Style</span>
              <span className="font-medium">{product.style || "-"}</span>
            </div>
          </div>
        </div>

        {/* Gems & Setting */}
        <div className="bg-white border border-gray-100 rounded-sm shadow-sm p-6">
          <h3 className="text-lg mb-4">Gems & Setting</h3>
          <div className="space-y-3">
            <div className="flex justify-between pb-3 border-b border-gray-100">
              <span className="text-gray-600">Primary Gem Type</span>
              <span className="font-medium">{product.primary_gem_type || "-"}</span>
            </div>
            <div className="flex justify-between pb-3 border-b border-gray-100">
              <span className="text-gray-600">Setting Type</span>
              <span className="font-medium">{product.setting_type || "-"}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Secondary Gem Details</span>
              <span className="font-medium">{product.secondary_gem_details || "-"}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Craftsmanship & Details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white border border-gray-100 rounded-sm shadow-sm p-6">
          <h3 className="text-lg mb-4">Craftsmanship</h3>
          <div className="space-y-3">
            <div className="flex justify-between pb-3 border-b border-gray-100">
              <span className="text-gray-600">Craftsmanship</span>
              <span className="font-medium">{product.craftsmanship || "-"}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Hallmark Details</span>
              <span className="font-medium">{product.hallmark_details || "-"}</span>
            </div>
          </div>
        </div>

        {/* Sizes */}
        <div className="bg-white border border-gray-100 rounded-sm shadow-sm p-6">
          <h3 className="text-lg mb-4">Sizing</h3>
          <div className="space-y-3">
            <div className="flex justify-between pb-3 border-b border-gray-100">
              <span className="text-gray-600">Size Type</span>
              <span className="font-medium">{product.size_type || "-"}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Available Sizes</span>
              <span className="font-medium">
                {product.sizes
                  ? Array.isArray(product.sizes)
                    ? product.sizes.join(", ")
                    : product.sizes
                  : "-"}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Certification */}
      <div className="bg-white border border-gray-100 rounded-sm shadow-sm p-6">
        <h3 className="text-lg mb-4">Certification</h3>
        <div className="space-y-3">
          <div className="flex justify-between pb-3 border-b border-gray-100">
            <span className="text-gray-600">Can Get Certificate</span>
            <span className="font-medium">{product.can_get_certificate ? "Yes" : "No"}</span>
          </div>
          <div className="flex justify-between pb-3 border-b border-gray-100">
            <span className="text-gray-600">Certificate Price</span>
            <span className="font-medium">{product.certificate_price ? `Rs.${product.certificate_price}` : "-"}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Certificate Description</span>
            <span className="font-medium">{product.certificate_description || "-"}</span>
          </div>
        </div>
      </div>

      {/* Gallery */}
      {product.gallery && product.gallery.length > 0 && (
        <div className="bg-white border border-gray-100 rounded-sm shadow-sm p-6">
          <h3 className="text-lg mb-4">Gallery</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {product.gallery.map((image: string, idx: number) => (
              <img
                key={idx}
                src={image}
                alt={`${product.name} - ${idx + 1}`}
                className="w-full h-40 object-cover rounded bg-gray-100"
              />
            ))}
          </div>
        </div>
      )}

      {/* Image */}
      {product.image && (
        <div className="bg-white border border-gray-100 rounded-sm shadow-sm p-6">
          <h3 className="text-lg mb-4">Main Image</h3>
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-60 object-cover rounded bg-gray-100"
          />
        </div>
      )}

      {/* Description */}
      {product.description && (
        <div className="bg-white border border-gray-100 rounded-sm shadow-sm p-6">
          <h3 className="text-lg mb-4">Description</h3>
          <p className="text-gray-700 text-sm">{product.description}</p>
        </div>
      )}

      {/* Video */}
      {product.videoUrl && (
        <div className="bg-white border border-gray-100 rounded-sm shadow-sm p-6">
          <h3 className="text-lg mb-4">Video</h3>
          <video controls className="w-full h-60 rounded">
            <source src={product.videoUrl} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      )}
    </div>
  );
}
