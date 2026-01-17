"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { settingsService, SiteSettings } from "../services/SettingsService";

export default function Footer() {
  const [settings, setSettings] = useState<SiteSettings | null>(null);

  useEffect(() => {
    settingsService.getSettings().then(setSettings);
  }, []);

  if (!settings) return null;

  return (
    <footer className="bg-brandblack text-white pt-24 pb-12">
      <div className="max-w-[1800px] mx-auto px-6 lg:px-12">
        {/* Top Section: Links */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-24 border-b border-white/10 pb-12">
          <div className="space-y-6">
            <h4 className="text-[11px] font-bold uppercase tracking-widest mb-6">
              Customer Care
            </h4>
            <ul className="space-y-3 text-sm font-light text-gray-400">
              <li>
                <Link
                  href="/contact"
                  className="hover:text-white transition-colors"
                >
                  Contact Us
                </Link>
              </li>
              <li>
                <Link
                  href="/private-vault"
                  className="hover:text-white transition-colors"
                >
                  Private Vault Access
                </Link>
              </li>
              <li>
                <Link
                  href="/education-hub"
                  className="hover:text-white transition-colors"
                >
                  Education & Care
                </Link>
              </li>
              <li>
                <Link
                  href="/consultation"
                  className="hover:text-white transition-colors"
                >
                  Book an Appointment
                </Link>
              </li>
              <li>
                <Link
                  href="/policies"
                  className="hover:text-white transition-colors"
                >
                  Shipping & Returns
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-6">
            <h4 className="text-[11px] font-bold uppercase tracking-widest mb-6">
              Our Company
            </h4>
            <ul className="space-y-3 text-sm font-light text-gray-400">
              <li>
                <Link
                  href="/jewellery-shops"
                  className="hover:text-white transition-colors"
                >
                  Our Ateliers
                </Link>
              </li>
              <li>
                <Link
                  href="/investment"
                  className="hover:text-white transition-colors text-gold"
                >
                  Gemstones as Assets
                </Link>
              </li>
              <li>
                <Link
                  href="/education-hub"
                  className="hover:text-white transition-colors"
                >
                  Sustainability
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="hover:text-white transition-colors"
                >
                  Press & Media
                </Link>
              </li>
              <li>
                <Link
                  href="/admin"
                  className="hover:text-white transition-colors opacity-50"
                >
                  Admin Portal
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-6">
            <h4 className="text-[11px] font-bold uppercase tracking-widest mb-6">
              Legal & Privacy
            </h4>
            <ul className="space-y-3 text-sm font-light text-gray-400">
              <li>
                <Link
                  href="/policies"
                  className="hover:text-white transition-colors"
                >
                  Terms of Use
                </Link>
              </li>
              <li>
                <Link
                  href="/policies"
                  className="hover:text-white transition-colors"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/policies"
                  className="hover:text-white transition-colors"
                >
                  Cookie Policy
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-6">
            <h4 className="text-[11px] font-bold uppercase tracking-widest mb-6">
              Latest from {settings.siteName}
            </h4>
            <div className="flex flex-col gap-4">
              <input
                type="email"
                placeholder="Enter your email"
                className="bg-transparent border-b border-white/30 py-2 text-white placeholder-gray-500 focus:outline-none focus:border-white transition-colors"
              />
              <button className="text-left text-[10px] uppercase tracking-widest font-bold hover:text-gray-300">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Section: Logo & Copyright */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-center md:text-left">
            <h2 className="font-serif text-3xl tracking-widest uppercase">
              {settings.siteName}
            </h2>
          </div>

          <div className="flex gap-6">
            {settings.socials.instagram && (
              <a
                href={settings.socials.instagram}
                className="text-gray-400 hover:text-white text-xs uppercase tracking-widest"
              >
                Instagram
              </a>
            )}
            {settings.socials.facebook && (
              <a
                href={settings.socials.facebook}
                className="text-gray-400 hover:text-white text-xs uppercase tracking-widest"
              >
                Facebook
              </a>
            )}
            {settings.socials.youtube && (
              <a
                href={settings.socials.youtube}
                className="text-gray-400 hover:text-white text-xs uppercase tracking-widest"
              >
                Youtube
              </a>
            )}
            {settings.socials.tiktok && (
              <a
                href={settings.socials.tiktok}
                className="text-gray-400 hover:text-white text-xs uppercase tracking-widest"
              >
                TikTok
              </a>
            )}
          </div>

          <div className="text-xs text-gray-600 uppercase tracking-widest">
            {settings.footerText}
          </div>
        </div>
      </div>
    </footer>
  );
}
