"use client";
import Button from "@/components/Button";
import Link from "next/link";

export default function AboutUsPage() {
  return (
    <section className="min-h-screen py-20 mt-12">
      <div className="max-w-4xl mx-auto px-6 lg:px-0">
        <div className="mb-12 text-center">
          <h1 className="font-serif text-5xl md:text-6xl font-bold text-sapphire mb-4 tracking-tight animate-fade-in-up">
            The Pedigree of the Earth
          </h1>
          <h2 className="font-serif text-xl md:text-2xl text-gold mb-2 animate-fade-in-up">
            From the Heart of Ceylon
          </h2>
          <p className="font-serif italic text-lg text-brandblack/80 animate-fade-in-up">
            True brilliance is never manufactured; it is unearthed.
          </p>
        </div>

        <div className="space-y-10 text-lg text-brandblack/90 font-light leading-relaxed animate-fade-in-up">
          <section>
            <p>
              At <span className="font-bold text-sapphire">Lunestra & Co.</span>
              , our story begins deep within the rich, ancient soil of Sri
              Lanka—the legendary <span className="italic">"Ratnadvipa"</span>{" "}
              or Island of Gems. For centuries, this small island has been the
              world’s most prestigious source of the finest Blue Sapphires,
              Padparadscha, and rare colored stones.
            </p>
            <p className="mt-4">
              We do not just trade in gemstones; we act as the bridge between
              the extraordinary heritage of Ceylon’s earth and the world’s most
              discerning collectors.
            </p>
          </section>

          <section>
            <h3 className="font-serif text-2xl text-sapphire mb-2">
              A Philosophy of Curation, Not Collection
            </h3>
            <p>
              In an era of mass-market retail and synthetic imitations,{" "}
              <span className="font-bold text-sapphire">Lunestra & Co.</span>{" "}
              stands as a sanctuary of authenticity. We do not maintain a vast,
              generic inventory. Instead, we operate as a private boutique
              house.
            </p>
            <p className="mt-4">
              Every stone in our collection is subject to the{" "}
              <span className="font-bold text-gold">"Lunestra Standard"</span>—a
              rigorous selection process that evaluates not just the four Cs,
              but the "soul" of the gem: its fire, its internal life, and its
              historical character.
            </p>
            <p className="mt-4">
              We believe that a gemstone is more than an asset; it is a portable
              legacy. Whether it is being acquired as a high-growth investment
              or the centerpiece of a multi-generational gift, it carries a
              weight of responsibility. We are merely its temporary custodians
              until it finds its rightful place in your collection.
            </p>
          </section>

          <section>
            <h3 className="font-serif text-2xl text-sapphire mb-2">
              The Human Touch: Meet the Curator
            </h3>
            <p>
              Luxury is personal. Behind the digital facade of{" "}
              <span className="font-bold text-sapphire">Lunestra & Co.</span> is
              a commitment to human authority.
            </p>
            <p className="mt-4">
              Our collections are curated by our Master Gemologist and Founder,
              whose life has been spent in the gem pits and cutting houses of
              Sri Lanka. With an eye trained by decades of tradition and formal
              scientific certification, every stone is hand-selected and
              verified.
            </p>
            <blockquote className="border-l-4 border-gold pl-6 italic text-sapphire my-6">
              "I do not buy stones that I would not be proud to hold in my own
              private vault. If a gem lacks the 'fire' that defines a
              masterpiece, it does not earn the Lunestra name." —{" "}
              <span className="font-serif font-bold">Hasith Kaushal</span>
            </blockquote>
          </section>

          <section>
            <h3 className="font-serif text-2xl text-sapphire mb-2">
              The Lunestra Standard: Trust in Every Facet
            </h3>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <span className="font-bold text-gold">
                  Global Certification:
                </span>{" "}
                Every major gemstone we offer is accompanied by an independent
                report from the world’s leading laboratories—GIA, GRS, or GUILD.
              </li>
              <li>
                <span className="font-bold text-gold">
                  The Signature Experience:
                </span>{" "}
                Your acquisition is delivered in our signature 180mm Deep
                Sapphire Blue box, a symbol of the excellence contained within.
              </li>
              <li>
                <span className="font-bold text-gold">
                  A Lifetime Relationship:
                </span>{" "}
                Your journey with us does not end at checkout. Through our
                Private Vault, you maintain lifetime access to your gem’s
                digital provenance, certificates, and care history.
              </li>
            </ul>
          </section>

          <section>
            <h3 className="font-serif text-2xl text-sapphire mb-2">
              The Gift of True Brilliance
            </h3>
            <p>
              Whether you are a seasoned collector looking for an
              investment-grade rarity or a legacy-builder seeking the perfect
              anniversary stone, we invite you to experience the Lunestra
              difference.
            </p>
            <p className="mt-4">
              We are not just selling a gemstone. We are delivering{" "}
              <span className="font-bold text-gold">
                The Gift of True Brilliance.
              </span>
            </p>
          </section>
        </div>

        <div className="flex flex-col md:flex-row gap-4 justify-center mt-16 animate-fade-in-up">
          <Link href="/gems">
            <Button variant="primary">Explore the Full Collection</Button>
          </Link>
          <Link href="/contact">
            <Button variant="secondary">Speak with Us</Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
