export interface HeroSlide {
  id: number;
  image: string;
  subtitle: string;
  title: string;
  link?: string;
}

export interface PromoBanner {
  id: string; // 'left' or 'right'
  title: string;
  subtitle: string;
  description: string;
  image: string;
  link: string;
  tag: string; // 'Special Offer' etc
}

const STORAGE_KEY_HERO = "lunestra_hero_slides";
const STORAGE_KEY_PROMO = "lunestra_promo_banners";

const DEFAULT_SLIDES: HeroSlide[] = [
  {
    id: 1,
    image:
      "https://images.unsplash.com/photo-1531995811006-35cb42e1a022?q=80&w=2070&auto=format&fit=crop",
    subtitle: "Treasures from Ceylon soil",
    title: "Rare. Certified. Yours.",
    link: "#collection?mode=collector",
  },
  {
    id: 2,
    image:
      "https://images.unsplash.com/photo-1605100804763-247f67b3557e?q=80&w=2070&auto=format&fit=crop",
    subtitle: "Legacy begins with selection",
    title: "Stones Worth Keeping.",
    link: "#collection?mode=gift",
  },
  {
    id: 3,
    image:
      "https://images.unsplash.com/photo-1617038220319-33fc2e608c54?q=80&w=2070&auto=format&fit=crop",
    subtitle: "Each gem personally chosen",
    title: "Curated, Not Stocked.",
    link: "#collection?mode=heritage",
  },
];

const DEFAULT_PROMO: PromoBanner[] = [
  {
    id: "left",
    tag: "New Year Offer",
    title: "Start <i>Brilliantly</i>",
    subtitle: "Celebrate in Style",
    description:
      "Start 2026 with timeless treasures. Enjoy 15% off all gemstones with code: <b>NEWYEAR15</b>",
    image:
      "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&q=80&w=800",
    link: "#collection",
  },
  {
    id: "right",
    tag: "First Purchase",
    title: "Your <i>First Stone</i>",
    subtitle: "Start Collecting",
    description:
      "New to Lunestra? Enjoy 10% off your first acquisition plus complimentary expert consultation.",
    image:
      "https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&q=80&w=800",
    link: "#collection",
  },
];

class BannerService {
  private init() {
    if (typeof window === "undefined") return;

    if (!localStorage.getItem(STORAGE_KEY_HERO)) {
      localStorage.setItem(STORAGE_KEY_HERO, JSON.stringify(DEFAULT_SLIDES));
    }
    if (!localStorage.getItem(STORAGE_KEY_PROMO)) {
      localStorage.setItem(STORAGE_KEY_PROMO, JSON.stringify(DEFAULT_PROMO));
    }
  }

  getHeroSlides(): Promise<HeroSlide[]> {
    return new Promise((resolve) => {
      this.init();
      const stored = localStorage.getItem(STORAGE_KEY_HERO);
      resolve(stored ? JSON.parse(stored) : DEFAULT_SLIDES);
    });
  }

  updateHeroSlides(slides: HeroSlide[]): Promise<void> {
    return new Promise((resolve) => {
      localStorage.setItem(STORAGE_KEY_HERO, JSON.stringify(slides));
      resolve();
    });
  }

  getPromoBanners(): Promise<PromoBanner[]> {
    return new Promise((resolve) => {
      this.init();
      const stored = localStorage.getItem(STORAGE_KEY_PROMO);
      resolve(stored ? JSON.parse(stored) : DEFAULT_PROMO);
    });
  }

  updatePromoBanners(banners: PromoBanner[]): Promise<void> {
    return new Promise((resolve) => {
      localStorage.setItem(STORAGE_KEY_PROMO, JSON.stringify(banners));
      resolve();
    });
  }

  // Admin Helper
  resetDefaults(): Promise<void> {
    return new Promise((resolve) => {
      localStorage.removeItem(STORAGE_KEY_HERO);
      localStorage.removeItem(STORAGE_KEY_PROMO);
      this.init();
      resolve();
    });
  }
}

export const bannerService = new BannerService();
