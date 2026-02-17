import { createClient } from "@/lib/supabase/server";
import { ArrowRight } from "lucide-react";

export default async function FeaturedCollection() {
  const supabase = await createClient();
  const { data: products, error } = await supabase
    .from("gem_products")
    .select("id, name, image, badge, weight, price, category:category_id(name)")
    .not("badge", "is", null)
    .limit(4);

  return (
    <section
      id="featured-collection"
      className="py-24 lg:py-32 bg-ivory relative overflow-hidden"
    >
      {/* Decorative background */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gold/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-sapphire/5 rounded-full blur-3xl" />

      <div className="max-w-[1600px] mx-auto px-6 lg:px-12 relative">
        {/* Editorial Header */}
        <div className="flex flex-col items-center text-center mb-20">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-px bg-gold/40" />
            <span className="text-gold uppercase tracking-[0.4em] text-[10px] font-medium">
              Curated For The Connoisseur
            </span>
            <div className="w-12 h-px bg-gold/40" />
          </div>

          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-brandblack mb-6">
            The Curated <span className="italic">Gallery</span>
          </h2>

          <p className="font-sans text-gray-600 max-w-xl leading-relaxed">
            A selection of rare, investment-grade gemstones and bespoke jewelry,
            chosen for their exceptional color, clarity, and provenance.
          </p>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-8">
          {!products || products.length === 0 ? (
            <div className="col-span-4 text-center py-12">
              No featured products found.
            </div>
          ) : (
            products.map((product: any) => (
              <a
                key={product.id}
                href={`#product/${product.id}`}
                className="group cursor-pointer flex flex-col"
              >
                {/* Image Container */}
                <div className="relative w-full aspect-square overflow-hidden bg-white mb-6 shadow-lg shadow-black/5">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-end justify-center pb-8">
                    <span className="text-white text-[11px] uppercase tracking-[0.2em] border border-white/50 px-6 py-3 hover:bg-white hover:text-brandblack transition-colors">
                      View Details
                    </span>
                  </div>
                  {product.badge && (
                    <span className="absolute top-4 left-4 bg-gold text-white text-[9px] uppercase tracking-widest px-4 py-1.5 font-medium">
                      {product.badge}
                    </span>
                  )}
                  {/* Decorative corner */}
                  <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <div className="w-6 h-px bg-white" />
                    <div className="w-px h-6 bg-white absolute top-0 right-0" />
                  </div>
                </div>
                <div className="text-center space-y-3 px-2">
                  <div className="flex justify-center items-center gap-3 text-[9px] uppercase tracking-[0.15em] text-gray-400">
                    <span>{product.category?.name}</span>
                    <span className="w-1 h-1 bg-gold rounded-full" />
                    <span>{product.weight} Carats</span>
                  </div>
                  <h3 className="font-serif text-xl text-brandblack group-hover:text-gold transition-colors duration-300">
                    {product.name}
                  </h3>
                  <p className="text-sm text-brandblack font-medium tracking-wide">
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
              </a>
            ))
          )}
        </div>

        {/* CTA */}
        <div className="text-center mt-20">
          <a
            href="/gems/all"
            className="group inline-flex items-center gap-3 text-[11px] uppercase tracking-[0.2em] text-brandblack font-medium hover:text-gold transition-colors"
          >
            <span className="border-b border-brandblack pb-1 group-hover:border-gold transition-colors">
              Explore the Full Collection
            </span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </a>
        </div>
      </div>
    </section>
  );
}
