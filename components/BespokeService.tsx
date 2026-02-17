"use client";
import React from "react";
import { ArrowRight } from "lucide-react";

import { useScrollAnimation } from "../hooks/useScrollAnimation";

export default function BespokeService() {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section className="bg-brandblack text-white py-28 lg:py-36 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />
      <div className="absolute top-1/4 right-0 w-64 h-64 bg-gold/5 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 left-0 w-96 h-96 bg-sapphire/20 rounded-full blur-3xl" />

      <div
        className={`max-w-[1600px] mx-auto px-6 lg:px-12 relative z-10 transition-all duration-1000 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
        }`}
        ref={ref}
      >
        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
          {/* Visual Side */}
          <div className="w-full lg:w-1/2">
            <div className="relative group">
              {/* Decorative frame */}
              <div className="absolute -inset-4 border border-gold/20 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

              <div className="relative aspect-[4/3] overflow-hidden">
                <img
                  src="https://t3.ftcdn.net/jpg/05/82/92/72/360_F_582927251_Hn3nJBtczV4T6hgMO8kU2pIQJtRqeBKc.jpg"
                  alt="Jewelry design sketching"
                  className="w-full h-full object-cover filter grayscale group-hover:grayscale-0 transition-all duration-1000 group-hover:scale-105"
                />
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-brandblack/50 to-transparent opacity-50" />
              </div>

              {/* Caption */}
              <div className="absolute bottom-0 left-0 bg-white text-brandblack px-8 py-5">
                <div className="w-6 h-px bg-gold mb-3" />
                <p className="font-serif italic text-lg">The Atelier</p>
              </div>
            </div>
          </div>

          {/* Text Side */}
          <div className="w-full lg:w-1/2 space-y-8">
            <div className="flex items-center gap-4">
              <div className="w-10 h-px bg-gold" />
              <span className="text-gold uppercase tracking-[0.3em] text-[10px] font-medium">
                The Gift of Choice
              </span>
            </div>

            <h2 className="font-serif text-4xl lg:text-5xl xl:text-6xl leading-[1.1]">
              Let Them Design
              <br />
              <span className="text-gold/80 italic">Their Forever</span>
            </h2>

            <p className="text-gray-400 leading-relaxed max-w-md text-[15px]">
              True luxury is personal. Your certified gemstone arrives with an
              exclusive crafting voucher—a gift that invites your loved one to
              collaborate with our partnering master jewelers. From design
              vision to final setting, they become the architect of their own
              heirloom.
            </p>

            <ul className="space-y-5 border-t border-white/10 pt-10">
              <li className="flex items-center gap-4">
                <div className="w-8 h-8 border border-gold/30 rounded-full flex items-center justify-center">
                  <span className="w-2 h-2 bg-gold rounded-full" />
                </div>
                <span className="text-[14px] text-gray-300">
                  Certified Gemstone Delivered to You
                </span>
              </li>
              <li className="flex items-center gap-4">
                <div className="w-8 h-8 border border-gold/30 rounded-full flex items-center justify-center">
                  <span className="w-2 h-2 bg-gold rounded-full" />
                </div>
                <span className="text-[14px] text-gray-300">
                  Exclusive Voucher to Partnering Ateliers
                </span>
              </li>
              <li className="flex items-center gap-4">
                <div className="w-8 h-8 border border-gold/30 rounded-full flex items-center justify-center">
                  <span className="w-2 h-2 bg-gold rounded-full" />
                </div>
                <span className="text-[14px] text-gray-300">
                  Personal Design Consultation for Recipient
                </span>
              </li>
            </ul>

            <div className="pt-6">
              <a
                href="/jewellery-coupon"
                className="group inline-flex items-center gap-4"
              >
                <span className="border border-white/30 text-white px-8 py-4 text-[11px] uppercase tracking-[0.2em] transition-all duration-500 group-hover:border-gold group-hover:bg-gold group-hover:text-brandblack">
                  Discover Our Partners →
                </span>
                <ArrowRight className="w-5 h-5 text-gold transition-transform group-hover:translate-x-2" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
