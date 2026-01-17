"use client";
import React from "react";
import { ArrowRight } from "lucide-react";

import { useScrollAnimation } from "../hooks/useScrollAnimation";

export default function Pedigree() {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section id="heritage" className="bg-white relative overflow-hidden">
      {/* Decorative background element */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-96 h-96 bg-gold/5 rounded-full blur-3xl" />

      <div
        className="flex flex-col lg:flex-row min-h-[700px] items-stretch"
        ref={ref}
      >
        {/* Text Side - Left */}
        <div
          className={`w-full lg:w-1/2 flex items-center justify-center p-8 lg:p-20 xl:p-28 order-2 lg:order-1 relative transition-all duration-1000 ${
            isVisible
              ? "opacity-100 translate-x-0"
              : "opacity-0 -translate-x-12"
          }`}
        >
          <div className="max-w-lg relative">
            {/* Decorative line */}
            <div className="flex items-center gap-4 mb-8">
              <div className="w-10 h-px bg-gold" />
              <span className="text-gold uppercase tracking-[0.3em] text-[10px] font-medium">
                Geographic Authority
              </span>
            </div>

            <h2 className="font-serif text-4xl lg:text-5xl xl:text-6xl text-brandblack leading-[1.1] mb-8">
              The Ceylon
              <br />
              <span className="italic">Pedigree</span>
            </h2>

            <div className="w-16 h-px bg-gradient-to-r from-gold to-transparent mb-8" />

            <div className="space-y-6 text-gray-600 leading-relaxed">
              <p>
                For centuries, the island of Sri Lanka (formerly Ceylon) has
                been the world's primary source of high-quality sapphires. Our
                gems are sourced directly from the legendary alluvial gravels of
                Ratnapura, the{" "}
                <span className="font-serif italic text-brandblack">
                  "City of Gems."
                </span>
              </p>
              <p>
                Unlike commercial jewelers, Lunestra prioritizes{" "}
                <span className="font-serif italic text-lg text-brandblack">
                  unheated
                </span>
                , natural stones that retain their geological integrity—offering
                you not just a jewel, but a piece of the Earth's history.
              </p>
            </div>

            <div className="pt-10">
              <a
                href="#education"
                className="group inline-flex items-center gap-3 text-[11px] uppercase tracking-[0.2em] text-brandblack font-medium hover:text-gold transition-colors"
              >
                <span className="border-b border-brandblack pb-1 group-hover:border-gold transition-colors">
                  Discover The Origins
                </span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </a>
            </div>
          </div>
        </div>

        {/* Image Side - Right */}
        <div className="w-full lg:w-1/2 relative h-[500px] lg:h-auto min-h-[600px] order-1 lg:order-2 group">
          <img
            src="https://www.guide-srilanka.fr/wp-content/uploads/2019/01/pierre-ratnapura.jpg"
            alt="Ceylon Sapphire"
            className="w-full h-full object-cover transition-transform duration-1000"
          />
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-l from-transparent via-transparent to-white/10" />

          {/* Caption card */}
          <div className="absolute bottom-10 right-10 bg-white/95 backdrop-blur-md px-8 py-6 shadow-2xl max-w-xs">
            <div className="w-8 h-px bg-gold mb-4" />
            <p className="font-serif italic text-2xl text-brandblack mb-2">
              "The Island of Gems"
            </p>
            <p className="text-[10px] uppercase tracking-[0.2em] text-gray-500">
              Ratnapura, Sri Lanka
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
