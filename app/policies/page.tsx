"use client";
import React, { useEffect } from "react";
import { POLICIES_CONTENT } from "@/constants";

export default function PoliciesPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="pt-32 pb-24 bg-white min-h-screen">
      <div className="max-w-[1000px] mx-auto px-6 lg:px-12">
        <div className="text-center mb-16">
          <span className="text-gray-400 uppercase tracking-[0.2em] text-[10px] font-bold block mb-4">
            Institutional Trust
          </span>
          <h1 className="font-serif text-4xl lg:text-5xl text-brandblack">
            Policies & Guarantees
          </h1>
        </div>

        <div className="space-y-16">
          <section id="returns">
            <h2 className="font-serif text-2xl text-brandblack mb-4">
              {POLICIES_CONTENT.returns.title}
            </h2>
            <div className="w-12 h-px bg-sapphire mb-6"></div>
            <p className="font-sans font-light text-gray-600 leading-relaxed">
              {POLICIES_CONTENT.returns.content}
              <br />
              <br />
              To initiate a return, please contact the Private Office within 24
              hours of receipt. The security tag must remain attached to the
              item.
            </p>
          </section>

          <section id="buyback">
            <h2 className="font-serif text-2xl text-brandblack mb-4">
              {POLICIES_CONTENT.buyback.title}
            </h2>
            <div className="w-12 h-px bg-sapphire mb-6"></div>
            <p className="font-sans font-light text-gray-600 leading-relaxed">
              {POLICIES_CONTENT.buyback.content}
              <br />
              <br />
              This guarantee is transferable to heirs but requires the original
              certificate and sales invoice. Buy-back is paid via wire transfer
              within 5 business days of inspection.
            </p>
          </section>

          <section id="liability">
            <h2 className="font-serif text-2xl text-brandblack mb-4">
              {POLICIES_CONTENT.liability.title}
            </h2>
            <div className="w-12 h-px bg-sapphire mb-6"></div>
            <p className="font-sans font-light text-gray-600 leading-relaxed">
              {POLICIES_CONTENT.liability.content}
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
