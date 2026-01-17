"use client";
import React, { useState, useEffect } from "react";
import { MapPin, Gem, Ticket, Truck, ChevronRight } from "lucide-react";
import { ShopPartner } from "@/types";
import { shopService } from "@/services/ShopService";

const STEPS = [
  {
    icon: Ticket,
    title: "Select Service",
    desc: "Choose a crafting package or bespoke coupon.",
  },
  {
    icon: Gem,
    title: "Add Gemstone",
    desc: "Pair it with your chosen Lunestra sapphire.",
  },
  {
    icon: Truck,
    title: "Secure Delivery",
    desc: "Your gem is shipped to the partner shop.",
  },
  {
    icon: MapPin,
    title: "Visit & Create",
    desc: "Meet the artisan to finalize your design.",
  },
];

export default function JewelleryShops() {
  const [partners, setPartners] = useState<ShopPartner[]>([]);

  useEffect(() => {
    shopService.getShops().then(setPartners);
  }, []);

  return (
    <div className="min-h-screen bg-white pt-32">
      {/* Hero Section */}
      <div className="text-center px-6 mb-20">
        <h1 className="font-serif text-4xl lg:text-5xl text-brandblack mb-6">
          The Crafting Process
        </h1>
        <p className="font-light text-gray-600 max-w-2xl mx-auto leading-relaxed">
          We connect you with the world's finest artisans. Choose your gemstone,
          select a partner, and embark on a journey to create a piece that is
          uniquely yours.
        </p>
      </div>

      {/* 4-Step Workflow */}
      <div className="max-w-6xl mx-auto px-6 mb-28">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
          {/* Connecting Line (Desktop) */}
          {STEPS.map((step, idx) => (
            <div
              key={idx}
              className="flex flex-col items-center text-center group"
            >
              <div className="flex items-center mb-4 gap-4">
                <h2 className="font-sans text-6xl font-bold">{idx + 1}</h2>
                <step.icon className="w-16 h-16 text-gold" />
              </div>
              <h3 className="font-serif text-2xl text-brandblack mb-2">
                {step.title}
              </h3>
              <p className="text-sm text-gray-500 font-light max-w-[200px]">
                {step.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Partner Directory */}
      <div className="bg-gray-50 py-24">
        <div className="mx-auto px-6 lg:px-16">
          <div className="flex justify-between items-end mb-12">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-gold mb-2 block">
                Our Partners
              </span>
              <h2 className="font-serif text-3xl text-brandblack">
                Collaborating Ateliers
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {partners.map((partner) => (
              <div key={partner.id} className="group cursor-pointer">
                <div className="aspect-[4/5] overflow-hidden mb-6 relative">
                  <img
                    src={partner.image}
                    alt={partner.name}
                    className="w-full h-full object-cover transition-transform"
                  />
                </div>
                <h3 className="font-serif text-xl text-brandblack mb-1">
                  {partner.name}
                </h3>
                <p className="text-xs font-bold uppercase tracking-widest text-gold mb-2">
                  {partner.location}
                </p>
                <p className="text-sm text-gray-500 font-light">
                  {partner.specialty}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
