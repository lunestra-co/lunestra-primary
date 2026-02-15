"use client";
import React, { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import {
  getCartItems,
  CartItem,
  removeFromCart,
} from "@/components/CartSidebar";
import Button from "@/components/Button";
import {
  Shield,
  Lock,
  Clock,
  Gift,
  CreditCard,
  CheckCircle2,
} from "lucide-react";

export default function CheckoutPage() {
  const [paymentMethod, setPaymentMethod] = useState("Payhere");
  const [paymentSlip, setPaymentSlip] = useState<File | null>(null);
  const [paymentSlipPreview, setPaymentSlipPreview] = useState<string | null>(
    null,
  );
  const [currency, setCurrency] = useState("USD");
  const [timeLeft, setTimeLeft] = useState(900); // 15 minutes in seconds
  const [addVideoMessage, setAddVideoMessage] = useState(false);
  const [addCraftingVoucher, setAddCraftingVoucher] = useState(false);
  const [selectedShop, setSelectedShop] = useState("");
  const [voucherPrice, setVoucherPrice] = useState(500);
  const [isProcessing, setIsProcessing] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [products, setProducts] = useState<any[]>([]);
  const [couponCode, setCouponCode] = useState("");
  const [paymentSlipUrl, setPaymentSlipUrl] = useState<string | null>(null);
  const [uploadingSlip, setUploadingSlip] = useState(false);

  // Form fields
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");
  const [city, setCity] = useState("");
  const [postal, setPostal] = useState("");

  // IP Detection Simulation
  useEffect(() => {
    // In a real app, this would fetch from an IP geolocation service
    setCurrency("USD");
  }, []);

  // Fetch cart items and products
  useEffect(() => {
    const updateCart = async () => {
      const items = getCartItems();
      setCartItems(items);
      const ids = items.map((item) => item.productId);
      if (ids.length > 0) {
        const supabase = createClient();
        // Fetch from both gem_products and jewellery_products tables
        const { data: gemProducts, error: gemError } = await supabase
          .from("gem_products")
          .select("*, category:category_id(name, slug)")
          .in("id", ids);
        const { data: jewelleryProducts, error: jewError } = await supabase
          .from("jewellery_products")
          .select("*, category:category_id(name, slug)")
          .in("id", ids);

        const allProducts = [
          ...(gemProducts || []),
          ...(jewelleryProducts || []),
        ];
        setProducts(allProducts || []);
      } else {
        setProducts([]);
      }
    };
    updateCart();
    const onStorage = () => updateCart();
    const onCartUpdated = () => updateCart();
    window.addEventListener("storage", onStorage);
    window.addEventListener("cart-updated", onCartUpdated);
    return () => {
      window.removeEventListener("storage", onStorage);
      window.removeEventListener("cart-updated", onCartUpdated);
    };
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

  const uploadPaymentSlip = async () => {
    if (!paymentSlip) return null;

    setUploadingSlip(true);
    try {
      const formData = new FormData();
      formData.append("file", paymentSlip);

      const response = await fetch("/api/upload-slip", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const error = await response.json();
        alert(`Upload failed: ${error.error}`);
        return null;
      }

      const data = await response.json();
      setPaymentSlipUrl(data.url);
      return data.url;
    } catch (error) {
      console.error("Upload error:", error);
      alert("Failed to upload payment slip. Please try again.");
      return null;
    } finally {
      setUploadingSlip(false);
    }
  };

  const handlePayment = async () => {
    // Validate required fields
    if (
      !firstName ||
      !lastName ||
      !email ||
      !phone ||
      !address1 ||
      !city ||
      !postal
    ) {
      alert("Please fill in all required shipping address fields.");
      return;
    }

    // If bank transfer, upload slip first
    if (paymentMethod === "BankTransfer" && paymentSlip && !paymentSlipUrl) {
      const slipUrl = await uploadPaymentSlip();
      if (!slipUrl) {
        alert("Please upload a valid payment slip to proceed.");
        return;
      }
    }

    setIsProcessing(true);
    try {
      const supabase = createClient();

      // Get current user (can be null for guest)
      const {
        data: { user },
      } = await supabase.auth.getUser();
      // No login required for guest checkout

      // Calculate totals
      let subtotal = 0;
      const orderItems: any[] = [];
      products.forEach((product) => {
        let price = 0;
        if (typeof product.price === "number") price = product.price;
        else if (typeof product.price === "string")
          price = parseFloat(product.price.replace(/[^\d.]/g, ""));

        const cartItem = cartItems.find(
          (item) => item.productId === product.id,
        );

        const certificatePrice = product.certificate_price || 1000;
        const needsCertificate = cartItem?.need_cert || false;

        if (needsCertificate) price += certificatePrice;

        subtotal += price;
        orderItems.push({
          product_id: product.id,
          product_name: product.name,
          price: price,
          quantity: 1,
          needs_certificate: needsCertificate,
          certificate_price: needsCertificate ? certificatePrice : null,
          selected_size: cartItem?.selectedSize || null,
        });
      });

      if (addCraftingVoucher) subtotal += voucherPrice;

      const total = subtotal;

      // Create order object (no manual order_number)
      const orderData = {
        user_id: user ? user.id : null,
        status: "pending",
        payment_method: paymentMethod,

        // Shipping info
        first_name: firstName,
        last_name: lastName,
        email: email,
        phone: phone,
        address1: address1,
        address2: address2 || null,
        city: city,
        postal: postal,

        // Order totals
        coupon_code: couponCode || null,
        coupon_discount: 0, // Will be calculated based on coupon
        total: total,
        shipping: 0,

        // Payment details
        payment_slip_url: paymentSlipUrl || null,
        add_crafting_voucher: addCraftingVoucher,
        selected_shop: addCraftingVoucher ? selectedShop : null,
        voucher_price: addCraftingVoucher ? voucherPrice : null,

        // Items
        items: orderItems,
      };

      // Insert order into Supabase
      const { data, error } = await supabase
        .from("orders")
        .insert([orderData])
        .select();

      if (error) {
        console.error("Order creation error:", error);
        alert(`Failed to create order: ${error.message}`);
        setIsProcessing(false);
        return;
      }

      // Mark all ordered products as unavailable
      const productIds = products.map((p) => p.id);
      if (productIds.length > 0) {
        // Update both gem_products and jewellery_products tables
        const { error: gemUpdateError } = await supabase
          .from("gem_products")
          .update({ available: false })
          .in("id", productIds);
        const { error: jewUpdateError } = await supabase
          .from("jewellery_products")
          .update({ available: false })
          .in("id", productIds);

        if (gemUpdateError || jewUpdateError) {
          console.error(
            "Product update error:",
            gemUpdateError || jewUpdateError,
          );
          alert("Failed to update product availability. Please try again.");
          setIsProcessing(false);
          return;
        }
      }

      // Clear cart and ensure event is dispatched before redirect
      localStorage.removeItem("cartItems");
      window.dispatchEvent(new Event("cart-updated"));
      setCartItems([]); // Immediately update UI state
      // Wait a short moment to ensure cart state is updated
      await new Promise((resolve) => setTimeout(resolve, 200));

      const orderId = data?.[0]?.id;
      const orderNumber =
        data?.[0]?.order_number || `ORD-${data?.[0]?.order_seq}`;

      // Redirect to success page with orderNumber in query
      window.location.href = `/order-success/${orderId}?orderNumber=${orderNumber}`;
    } catch (error) {
      console.error("Payment error:", error);
      alert("An error occurred while processing your order. Please try again.");
      setIsProcessing(false);
    }
  };

  if (products.length === 0) {
    return (
      <div className="pt-40 text-center">
        Your cart is empty.{" "}
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
        <div className="flex flex-col md:flex-row justify-between items-center mb-6 border-b border-gray-200 pb-6">
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
            {/* Reservation Notice removed as requested */}

            {/* Billing Form (Simplified) */}
            <div className="bg-white p-8 shadow-sm border border-gray-100">
              <h3 className="font-serif text-xl mb-6">Shipping Address</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* ...existing code... */}
                <div className="flex flex-col">
                  <label
                    htmlFor="firstName"
                    className="mb-1 text-xs font-semibold text-gray-700"
                  >
                    First Name
                  </label>
                  <input
                    id="firstName"
                    type="text"
                    placeholder="e.g. Dinushi"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="p-3 border border-gray-200 text-sm focus:border-sapphire outline-none"
                  />
                </div>
                <div className="flex flex-col">
                  <label
                    htmlFor="lastName"
                    className="mb-1 text-xs font-semibold text-gray-700"
                  >
                    Last Name
                  </label>
                  <input
                    id="lastName"
                    type="text"
                    placeholder="e.g. Herath"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="p-3 border border-gray-200 text-sm focus:border-sapphire outline-none"
                  />
                </div>
                <div className="flex flex-col md:col-span-2">
                  <label
                    htmlFor="email"
                    className="mb-1 text-xs font-semibold text-gray-700"
                  >
                    Email Address
                  </label>
                  <input
                    id="email"
                    type="email"
                    placeholder="e.g. lunestraco@gmail.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="p-3 border border-gray-200 text-sm focus:border-sapphire outline-none"
                  />
                </div>
                <div className="flex flex-col md:col-span-2">
                  <label
                    htmlFor="phone"
                    className="mb-1 text-xs font-semibold text-gray-700"
                  >
                    Phone Number
                  </label>
                  <input
                    id="phone"
                    type="tel"
                    placeholder="e.g. 0771234567"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="p-3 border border-gray-200 text-sm focus:border-sapphire outline-none"
                  />
                </div>
                <div className="flex flex-col md:col-span-2">
                  <label
                    htmlFor="address1"
                    className="mb-1 text-xs font-semibold text-gray-700"
                  >
                    Address Line 1
                  </label>
                  <input
                    id="address1"
                    type="text"
                    placeholder="e.g. 123 Galle Road"
                    value={address1}
                    onChange={(e) => setAddress1(e.target.value)}
                    className="p-3 border border-gray-200 text-sm focus:border-sapphire outline-none"
                  />
                </div>
                <div className="flex flex-col md:col-span-2">
                  <label
                    htmlFor="address2"
                    className="mb-1 text-xs font-semibold text-gray-700"
                  >
                    Address Line 2{" "}
                    <span className="text-gray-400">(optional)</span>
                  </label>
                  <input
                    id="address2"
                    type="text"
                    placeholder="e.g. Apartment 4B"
                    value={address2}
                    onChange={(e) => setAddress2(e.target.value)}
                    className="p-3 border border-gray-200 text-sm focus:border-sapphire outline-none"
                  />
                </div>
                <div className="flex flex-col">
                  <label
                    htmlFor="city"
                    className="mb-1 text-xs font-semibold text-gray-700"
                  >
                    City
                  </label>
                  <input
                    id="city"
                    type="text"
                    placeholder="e.g. Colombo"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="p-3 border border-gray-200 text-sm focus:border-sapphire outline-none"
                  />
                </div>
                <div className="flex flex-col">
                  <label
                    htmlFor="postal"
                    className="mb-1 text-xs font-semibold text-gray-700"
                  >
                    Postal Code
                  </label>
                  <input
                    id="postal"
                    type="text"
                    placeholder="e.g. 00300"
                    value={postal}
                    onChange={(e) => setPostal(e.target.value)}
                    className="p-3 border border-gray-200 text-sm focus:border-sapphire outline-none"
                  />
                </div>
                {/* Region and currency info removed as requested */}
              </div>
            </div>

            {/* Payment Method Block */}
            <div className="bg-white p-8 shadow-sm border border-gray-100 mt-8">
              <h3 className="font-serif text-xl mb-6">Payment Method</h3>
              <div className="flex gap-2 mb-4">
                <label
                  className={`flex-1 text-center py-3 border rounded cursor-pointer font-semibold transition-colors ${paymentMethod === "MarxPay" ? "bg-sapphire text-white border-sapphire" : "bg-white text-brandblack border-gray-200"}`}
                >
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="MarxPay"
                    checked={paymentMethod === "MarxPay"}
                    onChange={() => setPaymentMethod("MarxPay")}
                    className="hidden"
                  />
                  Marx Pay
                </label>
                <label
                  className={`flex-1 text-center py-3 border rounded cursor-pointer font-semibold transition-colors ${paymentMethod === "BankTransfer" ? "bg-sapphire text-white border-sapphire" : "bg-white text-brandblack border-gray-200"}`}
                >
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="BankTransfer"
                    checked={paymentMethod === "BankTransfer"}
                    onChange={() => setPaymentMethod("BankTransfer")}
                    className="hidden"
                  />
                  Bank Transfer
                </label>
                <label
                  className={`flex-1 text-center py-3 border rounded cursor-not-allowed font-semibold transition-colors bg-gray-100 text-gray-400 border-gray-200 opacity-60`}
                >
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="KOKO"
                    checked={paymentMethod === "KOKO"}
                    onChange={() => {}}
                    className="hidden"
                    disabled
                  />
                  KOKO{" "}
                  <span className="text-xs text-gray-400">
                    (3 installments)
                  </span>
                </label>
                <label
                  className={`flex-1 text-center py-3 border rounded cursor-not-allowed font-semibold transition-colors bg-gray-100 text-gray-400 border-gray-200 opacity-60`}
                >
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="MintPay"
                    checked={paymentMethod === "MintPay"}
                    onChange={() => {}}
                    className="hidden"
                    disabled
                  />
                  MintPay{" "}
                  <span className="text-xs text-gray-400">
                    (3 installments)
                  </span>
                </label>
              </div>
              {(paymentMethod === "KOKO" || paymentMethod === "MintPay") && (
                <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded">
                  <h4 className="font-semibold mb-2">Installment Breakdown</h4>
                  {(() => {
                    let subtotal = 0;
                    products.forEach((product) => {
                      let price = 0;
                      if (typeof product.price === "number")
                        price = product.price;
                      else if (typeof product.price === "string")
                        price = parseFloat(
                          product.price.replace(/[^\d.]/g, ""),
                        );
                      const cartItem = cartItems.find(
                        (item) => item.productId === product.id,
                      );
                      if (cartItem?.need_cert) price += 1000;
                      subtotal += price;
                    });
                    if (addCraftingVoucher) subtotal += voucherPrice;
                    const installment = subtotal / 3;
                    return (
                      <ul className="text-sm">
                        <li>
                          Pay now:{" "}
                          <span className="font-bold">
                            LKR{" "}
                            {installment.toLocaleString("en-US", {
                              minimumFractionDigits: 2,
                              maximumFractionDigits: 2,
                            })}
                          </span>
                        </li>
                        <li>
                          Next month:{" "}
                          <span className="font-bold">
                            LKR{" "}
                            {installment.toLocaleString("en-US", {
                              minimumFractionDigits: 2,
                              maximumFractionDigits: 2,
                            })}
                          </span>
                        </li>
                        <li>
                          Month after:{" "}
                          <span className="font-bold">
                            LKR{" "}
                            {installment.toLocaleString("en-US", {
                              minimumFractionDigits: 2,
                              maximumFractionDigits: 2,
                            })}
                          </span>
                        </li>
                      </ul>
                    );
                  })()}
                </div>
              )}
              {paymentMethod === "BankTransfer" && (
                <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded">
                  <h4 className="font-semibold mb-2">Bank Transfer Details</h4>
                  <div className="text-sm mb-4">
                    <div>
                      <span className="font-bold">Bank:</span> Commercial Bank
                      of Ceylon PLC
                    </div>
                    <div>
                      <span className="font-bold">Branch:</span> Kottawa
                    </div>
                    <div>
                      <span className="font-bold">Account Name:</span> Lunestra
                    </div>
                    <div>
                      <span className="font-bold">Account Number:</span>{" "}
                      8029227156
                    </div>
                  </div>
                  <div className="mb-2 font-semibold">Upload Payment Slip</div>
                  <input
                    type="file"
                    accept="image/*,application/pdf"
                    onChange={(e) => {
                      const file = e.target.files?.[0] || null;
                      setPaymentSlip(file);
                      setPaymentSlipUrl(null); // Reset URL when new file is selected
                      if (file) {
                        const reader = new FileReader();
                        reader.onload = () =>
                          setPaymentSlipPreview(reader.result as string);
                        reader.readAsDataURL(file);
                      } else {
                        setPaymentSlipPreview(null);
                      }
                    }}
                    className="mb-2"
                    disabled={uploadingSlip}
                  />
                  {paymentSlipUrl && (
                    <div className="mb-2 p-2 bg-green-50 border border-green-200 rounded text-xs text-green-700">
                      ✓ Payment slip uploaded successfully
                    </div>
                  )}
                  {paymentSlipPreview && (
                    <div className="mt-2">
                      <div className="mb-1 text-xs text-gray-600">Preview:</div>
                      <img
                        src={paymentSlipPreview}
                        alt="Payment Slip Preview"
                        className="max-h-40 rounded border"
                      />
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Bespoke Add-ons */}
            <div className="bg-white p-8 shadow-sm border border-gray-100">
              <h3 className="font-serif text-xl mb-6">Bespoke Options</h3>

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
                  </div>
                  <p className="text-xs text-gray-500">
                    Pre-pay a deposit for a ring or pendant setting with one of
                    our partner ateliers.
                  </p>
                </div>
              </label>
              {addCraftingVoucher && (
                <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex flex-col">
                    <label
                      htmlFor="shop"
                      className="mb-1 text-xs font-semibold text-gray-700"
                    >
                      Select Shop
                    </label>
                    <select
                      id="shop"
                      value={selectedShop}
                      onChange={(e) => setSelectedShop(e.target.value)}
                      className="p-3 border border-gray-200 text-sm focus:border-sapphire outline-none"
                    >
                      <option value="">Choose a shop</option>
                      <option value="Lunesh Atelier">Lunesh Atelier</option>
                      <option value="Colombo Jewellers">
                        Colombo Jewellers
                      </option>
                      <option value="Kandy Gems">Kandy Gems</option>
                      <option value="Rathnapura Gold">Rathnapura Gold</option>
                    </select>
                  </div>
                  <div className="flex flex-col">
                    <label
                      htmlFor="voucherPrice"
                      className="mb-1 text-xs font-semibold text-gray-700"
                    >
                      Voucher Price
                    </label>
                    <select
                      id="voucherPrice"
                      value={voucherPrice}
                      onChange={(e) => setVoucherPrice(Number(e.target.value))}
                      className="p-3 border border-gray-200 text-sm focus:border-sapphire outline-none"
                    >
                      <option value={500}>LKR 500.00</option>
                      <option value={1000}>LKR 1,000.00</option>
                      <option value={2500}>LKR 2,500.00</option>
                      <option value={5000}>LKR 5,000.00</option>
                    </select>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right Column: Coupon & Order Summary */}
          <div className="lg:w-1/3">
            {/* Coupon Code Input */}
            <div className="bg-white p-8 shadow-sm border border-gray-100 mb-6">
              <h3 className="font-serif text-xl mb-4">Coupon Code</h3>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  placeholder="Enter coupon code"
                  className="p-3 border border-gray-200 text-sm focus:border-sapphire outline-none flex-1"
                />
                <Button
                  variant="secondary"
                  className="px-4"
                  disabled={!couponCode.trim()}
                  onClick={() => {}}
                >
                  Apply
                </Button>
              </div>
            </div>
            <div className="bg-white p-8 shadow-sm border border-gray-100 sticky top-32">
              <h3 className="font-serif text-xl mb-6">Order Summary</h3>

              <ul className="divide-y divide-gold/10 mb-6 border-b border-gray-100 pb-6">
                {products.map((product) => {
                  const cartItem = cartItems.find(
                    (item) => item.productId === product.id,
                  );
                  return (
                    <li
                      key={product.id}
                      className="flex gap-4 py-4 items-center"
                    >
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-20 h-20 object-cover rounded border border-gold/10"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="font-serif text-lg leading-5">
                          {product.name}
                        </p>
                        <p className="text-xs text-gray-500 mt-2">
                          {product.carats ? `${product.carats}ct ` : ""}
                          {product.category?.name || "Uncategorized"}
                        </p>
                        {cartItem?.need_cert && (
                          <div className="inline-block text-[10px] px-2 py-0.5 rounded bg-blue-50 text-blue-700 border border-blue-200 font-semibold mt-1">
                            Certificate Requested
                          </div>
                        )}
                        {cartItem?.selectedSize && (
                          <div className="inline-block text-[10px] px-2 py-0.5 rounded bg-gray-100 text-gray-700 border border-gray-300 font-semibold mt-1 ml-2">
                            Size: {cartItem.selectedSize}
                          </div>
                        )}
                      </div>
                      <div className="text-right">
                        <span className="font-serif text-lg text-gold font-bold lining-nums">
                          {product.sale_price ? (
                            <>
                              LKR{" "}
                              {product.sale_price.toLocaleString("en-US", {
                                minimumFractionDigits: 2,
                                maximumFractionDigits: 2,
                              })}
                              <br />
                              {product.price && (
                                <span className="line-through text-gray-400 ml-2">
                                  LKR{" "}
                                  {product.price.toLocaleString("en-US", {
                                    minimumFractionDigits: 2,
                                    maximumFractionDigits: 2,
                                  })}
                                </span>
                              )}
                            </>
                          ) : product.price ? (
                            <>
                              LKR{" "}
                              {product.price.toLocaleString("en-US", {
                                minimumFractionDigits: 2,
                                maximumFractionDigits: 2,
                              })}
                            </>
                          ) : (
                            ""
                          )}
                        </span>
                      </div>
                    </li>
                  );
                })}
              </ul>

              <div className="space-y-3 text-sm mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span>
                    {(() => {
                      let subtotal = 0;
                      products.forEach((product) => {
                        let price = 0;
                        if (typeof product.price === "number")
                          price = product.price;
                        else if (typeof product.price === "string")
                          price = parseFloat(
                            product.price.replace(/[^\d.]/g, ""),
                          );
                        const cartItem = cartItems.find(
                          (item) => item.productId === product.id,
                        );
                        if (cartItem?.need_cert) price += 1000;
                        subtotal += price;
                      });
                      return `LKR ${subtotal.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
                    })()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping (Insured)</span>
                  <span className="text-green-700">Free</span>
                </div>
                {addCraftingVoucher && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Crafting Voucher</span>
                    <span>LKR 500.00</span>
                  </div>
                )}
              </div>

              <div className="flex justify-between items-center mb-8">
                <span className="font-serif text-xl">Total</span>
                <span className="font-serif text-xl font-bold lining-nums">
                  {(() => {
                    let subtotal = 0;
                    products.forEach((product) => {
                      let price = 0;
                      if (typeof product.price === "number")
                        price = product.price;
                      else if (typeof product.price === "string")
                        price = parseFloat(
                          product.price.replace(/[^\d.]/g, ""),
                        );
                      const cartItem = cartItems.find(
                        (item) => item.productId === product.id,
                      );
                      if (cartItem?.need_cert) price += 1000;
                      subtotal += price;
                    });
                    if (addCraftingVoucher) subtotal += voucherPrice;
                    return `LKR ${subtotal.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
                  })()}
                </span>
              </div>

              <Button
                variant="primary"
                className="w-full mb-4 flex justify-center"
                onClick={handlePayment}
                disabled={
                  isProcessing ||
                  uploadingSlip ||
                  (paymentMethod === "BankTransfer" && !paymentSlip)
                }
              >
                {uploadingSlip
                  ? "Uploading slip..."
                  : isProcessing
                    ? "Processing..."
                    : "Complete Acquisition"}
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
