import React from "react";
import { ArrowRight } from "lucide-react";

export default function RequestQuotationBanner() {
  return (
    <section className="bg-sapphire py-20 px-6 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gold/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-sapphire/10 rounded-full blur-[80px] pointer-events-none" />

      <div className="max-w-4xl mx-auto text-center relative z-10">
        <span className="text-gold uppercase tracking-[0.2em] text-xs font-bold mb-4 block">
          Personalized Service
        </span>
        <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-white mb-6">
          Looking for something exceptional?
        </h2>
        <p className="text-gray-400 font-light text-lg mb-10 max-w-2xl mx-auto">
          Receive a tailored valuation or bespoke proposal from our master
          gemologists. Let us guide you to the perfect piece.
        </p>

        <a
          href="#consultation"
          className="inline-flex items-center gap-4 bg-white text-brandblack px-8 py-4 text-xs uppercase tracking-[0.2em] hover:bg-gold hover:text-white transition-all duration-300"
        >
          Request a Quotation
          <ArrowRight className="w-4 h-4" />
        </a>
      </div>
    </section>
  );
}
