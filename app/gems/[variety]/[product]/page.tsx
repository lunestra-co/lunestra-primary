import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import { Product } from "@/types";
import ProductActions from "@/components/ProductActions";
import {
  Shield,
  Play,
  MessageCircleMore,
  Heart,
  Lock,
  Unlock,
  ExternalLink,
  Info,
  ChevronRight,
  Maximize2,
  ArrowRight,
  ChevronLeft,
  House,
} from "lucide-react";
import RequestQuotationBanner from "@/components/RequestQuotationBanner";

type PageProps = {
  params: { variety: string; product: string };
};

export default async function ProductDetailPage(props: PageProps) {
  let { params } = props;
  if (params && typeof (params as any).then === "function") {
    params = await (params as any);
  }
  const supabase = await createClient();
  const { product: productSlug } = params;
  // Fetch product by slug
  const { data: product, error } = await supabase
    .from("products")
    .select("*, category:category_id(name, slug)")
    .eq("slug", productSlug)
    .single();
  if (error || !product) {
    return notFound();
  }

  // Simulated Comparison Data (updated to use new fields)
  const comparisonData = {
    market: {
      color: "Blue",
      origin: "Mixed",
      treatment: "Heated",
      transparency: "Transparent",
    },
    thisGem: {
      color: product.color,
      origin: Array.isArray(product.origin)
        ? product.origin.join(", ")
        : product.origin,
      treatment: product.treatment,
      transparency: product.transparency,
    },
  };

  // Collector mode is always enabled (no switch)
  const viewMode = "collector";
  const images = [product.image, ...(product.gallery || [])];

  // Video controls and toggling are omitted in server component
  // If you want toggling, refactor this section into a client component

  return (
    <>
      {/* ProductActions client component handles modal and buttons */}
      <div className="bg-white min-h-screen">
        {/* Mobile Header (Hidden on Desktop) */}
        <div className="lg:hidden px-6 pt-24 pb-4 bg-white sticky top-0 z-40 border-b border-gray-100 flex justify-between items-center">
          <span className="font-serif text-lg text-brandblack">
            {product.name}
          </span>
          <span className="text-xs font-bold">{product.price}</span>
        </div>

        <div className="mx-auto">
          <div className="flex flex-col lg:flex-row lg:relative">
            {/* LEFT: Scrollable Visuals Gallery */}
            <div className="lg:w-1/2 bg-ivory/30">
              {/* Mobile Carousel - Luxury Full-Width */}
              <div className="lg:hidden relative bg-brandblack">
                <div
                  className="flex overflow-x-auto snap-x snap-mandatory scrollbar-hide"
                  style={{ scrollBehavior: "smooth" }}
                >
                  {images.map((img, idx) => (
                    <div
                      key={idx}
                      className="relative w-screen min-w-full snap-center shrink-0"
                    >
                      <div className="w-full aspect-4/5 overflow-hidden">
                        <img
                          src={img}
                          alt={`${product.name} - View ${idx + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>
                  ))}
                  {product.videoUrl && (
                    <div className="relative w-screen min-w-full snap-center shrink-0">
                      <div className="w-full aspect-4/5 overflow-hidden bg-black flex items-center justify-center">
                        <video
                          src={product.videoUrl}
                          autoPlay
                          loop
                          muted
                          playsInline
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>
                  )}
                </div>
                {/* Elegant Carousel Indicators */}
                <div className="absolute bottom-6 left-0 right-0 flex justify-center gap-3">
                  {images.map((_, idx) => (
                    <div
                      key={idx}
                      className="w-8 h-0.5 bg-white/40 rounded-full"
                    />
                  ))}
                  {product.videoUrl && (
                    <div className="w-8 h-0.5 bg-white/40 rounded-full" />
                  )}
                </div>
                {/* Image Counter */}
                <div className="absolute top-4 right-4 bg-black/50 backdrop-blur-sm text-white text-[10px] uppercase tracking-widest px-3 py-1.5 rounded-full">
                  1 / {images.length + (product.videoUrl ? 1 : 0)}
                </div>
              </div>

              {/* Desktop Grid */}
              <div className="hidden lg:grid lg:grid-cols-1 lg:gap-1">
                {images.map((img, idx) => (
                  <div key={idx} className="relative group w-full">
                    <img
                      src={img}
                      alt={`${product.name} - View ${idx + 1}`}
                      className="w-full h-auto object-cover"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-300 cursor-zoom-in" />
                  </div>
                ))}
                {/* Video Section */}
                {product.videoUrl && (
                  <div className="relative aspect-video bg-black flex items-center justify-center group overflow-hidden">
                    <video
                      src={product.videoUrl}
                      autoPlay
                      loop
                      muted
                      playsInline
                      className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
                    />
                    <div className="absolute bottom-6 left-6 text-white text-sm uppercase tracking-tight font-bold">
                      Packaging details only.
                      <br />
                      The gemstone is not represented.
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* RIGHT: Fixed Details Panel - Internal Scroll if needed */}
            <div className="lg:w-1/2 bg-white lg:sticky lg:top-20 lg:self-start lg:h-[calc(100vh-81px)] lg:overflow-y-auto custom-scrollbar">
              <div className="p-6 lg:p-10 flex flex-col">
                {/* Top Section */}
                <div>
                  {/* Header & Toggle */}
                  <div className="flex justify-between items-center mb-6">
                    <nav
                      className="flex items-center space-x-2 text-md pb-4"
                      aria-label="Breadcrumb"
                    >
                      <a
                        href="/"
                        className="text-gray-500 hover:text-gold flex items-center"
                      >
                        <House className="w-4.5 h-4.5 mr-1" />
                        <span className="sr-only">Home</span>
                      </a>
                      <span className="text-gray-400">/</span>
                      <a
                        href="/gems"
                        className="text-gray-500 hover:text-gold flex items-center"
                      >
                        Gems
                      </a>
                      <span className="text-gray-400">/</span>
                      <a
                        href={`/gems/${product.category.slug}`}
                        className="text-gray-500 hover:text-gold flex items-center"
                      >
                        {product.category.name}
                      </a>
                      <span className="text-gray-400">/</span>
                      <span className="text-brandblack font-normal">
                        {product.name}
                      </span>
                    </nav>
                    {product.badge && (
                      <span className="ml-4 px-2 py-1 rounded bg-gold text-white text-xs font-bold uppercase tracking-widest">
                        {product.badge}
                      </span>
                    )}
                  </div>

                  {/* Origin & Actions */}
                  <div className="flex justify-between items-start mb-4">
                    <span className="inline-block py-1 px-3 border border-brandblack text-[9px] uppercase tracking-widest font-medium">
                      {Array.isArray(product.origin)
                        ? product.origin.join(", ")
                        : product.origin}
                    </span>
                    <div className="flex gap-4">
                      <button
                        className="text-gray-400 hover:text-sapphire transition-colors"
                        title="Add to Wishlist"
                      >
                        <Heart className="w-5 h-5 stroke-[1.5]" />
                      </button>
                      <button
                        className="text-gray-400 hover:text-sapphire transition-colors"
                        title="Share"
                      >
                        <ExternalLink className="w-5 h-5 stroke-[1.5]" />
                      </button>
                    </div>
                  </div>

                  {/* Title, Status & Price */}
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-2 mb-3">
                    <div className="flex items-center gap-6">
                      <h1 className="font-serif text-3xl lg:text-4xl text-brandblack leading-tight">
                        {product.name}
                      </h1>
                      {product.sale_price && product.price && (
                        <span className="bg-red-500 text-white text-xs uppercase tracking-widest px-4 py-1.5 font-medium rounded">
                          {`-${Math.round(
                            ((product.price - product.sale_price) /
                              product.price) *
                              100
                          )}%`}
                        </span>
                      )}
                    </div>
                    {product.available ? (
                      <span className="text-xs uppercase tracking-widest text-green-700 font-bold flex items-center gap-2 lg:ml-6 mt-2 lg:mt-0">
                        <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                        Available
                      </span>
                    ) : (
                      <span className="text-xs uppercase tracking-widest text-red-600 font-bold flex items-center gap-2 lg:ml-6 mt-2 lg:mt-0">
                        <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                        Out of Stock
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-3 mb-2">
                    <p className="text-2xl font-serif font-semibold text-brandblack">
                      {product.sale_price ? (
                        <>
                          <span className="text-gold">
                            LKR{" "}
                            {product.sale_price.toLocaleString("en-US", {
                              minimumFractionDigits: 2,
                              maximumFractionDigits: 2,
                            })}
                          </span>
                          {product.price && (
                            <span className="ml-2 line-through text-gray-400">
                              LKR{" "}
                              {product.price.toLocaleString("en-US", {
                                minimumFractionDigits: 2,
                                maximumFractionDigits: 2,
                              })}
                            </span>
                          )}
                        </>
                      ) : product.price ? (
                        `LKR ${product.price.toLocaleString("en-US", {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        })}`
                      ) : (
                        ""
                      )}
                    </p>
                  </div>

                  {/* Specs Grid */}
                  <div className="grid grid-cols-2 gap-x-6 gap-y-4 border-y border-gray-100 py-6 mb-6">
                    <div>
                      <span className="block text-[10px] uppercase tracking-widest text-gray-400 mb-1">
                        Weight
                      </span>
                      <span className="font-serif text-lg">
                        {product.weight} ct
                      </span>
                    </div>
                    <div>
                      <span className="block text-[10px] uppercase tracking-widest text-gray-400 mb-1">
                        Shape
                      </span>
                      <span className="font-serif text-lg">
                        {product.shape}
                      </span>
                    </div>
                    <div>
                      <span className="block text-[10px] uppercase tracking-widest text-gray-400 mb-1">
                        Color
                      </span>
                      <span className="font-serif text-lg">
                        {product.color}
                      </span>
                    </div>
                    <div>
                      <span className="block text-[10px] uppercase tracking-widest text-gray-400 mb-1">
                        Dimensions
                      </span>
                      <span className="font-serif text-lg">
                        {product.dimensions}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Actions Section */}
                <div className="space-y-4">
                  {/* Buy Now & Add to Cart */}
                  <ProductActions product={product} />

                  {/* Secondary Actions */}
                  <div className="flex gap-4">
                    <a
                      href="https://wa.me/"
                      target="_blank"
                      rel="noreferrer"
                      className="flex-1 py-3 border border-gray-200 hover:border-brandblack text-brandblack flex items-center justify-center gap-2 text-[10px] font-bold uppercase tracking-widest transition-colors"
                    >
                      <MessageCircleMore className="w-4 h-4" /> Concierge
                    </a>
                  </div>

                  {/* Trust Indicators removed as requested */}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Rarity & Story Section (Below Fold) - CONDITIONAL */}
        {/* Collector mode is always enabled; rarity & story section always shown */}
        <div className="bg-ivory py-24 lg:py-32">
          <div className="max-w-5xl mx-auto px-6 lg:px-12">
            <div className="flex flex-col lg:flex-row gap-16 items-center">
              <div className="lg:w-1/2">
                <h2 className="font-serif text-3xl mb-6 text-brandblack">
                  A Rarity Among Rarities
                </h2>
                <p className="font-sans font-light text-gray-600 leading-relaxed mb-8">
                  {product.description ||
                    "This gemstone exhibits a rare combination of high clarity and intense saturation, placing it in the top 5% of its category. Sourced ethically and verified by world-leading gemological laboratories, it represents both a stunning adornment and a tangible asset."}
                </p>

                <div className="grid grid-cols-2 gap-8">
                  <div>
                    <p className="text-4xl font-serif text-brandblack mb-2">
                      {product.rarity_score || 8}
                    </p>
                    <p className="text-[10px] uppercase tracking-widest text-gold">
                      Rarity Score
                    </p>
                  </div>
                  <div>
                    <p className="text-4xl font-serif text-brandblack mb-2">
                      Top {product.rarity_percentile || 90}%
                    </p>
                    <p className="text-[10px] uppercase tracking-widest text-gold text-nowrap">
                      {product.rarity_scope || "Global Supply"}
                    </p>
                  </div>
                </div>
              </div>
              <div className="lg:w-1/2 bg-white p-10 shadow-xl shadow-black/5">
                <h3 className="font-serif text-xl mb-6">Technical Analysis</h3>
                <div className="space-y-4">
                  {Object.entries(comparisonData.thisGem).map(
                    ([key, value]) => (
                      <div
                        key={key}
                        className="flex justify-between items-center border-b border-gray-100 pb-3 last:border-0"
                      >
                        <span className="text-xs uppercase tracking-widest text-gray-500">
                          {key}
                        </span>
                        <span className="font-serif text-brandblack">
                          {value}
                        </span>
                      </div>
                    )
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Curated Recommendations Section removed for server component */}
      </div>
      <RequestQuotationBanner />
    </>
  );
}
