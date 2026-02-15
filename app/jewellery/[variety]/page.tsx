import { notFound } from "next/navigation";
import { Home as House } from "lucide-react";
import { createClient } from "@/lib/supabase/server";

type PageProps = {
  params: { variety: string };
  searchParams?: { price?: string; size?: string };
};

export default async function CollectionPage(props: PageProps) {
  const { params } = props;
  let searchParams = props.searchParams;
  // Next.js 14+ dynamic route: searchParams may be a Promise
  if (searchParams && typeof (searchParams as any).then === "function") {
    searchParams = await (searchParams as any);
  }
  if (!searchParams) searchParams = {};
  const supabase = await createClient();
  const { variety } = await params;
  let category = null;
  let catError = null;
  let query = supabase
    .from("jewellery_products")
    .select("*, category:category_id(name)");
  if (variety !== "all") {
    const catRes = await supabase
      .from("categories")
      .select("id, name, slug")
      .eq("slug", variety)
      .single();
    category = catRes.data;
    catError = catRes.error;
    if (catError || !category) {
      return notFound();
    }
    query = query.eq("category_id", category.id);
  }

  // Price range filter
  if (searchParams?.price) {
    const [min, max] = searchParams.price.split("-").map(Number);
    if (!isNaN(min)) query = query.gte("price", min);
    if (!isNaN(max)) query = query.lte("price", max);
  }

  const { data: products, error: productsError } = await query;

  if (productsError) {
    return <div className="text-red-500">Failed to load products.</div>;
  }

  if (!products || products.length === 0) {
    return notFound();
  }

  const categoryName = products[0].category.name;

  return (
    <div className="bg-white min-h-screen">
      <div className="pt-32 pb-6 px-6 lg:px-16">
        {/* Breadcrumb */}
        <nav
          className="flex items-center space-x-2 text-lg pb-4"
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
            className="text-gray-500 hover:text-gold flex items-center"
          >
            Jewellery
          </a>
          <span className="text-gray-400">/</span>
          <span className="text-brandblack font-normal">
            {categoryName} Collection
          </span>
        </nav>
        {/* Minimalist Hero */}
        <h1 className="font-serif text-5xl lg:text-6xl tracking-tighter text-brandblack mb-8">
          {categoryName} Collection
        </h1>
      </div>

      {/* Minimalist Grid */}
      <div className="mx-auto px-6 lg:px-16 pb-24">
        {products && products.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 gap-y-12">
            {products.map((product: any) => (
              <a
                key={product.id}
                href={`/jewellery/${variety}/${product.slug}`}
                className="group cursor-pointer flex flex-col"
              >
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
                  {product.sale_price && product.price && (
                    <span className="absolute top-4 right-4 bg-red-500 text-white text-[9px] uppercase tracking-widest px-4 py-1.5 font-medium z-10">
                      {`-${Math.round(
                        ((product.price - product.sale_price) / product.price) *
                          100,
                      )}%`}
                    </span>
                  )}
                  <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <div className="w-6 h-px bg-white" />
                    <div className="w-px h-6 bg-white absolute top-0 right-0" />
                  </div>
                </div>
                <div className="text-center space-y-3 px-2">
                  <div className="flex justify-center items-center gap-3 text-[9px] uppercase tracking-[0.15em] text-gray-400">
                    <span>{product.category.name}</span>
                    <span className="w-1 h-1 bg-gold rounded-full" />
                    <span>{product.metal_type}</span>
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
            ))}
          </div>
        ) : (
          <div className="py-24 text-center">
            <h2 className="font-serif text-2xl text-gray-400">
              No jewellery matches your criteria.
            </h2>
          </div>
        )}
      </div>
    </div>
  );
}
