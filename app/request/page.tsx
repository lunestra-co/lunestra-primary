"use client";
import React, { useState, useEffect } from "react";
import Button from "@/components/Button";
import {
  ChevronLeft,
  Gem,
  Coins,
  Heart,
  Briefcase,
  User,
  Phone,
  Mail,
  ArrowRight,
  CheckCircle2,
  Diamond,
  Loader2,
  Globe,
  Clock,
} from "lucide-react";
import { createClient } from "@/lib/supabase/client";

const GEM_OPTIONS = [
  {
    title: "Precious Gemstones",
    options: [
      { id: "blue-sapphire", label: "Blue Sapphire" },
      { id: "pink-sapphire", label: "Pink Sapphire" },
      { id: "ruby", label: "Ruby" },
      { id: "spinel", label: "Spinel" },
    ],
  },
  {
    title: "Semi-Precious Gemstones",
    options: [
      { id: "topaz", label: "Topaz" },
      { id: "garnet", label: "Garnet" },
      { id: "amethyst", label: "Amethyst" },
      { id: "citrine", label: "Citrine" },
    ],
  },
];

const JEWELLERY_OPTIONS = [
  {
    title: "Jewellery Pieces",
    options: [
      { id: "ring", label: "Ring" },
      { id: "necklace", label: "Necklace" },
      { id: "bracelet", label: "Bracelet" },
      { id: "earrings", label: "Earrings" },
      { id: "brooch", label: "Brooch" },
      { id: "custom-jewellery", label: "Custom Piece" },
    ],
  },
];

const BUDGET_OPTIONS = [
  { id: "entry", label: "$1,000 - $3,000", desc: "Entry Level" },
  { id: "mid", label: "$3,000 - $10,000", desc: "Fine Jewellery" },
  { id: "high", label: "$10,000+", desc: "Investment Grade" },
];

const PURPOSE_OPTIONS = [
  { id: "investment", label: "Investment", icon: Coins },
  { id: "gift", label: "Gift", icon: Heart },
  { id: "jewellery", label: "Jewellery Crafting", icon: Diamond },
  { id: "collection", label: "Collection", icon: Briefcase },
];

const SHAPE_OPTIONS = [
  { id: "round", label: "Round" },
  { id: "cushion", label: "Cushion" },
  { id: "oval", label: "Oval" },
  { id: "emerald", label: "Emerald" },
  { id: "radiant", label: "Radiant" },
  { id: "marquise", label: "Marquise" },
  { id: "pear", label: "Pear" },
  { id: "no-preference", label: "No preference" },
];

const CLARITY_OPTIONS = [
  { id: "eye-clean", label: "Eye Clean" },
  { id: "premium", label: "Premium Grade" },
  { id: "gia-certified", label: "GIA Certified" },
  { id: "clarity-no-preference", label: "No preference" },
];

const COLOR_OPTIONS = [
  { id: "vivid", label: "Vivid & Saturated" },
  { id: "medium", label: "Medium Tone" },
  { id: "pastel", label: "Pastel & Light" },
  { id: "color-no-preference", label: "No preference" },
];

const METAL_OPTIONS = [
  { id: "18k-gold", label: "18K Gold" },
  { id: "platinum", label: "Platinum" },
  { id: "22k-gold", label: "22K Gold" },
  { id: "silver", label: "Silver" },
  { id: "rose-gold", label: "Rose Gold" },
  { id: "metal-no-preference", label: "No preference" },
];

const STYLE_OPTIONS = [
  { id: "contemporary", label: "Contemporary" },
  { id: "vintage", label: "Vintage" },
  { id: "minimalist", label: "Minimalist" },
  { id: "ornate", label: "Ornate" },
  { id: "style-no-preference", label: "No preference" },
];

export default function ConsultationPage() {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const [formData, setFormData] = useState<{
    productType: "gemstone" | "jewellery";
    gem: string;
    customGem: string;
    jewellery: string;
    customJewellery: string;
    weight: number;
    budget: string;
    purpose: string;
    name: string;
    whatsapp: string;
    email: string;
    gemstoneShape: string;
    gemstoneColor: string;
    gemstoneClarity: string;
    jewelleryMetal: string;
    jewelleryStyle: string;
    jewelleryStones: string;
  }>({
    productType: "gemstone",
    gem: "",
    customGem: "",
    jewellery: "",
    customJewellery: "",
    weight: 2.5,
    budget: "",
    purpose: "",
    name: "",
    whatsapp: "",
    email: "",
    gemstoneShape: "",
    gemstoneColor: "",
    gemstoneClarity: "",
    jewelleryMetal: "",
    jewelleryStyle: "",
    jewelleryStones: "",
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const nextStep = () => {
    if (step === 1 && formData.productType === "jewellery") {
      setStep(3); // Skip step 2 for jewellery
    } else {
      setStep((prev) => Math.min(prev + 1, 5));
    }
  };
  const prevStep = () => {
    if (step === 3 && formData.productType === "jewellery") {
      setStep(1); // Skip step 2 for jewellery when going back
    } else {
      setStep((prev) => Math.max(prev - 1, 1));
    }
  };

  const getMaxStep = () => {
    return formData.productType === "jewellery" ? 4 : 5;
  };

  const getProgressPercentage = () => {
    const maxStep = getMaxStep();
    if (formData.productType === "jewellery" && step === 3) {
      // For jewellery, map step 3 to 2 out of 4 total steps
      return (2 / maxStep) * 100;
    } else if (formData.productType === "jewellery" && step === 4) {
      return (3 / maxStep) * 100;
    } else if (formData.productType === "jewellery" && step === 5) {
      return (4 / maxStep) * 100;
    } else if (formData.productType === "jewellery" && step === 1) {
      return (1 / maxStep) * 100;
    }
    // For gemstones, regular progression
    return (step / maxStep) * 100;
  };

  const handleGemRadio = (id: string) => {
    setFormData((prev) => ({ ...prev, gem: id }));
  };

  const handleJewelleryRadio = (id: string) => {
    setFormData((prev) => ({ ...prev, jewellery: id }));
  };

  const handleProductTypeChange = (type: "gemstone" | "jewellery") => {
    setFormData((prev) => ({ ...prev, productType: type }));
  };

  const updateField = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const supabase = createClient();
    let userId = null;
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      userId = user?.id ?? null;
    } catch {
      userId = null;
    }

    const payload = {
      user_id: userId,
      customer_name: formData.name,
      email: formData.email,
      whatsapp_number: formData.whatsapp,
      product_details: formData,
      status: "pending",
    };

    const { error } = await supabase.from("custom_requests").insert([payload]);
    setIsSubmitting(false);
    if (!error) setIsSuccess(true);
    else alert("Failed to submit request. Please try again.");
  };

  const renderSuccess = () => (
    <div className="flex flex-col items-center justify-center h-full px-6 text-center animate-fade-in-up">
      <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-8">
        <CheckCircle2 className="w-10 h-10 text-green-700" />
      </div>
      <span className="text-xs font-bold uppercase tracking-widest text-gold mb-4 block">
        Request Received
      </span>
      <h1 className="font-serif text-3xl lg:text-4xl text-brandblack mb-6">
        Quote Request Initiated
      </h1>
      <p className="font-sans text-gray-600 leading-relaxed mb-10 text-lg max-w-md mx-auto">
        Thank you, {formData.name}. Our concierge has received your request for
        {formData.productType === "gemstone" ? (
          <>
            a {formData.weight}ct gemstone (
            {(() => {
              if (formData.gem) {
                for (const cat of GEM_OPTIONS) {
                  const found = cat.options.find(
                    (opt) => opt.id === formData.gem,
                  );
                  if (found) return found.label;
                }
              }
              return null;
            })()}
            {formData.customGem
              ? (formData.gem ? ", " : "") + formData.customGem
              : ""}
            )
            {formData.gemstoneShape ||
            formData.gemstoneColor ||
            formData.gemstoneClarity ? (
              <>
                {" "}
                with preferences for{" "}
                {[
                  formData.gemstoneShape &&
                    SHAPE_OPTIONS.find((o) => o.id === formData.gemstoneShape)
                      ?.label,
                  formData.gemstoneColor &&
                    COLOR_OPTIONS.find((o) => o.id === formData.gemstoneColor)
                      ?.label,
                  formData.gemstoneClarity &&
                    CLARITY_OPTIONS.find(
                      (o) => o.id === formData.gemstoneClarity,
                    )?.label,
                ]
                  .filter(Boolean)
                  .join(", ")}
              </>
            ) : null}
          </>
        ) : (
          <>
            a{" "}
            {(() => {
              if (formData.jewellery) {
                for (const cat of JEWELLERY_OPTIONS) {
                  const found = cat.options.find(
                    (opt) => opt.id === formData.jewellery,
                  );
                  if (found) return found.label;
                }
              }
              return null;
            })()}
            (
            {formData.customJewellery
              ? (formData.jewellery ? " - " : "") + formData.customJewellery
              : ""}
            )
            {formData.jewelleryMetal ||
            formData.jewelleryStyle ||
            formData.jewelleryStones ? (
              <>
                {" "}
                with preferences for{" "}
                {[
                  formData.jewelleryMetal &&
                    METAL_OPTIONS.find((o) => o.id === formData.jewelleryMetal)
                      ?.label,
                  formData.jewelleryStyle &&
                    STYLE_OPTIONS.find((o) => o.id === formData.jewelleryStyle)
                      ?.label,
                  formData.jewelleryStones &&
                    `stones: ${formData.jewelleryStones}`,
                ]
                  .filter(Boolean)
                  .join(", ")}
              </>
            ) : null}
          </>
        )}
        . We will contact you via WhatsApp shortly to begin your bespoke
        consultation.
      </p>
      <Button
        variant="outline"
        onClick={() => (window.location.hash = "#collection")}
      >
        Return to Collection
      </Button>
    </div>
  );

  return (
    <div className="h-screen w-full overflow-hidden bg-brandblack text-brandblack selection:bg-gold selection:text-white">
      {/* Split Layout */}
      <div className="flex flex-col lg:flex-row h-full">
        {/* Left: Brand / Context (Unchanged) */}
        <div className="hidden lg:flex lg:w-5/12 bg-brandblack text-white p-10 lg:p-20 flex-col justify-between relative overflow-hidden h-full">
          <div className="absolute inset-0 opacity-20">
            <img
              src="https://images.unsplash.com/photo-1551525032-4eaf16982464?q=80&w=2070&auto=format&fit=crop"
              alt="Private Office"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="absolute inset-0 bg-linear-to-b from-brandblack/80 via-transparent to-brandblack/80"></div>

          <div className="relative z-10">
            <span className="text-gold text-xs font-bold uppercase tracking-[0.2em] mb-4 block">
              The Private Office
            </span>
            <h1 className="font-serif text-5xl lg:text-6xl leading-tight mb-8">
              Bespoke Acquisition Service
            </h1>
            <p className="font-sans font-light text-white/70 text-lg leading-relaxed max-w-md">
              Whether you seek a specific investment asset or wish to commission
              a bespoke heirlooom, our curators provide a seamless, confidential
              experience.
            </p>
          </div>

          <div className="relative z-10 space-y-8 mt-12 lg:mt-0">
            <div className="flex items-start gap-4">
              <div className="p-3 border border-white/20 rounded-full">
                <Globe className="w-5 h-5 text-gold" />
              </div>
              <div>
                <h4 className="font-serif text-xl mb-1">Global Reach</h4>
                <p className="text-sm text-gray-400">
                  Consultations available in English, French, and Mandarin.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="p-3 border border-white/20 rounded-full">
                <Clock className="w-5 h-5 text-gold" />
              </div>
              <div>
                <h4 className="font-serif text-xl mb-1">Timezone Agnostic</h4>
                <p className="text-sm text-gray-400">
                  Our team operates across London, Dubai, and Singapore.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Wizard UI */}
        <div className="w-full lg:w-7/12 bg-white flex flex-col relative h-full">
          {isSuccess ? (
            renderSuccess()
          ) : (
            <>
              {/* Progress Bar */}
              <div className="absolute top-0 left-0 w-full h-1 bg-gray-100 z-20">
                <div
                  className="h-full bg-sapphire transition-all duration-500 ease-out"
                  style={{ width: `${getProgressPercentage()}%` }}
                />
              </div>

              {/* Header */}
              <div className="p-8 lg:p-12 border-b border-gray-50 flex items-center justify-between shrink-0">
                <div>
                  <span className="text-sapphire text-[10px] font-bold uppercase tracking-widest block mb-2">
                    The Bespoke Concierge
                  </span>
                  <h1 className="font-serif text-3xl text-brandblack">
                    {step === 1 && "What Would You Like?"}
                    {step === 2 &&
                      (formData.productType === "gemstone"
                        ? "Desired Carat Weight"
                        : "Estimated Investment")}
                    {step === 3 && "Estimated Investment"}
                    {step === 4 && "Intention & Purpose"}
                    {step === 5 && "The Final Detail"}
                  </h1>
                </div>
                <span className="font-serif text-4xl text-gray-100 font-bold hidden md:block">
                  0{step}
                </span>
              </div>

              {/* Body */}
              <div className="flex-1 overflow-y-auto">
                <div className="mx-auto px-12 py-4 flex flex-col">
                  {/* Step 1: Product Type & Selection */}
                  {step === 1 && (
                    <div className="space-y-8">
                      {/* Product Type Toggle */}
                      <div className="flex gap-4 mb-8">
                        <button
                          onClick={() => handleProductTypeChange("gemstone")}
                          className={`flex-1 p-4 border-2 rounded font-serif text-lg transition-all ${
                            formData.productType === "gemstone"
                              ? "border-sapphire bg-sapphire/5 text-brandblack"
                              : "border-gray-100 hover:border-gray-300 text-gray-600"
                          }`}
                        >
                          Gemstone
                        </button>
                        <button
                          onClick={() => handleProductTypeChange("jewellery")}
                          className={`flex-1 p-4 border-2 rounded font-serif text-lg transition-all ${
                            formData.productType === "jewellery"
                              ? "border-sapphire bg-sapphire/5 text-brandblack"
                              : "border-gray-100 hover:border-gray-300 text-gray-600"
                          }`}
                        >
                          Jewellery
                        </button>
                      </div>

                      {/* Gemstone Selection */}
                      {formData.productType === "gemstone" && (
                        <>
                          {GEM_OPTIONS.map((category) => (
                            <div key={category.title}>
                              <h3 className="font-serif text-lg text-brandblack mb-3">
                                {category.title}
                              </h3>
                              <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-3">
                                {category.options.map((option) => (
                                  <label
                                    key={option.id}
                                    className="flex items-center gap-3 p-3 border border-gray-100 rounded hover:border-sapphire transition-colors cursor-pointer"
                                  >
                                    <input
                                      type="radio"
                                      name="gem"
                                      checked={formData.gem === option.id}
                                      onChange={() => handleGemRadio(option.id)}
                                      className="accent-sapphire w-5 h-5"
                                    />
                                    <span className="font-sans text-brandblack text-sm">
                                      {option.label}
                                    </span>
                                  </label>
                                ))}
                              </div>
                            </div>
                          ))}
                          <div className="mt-6 flex flex-col gap-3">
                            <label className="flex items-center gap-2 font-serif text-lg text-brandblack mb-2 cursor-pointer">
                              <input
                                type="radio"
                                name="gem"
                                checked={formData.gem === "custom"}
                                onChange={() => handleGemRadio("custom")}
                                className="accent-sapphire w-5 h-5"
                              />
                              Other / Custom Gemstone
                            </label>
                            <input
                              type="text"
                              placeholder="Type another gemstone..."
                              value={formData.customGem}
                              onChange={(e) => {
                                updateField("customGem", e.target.value);
                                if (formData.gem !== "custom")
                                  handleGemRadio("custom");
                              }}
                              className="flex-1 p-3 border border-gray-100 rounded focus:border-sapphire focus:outline-none"
                            />
                          </div>
                        </>
                      )}

                      {/* Jewellery Selection */}
                      {formData.productType === "jewellery" && (
                        <>
                          {JEWELLERY_OPTIONS.map((category) => (
                            <div key={category.title}>
                              <h3 className="font-serif text-lg text-brandblack mb-3">
                                {category.title}
                              </h3>
                              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                                {category.options.map((option) => (
                                  <label
                                    key={option.id}
                                    className="flex items-center gap-3 p-3 border border-gray-100 rounded hover:border-sapphire transition-colors cursor-pointer"
                                  >
                                    <input
                                      type="radio"
                                      name="jewellery"
                                      checked={formData.jewellery === option.id}
                                      onChange={() =>
                                        handleJewelleryRadio(option.id)
                                      }
                                      className="accent-sapphire w-5 h-5"
                                    />
                                    <span className="font-sans text-brandblack text-sm">
                                      {option.label}
                                    </span>
                                  </label>
                                ))}
                              </div>
                            </div>
                          ))}
                          <div className="mt-6 flex flex-col gap-3">
                            <label className="flex items-center gap-2 font-serif text-lg text-brandblack mb-2 cursor-pointer">
                              <input
                                type="radio"
                                name="jewellery"
                                checked={formData.jewellery === "custom-piece"}
                                onChange={() =>
                                  handleJewelleryRadio("custom-piece")
                                }
                                className="accent-sapphire w-5 h-5"
                              />
                              Custom Design / Description
                            </label>
                            <input
                              type="text"
                              placeholder="Describe your jewellery requirements..."
                              value={formData.customJewellery}
                              onChange={(e) => {
                                updateField("customJewellery", e.target.value);
                                if (formData.jewellery !== "custom-piece")
                                  handleJewelleryRadio("custom-piece");
                              }}
                              className="flex-1 p-3 border border-gray-100 rounded focus:border-sapphire focus:outline-none"
                            />
                          </div>
                        </>
                      )}

                      {/* Gemstone Preferences - Only show after selecting a gemstone */}
                      {formData.productType === "gemstone" && formData.gem && (
                        <div className="space-y-6 pt-6 border-t border-gray-100">
                          <h3 className="font-serif text-lg text-brandblack mb-4">
                            Preferences (Optional)
                          </h3>

                          {/* Shape Preference */}
                          <div>
                            <label className="block text-sm font-bold uppercase tracking-widest text-gray-600 mb-3">
                              Preferred Shape
                            </label>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                              {SHAPE_OPTIONS.map((option) => (
                                <button
                                  key={option.id}
                                  onClick={() =>
                                    updateField("gemstoneShape", option.id)
                                  }
                                  className={`p-2 border rounded text-sm transition-all ${
                                    formData.gemstoneShape === option.id
                                      ? "border-sapphire bg-sapphire/5 text-brandblack font-medium"
                                      : "border-gray-100 hover:border-gray-300 text-gray-600"
                                  }`}
                                >
                                  {option.label}
                                </button>
                              ))}
                            </div>
                          </div>

                          {/* Color Preference */}
                          <div>
                            <label className="block text-sm font-bold uppercase tracking-widest text-gray-600 mb-3">
                              Color Preference
                            </label>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                              {COLOR_OPTIONS.map((option) => (
                                <button
                                  key={option.id}
                                  onClick={() =>
                                    updateField("gemstoneColor", option.id)
                                  }
                                  className={`p-2 border rounded text-sm transition-all ${
                                    formData.gemstoneColor === option.id
                                      ? "border-sapphire bg-sapphire/5 text-brandblack font-medium"
                                      : "border-gray-100 hover:border-gray-300 text-gray-600"
                                  }`}
                                >
                                  {option.label}
                                </button>
                              ))}
                            </div>
                          </div>

                          {/* Clarity Preference */}
                          <div>
                            <label className="block text-sm font-bold uppercase tracking-widest text-gray-600 mb-3">
                              Clarity & Certification
                            </label>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                              {CLARITY_OPTIONS.map((option) => (
                                <button
                                  key={option.id}
                                  onClick={() =>
                                    updateField("gemstoneClarity", option.id)
                                  }
                                  className={`p-2 border rounded text-sm transition-all ${
                                    formData.gemstoneClarity === option.id
                                      ? "border-sapphire bg-sapphire/5 text-brandblack font-medium"
                                      : "border-gray-100 hover:border-gray-300 text-gray-600"
                                  }`}
                                >
                                  {option.label}
                                </button>
                              ))}
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Jewellery Preferences - Only show after selecting jewellery type */}
                      {formData.productType === "jewellery" &&
                        formData.jewellery && (
                          <div className="space-y-6 pt-6 border-t border-gray-100">
                            <h3 className="font-serif text-lg text-brandblack mb-4">
                              Preferences (Optional)
                            </h3>

                            {/* Metal Type */}
                            <div>
                              <label className="block text-sm font-bold uppercase tracking-widest text-gray-600 mb-3">
                                Metal Type
                              </label>
                              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                                {METAL_OPTIONS.map((option) => (
                                  <button
                                    key={option.id}
                                    onClick={() =>
                                      updateField("jewelleryMetal", option.id)
                                    }
                                    className={`p-2 border rounded text-sm transition-all ${
                                      formData.jewelleryMetal === option.id
                                        ? "border-sapphire bg-sapphire/5 text-brandblack font-medium"
                                        : "border-gray-100 hover:border-gray-300 text-gray-600"
                                    }`}
                                  >
                                    {option.label}
                                  </button>
                                ))}
                              </div>
                            </div>

                            {/* Style Preference */}
                            <div>
                              <label className="block text-sm font-bold uppercase tracking-widest text-gray-600 mb-3">
                                Style Preference
                              </label>
                              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                                {STYLE_OPTIONS.map((option) => (
                                  <button
                                    key={option.id}
                                    onClick={() =>
                                      updateField("jewelleryStyle", option.id)
                                    }
                                    className={`p-2 border rounded text-sm transition-all ${
                                      formData.jewelleryStyle === option.id
                                        ? "border-sapphire bg-sapphire/5 text-brandblack font-medium"
                                        : "border-gray-100 hover:border-gray-300 text-gray-600"
                                    }`}
                                  >
                                    {option.label}
                                  </button>
                                ))}
                              </div>
                            </div>

                            {/* Stone Preference */}
                            <div>
                              <label className="block text-sm font-bold uppercase tracking-widest text-gray-600 mb-3">
                                Stone Preference
                              </label>
                              <input
                                type="text"
                                placeholder="e.g., Diamond, Emerald, Ruby..."
                                value={formData.jewelleryStones}
                                onChange={(e) =>
                                  updateField("jewelleryStones", e.target.value)
                                }
                                className="w-full p-2 border border-gray-100 rounded focus:border-sapphire focus:outline-none text-sm"
                              />
                            </div>
                          </div>
                        )}
                    </div>
                  )}

                  {/* Step 2: Weight Slider (Gemstones Only) */}
                  {step === 2 && formData.productType === "gemstone" && (
                    <div className="text-center space-y-12 py-8">
                      <div className="relative pt-12 pb-6">
                        <input
                          type="range"
                          min="0.5"
                          max="10"
                          step="0.1"
                          value={formData.weight}
                          onChange={(e) =>
                            updateField("weight", parseFloat(e.target.value))
                          }
                          className="w-full h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-sapphire"
                        />
                        <div className="flex justify-between mt-4 text-xs font-bold uppercase tracking-widest text-gray-400">
                          <span>0.5 ct</span>
                          <span>5.0 ct</span>
                          <span>10.0+ ct</span>
                        </div>
                      </div>

                      <div className="inline-block border border-brandblack px-8 py-4">
                        <span className="font-serif text-4xl text-brandblack">
                          {formData.weight.toFixed(1)}
                        </span>
                        <span className="text-sm font-sans text-gray-500 ml-2">
                          Carats
                        </span>
                      </div>
                    </div>
                  )}

                  {/* Step 3: Budget */}
                  {step === 3 && (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      {BUDGET_OPTIONS.map((option) => (
                        <button
                          key={option.id}
                          onClick={() => {
                            updateField("budget", option.label);
                            nextStep();
                          }}
                          className={`p-6 lg:p-8 border text-left transition-all duration-300 hover:shadow-md h-full flex flex-col justify-between min-h-40
                            ${
                              formData.budget === option.label
                                ? "border-sapphire bg-sapphire/5"
                                : "border-gray-100 hover:border-gray-300 bg-white"
                            }`}
                        >
                          <span className="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">
                            {option.desc}
                          </span>
                          <span className="block font-serif text-xl text-brandblack">
                            {option.label}
                          </span>
                        </button>
                      ))}
                    </div>
                  )}

                  {/* Step 4: Purpose */}
                  {step === 4 && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {PURPOSE_OPTIONS.map((option) => (
                        <button
                          key={option.id}
                          onClick={() => {
                            updateField("purpose", option.label);
                            nextStep();
                          }}
                          className={`p-6 border flex items-center gap-6 transition-all duration-300 hover:shadow-md group
                                                        ${
                                                          formData.purpose ===
                                                          option.label
                                                            ? "border-sapphire bg-sapphire/5"
                                                            : "border-gray-100 hover:border-gray-300 bg-white"
                                                        }`}
                        >
                          <div className="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center text-brandblack group-hover:bg-gray-100 transition-colors">
                            <option.icon className="w-5 h-5" />
                          </div>
                          <span className="font-serif text-xl text-brandblack">
                            {option.label}
                          </span>
                        </button>
                      ))}
                    </div>
                  )}

                  {/* Step 5: Contact Form */}
                  {step === 5 && (
                    <form onSubmit={handleSubmit} className="w-full space-y-6">
                      <div className="space-y-4">
                        <div className="relative">
                          <User className="absolute top-3.5 left-4 w-5 h-5 text-gray-400" />
                          <input
                            type="text"
                            placeholder="Full Name *"
                            required
                            className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-100 focus:border-sapphire focus:bg-white focus:outline-none transition-colors placeholder-gray-400 text-brandblack"
                            value={formData.name}
                            onChange={(e) =>
                              updateField("name", e.target.value)
                            }
                          />
                        </div>
                        <div className="relative">
                          <Phone className="absolute top-3.5 left-4 w-5 h-5 text-gray-400" />
                          <input
                            type="tel"
                            placeholder="WhatsApp Number *"
                            required
                            className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-100 focus:border-sapphire focus:bg-white focus:outline-none transition-colors placeholder-gray-400 text-brandblack"
                            value={formData.whatsapp}
                            onChange={(e) =>
                              updateField("whatsapp", e.target.value)
                            }
                          />
                        </div>
                        <div className="relative">
                          <Mail className="absolute top-3.5 left-4 w-5 h-5 text-gray-400" />
                          <input
                            type="email"
                            placeholder="Email Address"
                            required
                            className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-100 focus:border-sapphire focus:bg-white focus:outline-none transition-colors placeholder-gray-400 text-brandblack"
                            value={formData.email}
                            onChange={(e) =>
                              updateField("email", e.target.value)
                            }
                          />
                        </div>
                      </div>

                      <Button
                        variant="primary"
                        type="submit"
                        className="w-full justify-center items-center gap-3 mt-8"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? (
                          <Loader2 className="w-5 h-5 animate-spin" />
                        ) : (
                          "Request Quotation"
                        )}
                      </Button>

                      <p className="text-center text-[10px] text-gray-400 uppercase tracking-widest mt-4">
                        Private & Confidential
                      </p>
                    </form>
                  )}
                </div>
              </div>

              {/* Footer Actions */}
              <div className="p-8 border-t border-gray-50 bg-gray-50/50 flex justify-between items-center mt-auto shrink-0">
                {step > 1 ? (
                  <button
                    onClick={prevStep}
                    className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-gray-500 hover:text-brandblack transition-colors"
                  >
                    <ChevronLeft className="w-4 h-4" /> Back
                  </button>
                ) : (
                  <button
                    onClick={() => window.history.back()}
                    type="button"
                    className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-gray-500 hover:text-brandblack transition-colors"
                  >
                    Cancel
                  </button>
                )}

                {step < 5 && (
                  <button
                    onClick={nextStep}
                    className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-sapphire hover:text-brandblack transition-colors"
                  >
                    Next <ArrowRight className="w-4 h-4" />
                  </button>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
