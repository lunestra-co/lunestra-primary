"use client";
import React from "react";
import { useParams } from "next/navigation";
import { useAdmin } from "../../AdminContext";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function GemProductDetail() {
  const params = useParams();
  const productId = params?.productId as string;
  const { gemProducts } = useAdmin();

  const product = gemProducts.find((p) => p.id === productId);

  if (!product) {
    return (
      <div className="space-y-6">
        <Link
          href="/admin/gem-products"
          className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Gem Products
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
        href="/admin/gem-products"
        className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Gem Products
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
              {product.sale_price ? `Rs.${(product.sale_price || 0).toLocaleString()}` : "-"}
            </p>
          </div>
          <div>
            <p className="text-xs text-gray-500 uppercase mb-1">Weight</p>
            <p className="text-lg font-medium">
              {product.weight ? `${product.weight}ct` : "-"}
            </p>
          </div>
        </div>
      </div>

      {/* Characteristics */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white border border-gray-100 rounded-sm shadow-sm p-6">
          <h3 className="text-lg mb-4">Characteristics</h3>
          <div className="space-y-3">
            <div className="flex justify-between pb-3 border-b border-gray-100">
              <span className="text-gray-600">Shape</span>
              <span className="font-medium">{product.shape || "-"}</span>
            </div>
            <div className="flex justify-between pb-3 border-b border-gray-100">
              <span className="text-gray-600">Color</span>
              <span className="font-medium">{product.color || "-"}</span>
            </div>
            <div className="flex justify-between pb-3 border-b border-gray-100">
              <span className="text-gray-600">Clarity</span>
              <span className="font-medium">{product.clarity || "-"}</span>
            </div>
            <div className="flex justify-between pb-3 border-b border-gray-100">
              <span className="text-gray-600">Origin</span>
              <span className="font-medium">{product.origin || "-"}</span>
            </div>
            <div className="flex justify-between pb-3 border-b border-gray-100">
              <span className="text-gray-600">Transparency</span>
              <span className="font-medium">{product.transparency || "-"}</span>
            </div>
            <div className="flex justify-between pb-3 border-b border-gray-100">
              <span className="text-gray-600">Dimensions</span>
              <span className="font-medium">{product.dimensions || "-"}</span>
            </div>
            <div className="flex justify-between pb-3 border-b border-gray-100">
              <span className="text-gray-600">Treatment</span>
              <span className="font-medium">{product.treatment || "-"}</span>
            </div>
          </div>
        </div>

        {/* Rarity & Scope */}
        <div className="bg-white border border-gray-100 rounded-sm shadow-sm p-6">
          <h3 className="text-lg mb-4">Rarity & Scope</h3>
          <div className="space-y-3">
            <div className="flex justify-between pb-3 border-b border-gray-100">
              <span className="text-gray-600">Rarity Score</span>
              <span className="font-medium">{product.rarity_score || '-'}</span>
            </div>
            <div className="flex justify-between pb-3 border-b border-gray-100">
              <span className="text-gray-600">Rarity Percentile</span>
              <span className="font-medium">{product.rarity_percentile || '-'}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Rarity Scope</span>
              <span className="font-medium">{product.rarity_scope || '-'}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Certification & Pricing */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white border border-gray-100 rounded-sm shadow-sm p-6">
          <h3 className="text-lg mb-4">Certification</h3>
          <div className="space-y-3">
            <div className="flex justify-between pb-3 border-b border-gray-100">
              <span className="text-gray-600">Certification</span>
              <span className="font-medium">{product.certification || '-'}</span>
            </div>
            <div className="flex justify-between pb-3 border-b border-gray-100">
              <span className="text-gray-600">Can Get Certificate</span>
              <span className="font-medium">{product.can_get_certificate ? 'Yes' : 'No'}</span>
            </div>
            <div className="flex justify-between pb-3 border-b border-gray-100">
              <span className="text-gray-600">Certificate Price</span>
              <span className="font-medium">{product.certificate_price ? `Rs.${product.certificate_price}` : '-'}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Certificate Description</span>
              <span className="font-medium">{product.certificate_description || '-'}</span>
            </div>
          </div>
        </div>

        <div className="bg-white border border-gray-100 rounded-sm shadow-sm p-6">
          <h3 className="text-lg mb-4">Pricing Type</h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600">Pricing Type</span>
              <span className="font-medium">{product.pricing_type || '-'}</span>
            </div>
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
