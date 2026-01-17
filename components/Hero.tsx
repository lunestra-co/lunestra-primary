"use client";
import React, { useState, useEffect, useCallback } from "react";
import Button from "./Button";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";

import { bannerService, HeroSlide } from "../services/BannerService";

export default function Hero() {
  const [slides, setSlides] = useState<HeroSlide[]>([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    const loadSlides = async () => {
      const data = await bannerService.getHeroSlides();
      setSlides(data);
    };
    loadSlides();
  }, []);

  const nextSlide = useCallback(() => {
    if (isTransitioning || slides.length === 0) return;
    setIsTransitioning(true);
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    setTimeout(() => setIsTransitioning(false), 500);
  }, [isTransitioning, slides.length]);

  const prevSlide = () => {
    if (isTransitioning || slides.length === 0) return;
    setIsTransitioning(true);
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
    setTimeout(() => setIsTransitioning(false), 500);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide();
    }, 6000);
    return () => clearInterval(timer);
  }, [nextSlide]);

  return (
    <div className="relative h-[100svh] max-h-[900px] w-full overflow-hidden bg-brandblack">
      {/* Background Video */}
      <div className="absolute inset-0 z-0 w-full h-full overflow-hidden">
        <video
          className="w-full h-full object-cover"
          style={{ filter: "brightness(0.5) contrast(1.1)" }}
          src="https://res.cloudinary.com/dw4hikox3/video/upload/v1767926885/8246552-hd_1920_1080_25fps_2_hfvtsr.mp4"
          autoPlay
          loop
          muted
          playsInline
        />
      </div>

      {/* Content Overlay */}
      <div className="absolute inset-0 z-30 flex flex-col justify-center items-center text-center px-6">
        {/* Decorative line */}
        <div className="w-px h-16 bg-gradient-to-b from-transparent via-gold to-transparent mb-8" />

        {slides.length > 0 && (
          <>
            {/* Subtitle */}
            <span className="text-gold uppercase tracking-[0.3em] md:tracking-[0.4em] text-[10px] md:text-[11px] font-medium mb-4 md:mb-6 animate-fade-in-up">
              {slides[currentSlide].subtitle}
            </span>

            {/* Main Title */}
            <h1 className="font-serif text-4xl sm:text-5xl md:text-7xl lg:text-8xl text-white mb-6 md:mb-8 leading-[1.1] animate-fade-in-up px-4">
              {slides[currentSlide].title}
            </h1>
          </>
        )}

        {/* Decorative line */}
        <div className="w-24 h-px bg-gradient-to-r from-transparent via-gold to-transparent mb-10" />

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 animate-fade-in-up">
          <a
            href="#collection?mode=gift"
            className="group relative overflow-hidden border border-white/30 text-white px-10 py-4 text-[11px] uppercase tracking-[0.2em] transition-all duration-500 hover:border-gold"
          >
            <span className="relative z-10">Find Gifts</span>
            <div className="absolute inset-0 bg-gold transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500" />
            <span className="absolute inset-0 flex items-center justify-center text-brandblack opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
              Find Gifts
            </span>
          </a>

          <a
            href="#collection?mode=collector"
            className="flex items-center gap-2 text-white/80 hover:text-gold text-[11px] uppercase tracking-[0.2em] transition-colors"
          >
            Explore Collection
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>

      {/* Slide Indicators */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-30 flex gap-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-12 h-0.5 transition-all duration-300 ${
              index === currentSlide
                ? "bg-gold"
                : "bg-white/30 hover:bg-white/50"
            }`}
          />
        ))}
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-12 right-12 z-30 hidden lg:flex items-center gap-3 text-white/50">
        <span className="text-[10px] uppercase tracking-widest">Scroll</span>
        <div className="w-px h-8 bg-white/30 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full bg-gold animate-pulse" />
        </div>
      </div>
    </div>
  );
}
