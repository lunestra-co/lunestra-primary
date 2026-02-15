"use client";
import React, { useState } from "react";
import { MessageCircleMore } from "lucide-react";
import ProductActions from "@/components/ProductActions";
import SizeSelector from "@/components/SizeSelector";
import InquiryModal from "@/components/InquiryModal";

type JewelleryProductDetailsProps = {
  product: any;
  pricingType?: "priced" | "inquiry";
  canGetCertificate?: boolean;
  certificatePrice?: number;
  certificateDescription?: string;
};

export default function JewelleryProductDetails({
  product,
  pricingType = "priced",
  canGetCertificate = false,
  certificatePrice = 1000,
  certificateDescription = "Includes detailed authenticity certificate and care instructions",
}: JewelleryProductDetailsProps) {
  const [selectedSize, setSelectedSize] = useState<string | null>(null);

  return (
    <>
      <InquiryModal
        product={product}
        productType="jewellery"
        selectedSize={selectedSize || undefined}
      />
      {/* Size Selector - if available */}
      {product.size_type && product.sizes && (
        <SizeSelector
          sizeType={product.size_type}
          sizes={product.sizes}
          onSizeSelect={setSelectedSize}
        />
      )}

      {/* Actions Section */}
      <div className="space-y-4">
        {/* Buy Now & Add to Cart */}
        <ProductActions
          product={product}
          pricingType={pricingType}
          canGetCertificate={canGetCertificate}
          certificatePrice={certificatePrice}
          certificateDescription={certificateDescription}
          selectedSize={selectedSize || undefined}
        />

        {/* Secondary Actions */}
        <div className="flex gap-4">
          <a
            href="https://wa.me/"
            target="_blank"
            rel="noreferrer"
            className="flex-1 py-3 border border-gray-200 hover:border-brandblack text-brandblack flex items-center justify-center gap-2 text-[10px] font-bold uppercase tracking-widest transition-colors"
          >
            <MessageCircleMore className="w-4 h-4" /> Concierge
          </a>
        </div>
      </div>
    </>
  );
}
