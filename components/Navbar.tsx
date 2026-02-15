"use client";
import React, { useState, useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import { getCartItems } from "./CartSidebar";
import Link from "next/link";
import {
  Menu,
  X,
  ChevronDown,
  Search,
  User,
  ShoppingBag,
  Phone,
} from "lucide-react";

// Mega Menu Data for each nav item
const MEGA_MENUS = {
  gemstones: {
    columns: [
      {
        title: "By Variety",
        links: [
          { label: "Sapphire", href: "/gems/sapphire" },
          { label: "Ruby", href: "/gems/ruby" },
          { label: "Emerald", href: "/gems/emerald" },
          { label: "Diamond", href: "/gems/diamond" },
          { label: "Padparadscha", href: "/gems/padparadscha" },
        ],
      },
      {
        title: "By Carat",
        links: [
          { label: "Under 1 Carat", href: "/gems/all?weight=0-1" },
          { label: "1-2 Carats", href: "/gems/all?weight=1-2" },
          { label: "2-5 Carats", href: "/gems/all?weight=2-5" },
          { label: "5+ Carats", href: "/gems/all?weight=5-1000" },
        ],
      },
      {
        title: "By Investment",
        links: [
          {
            label: "Entry Level (Below LKR 25K)",
            href: "/gems/all?price=0-25000",
          },
          {
            label: "Mid Tier (LKR 25K - 100K)",
            href: "/gems/all?price=25000-100000",
          },
          {
            label: "High Value (LKR 100K - 500K)",
            href: "/gems/all?price=100000-500000",
          },
          {
            label: "Collector's Choice (Above LKR 500K)",
            href: "/gems/all?price=500000-100000000",
          },
        ],
      },
    ],
    featuredProduct: {
      name: "Ceylon Blue Sapphire",
      image:
        "https://www.gemsinsrilanka.com/wp-content/uploads/2021/01/Blue-Sapphire.jpg",
      href: "/product-detail/1",
      weight: "2.15 ct",
      type: "Natural Sapphire",
    },
  },
  jewellery: {
    columns: [
      {
        title: "By Type",
        links: [
          { label: "Rings", href: "/jewellery/rings" },
          { label: "Necklaces", href: "/jewellery/necklaces" },
          { label: "Earrings", href: "/jewellery/earrings" },
          { label: "Bracelets", href: "/jewellery/bracelets" },
          { label: "Brooches", href: "/jewellery/brooches" },
        ],
      },
      {
        title: "By Metal",
        links: [
          { label: "18K Gold", href: "/jewellery/all?metal=18k-gold" },
          { label: "Platinum", href: "/jewellery/all?metal=platinum" },
          { label: "White Gold", href: "/jewellery/all?metal=white-gold" },
          { label: "Rose Gold", href: "/jewellery/all?metal=rose-gold" },
          { label: "Sterling Silver", href: "/jewellery/all?metal=silver" },
        ],
      },
      {
        title: "By Price",
        links: [
          {
            label: "Entry Level (Below LKR 25K)",
            href: "/jewellery/all?price=0-25000",
          },
          {
            label: "Mid Tier (LKR 25K - 100K)",
            href: "/jewellery/all?price=25000-100000",
          },
          {
            label: "High Value (LKR 100K - 500K)",
            href: "/jewellery/all?price=100000-500000",
          },
          {
            label: "Collector's Choice (Above LKR 500K)",
            href: "/jewellery/all?price=500000-100000000",
          },
        ],
      },
    ],
    featuredProduct: {
      name: "Diamond Solitaire Ring",
      image:
        "https://media.tiffany.com/is/image/Tiffany/EcomBrowseM/tiffany-setting-diamond-engagement-ring-1x1.jpg",
      href: "/jewellery/rings",
      metal: "18K White Gold",
      type: "Engagement Ring",
    },
  },
};

const CartSidebar = dynamic(() => import("./CartSidebar"), { ssr: false });

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);

  // Search bar state
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const searchInputRef = useRef<HTMLInputElement>(null);
  // Focus input when search opens
  useEffect(() => {
    if (isSearchOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isSearchOpen]);

  // Popular tags and spotlight items (placeholder data)
  const popularTags = [
    "heart necklaces",
    "bracelets",
    "rings",
    "necklaces",
    "heart",
  ];
  const spotlightItems = [
    {
      label: "Tiffany Icons",
      img: "https://media.tiffany.com/is/image/Tiffany/EcomBrowseM/tiffany-t-true-narrow-diamond-ring-18k-rose-gold-68111637_1001_1.jpg",
      href: "/gems/sapphire",
    },
    {
      label: "Gifts for Her",
      img: "https://media.tiffany.com/is/image/Tiffany/EcomBrowseM/tiffany-blue-box-hero-2022-1x1.jpg",
      href: "/gems/emerald",
    },
    {
      label: "Love & Engagement",
      img: "https://media.tiffany.com/is/image/Tiffany/EcomBrowseM/tiffany-setting-diamond-engagement-ring-1x1.jpg",
      href: "/gems/diamond",
    },
    {
      label: "Find a store",
      img: "https://media.tiffany.com/is/image/Tiffany/EcomBrowseM/flagship-hero-2023-1x1.jpg",
      href: "/contact",
    },
  ];

  useEffect(() => {
    const updateCartCount = () => setCartCount(getCartItems().length);
    const openCart = () => setIsCartOpen(true);
    updateCartCount();
    window.addEventListener("storage", updateCartCount);
    window.addEventListener("cart-updated", updateCartCount);
    window.addEventListener("open-cart", openCart);
    return () => {
      window.removeEventListener("storage", updateCartCount);
      window.removeEventListener("cart-updated", updateCartCount);
      window.removeEventListener("open-cart", openCart);
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
      // Close mega menu on scroll
      if (activeMenu) {
        setActiveMenu(null);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [activeMenu]);

  return (
    <>
      {/* Main Navigation Bar */}
      <nav
        className="w-full z-50 bg-white transition-shadow duration-300 border-b border-gray-200 fixed top-0"
        onMouseLeave={() => setActiveMenu(null)}
      >
        <div className="max-w-[1800px] mx-auto px-6 lg:px-16">
          <div className="flex justify-between items-center py-4">
            {/* Left: Search & Location */}
            <div className="flex items-center gap-4 flex-1">
              <button
                className="lg:hidden"
                onClick={() => setIsMobileMenuOpen(true)}
              >
                <Menu className="w-5 h-5 text-brandblack" />
              </button>
              <button
                className="hidden lg:block text-brandblack hover:text-gold transition-colors"
                onClick={() => setIsSearchOpen((v) => !v)}
                aria-label="Open search"
              >
                <Search className="w-5 h-5 stroke-[1.5]" />
              </button>
              {/* Desktop Search Bar Overlay - Tiffany style */}
              {isSearchOpen && (
                <div
                  className="fixed inset-0 z-[100] bg-white overflow-y-auto"
                  onClick={() => setIsSearchOpen(false)}
                >
                  <div
                    className="max-w-[1200px] mx-auto px-6 pt-12 pb-16 min-h-screen relative"
                    onClick={(e) => e.stopPropagation()}
                  >
                    {/* Close button */}
                    <button
                      className="absolute -left-8 top-8 w-12 h-12 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
                      onClick={() => setIsSearchOpen(false)}
                      aria-label="Close search"
                    >
                      <X className="w-7 h-7 text-gray-700" />
                    </button>
                    {/* Search input */}
                    <div className="ml-24 mt-2 mb-6 max-w-2xl">
                      <input
                        ref={searchInputRef}
                        type="text"
                        className="w-full border-none outline-none bg-transparent text-2xl md:text-3xl font-serif text-gray-700 placeholder-gray-400 py-2"
                        placeholder="Search for gems, jewelry, articles..."
                        value={searchValue}
                        onChange={(e) => setSearchValue(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === "Escape") setIsSearchOpen(false);
                        }}
                      />
                      <hr className="mt-2 border-gray-300" />
                    </div>
                    {/* Popular tags */}
                    <div className="ml-24 mt-8">
                      <div className="text-xl font-serif text-black mb-3">
                        Popular
                      </div>
                      <div className="flex flex-wrap gap-4">
                        {popularTags.map((tag, idx) => (
                          <button
                            key={tag}
                            className="bg-gray-50 hover:bg-gray-100 text-black px-5 py-2 rounded shadow-sm text-sm tracking-tighter font-sans font-medium transition-colors border border-gray-100"
                            onClick={() => setSearchValue(tag)}
                          >
                            {tag}
                          </button>
                        ))}
                      </div>
                    </div>
                    {/* Spotlight section */}
                    <div className="ml-24 mt-12">
                      <div className="text-xl font-serif text-black mb-5">
                        Spotlight
                      </div>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        {spotlightItems.map((item, idx) => (
                          <a
                            key={item.label}
                            href={item.href}
                            className="flex flex-col items-center group"
                            onClick={() => setIsSearchOpen(false)}
                          >
                            <div className="w-56 h-56 bg-gray-100 rounded overflow-hidden mb-3 flex items-center justify-center">
                              <img
                                src={item.img}
                                alt={item.label}
                                className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
                              />
                            </div>
                            <span className="text-base font-serif text-gray-700 mt-1 text-center">
                              {item.label}
                            </span>
                          </a>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Center: Navigation Links */}
            <div className="hidden lg:flex items-center justify-center gap-8">
              {/* Left Side */}
              <div
                className="relative py-4"
                onMouseEnter={() => setActiveMenu("gemstones")}
              >
                <Link
                  href="/gems"
                  className={`text-[12px] font-medium uppercase tracking-wider transition-colors ${
                    activeMenu === "gemstones"
                      ? "text-gold"
                      : "text-gray-800 hover:text-brandblack"
                  } py-4`}
                  onClick={() => setActiveMenu(null)}
                >
                  The Collection
                </Link>
                <div
                  className={`absolute bottom-0 left-0 w-full h-0.5 bg-gold transition-transform origin-left ${
                    activeMenu === "gemstones" ? "scale-x-100" : "scale-x-0"
                  }`}
                />
              </div>
              <div
                className="relative py-4"
                onMouseEnter={() => setActiveMenu("jewellery")}
              >
                <Link
                  href="/jewellery"
                  className={`text-[12px] font-medium uppercase tracking-wider transition-colors ${
                    activeMenu === "jewellery"
                      ? "text-gold"
                      : "text-gray-800 hover:text-brandblack"
                  } py-4`}
                  onClick={() => setActiveMenu(null)}
                >
                  Jewellery
                </Link>
                <div
                  className={`absolute bottom-0 left-0 w-full h-0.5 bg-gold transition-transform origin-left ${
                    activeMenu === "jewellery" ? "scale-x-100" : "scale-x-0"
                  }`}
                />
              </div>
              <Link
                href="/request"
                className="text-[12px] font-medium uppercase tracking-wider transition-colors text-gray-800 hover:text-brandblack py-4"
                onMouseEnter={() => setActiveMenu(null)}
              >
                Request
              </Link>

              {/* Logo - Center */}
              <Link href="/" className="px-8">
                <span className="font-serif text-3xl uppercase font-medium text-brandblack">
                  LUNESTRA & CO.
                </span>
              </Link>

              {/* Right Side */}
              <Link
                href="/journal"
                className="text-[12px] font-medium uppercase tracking-wider text-gray-800 hover:text-brandblack transition-colors py-4"
                onMouseEnter={() => setActiveMenu(null)}
              >
                Origin
              </Link>
              <Link
                href="/about"
                className="text-[12px] font-medium uppercase tracking-wider text-gray-800 hover:text-brandblack transition-colors py-4"
                onMouseEnter={() => setActiveMenu(null)}
              >
                Our House
              </Link>
              <Link
                href="/contact"
                className="text-[12px] font-medium uppercase tracking-wider text-gray-800 hover:text-brandblack transition-colors py-4"
                onMouseEnter={() => setActiveMenu(null)}
              >
                Contact
              </Link>
            </div>

            {/* Mobile Logo */}
            <Link
              href="/"
              className="lg:hidden absolute left-1/2 transform -translate-x-1/2"
            >
              <span className="font-serif text-2xl uppercase font-medium text-brandblack tracking-tighter">
                LUNESTRA & CO.
              </span>
            </Link>

            {/* Right: User Actions */}
            <div className="flex items-center gap-4 flex-1 justify-end">
              <Link
                href="/account"
                className="text-brandblack hover:text-gold transition-colors"
              >
                <User className="w-5 h-5 stroke-[1.5]" />
              </Link>
              <button
                className="relative text-brandblack hover:text-gold transition-colors"
                onClick={() => setIsCartOpen(true)}
                aria-label="Open cart"
              >
                <ShoppingBag className="w-5 h-5 stroke-[1.5]" />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-gold text-white text-xs rounded-full px-1.5 py-0.5 min-w-[20px] text-center">
                    {cartCount}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mega Menu - Gemstones (Column Style) */}
        {activeMenu === "gemstones" && (
          <div
            className="absolute left-0 w-full bg-white border-t border-gray-100 shadow-lg"
            onMouseEnter={() => setActiveMenu("gemstones")}
            onMouseLeave={() => setActiveMenu(null)}
          >
            <div className="max-w-[1400px] mx-auto px-12 py-12">
              <div className="flex gap-16">
                {/* Text Columns */}
                <div className="flex gap-16 flex-1">
                  {MEGA_MENUS.gemstones.columns.map((column, idx) => (
                    <div key={idx} className="min-w-[160px]">
                      <h3 className="text-[11px] font-medium uppercase tracking-wider text-gray-400 mb-4">
                        {column.title}
                      </h3>
                      <ul className="space-y-3">
                        {column.links.map((link, linkIdx) => (
                          <li key={linkIdx}>
                            <Link
                              href={link.href}
                              className="text-sm text-gray-700 hover:text-brandblack hover:underline transition-colors"
                              onClick={() => setActiveMenu(null)}
                            >
                              {link.label}
                            </Link>
                          </li>
                        ))}
                        {/* Add 'View All Gems' link at the bottom of the first column */}
                        {idx === 0 && (
                          <li className="mt-16">
                            <Link
                              href="/gems/all"
                              className="text-md font-semibold text-gold hover:text-brandblack transition-colors flex items-center gap-2"
                              onClick={() => setActiveMenu(null)}
                            >
                              View All Gems
                              <ChevronDown className="w-5 h-5 rotate-270" />
                            </Link>
                          </li>
                        )}
                      </ul>
                    </div>
                  ))}
                </div>

                {/* Featured Product (Styled like FeaturedCollection) */}
                <div className="w-[340px] shrink-0 bg-white shadow-none p-0 flex flex-col items-center justify-center">
                  <Link
                    href={MEGA_MENUS.gemstones.featuredProduct.href}
                    className="group cursor-pointer flex flex-col w-full"
                  >
                    {/* Image Container */}
                    <div className="relative w-full aspect-[1/1] overflow-hidden bg-white mb-6 shadow-lg shadow-black/5">
                      <img
                        src={MEGA_MENUS.gemstones.featuredProduct.image}
                        alt={MEGA_MENUS.gemstones.featuredProduct.name}
                        className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
                      />
                      {/* Overlay on hover */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-end justify-center pb-8">
                        <span className="text-white text-[11px] uppercase tracking-[0.2em] border border-white/50 px-6 py-3 hover:bg-white hover:text-brandblack transition-colors">
                          View Details
                        </span>
                      </div>
                      {/* New badge (optional, static for demo) */}
                      <span className="absolute top-4 left-4 bg-gold text-white text-[9px] uppercase tracking-widest px-4 py-1.5 font-medium">
                        Featured
                      </span>
                      {/* Decorative corner */}
                      <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                        <div className="w-6 h-px bg-white" />
                        <div className="w-px h-6 bg-white absolute top-0 right-0" />
                      </div>
                    </div>
                    {/* Product Info */}
                    <div className="text-center space-y-3 px-2 pb-6">
                      <div className="flex justify-center items-center gap-3 text-[9px] uppercase tracking-[0.15em] text-gray-400">
                        <span>{MEGA_MENUS.gemstones.featuredProduct.type}</span>
                        <span className="w-1 h-1 bg-gold rounded-full" />
                        <span>
                          {MEGA_MENUS.gemstones.featuredProduct.weight}
                        </span>
                      </div>
                      <h3 className="font-serif text-xl text-brandblack group-hover:text-gold transition-colors duration-300">
                        {MEGA_MENUS.gemstones.featuredProduct.name}
                      </h3>
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeMenu === "jewellery" && (
          <div
            className="absolute left-0 w-full bg-white border-t border-gray-100 shadow-lg"
            onMouseEnter={() => setActiveMenu("jewellery")}
            onMouseLeave={() => setActiveMenu(null)}
          >
            <div className="max-w-[1400px] mx-auto px-12 py-12">
              <div className="flex gap-16">
                {/* Text Columns */}
                <div className="flex gap-16 flex-1">
                  {MEGA_MENUS.jewellery.columns.map((column, idx) => (
                    <div key={idx} className="min-w-[160px]">
                      <h3 className="text-[11px] font-medium uppercase tracking-wider text-gray-400 mb-4">
                        {column.title}
                      </h3>
                      <ul className="space-y-3">
                        {column.links.map((link, linkIdx) => (
                          <li key={linkIdx}>
                            <Link
                              href={link.href}
                              className="text-sm text-gray-700 hover:text-brandblack hover:underline transition-colors"
                              onClick={() => setActiveMenu(null)}
                            >
                              {link.label}
                            </Link>
                          </li>
                        ))}
                        {/* Add 'View All Jewellery' link at the bottom of the first column */}
                        {idx === 0 && (
                          <li className="mt-16">
                            <Link
                              href="/jewellery/all"
                              className="text-md font-semibold text-gold hover:text-brandblack transition-colors flex items-center gap-2"
                              onClick={() => setActiveMenu(null)}
                            >
                              View All Jewellery
                              <ChevronDown className="w-5 h-5 rotate-270" />
                            </Link>
                          </li>
                        )}
                      </ul>
                    </div>
                  ))}
                </div>

                {/* Featured Product (Styled like FeaturedCollection) */}
                <div className="w-[340px] shrink-0 bg-white shadow-none p-0 flex flex-col items-center justify-center">
                  <Link
                    href={MEGA_MENUS.jewellery.featuredProduct.href}
                    className="group cursor-pointer flex flex-col w-full"
                  >
                    {/* Image Container */}
                    <div className="relative w-full aspect-[1/1] overflow-hidden bg-white mb-6 shadow-lg shadow-black/5">
                      <img
                        src={MEGA_MENUS.jewellery.featuredProduct.image}
                        alt={MEGA_MENUS.jewellery.featuredProduct.name}
                        className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
                      />
                      {/* Overlay on hover */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-end justify-center pb-8">
                        <span className="text-white text-[11px] uppercase tracking-[0.2em] border border-white/50 px-6 py-3 hover:bg-white hover:text-brandblack transition-colors">
                          View Details
                        </span>
                      </div>
                      {/* New badge (optional, static for demo) */}
                      <span className="absolute top-4 left-4 bg-gold text-white text-[9px] uppercase tracking-widest px-4 py-1.5 font-medium">
                        Featured
                      </span>
                      {/* Decorative corner */}
                      <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                        <div className="w-6 h-px bg-white" />
                        <div className="w-px h-6 bg-white absolute top-0 right-0" />
                      </div>
                    </div>
                    {/* Product Info */}
                    <div className="text-center space-y-3 px-2 pb-6">
                      <div className="flex justify-center items-center gap-3 text-[9px] uppercase tracking-[0.15em] text-gray-400">
                        <span>{MEGA_MENUS.jewellery.featuredProduct.type}</span>
                        <span className="w-1 h-1 bg-gold rounded-full" />
                        <span>
                          {MEGA_MENUS.jewellery.featuredProduct.metal}
                        </span>
                      </div>
                      <h3 className="font-serif text-xl text-brandblack group-hover:text-gold transition-colors duration-300">
                        {MEGA_MENUS.jewellery.featuredProduct.name}
                      </h3>
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ...engagement mega menu removed... */}
      </nav>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 z-[70] bg-white transform transition-transform duration-500 ease-in-out ${
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="p-6 flex justify-between items-center border-b border-gray-100">
          <span className="font-serif text-2xl tracking-widest text-brandblack italic">
            Lunestra
          </span>
          <button
            onClick={() => setIsMobileMenuOpen(false)}
            className="p-2 -mr-2 text-brandblack hover:text-gold transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
        <div className="flex flex-col p-8 space-y-6 overflow-y-auto max-h-[calc(100vh-80px)]">
          {[
            { label: "High Jewelry", href: "/jewellery-shops" },
            { label: "Gemstones", href: "/categories" },
            { label: "Love & Engagement", href: "/collection" },
            { label: "Heritage", href: "/contact" },
            { label: "Investment", href: "/investment" },
          ].map((item, idx) => (
            <Link
              key={item.label}
              href={item.href}
              className={`text-lg uppercase tracking-widest font-sans text-brandblack transition-all duration-500 transform ${
                isMobileMenuOpen
                  ? "translate-x-0 opacity-100"
                  : "-translate-x-4 opacity-0"
              }`}
              style={{ transitionDelay: `${idx * 100}ms` }}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/education-hub"
            className={`text-lg uppercase tracking-widest font-sans text-brandblack italic transition-all duration-500 transform ${
              isMobileMenuOpen
                ? "translate-x-0 opacity-100"
                : "-translate-x-4 opacity-0"
            }`}
            style={{ transitionDelay: "500ms" }}
            onClick={() => setIsMobileMenuOpen(false)}
          >
            World of Lunestra
          </Link>

          <div
            className={`border-t border-gray-100 pt-8 mt-4 space-y-4 transition-all duration-500 delay-700 ${
              isMobileMenuOpen ? "opacity-100" : "opacity-0"
            }`}
          >
            <Link
              href="/consultation"
              className="block text-gold uppercase tracking-wider font-medium text-base"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Book an Appointment
            </Link>
            <a
              href="tel:+1234567890"
              className="block text-gray-400 font-serif italic text-base"
            >
              ( +123 ) 456 7890
            </a>
          </div>
        </div>
      </div>
      <CartSidebar isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  );
}
