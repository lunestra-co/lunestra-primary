import { createClient } from "@/lib/supabase/server";
import { BookOpen } from "lucide-react";

export default async function EducationHub() {
  const supabase = await createClient();
  const { data: articles, error } = await supabase
    .from("gem_articles")
    .select("*")
    .order("name", { ascending: true });

  return (
    <div className="pt-32 pb-24 bg-brandgray/10 min-h-screen">
      <div className="max-w-[1800px] mx-auto px-6 lg:px-12">
        <div className="text-center max-w-2xl mx-auto mb-20">
          <h1 className="font-serif text-5xl lg:text-6xl text-brandblack">
            The Gemological Library
          </h1>
        </div>

        {error ? (
          <div className="text-center text-red-500 py-12">
            Failed to load articles.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {articles && articles.length > 0 ? (
              articles.map((article) => (
                <a
                  key={article.id}
                  href={`/journal/${article.slug}`}
                  className="group relative overflow-hidden h-[400px] lg:h-[500px] flex flex-col justify-end p-8 lg:p-12 transition-transform hover:-translate-y-2 duration-500"
                >
                  {/* Background */}
                  <div className="absolute inset-0">
                    <img
                      src={article.hero_image}
                      alt={article.name}
                      className="w-full h-full object-cover transition-transform duration-[1500ms] group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                  </div>

                  {/* Content */}
                  <div className="relative z-10 text-white">
                    <span className="text-gold uppercase tracking-[0.2em] text-[10px] font-bold block mb-3 opacity-0 group-hover:opacity-100 transition-opacity duration-500 transform translate-y-4 group-hover:translate-y-0">
                      Read the Guide
                    </span>
                    <h2 className="font-serif text-4xl lg:text-5xl mb-3 drop-shadow-lg">
                      {article.name}
                    </h2>
                    <p className="font-sans text-sm font-light text-white/80 max-w-lg mb-6 line-clamp-2">
                      {article.subtitle}
                    </p>
                    <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest border-b border-transparent group-hover:border-white w-fit pb-1 transition-all">
                      Learn More <BookOpen className="w-3 h-3" />
                    </div>
                  </div>
                </a>
              ))
            ) : (
              <div className="col-span-full text-center text-gray-400 py-24">
                No articles found.
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
