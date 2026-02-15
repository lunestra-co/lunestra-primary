"use client";
import React, { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";

type InquiryModalProps = {
  product: any;
  productType: "gem" | "jewellery";
  selectedSize?: string;
};

export default function InquiryModal({
  product,
  productType,
  selectedSize,
}: InquiryModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    customer_name: "",
    email: "",
    whatsapp_number: "",
    message: "",
  });
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    const handleOpenInquiry = () => setIsOpen(true);
    window.addEventListener("open-inquiry-form", handleOpenInquiry);
    return () =>
      window.removeEventListener("open-inquiry-form", handleOpenInquiry);
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const supabase = createClient();

      // Only save required fields in product_details
      const productDetails = {
        product_category: productType,
        product_name: product.name,
        selected_size: selectedSize || null,
        product_id: product.id,
      };

      // Get user id if authenticated
      let userId = null;
      try {
        const {
          data: { user },
        } = await supabase.auth.getUser();
        userId = user?.id ?? null;
      } catch {
        userId = null;
      }

      const { error } = await supabase.from("product_inquiries").insert([
        {
          product_id: product.id,
          product_type: productType,
          product_name: product.name,
          product_details: JSON.stringify(productDetails),
          customer_name: formData.customer_name,
          email: formData.email,
          whatsapp_number: formData.whatsapp_number,
          message: formData.message || null,
          status: "pending",
          user_id: userId,
        },
      ]);

      if (error) {
        console.error("Error submitting inquiry:", error);
        alert("Failed to submit inquiry. Please try again.");
        return;
      }

      setSuccessMessage("Thank you! We'll contact you soon.");
      setFormData({
        customer_name: "",
        email: "",
        whatsapp_number: "",
        message: "",
      });

      setTimeout(() => {
        setIsOpen(false);
        setSuccessMessage("");
      }, 2000);
    } catch (error) {
      console.error("Inquiry submission error:", error);
      alert("An error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center m-0 pt-22">
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={() => setIsOpen(false)}
      ></div>
      <div className="relative bg-white w-full max-w-md shadow-xl shadow-black/10 animate-fade-in-up overflow-hidden rounded-2xl border border-gray-100">
        <button
          onClick={() => setIsOpen(false)}
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

        <div className="p-10">
          {successMessage ? (
            <div className="text-center">
              <h2 className="font-serif text-2xl text-brandblack mb-4">
                {successMessage}
              </h2>
              <p className="text-gray-600 text-sm">
                We'll reach out to you within 24 hours.
              </p>
            </div>
          ) : (
            <>
              <h2 className="font-serif text-3xl text-brandblack mb-2">
                Interested in This Product?
              </h2>
              <p className="text-gray-600 text-xs mb-6 uppercase tracking-widest font-light">
                Share your details and we'll get back to you soon
              </p>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs uppercase tracking-widest text-gray-600 mb-2 font-medium">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="customer_name"
                    value={formData.customer_name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-200 rounded focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold transition-colors"
                    placeholder="Your Name"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-widest text-gray-600 mb-2 font-medium">
                    Email *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-200 rounded focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold transition-colors"
                    placeholder="your@email.com"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-widest text-gray-600 mb-2 font-medium">
                    WhatsApp Number *
                  </label>
                  <input
                    type="tel"
                    name="whatsapp_number"
                    value={formData.whatsapp_number}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-200 rounded focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold transition-colors"
                    placeholder="+1 (555) 000-0000"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-widest text-gray-600 mb-2 font-medium">
                    Message (Optional)
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={3}
                    className="w-full px-4 py-3 border border-gray-200 rounded focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold transition-colors resize-none"
                    placeholder="Tell us more about your interest..."
                  />
                </div>

                <div className="flex gap-4 pt-4">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex-1 py-3 bg-brandblack text-white rounded uppercase text-xs font-bold tracking-widest hover:bg-gold hover:text-brandblack transition border-2 border-brandblack disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? "Sending..." : "Submit Inquiry"}
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsOpen(false)}
                    className="flex-1 py-3 bg-gray-100 text-gray-500 rounded uppercase text-xs font-bold tracking-widest hover:bg-gray-200 transition border-2 border-gray-200"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
