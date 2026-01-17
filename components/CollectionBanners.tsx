"use client";
import React from "react";
import { ArrowRight } from "lucide-react";

import { useScrollAnimation } from "../hooks/useScrollAnimation";

export default function CollectionBanners() {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section
      className={`w-full transition-all duration-1000 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
      ref={ref}
    >
      {/* Top Two Banners - Side by Side */}
      <div className="grid grid-cols-1 md:grid-cols-2">
        {/* Left Banner - Collector's Picks */}
        <div className="relative h-[550px] lg:h-[650px] overflow-hidden group cursor-pointer">
          <div className="absolute inset-0 bg-sapphire" />
          <img
            src="https://www.ceylonstones.com.au/cdn/shop/files/IMG_0023-2_800x.jpg?v=1635301752"
            alt="Collector's Picks"
            className="absolute inset-0 w-full h-full object-cover opacity-50 mix-blend-luminosity transition-all duration-1000 group-hover:opacity-60"
          />

          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-sapphire/90 via-sapphire/30 to-sapphire/60" />

          {/* Content */}
          <div className="absolute inset-0 flex flex-col justify-end items-center text-center p-12 pb-16">
            {/* Decorative element */}
            <div className="w-px h-12 bg-gradient-to-b from-transparent to-gold/50 mb-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-white mb-2 leading-tight">
              Collector's Picks
            </h2>
            <p className="font-script text-3xl text-gold/80 mb-8">
              Rare by nature
            </p>

            <a
              href="#collection"
              className="relative overflow-hidden border border-white/40 text-white px-10 py-4 text-[10px] uppercase tracking-[0.25em] transition-all duration-500 group-hover:border-gold group-hover:bg-gold group-hover:text-brandblack"
            >
              Discover
            </a>
          </div>
        </div>

        {/* Right Banner - New Arrivals */}
        <div className="relative h-[550px] lg:h-[650px] overflow-hidden group cursor-pointer">
          <div className="absolute inset-0 bg-sapphire" />
          <img
            src="https://cablankatours.com/wp-content/uploads/2023/03/5.jpg"
            alt="New Arrivals"
            className="absolute inset-0 w-full h-full object-cover opacity-60 transition-all duration-1000 group-hover:opacity-70"
          />

          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/30" />

          {/* Content */}
          <div className="absolute inset-0 flex flex-col justify-end items-center text-center p-12 pb-16">
            {/* Decorative element */}
            <div className="w-px h-12 bg-gradient-to-b from-transparent to-gold/50 mb-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-white mb-2 leading-tight">
              New Arrivals
            </h2>
            <p className="font-script text-3xl text-gold/80 mb-8">
              Fresh from ceylon
            </p>

            <a
              href="#collection"
              className="relative overflow-hidden border border-white/40 text-white px-10 py-4 text-[10px] uppercase tracking-[0.25em] transition-all duration-500 group-hover:border-gold group-hover:bg-gold group-hover:text-brandblack"
            >
              Discover
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Split Banner - Navaratna Sets */}
      <div className="grid grid-cols-1 lg:grid-cols-2">
        {/* Left - Text Content */}
        <div className="bg-ivory flex items-center justify-center p-12 lg:p-20 xl:p-28 h-[450px] lg:h-[550px] relative overflow-hidden">
          {/* Decorative background */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-gold/5 rounded-full blur-3xl" />

          <div className="max-w-lg relative">
            {/* Label */}
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-px bg-gold" />
              <p className="text-[10px] uppercase tracking-[0.3em] text-gold font-medium">
                Sacred Tradition
              </p>
            </div>

            <h2 className="font-serif text-4xl md:text-5xl xl:text-6xl text-brandblack mb-4 leading-[1.1]">
              The Nine <br />
              <span className="italic">Celestial Gems</span>
            </h2>

            <p className="text-gray-600 leading-relaxed mb-10 text-[15px]">
              For centuries, the Navaratna—nine sacred gemstones—has been
              revered for bringing balance, protection, and cosmic harmony. Each
              Lunestra set is meticulously assembled with authentic Ceylon
              stones, honoring ancient Vedic tradition with modern excellence.
            </p>

            <a
              href="#collection"
              className="group inline-flex items-center gap-3 text-[11px] uppercase tracking-[0.2em] text-brandblack font-medium transition-colors hover:text-gold"
            >
              <span className="border-b border-brandblack pb-1 group-hover:border-gold transition-colors">
                View Navaratna Sets
              </span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </a>
          </div>
        </div>

        {/* Right - Image */}
        <div className="relative h-[450px] lg:h-[550px] overflow-hidden group">
          <img
            src="https://rudradhan.com/cdn/shop/files/navratna-ring.jpg?v=1757079744&width=2051"
            alt="Navaratna Set"
            className="w-full h-full object-cover transition-transform duration-1000 "
          />
          {/* Subtle overlay */}
          <div className="absolute inset-0 bg-gradient-to-l from-transparent via-transparent to-ivory/20" />
        </div>
      </div>
    </section>
  );
}
