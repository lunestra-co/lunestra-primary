"use client";
import React, { useState, useEffect } from "react";
import { ArrowRight } from "lucide-react";

import { useScrollAnimation } from "../hooks/useScrollAnimation";
import { bannerService, PromoBanner } from "../services/BannerService";

export default function PromoBanners() {
  const { ref, isVisible } = useScrollAnimation();
  const [banners, setBanners] = useState<PromoBanner[]>([]);

  useEffect(() => {
    const loadBanners = async () => {
      const data = await bannerService.getPromoBanners();
      setBanners(data);
    };
    loadBanners();
  }, []);

  // Helper to find banner by ID (left/right) - fallback to defaults if service hasn't loaded yet
  const getBanner = (id: string) => banners.find((b) => b.id === id);

  const leftBanner = getBanner("left");
  const rightBanner = getBanner("right");

  // Always render the section for debugging scroll animation

  return (
    <section
      className={`py-16 md:py-24 bg-white transition-all duration-1000 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
      }`}
      ref={ref}
    >
      <div className="max-w-[1600px] mx-auto px-6 lg:px-12">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="w-12 h-px bg-gold/40" />
            <span className="text-[10px] uppercase tracking-[0.4em] text-gold">
              Limited Offerings
            </span>
            <div className="w-12 h-px bg-gold/40" />
          </div>
          <h2 className="font-serif text-3xl md:text-4xl text-brandblack">
            Exclusive Collections
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Left Banner */}
          {leftBanner && (
            <div className="group relative bg-ivory rounded-sm overflow-hidden transition-all duration-500 hover:shadow-2xl hover:shadow-gold/10">
              <div className="flex flex-col lg:flex-row items-stretch h-full min-h-[320px]">
                {/* Content */}
                <div className="p-10 lg:p-12 flex-1 flex flex-col justify-center">
                  <span className="text-[10px] uppercase tracking-[0.3em] text-gold mb-4">
                    {leftBanner.tag}
                  </span>
                  <h3
                    className="font-serif text-3xl lg:text-4xl text-brandblack mb-4 leading-tight"
                    dangerouslySetInnerHTML={{ __html: leftBanner.title }}
                  />
                  <p
                    className="text-gray-600 text-sm mb-6 leading-relaxed"
                    dangerouslySetInnerHTML={{ __html: leftBanner.description }}
                  />
                  <a
                    href={leftBanner.link}
                    className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.15em] text-brandblack font-medium group-hover:text-gold transition-colors"
                  >
                    View Collection
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </a>
                </div>
                {/* Image */}
                <div className="lg:w-56 xl:w-64 h-48 lg:h-auto flex-shrink-0 overflow-hidden">
                  <img
                    src={leftBanner.image}
                    alt={leftBanner.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                </div>
              </div>
              {/* Decorative corner */}
              <div className="absolute top-0 right-0 w-24 h-24 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <div className="absolute top-4 right-4 w-8 h-px bg-gold" />
                <div className="absolute top-4 right-4 w-px h-8 bg-gold" />
              </div>
            </div>
          )}

          {/* Right Banner */}
          {rightBanner && (
            <div className="group relative bg-[#F5F0EB] rounded-sm overflow-hidden transition-all duration-500 hover:shadow-2xl hover:shadow-gold/10">
              <div className="flex flex-col lg:flex-row items-stretch h-full min-h-[320px]">
                {/* Content */}
                <div className="p-10 lg:p-12 flex-1 flex flex-col justify-center">
                  <span className="text-[10px] uppercase tracking-[0.3em] text-gold mb-4">
                    {rightBanner.tag}
                  </span>
                  <h3
                    className="font-serif text-3xl lg:text-4xl text-brandblack mb-4 leading-tight"
                    dangerouslySetInnerHTML={{ __html: rightBanner.title }}
                  />
                  <p
                    className="text-gray-600 text-sm mb-6 leading-relaxed"
                    dangerouslySetInnerHTML={{
                      __html: rightBanner.description,
                    }}
                  />
                  <a
                    href={rightBanner.link}
                    className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.15em] text-brandblack font-medium group-hover:text-gold transition-colors"
                  >
                    Shop Rings
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </a>
                </div>
                {/* Image */}
                <div className="lg:w-56 xl:w-64 h-48 lg:h-auto flex-shrink-0 overflow-hidden">
                  <img
                    src={rightBanner.image}
                    alt={rightBanner.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                </div>
              </div>
              {/* Decorative corner */}
              <div className="absolute top-0 right-0 w-24 h-24 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <div className="absolute top-4 right-4 w-8 h-px bg-gold" />
                <div className="absolute top-4 right-4 w-px h-8 bg-gold" />
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
