"use client";
import React, { useState, useEffect } from "react";
import { ALL_PRODUCTS } from "@/constants";
import Button from "@/components/Button";
import {
  Shield,
  Lock,
  Clock,
  Gift,
  CreditCard,
  CheckCircle2,
} from "lucide-react";

interface CheckoutPageProps {
  productId?: string;
}

export default function CheckoutPage({ productId }: CheckoutPageProps) {
  const [currency, setCurrency] = useState("USD");
  const [timeLeft, setTimeLeft] = useState(900); // 15 minutes in seconds
  const [addVideoMessage, setAddVideoMessage] = useState(false);
  const [addCraftingVoucher, setAddCraftingVoucher] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const product = ALL_PRODUCTS.find((p) => p.id === productId);

  // IP Detection Simulation
  useEffect(() => {
    // In a real app, this would fetch from an IP geolocation service
    const detectCurrency = () => {
      // Randomly assigning for demo purposes, biased to USD
      const currencies = ["USD", "EUR", "GBP", "SGD"];
      // Default to USD for this demo
      setCurrency("USD");
    };
    detectCurrency();
  }, []);

  // Timer Logic
  useEffect(() => {
    if (timeLeft <= 0) return;
    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s < 10 ? "0" : ""}${s}`;
  };

  const handlePayment = () => {
    setIsProcessing(true);
    setTimeout(() => {
      window.location.hash = "#vault";
    }, 2000);
  };

  if (!product) {
    return (
      <div className="pt-40 text-center">
        Product not found.{" "}
        <a href="#collection" className="underline">
          Return to collection
        </a>
        .
      </div>
    );
  }

  return (
    <div className="pt-32 pb-24 bg-gray-50 min-h-screen font-sans">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        {/* Trust Header */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-12 border-b border-gray-200 pb-6">
          <h1 className="font-serif text-3xl text-brandblack">
            Secure Acquisition
          </h1>
          <div className="flex items-center gap-6 mt-4 md:mt-0 text-xs text-gray-500">
            <span className="flex items-center gap-2">
              <Lock className="w-3 h-3" /> SSL Encrypted
            </span>
            <span className="flex items-center gap-2">
              <Shield className="w-3 h-3" /> Fully Insured Shipping
            </span>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-12">
          {/* Left Column: Details & Form */}
          <div className="lg:w-2/3 space-y-8">
            {/* Reservation Notice */}
            <div className="bg-sapphire/5 border border-sapphire/20 p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Clock className="w-5 h-5 text-sapphire" />
                <div>
                  <p className="text-sm font-bold text-sapphire">
                    Reserved for you
                  </p>
                  <p className="text-xs text-sapphire/80">
                    This item is temporarily held in your name.
                  </p>
                </div>
              </div>
              <span className="font-mono font-bold text-lg text-sapphire">
                {formatTime(timeLeft)}
              </span>
            </div>

            {/* Billing Form (Simplified) */}
            <div className="bg-white p-8 shadow-sm border border-gray-100">
              <h3 className="font-serif text-xl mb-6">Billing & Shipping</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <input
                  type="text"
                  placeholder="First Name"
                  className="p-3 border border-gray-200 text-sm focus:border-sapphire outline-none"
                />
                <input
                  type="text"
                  placeholder="Last Name"
                  className="p-3 border border-gray-200 text-sm focus:border-sapphire outline-none"
                />
                <input
                  type="email"
                  placeholder="Email Address"
                  className="p-3 border border-gray-200 text-sm focus:border-sapphire outline-none md:col-span-2"
                />
                <input
                  type="text"
                  placeholder="Address Line 1"
                  className="p-3 border border-gray-200 text-sm focus:border-sapphire outline-none md:col-span-2"
                />
                <input
                  type="text"
                  placeholder="City"
                  className="p-3 border border-gray-200 text-sm focus:border-sapphire outline-none"
                />
                <input
                  type="text"
                  placeholder="Postal Code"
                  className="p-3 border border-gray-200 text-sm focus:border-sapphire outline-none"
                />
                <div className="md:col-span-2 p-3 bg-gray-50 text-xs text-gray-500 flex justify-between">
                  <span>Detected Region: United States</span>
                  <span className="font-bold">Currency set to {currency}</span>
                </div>
              </div>
            </div>

            {/* Bespoke Add-ons */}
            <div className="bg-white p-8 shadow-sm border border-gray-100">
              <h3 className="font-serif text-xl mb-6">Bespoke Options</h3>

              {/* Video Message */}
              <label className="flex items-start gap-4 p-4 border border-gray-100 cursor-pointer hover:border-sapphire transition-colors mb-4">
                <input
                  type="checkbox"
                  checked={addVideoMessage}
                  onChange={() => setAddVideoMessage(!addVideoMessage)}
                  className="mt-1"
                />
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <Gift className="w-4 h-4 text-gold" />
                    <span className="font-bold text-sm">
                      Include Curated Video Message
                    </span>
                    <span className="text-xs text-green-600 font-bold uppercase ml-2">
                      Complimentary
                    </span>
                  </div>
                  <p className="text-xs text-gray-500">
                    Our gemologist will record a personalized video explaining
                    the stone's rarity, addressed to the recipient.
                  </p>
                </div>
              </label>

              {/* Crafting Voucher */}
              <label className="flex items-start gap-4 p-4 border border-gray-100 cursor-pointer hover:border-sapphire transition-colors">
                <input
                  type="checkbox"
                  checked={addCraftingVoucher}
                  onChange={() => setAddCraftingVoucher(!addCraftingVoucher)}
                  className="mt-1"
                />
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <CreditCard className="w-4 h-4 text-brandblack" />
                    <span className="font-bold text-sm">
                      Add Jewellery Crafting Voucher
                    </span>
                    <span className="text-xs text-brandblack font-bold uppercase ml-2">
                      +$500.00
                    </span>
                  </div>
                  <p className="text-xs text-gray-500">
                    Pre-pay a deposit for a ring or pendant setting with one of
                    our partner ateliers.
                  </p>
                </div>
              </label>
            </div>
          </div>

          {/* Right Column: Order Summary */}
          <div className="lg:w-1/3">
            <div className="bg-white p-8 shadow-sm border border-gray-100 sticky top-32">
              <h3 className="font-serif text-xl mb-6">Order Summary</h3>

              <div className="flex gap-4 mb-6 border-b border-gray-100 pb-6">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-20 h-20 object-cover"
                />
                <div>
                  <p className="font-serif text-lg">{product.name}</p>
                  <p className="text-xs text-gray-500">
                    {product.carats}ct {product.category}
                  </p>
                </div>
              </div>

              <div className="space-y-3 text-sm mb-6 border-b border-gray-100 pb-6">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span>{product.price}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping (Insured)</span>
                  <span className="text-green-700">Free</span>
                </div>
                {addCraftingVoucher && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Crafting Voucher</span>
                    <span>$500.00</span>
                  </div>
                )}
              </div>

              <div className="flex justify-between items-center mb-8">
                <span className="font-serif text-xl">Total</span>
                <span className="font-serif text-xl font-bold">
                  {addCraftingVoucher
                    ? `$${(product.priceValue + 500).toLocaleString()}`
                    : product.price}
                </span>
              </div>

              <Button
                variant="primary"
                className="w-full mb-4 flex justify-center"
                onClick={handlePayment}
                disabled={isProcessing}
              >
                {isProcessing ? "Processing..." : "Complete Acquisition"}
              </Button>

              <p className="text-[10px] text-gray-400 text-center leading-relaxed">
                By completing this purchase, you agree to our Terms of Sale.
                Returns accepted within 14 days of receipt for inspection.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
