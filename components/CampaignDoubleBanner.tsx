import React from "react";
import Button from "./Button";

export default function CampaignDoubleBanner() {
  return (
    <section id="gifts" className="grid grid-cols-1 md:grid-cols-2">
      {/* Left Banner */}
      <div className="relative h-[600px] lg:h-[700px] overflow-hidden group">
        <img
          src="https://images.unsplash.com/photo-1601121141461-9d6647bca1ed?auto=format&fit=crop&q=80&w=1200"
          alt="Elsa Peretti Collection"
          className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
        />
        {/* Gradient Overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-60"></div>

        <div className="absolute bottom-24 left-0 w-full text-center text-white px-6">
          <h2 className="font-serif text-4xl lg:text-5xl mb-8 drop-shadow-sm">
            Elsa Peretti® <br /> Jewelry
          </h2>
          <a href="#collection">
            <Button
              variant="secondary"
              className="bg-white text-brandblack border-none hover:bg-gray-100 min-w-[160px] text-[10px]"
            >
              Shop Now
            </Button>
          </a>
        </div>
      </div>

      {/* Right Banner */}
      <div className="relative h-[600px] lg:h-[700px] overflow-hidden group">
        <img
          src="https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&q=80&w=1200"
          alt="Knot Collection"
          className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-60"></div>

        <div className="absolute bottom-24 left-0 w-full text-center text-white px-6">
          <h2 className="font-serif text-4xl lg:text-5xl mb-8 drop-shadow-sm">
            Knot by <br /> Lunestra
          </h2>
          <a href="#collection">
            <Button
              variant="secondary"
              className="bg-white text-brandblack border-none hover:bg-gray-100 min-w-[160px] text-[10px]"
            >
              Shop Now
            </Button>
          </a>
        </div>
      </div>
    </section>
  );
}
