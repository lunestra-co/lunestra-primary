import { notFound } from "next/navigation";
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
import ProductActions from "@/components/ProductActions";
import JewelleryProductDetails from "@/components/JewelleryProductDetails";
import { createClient } from "@/lib/supabase/server";

type PageProps = {
  params: { variety: string; product: string };
};

export default async function ProductDetailPage(props: PageProps) {
  let { params } = props;
  if (params && typeof (params as any).then === "function") {
    params = await (params as any);
  }
  const supabase = await createClient();
  const { product: productSlug, variety } = params;
  // Fetch product by slug
  const { data: product, error } = await supabase
    .from("jewellery_products")
    .select("*, category:category_id(name, slug)")
    .eq("slug", productSlug)
    .single();
  if (error || !product) {
    return notFound();
  }

  // Simulated Comparison Data for jewellery
  const comparisonData = {
    market: {
      accent_stones: "VVS Diamonds",
      purity_hallmark: "Au 750",
      setting_style: "Prong",
      craftsmanship: "Handmade",
    },
    thisJewel: {
      accent_stones: product.secondary_gem_details || "On Request",
      purity_hallmark: product.hallmark_details || "Au 750",
      setting_style: product.setting_type || "Artisan",
      craftsmanship: product.craftsmanship || "Handmade",
    },
  };

  const viewMode = "collector";
  const gallery =
    typeof product.gallery === "string"
      ? JSON.parse(product.gallery || "[]")
      : product.gallery || [];
  const images = [product.image, ...gallery];

  return (
    <>
      <div className="bg-white min-h-screen">
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
                      The item is not represented.
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* RIGHT: Fixed Details Panel */}
            <div className="lg:w-1/2 bg-white lg:sticky lg:top-20 lg:self-start lg:h-[calc(100vh-81px)] lg:overflow-y-auto custom-scrollbar">
              <div className="p-6 lg:p-10 flex flex-col">
                {/* Top Section */}
                <div>
                  {/* Header & Breadcrumb */}
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
                        href="/jewellery"
                        className="text-gray-500 hover:text-gold flex items-center leading-5"
                      >
                        Jewellery
                      </a>
                      <span className="text-gray-400">/</span>
                      <a
                        href={`/jewellery/${variety}`}
                        className="text-gray-500 hover:text-gold flex items-center leading-5"
                      >
                        {product.category.name}
                      </a>
                      <span className="text-gray-400">/</span>
                      <span className="text-brandblack font-normal leading-5">
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
                      {product.metal_type}
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
                              100,
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
                        Metal Type
                      </span>
                      <span className="font-serif text-lg">
                        {product.metal_type}
                      </span>
                    </div>
                    <div>
                      <span className="block text-[10px] uppercase tracking-widest text-gray-400 mb-1">
                        Collection
                      </span>
                      <span className="font-serif text-lg">
                        {product.collection}
                      </span>
                    </div>
                    <div>
                      <span className="block text-[10px] uppercase tracking-widest text-gray-400 mb-1">
                        Primary Stone
                      </span>
                      <span className="font-serif text-lg">
                        {product.primary_gem_type
                          ? `${product.primary_gem_type} (${product.primary_gem_shape})`
                          : "None"}
                      </span>
                    </div>
                    <div>
                      <span className="block text-[10px] uppercase tracking-widest text-gray-400 mb-1">
                        Style
                      </span>
                      <span className="font-serif text-lg">
                        {product.style || "Classic"}
                      </span>
                    </div>
                  </div>

                  <JewelleryProductDetails
                    product={product}
                    pricingType={product.pricing_type || "priced"}
                    canGetCertificate={product.can_get_certificate || false}
                    certificatePrice={product.certificate_price || 1000}
                    certificateDescription={
                      product.certificate_description ||
                      "Includes detailed authenticity certificate and care instructions"
                    }
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Rarity & Story Section (Below Fold) */}
        <div className="bg-ivory py-24 lg:py-32">
          <div className="max-w-5xl mx-auto px-6 lg:px-12">
            <div className="flex flex-col lg:flex-row gap-16 items-center">
              <div className="lg:w-1/2">
                <h2 className="font-serif text-3xl mb-6 text-brandblack">
                  A Treasure Worth Keeping
                </h2>
                <p className="font-sans font-light text-gray-600 leading-relaxed mb-8">
                  {product.description ||
                    "This jewellery piece is a rare combination of exceptional craftsmanship and timeless design. Each detail has been carefully considered to create a treasure that transcends trends and becomes a cherished heirloom."}
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
                  {Object.entries(comparisonData.thisJewel).map(
                    ([key, value]) => (
                      <div
                        key={key}
                        className="flex justify-between items-center border-b border-gray-100 pb-3 last:border-0"
                      >
                        <span className="text-xs uppercase tracking-widest text-gray-500">
                          {key}
                        </span>
                        <span className="font-serif text-brandblack">
                          {String(value)}
                        </span>
                      </div>
                    ),
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <RequestQuotationBanner />
    </>
  );
}
