import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import Button from "@/components/Button";
import {
  ArrowRight,
  Sparkles,
  AlertCircle,
  TrendingUp,
  Globe,
} from "lucide-react";

type PageProps = {
  params: { article: string };
};

export default async function ArticlePage(props: PageProps) {
  let { params } = props;
  // Next.js 14+ dynamic route: params may be a Promise
  if (params && typeof (params as any).then === "function") {
    params = await (params as any);
  }
  const { article } = params;
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("gem_articles")
    .select("*")
    .eq("slug", article)
    .single();

  if (error || !data) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4">Article Not Found</h1>
          <a href="/journal" className="text-sapphire underline">
            Back to Journal
          </a>
        </div>
      </div>
    );
  }

  // Parse sections JSONB (expecting: [{id, title, icon, content, ...}])
  let sections: any[] = [];
  try {
    sections = Array.isArray(data.sections)
      ? data.sections
      : JSON.parse(data.sections || "[]");
  } catch {
    sections = [];
  }

  return (
    <div className="bg-white min-h-screen">
      {/* Editorial Hero */}
      <div className="relative h-[60vh] lg:h-[70vh] w-full overflow-hidden">
        <img
          src={data.hero_image}
          alt={data.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center text-center p-6">
          <span className="text-white/80 uppercase tracking-[0.2em] text-xs font-bold mb-4 animate-fade-in-up">
            Lunestra Journal
          </span>
          <h1 className="font-serif text-5xl lg:text-7xl text-white mb-6 drop-shadow-xl animate-fade-in-up">
            {data.headline || data.name}
          </h1>
          <p className="text-white/90 font-serif italic text-xl lg:text-2xl animate-fade-in-up delay-100">
            {data.subtitle}
          </p>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 py-20 flex flex-col lg:flex-row gap-16">
        {/* Sticky Navigation Sidebar (Desktop) */}
        <aside className="hidden lg:block w-1/4 h-fit sticky top-32">
          <div className="border-l-2 border-gray-100 pl-6 space-y-6">
            {sections.map((section) => (
              <a
                key={section.id || section.title}
                href={`#${section.id || section.title?.toLowerCase().replace(/\s+/g, "-")}`}
                className="block text-sm font-bold uppercase tracking-widest text-brandblack hover:text-sapphire transition-colors"
              >
                {section.title}
              </a>
            ))}
            <div className="pt-8">
              <a href="#collection">
                <Button variant="primary" className="w-full text-center">
                  Shop {data.name}
                </Button>
              </a>
            </div>
            <div className="pt-2">
              <a
                href="/journal"
                className="text-xs text-gray-500 hover:text-brandblack flex items-center gap-2"
              >
                <ArrowRight className="w-3 h-3 rotate-180" /> Back to Journal
              </a>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <article className="lg:w-3/4 space-y-24">
          {/* Introduction Drop Cap */}
          {data.introduction && (
            <div className="font-serif text-xl leading-loose text-gray-800">
              <span className="float-left text-7xl font-bold pr-4 pt-2 leading-none text-sapphire">
                {data.introduction.charAt(0)}
              </span>
              <p>{data.introduction}</p>
            </div>
          )}

          {/* Dynamic Sections */}
          {sections.map((section) => (
            <section
              key={section.id || section.title}
              id={
                section.id || section.title?.toLowerCase().replace(/\s+/g, "-")
              }
              className="scroll-mt-32"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 bg-brandgray rounded-full">
                  {/* Icon selection based on section.icon */}
                  {section.icon === "Globe" && (
                    <Globe className="w-6 h-6 text-sapphire" />
                  )}
                  {section.icon === "Sparkles" && (
                    <Sparkles className="w-6 h-6 text-sapphire" />
                  )}
                  {section.icon === "TrendingUp" && (
                    <TrendingUp className="w-6 h-6 text-sapphire" />
                  )}
                  {section.icon === "AlertCircle" && (
                    <AlertCircle className="w-6 h-6 text-sapphire" />
                  )}
                  {/* Add more icons as needed */}
                </div>
                <h2 className="font-serif text-3xl text-brandblack">
                  {section.title}
                </h2>
              </div>
              <p className="font-sans font-light text-gray-600 leading-relaxed text-lg pl-16 border-l border-gray-100">
                {section.description}
              </p>
            </section>
          ))}

          {/* Mobile Footer CTA */}
          <div className="lg:hidden pt-8 border-t border-gray-100">
            <a href="#collection">
              <Button variant="primary" className="w-full">
                Shop {data.name} Collection
              </Button>
            </a>
            <div className="text-center mt-6">
              <a
                href="/journal"
                className="text-xs font-bold uppercase tracking-widest text-gray-400"
              >
                Back to Journal
              </a>
            </div>
          </div>
        </article>
      </div>
    </div>
  );
}
