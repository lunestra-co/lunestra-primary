"use client";
import React from "react";
import { CURATOR_IMAGE } from "../constants";

import { useScrollAnimation } from "../hooks/useScrollAnimation";

export default function Curator() {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section className="py-28 lg:py-36 bg-sapphire text-white relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent" />
      <div className="absolute top-20 right-20 w-64 h-64 bg-gold/5 rounded-full blur-3xl" />
      <div className="absolute bottom-20 left-20 w-96 h-96 bg-white/5 rounded-full blur-3xl" />

      <div
        className={`max-w-[1400px] mx-auto px-6 lg:px-12 relative z-10 transition-all duration-1000 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
        }`}
        ref={ref}
      >
        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
          {/* Image Side */}
          <div className="w-full lg:w-2/5">
            <div className="relative group">
              {/* Decorative frame */}
              <div className="absolute -inset-3 border border-gold/30 translate-x-6 translate-y-6 transition-transform duration-500 group-hover:translate-x-4 group-hover:translate-y-4" />

              <div className="relative overflow-hidden">
                <img
                  src={CURATOR_IMAGE}
                  alt="Master Gemologist"
                  className="w-full aspect-[3/4] object-cover relative z-10 transition-all duration-700 group-hover:scale-105"
                />
                {/* Subtle overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-sapphire/30 to-transparent z-20" />
              </div>

              {/* Name card */}
              <div className="absolute -bottom-6 -right-6 bg-gold text-brandblack px-6 py-4 z-30">
                <p className="font-serif text-sm">Est. 2017</p>
              </div>
            </div>
          </div>

          {/* Text Side */}
          <div className="w-full lg:w-3/5 lg:pl-8">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-10 h-px bg-gold" />
              <span className="text-gold uppercase tracking-[0.3em] text-[10px] font-medium">
                The Human Authority
              </span>
            </div>

            <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl mb-10">
              Meet the <span className="italic">Curator</span>
            </h2>

            {/* Quote */}
            <div className="relative mb-10">
              <div className="absolute -left-8 top-0 text-gold/20 font-serif text-8xl leading-none">
                "
              </div>
              <blockquote className="font-serif text-2xl md:text-3xl italic leading-relaxed text-white/90 pl-4 border-l-2 border-gold/30">
                Every stone at Lunestra is personally selected—never merely
                stocked. I look for the 'living fire' inside the gem that
                certificates simply cannot capture.
              </blockquote>
            </div>

            {/* Author */}
            <div className="flex items-center gap-6">
              <div className="w-16 h-px bg-gradient-to-r from-gold to-transparent" />
              <div>
                <p className="text-gold text-sm uppercase tracking-[0.2em] font-medium mb-1">
                  Aravinda De Silva
                </p>
                <p className="font-serif italic text-white/50">
                  Founder & Master Gemologist, GIA Graduate
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
