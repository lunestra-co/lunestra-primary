"use client";
import React, { useState, useEffect } from "react";

const BADGES = [
  {
    icon: (
      <svg
        className="w-10 h-10"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={0.75}
          d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
        />
      </svg>
    ),
    title: "Officially Licensed",
    description:
      "Government licensed for authentic, ethical gemstones since 2017.",
  },
  {
    icon: (
      <svg
        className="w-10 h-10"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={0.75}
          d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
        />
      </svg>
    ),
    title: "Payments Protected",
    description: "Encrypted payments and buyer protection for every purchase.",
  },
  {
    icon: (
      <svg
        className="w-10 h-10"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={0.75}
          d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
        />
      </svg>
    ),
    title: "Insured Delivery",
    description:
      "Complimentary insured delivery anywhere in Sri Lanka, always safe.",
  },
  {
    icon: (
      <svg
        className="w-10 h-10"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={0.75}
          d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
        />
      </svg>
    ),
    title: "Lifetime Guidance",
    description: "Lifetime support, appraisals, and expert advice-always free.",
  },
];

import { useScrollAnimation } from "../hooks/useScrollAnimation";

export default function TrustBadges() {
  const { ref, isVisible } = useScrollAnimation();
  const [current, setCurrent] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    // Set isMobile on mount and on resize
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Auto-slide for mobile with fade animation
  useEffect(() => {
    if (!isMobile) return;
    const interval = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setCurrent((prev) => (prev === BADGES.length - 1 ? 0 : prev + 1));
        setFade(true);
      }, 200); // fade out duration
    }, 4000); // total duration per slide
    return () => clearInterval(interval);
  }, [isMobile]);

  return (
    <section className="py-16 bg-ivory relative overflow-hidden">
      {/* Decorative background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-gold rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-sapphire rounded-full blur-3xl" />
      </div>

      <div className="max-w-400 mx-auto px-6 lg:px-12 relative" ref={ref}>
        {/* Mobile carousel */}
        <div
          className={`block md:hidden transition-all duration-1000 transform ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}
        >
          <div className="flex items-center justify-center relative">
            <div className="flex-1 flex justify-center">
              <div
                className={`flex flex-col items-center text-center w-full max-w-xs mx-auto transition-opacity duration-300 ${fade ? "opacity-100" : "opacity-0"}`}
              >
                <div className="text-gold mb-4">{BADGES[current].icon}</div>
                <h3 className="font-serif text-lg text-brandblack mb-2">
                  {BADGES[current].title}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed max-w-60">
                  {BADGES[current].description}
                </p>
              </div>
            </div>
          </div>
          {/* Dots indicator */}
          <div className="flex justify-center mt-6 gap-2">
            {BADGES.map((_, idx) => (
              <span
                key={idx}
                className={`w-2 h-2 rounded-full ${idx === current ? "bg-gold" : "bg-gold/30"}`}
              />
            ))}
          </div>
        </div>

        {/* Desktop grid */}
        <div
          className={`hidden md:grid grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 transition-all duration-1000 transform ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
          }`}
        >
          {BADGES.map((badge, index) => (
            <div key={index} className="flex flex-col items-center text-center">
              <div className="text-gold mb-6">{badge.icon}</div>
              <h3 className="font-serif text-lg text-brandblack mb-2">
                {badge.title}
              </h3>
              <p className="text-gray-500 text-sm leading-relaxed max-w-60">
                {badge.description}
              </p>
              <div className="w-8 h-px bg-gold/30 mt-6" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
