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

export default function ConsultationPage() {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const [formData, setFormData] = useState<{
    gem: string;
    customGem: string;
    weight: number;
    budget: string;
    purpose: string;
    name: string;
    whatsapp: string;
    email: string;
  }>({
    gem: "",
    customGem: "",
    weight: 2.5,
    budget: "",
    purpose: "",
    name: "",
    whatsapp: "",
    email: "",
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const nextStep = () => setStep((prev) => Math.min(prev + 1, 5));
  const prevStep = () => setStep((prev) => Math.max(prev - 1, 1));

  const updateField = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleGemRadio = (id: string) => {
    setFormData((prev) => ({ ...prev, gem: id }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 1500);
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
        a {formData.weight}ct gemstone (
        {(() => {
          if (formData.gem) {
            for (const cat of GEM_OPTIONS) {
              const found = cat.options.find((opt) => opt.id === formData.gem);
              if (found) return found.label;
            }
          }
          return null;
        })()}
        {formData.customGem
          ? (formData.gem ? ", " : "") + formData.customGem
          : ""}
        ). We will contact you via WhatsApp shortly to begin your bespoke
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
    <div className="mt-22 h-[calc(100vh-81px)] w-full overflow-hidden bg-brandblack text-brandblack selection:bg-gold selection:text-white">
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
                  style={{ width: `${(step / 5) * 100}%` }}
                />
              </div>

              {/* Header */}
              <div className="p-8 lg:p-12 border-b border-gray-50 flex items-center justify-between shrink-0">
                <div>
                  <span className="text-sapphire text-[10px] font-bold uppercase tracking-widest block mb-2">
                    The Bespoke Concierge
                  </span>
                  <h1 className="font-serif text-3xl text-brandblack">
                    {step === 1 && "Select Your Gemstone"}
                    {step === 2 && "Desired Carat Weight"}
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
                  {/* Step 1: Gem Selection */}
                  {step === 1 && (
                    <div className="space-y-8">
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
                    </div>
                  )}

                  {/* Step 2: Weight Slider */}
                  {step === 2 && (
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
