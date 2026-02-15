"use client";
import React, { useState } from "react";

import Button from "./Button";
import { addToCart } from "./CartSidebar";

import { Product } from "@/types";

type ProductActionsProps = {
  product: Product;
  pricingType?: "priced" | "inquiry";
  canGetCertificate?: boolean;
  certificatePrice?: number;
  certificateDescription?: string;
  selectedSize?: string;
};

export default function ProductActions({
  product,
  pricingType = "priced",
  canGetCertificate = false,
  certificatePrice = 1000,
  certificateDescription = "Includes certification and detailed report",
  selectedSize,
}: ProductActionsProps) {
  // Allow 'available' property from DB even if not in Product type
  const available = (product as any).available;
  const [modalOpen, setModalOpen] = useState(false);
  const [withCert, setWithCert] = useState(false);
  const [pendingAction, setPendingAction] = useState<
    ((withCert: boolean) => void) | null
  >(null);

  // Use sale_price or salePrice depending on your schema
  const salePrice = (product as any).sale_price ?? (product as any).salePrice;
  const total = withCert
    ? (salePrice || product.price) + certificatePrice
    : salePrice || product.price;

  function handleAction(action: ((withCert: boolean) => void) | null) {
    if (pricingType === "inquiry") {
      // For inquiry items, just open inquiry modal/form
      return;
    }
    // If no certificate option available, just add to cart immediately
    if (!canGetCertificate) {
      addToCart(product.id, false, selectedSize);
      window.dispatchEvent(new Event("open-cart"));
      return;
    }
    setPendingAction(action);
    setModalOpen(true);
  }

  // Show inquiry button instead of buy/cart for inquiry-type products
  if (pricingType === "inquiry") {
    return (
      <>
        <div className="flex gap-4">
          <Button
            variant="primary"
            className={`flex-1 text-center py-4 text-xs font-bold uppercase tracking-widest transition-all duration-300 ${
              !available
                ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                : "bg-brandblack text-white hover:bg-gold cursor-pointer"
            }`}
            disabled={!available}
            onClick={() => {
              if (available) {
                // Open inquiry form/modal
                window.dispatchEvent(new Event("open-inquiry-form"));
              }
            }}
          >
            Request Inquiry
          </Button>
        </div>
      </>
    );
  }

  return (
    <>
      <div className="flex gap-4">
        <Button
          variant="primary"
          className={`flex-1 text-center py-4 text-xs font-bold uppercase tracking-widest transition-all duration-300 ${
            !available
              ? "bg-gray-100 text-gray-400 cursor-not-allowed"
              : "bg-brandblack text-white hover:bg-gold cursor-pointer"
          }`}
          disabled={!available}
          onClick={() => {
            if (available)
              handleAction(() => {
                /* handle buy now with cert */
              });
          }}
        >
          Buy Now
        </Button>
        <Button
          variant="secondary"
          className={`flex-1 py-4 text-xs font-bold uppercase tracking-widest border transition-all duration-300 ${
            !available
              ? "border-gray-200 text-gray-400 cursor-not-allowed"
              : "border-brandblack text-brandblack hover:bg-brandblack hover:text-white cursor-pointer"
          }`}
          disabled={!available}
          onClick={() => {
            if (available) handleAction(() => {});
          }}
        >
          Add to Cart
        </Button>
      </div>
      {modalOpen && (
        <div className="fixed inset-0 z-100 flex items-center justify-center m-0 pt-22">
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
            onClick={() => setModalOpen(false)}
          ></div>
          <div className="relative bg-white w-full max-w-md shadow-xl shadow-black/10 animate-fade-in-up overflow-hidden rounded-2xl border border-gray-100">
            <button
              onClick={() => setModalOpen(false)}
              className="absolute top-6 right-6 text-gray-400 hover:text-brandblack transition-colors z-20"
              aria-label="Close"
            >
              <svg width="24" height="24" fill="none" stroke="currentColor">
                <path
                  d="M18 6L6 18M6 6l12 12"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </button>
            <div className="flex flex-col">
              <div className="p-10 text-center">
                <h2 className="font-serif text-3xl text-brandblack mb-4">
                  {canGetCertificate
                    ? "Have a doubt?"
                    : "Complete Your Purchase"}
                </h2>
                {canGetCertificate && (
                  <p className="text-gray-600 text-xs mb-8 uppercase tracking-widest font-light">
                    {certificateDescription}
                  </p>
                )}
                {canGetCertificate && (
                  <label className="flex items-center justify-center gap-3 mb-8 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={withCert}
                      onChange={(e) => setWithCert(e.target.checked)}
                      className="accent-gold w-5 h-5 border-2 border-gold rounded focus:ring-2 focus:ring-gold"
                    />
                    <span className="text-base font-serif text-brandblack">
                      Add certificate{" "}
                      <span className="text-gold">
                        (+LKR{" "}
                        {certificatePrice.toLocaleString("en-US", {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        })}
                        )
                      </span>
                    </span>
                  </label>
                )}
                <div className="mb-8">
                  <span className="text-xs text-gray-400 mr-2 uppercase tracking-widest">
                    Total:
                  </span>
                  <span className="text-2xl font-serif font-bold text-brandblack">
                    LKR{" "}
                    {total.toLocaleString("en-US", {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </span>
                </div>
                <div className="flex gap-4 justify-center">
                  <button
                    className="flex-1 py-4 bg-brandblack text-white rounded uppercase text-xs font-bold tracking-widest hover:bg-gold hover:text-brandblack transition border-2 border-brandblack"
                    onClick={() => {
                      setModalOpen(false);
                      addToCart(
                        product.id,
                        canGetCertificate ? withCert : false,
                        selectedSize,
                      );
                      window.dispatchEvent(new Event("open-cart"));
                    }}
                  >
                    Confirm
                  </button>
                  <button
                    className="flex-1 py-4 bg-gray-100 text-gray-500 rounded uppercase text-xs font-bold tracking-widest hover:bg-gray-200 transition border-2 border-gray-200"
                    onClick={() => setModalOpen(false)}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
