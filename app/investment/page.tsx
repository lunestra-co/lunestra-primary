import React, { useEffect } from "react";
import { INVESTMENT_CONTENT } from "../constants";
import Button from "./Button";
import {
  TrendingUp,
  FileCheck,
  Shield,
  PieChart,
  ArrowRight,
  Download,
  Lock,
} from "lucide-react";
import { useScrollAnimation } from "../hooks/useScrollAnimation";

export default function InvestmentPage() {
  const { ref, isVisible } = useScrollAnimation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-white text-brandblack selection:bg-gold selection:text-white">
      {/* Editorial Hero */}
      <div className="relative h-[70vh] w-full overflow-hidden flex items-center justify-center bg-brandblack">
        <div className="absolute inset-0 opacity-30">
          <img
            src={INVESTMENT_CONTENT.hero.image}
            alt="Vault"
            className="w-full h-full object-cover grayscale"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-brandblack via-brandblack/40 to-transparent"></div>

        <div className="relative z-10 text-center max-w-5xl px-6 animate-fade-in-up">
          <div className="inline-flex items-center gap-3 border border-white/20 px-4 py-2 rounded-full mb-8 backdrop-blur-md">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
            <span className="text-xs font-bold uppercase tracking-widest text-white">
              Market Report 2024/25
            </span>
          </div>
          <h1 className="font-serif text-5xl lg:text-8xl text-white mb-8 leading-tight">
            Legacy Assets
          </h1>
          <p className="font-serif text-xl lg:text-2xl text-white/80 max-w-2xl mx-auto font-light italic">
            "In an era of digital volatility, the tangible permanence of colored
            gemstones offers a unique hedge."
          </p>
        </div>
      </div>

      {/* Ticker / Metrics Strip */}
      <div className="bg-brandblack text-white border-t border-white/10 overflow-hidden relative">
        <div className="max-w-[1600px] mx-auto px-6 lg:px-12 py-12">
          <div className="flex flex-col md:flex-row justify-between items-center gap-12 md:gap-0 divide-y md:divide-y-0 md:divide-x divide-white/10">
            {INVESTMENT_CONTENT.metrics.map((metric, idx) => (
              <div key={idx} className="flex-1 text-center md:px-12 w-full">
                <p className="font-serif text-5xl lg:text-6xl text-white mb-2">
                  {metric.value}
                </p>
                <p className="text-[10px] uppercase tracking-[0.2em] text-gold font-bold mb-2">
                  {metric.label}
                </p>
                <p className="text-xs text-brandgray font-sans opacity-60">
                  {metric.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Editorial Content */}
      <div
        className="max-w-[1400px] mx-auto px-6 lg:px-12 py-24 lg:py-32"
        ref={ref}
      >
        {/* Article Header */}
        <div
          className={`flex flex-col lg:flex-row gap-20 mb-32 transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
          }`}
        >
          <div className="lg:w-1/3">
            <span className="block w-16 h-1 bg-gold mb-8"></span>
            <h2 className="font-serif text-4xl lg:text-5xl text-brandblack mb-6 leading-thinner">
              The Economics of Extinction
            </h2>
            <div className="prose prose-lg text-gray-600">
              <p className="font-serif text-xl italic text-brandblack/80 leading-relaxed mb-6">
                "Unlike diamonds, where supply has historically been managed to
                maintain price stability, the 'Big Three' colored gemstones are
                subject to genuine geological scarcity."
              </p>
            </div>
          </div>
          <div className="lg:w-2/3">
            <div className="bg-gray-50 p-10 lg:p-16 border border-gray-100">
              <h3 className="font-serif text-2xl mb-12 text-center">
                10-Year Asset Class Performance
              </h3>

              <div className="space-y-8">
                {/* Custom Chart Bars */}
                {[
                  {
                    label: "Unheated Burmese Ruby",
                    value: 95,
                    growth: "+145%",
                    color: "bg-red-800",
                  },
                  {
                    label: "Kashmir Sapphire",
                    value: 85,
                    growth: "+128%",
                    color: "bg-blue-900",
                  },
                  {
                    label: "Unheated Ceylon Sapphire",
                    value: 75,
                    growth: "+112%",
                    color: "bg-sapphire",
                  },
                  {
                    label: "S&P 500",
                    value: 60,
                    growth: "+105%",
                    color: "bg-gray-400",
                  },
                  {
                    label: "Gold Bullion",
                    value: 45,
                    growth: "+62%",
                    color: "bg-gold",
                  },
                ].map((item, idx) => (
                  <div key={idx} className="relative">
                    <div className="flex justify-between items-end mb-2">
                      <span className="text-xs uppercase tracking-widest font-bold text-gray-500">
                        {item.label}
                      </span>
                      <span className="font-serif text-lg font-bold text-brandblack">
                        {item.growth}
                      </span>
                    </div>
                    <div className="h-1 bg-gray-200 w-full">
                      <div
                        className={`h-full ${item.color} transition-all duration-1000 ease-out`}
                        style={{ width: isVisible ? `${item.value}%` : "0%" }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-12 flex justify-between items-center text-[10px] text-gray-400 uppercase tracking-widest border-t border-gray-200 pt-6">
                <span>
                  Source: Knight Frank Luxury Investment Index & Local Auction
                  Data
                </span>
                <span>2014 - 2024</span>
              </div>
            </div>
          </div>
        </div>

        {/* Governance Section */}
        <div className="flex flex-col lg:flex-row-reverse gap-20 items-center">
          <div className="lg:w-1/2">
            <h2 className="font-serif text-4xl lg:text-5xl text-brandblack mb-8 leading-thinner">
              Governance & Liquidity
            </h2>
            <div className="font-sans font-light text-gray-600 text-lg space-y-6 leading-relaxed">
              <p>
                In the opaque world of gemstones, the laboratory report is the
                ultimate guarantor of value. A gemstone without a Tier-1 report
                is merely a mineral; with one, it becomes a globally liquid
                asset.
              </p>
              <p>
                Lunestra deals exclusively in stones accompanied by reports from
                the "Big Four" laboratories: GIA, SSEF, GRS, and Gübelin. These
                certificates verify the two most critical value factors:{" "}
                <strong className="text-brandblack font-medium">
                  natural origin
                </strong>{" "}
                and{" "}
                <strong className="text-brandblack font-medium">
                  absence of heat treatment
                </strong>
                .
              </p>
            </div>

            <div className="grid grid-cols-2 gap-6 mt-12">
              <div className="border hover:border-brandblack transition-colors p-6 flex flex-col items-start gap-4 group cursor-default">
                <Shield className="w-8 h-8 text-gold group-hover:scale-110 transition-transform" />
                <div>
                  <h4 className="font-serif text-xl">Provenance</h4>
                  <p className="text-xs text-gray-500 uppercase tracking-wider mt-1">
                    Traceability to Mine
                  </p>
                </div>
              </div>
              <div className="border hover:border-brandblack transition-colors p-6 flex flex-col items-start gap-4 group cursor-default">
                <Lock className="w-8 h-8 text-sapphire group-hover:scale-110 transition-transform" />
                <div>
                  <h4 className="font-serif text-xl">Security</h4>
                  <p className="text-xs text-gray-500 uppercase tracking-wider mt-1">
                    Gated Vault Storage
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:w-1/2 relative">
            <div className="relative z-10 bg-white p-2 shadow-2xl rotate-2 hover:rotate-0 transition-transform duration-700 mx-auto max-w-md border border-gray-100">
              <div className="border-4 border-double border-gray-100 p-8 flex flex-col items-center text-center h-[500px] justify-between bg-ivory/20">
                <div className="w-full">
                  <div className="w-16 h-16 border rounded-full mx-auto mb-6 flex items-center justify-center">
                    <span className="font-serif font-bold text-2xl">L</span>
                  </div>
                  <h3 className="uppercase tracking-[0.3em] text-sm font-bold mb-1">
                    Certificate of Authenticity
                  </h3>
                  <p className="text-[9px] text-gray-400 uppercase">
                    Lunestra Private Vault
                  </p>
                </div>

                <div className="w-full space-y-4 my-8">
                  <div className="h-px bg-gray-200 w-full"></div>
                  <div className="flex justify-between font-serif text-lg">
                    <span className="text-gray-500">Item</span>
                    <span>Unheated Sapphire</span>
                  </div>
                  <div className="flex justify-between font-serif text-lg">
                    <span className="text-gray-500">Weight</span>
                    <span>5.24 Carats</span>
                  </div>
                  <div className="flex justify-between font-serif text-lg">
                    <span className="text-gray-500">Origin</span>
                    <span>Ceylon (Sri Lanka)</span>
                  </div>
                  <div className="h-px bg-gray-200 w-full"></div>
                </div>

                <div className="w-full flex justify-between items-end">
                  <div className="text-left">
                    <img
                      src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e4/Signature_sample.svg/1200px-Signature_sample.svg.png"
                      alt="Signature"
                      className="h-8 opacity-50 mb-2"
                    />
                    <div className="w-24 h-px bg-black mb-1"></div>
                    <p className="text-[9px] uppercase font-bold">
                      Chief Gemologist
                    </p>
                  </div>
                  <div className="w-16 h-16 bg-gold/10 rounded-full flex items-center justify-center border border-gold/30">
                    <Shield className="w-8 h-8 text-gold opacity-50" />
                  </div>
                </div>
              </div>
            </div>
            {/* Decorative background elements */}
            <div className="absolute top-10 -right-10 w-full h-full border border-brandblack/5 z-0"></div>
            <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-gold/10 rounded-full blur-2xl"></div>
          </div>
        </div>
      </div>

      {/* Direct Call to Action */}
      <div className="bg-brandblack text-white py-32 text-center">
        <div className="max-w-3xl mx-auto px-6">
          <h3 className="font-serif text-4xl lg:text-6xl mb-8">
            Secure Your Legacy
          </h3>
          <p className="font-sans font-light text-xl text-white/60 mb-12 leading-relaxed">
            Our Private Office provides bespoke acquisition services for
            high-net-worth individuals seeking uncorrelated asset
            diversification.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <a href="#inquire">
              <Button
                variant="primary"
                className="bg-white text-brandblack hover:bg-gold border-none min-w-[200px] h-14 text-xs"
              >
                Book Consultation
              </Button>
            </a>
            <button className="flex items-center justify-center gap-2 h-14 px-8 border border-white/20 hover:bg-white/10 hover:border-white transition-all uppercase tracking-widest text-xs font-bold rounded-none">
              <Download className="w-4 h-4" /> Download 2025 Market Guide
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
