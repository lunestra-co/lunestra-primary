import { Suspense } from "react";
import { ArrowRight, Home as House } from "lucide-react";
import RequestQuotationBanner from "@/components/RequestQuotationBanner";
import { createClient } from "@/lib/supabase/server";

async function CategoriesData() {
  const supabase = await createClient();
  const { data: categories, error } = await supabase
    .from("categories")
    .select()
    .eq("type", "jewellery");
  if (error) {
    return <div className="text-red-500">Failed to load categories.</div>;
  }
  return (
    <>
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
            <span className="text-brandblack font-normal">Jewellery</span>
          </nav>
          {/* Minimalist Hero */}
          <h1 className="font-serif text-5xl lg:text-6xl tracking-tighter text-brandblack mb-8">
            Our Jewellery – Crafted with Purpose
          </h1>
        </div>

        {/* Minimalist Grid */}
        <div className="mx-auto px-6 lg:px-16 pb-24">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 gap-y-12 ">
            {categories?.map((category) => (
              <a
                key={category.id}
                href={`/jewellery/${category.slug}`}
                className="group block"
              >
                {/* Image */}
                <div className="relative aspect-4/5 overflow-hidden mb-4 bg-ivory">
                  <img
                    src={category.image || ""}
                    alt={category.name || ""}
                    className="w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent" />

                  {/* Category Name Overlay */}
                  <div className="absolute bottom-0 left-0 right-0 p-6 lg:p-8">
                    <h2 className="text-white font-serif text-2xl lg:text-3xl mb-2">
                      {category.name}
                    </h2>
                    <div className="flex items-center gap-2 text-white/70 text-[10px] uppercase tracking-widest group-hover:text-gold transition-colors">
                      <span>Explore</span>
                      <ArrowRight className="w-3 h-3 transform group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </div>

                {/* Authority Statement */}
                <div className="border-l-2 border-gold pl-4">
                  <p className="font-serif text-lg lg:text-xl text-brandblack leading-relaxed italic">
                    "{category.statement}"
                  </p>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
      <RequestQuotationBanner />
    </>
  );
}

export default function Categories() {
  return (
    <Suspense fallback={<div>Loading jewellery categories...</div>}>
      <CategoriesData />
    </Suspense>
  );
}
