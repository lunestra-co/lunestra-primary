import { Product, ShopPartner } from "./types";

export const NAV_ITEMS = [
  { label: "High Jewellery", href: "#collection" },
  { label: "The Ceylon Heritage", href: "#heritage" },
  { label: "Crafting Partners", href: "#shops" },
  { label: "World of Lunestra", href: "#education" },
];

export const CATEGORIES = [
  {
    id: "sapphire",
    name: "Ceylon Sapphires",
    filterKey: "Blue Sapphire",
    statement: "The World's Standard for Brilliance",
    description:
      "Mined from the legendary gravels of Ratnapura, our unheated sapphires possess a velvety blue distinct to the island of gems.",
    image: "https://lusterblue.lk/wp-content/uploads/2022/01/LBG-1053-d.jpg",
  },
  {
    id: "ruby",
    name: "Burmese Rubies",
    filterKey: "Ruby",
    statement: "The Pigeon's Blood Legend",
    description:
      "Sourced from Mogok, these rare crimson treasures command the highest per-carat price of any colored gemstone.",
    image:
      "https://robinsonsjewelers.com/cdn/shop/articles/what-makes-burmese-rubies-so-special_6112073987712784622_20241228.jpg?v=1735846693",
  },
  {
    id: "emerald",
    name: "Colombian Emeralds",
    filterKey: "Emerald",
    statement: "The Garden of Eternal Green",
    description:
      "Renowned for their warm, intense hue and unique 'jardin' inclusions that certify their natural origin.",
    image:
      "https://jogani.com/cdn/shop/articles/36.95-carat-emerald-cut-minor-moderate-oil-colombian-emerald.jpg?v=1728661003&width=2048",
  },
  {
    id: "diamond",
    name: "Investment Diamonds",
    filterKey: "Diamond",
    statement: "A Promise of Forever",
    description:
      "Type IIa diamonds of exceptional chemical purity and optical transparency, cut to maximize light performance.",
    image:
      "https://www.naturaldiamonds.com/wp-content/uploads/2025/03/THE-ARGYLE-VIOLET_LSB_0550-copy-2.jpg",
  },
  {
    id: "padparadscha",
    name: "Padparadscha",
    filterKey: "Padparadscha",
    statement: "The Lotus Blossom Sunset",
    description:
      "The rarest of all sapphires, featuring a delicate marriage of pink and orange found only in Sri Lanka.",
    image:
      "https://gemstock.org/wa-data/public/shop/products/93/85/8593/images/46515/46515.1024.jpg",
  },
  {
    id: "alexandrite",
    name: "Alexandrite",
    filterKey: "Alexandrite",
    statement: "Emerald by Day, Ruby by Night",
    description:
      "A color-change marvel that offers two distinct personalities in one phenomenal stone.",
    image:
      "https://gemstock.org/wa-data/public/shop/products/37/66/6637/images/31754/31754.1024.jpg",
  },
];

export const INVESTMENT_CONTENT = {
  hero: {
    title: "Tangible Legacy",
    subtitle:
      "The Strategic Case for Colored Gemstones as an Alternative Asset Class",
    image:
      "https://images.unsplash.com/photo-1620614086470-365eb2c7c588?auto=format&fit=crop&q=80&w=2070",
  },
  metrics: [
    {
      label: "10-Year Appreciation",
      value: "+112%",
      desc: "For Unheated Sapphires >5ct",
    },
    {
      label: "Market Correlation",
      value: "0.14",
      desc: "Low correlation to S&P 500",
    },
    {
      label: "Global Liquidity",
      value: "Tier 1",
      desc: "With GRS/SSEF Certification",
    },
  ],
  sections: [
    {
      id: "scarcity",
      title: "The Economics of Extinction",
      content:
        "Unlike diamonds, where supply has historically been managed by cartels to maintain price stability, the 'Big Three' colored gemstones (Ruby, Sapphire, Emerald) are subject to genuine geological scarcity. Major historic deposits, such as the Mogok ruby mines or Kashmir sapphire beds, are effectively exhausted. As demand from emerging markets grows against a fixed or shrinking supply of unheated stones, the economic fundamentals favor long-term appreciation.",
    },
    {
      id: "liquidity",
      title: "The Certification Standard",
      content:
        "In the opaque world of gemstones, the laboratory report is the ultimate guarantor of liquidity. A gemstone without a Tier-1 report is merely a mineral; with one, it is a global asset. Lunestra deals exclusively in stones accompanied by reports from GIA (USA), SSEF (Switzerland), GRS (Switzerland), or Gübelin. These certificates verify the two most critical value factors: natural origin and absence of heat treatment.",
    },
  ],
};

export const GEM_EDUCATION = {
  sapphire: {
    id: "sapphire",
    name: "Blue Sapphire",
    title: "The Celestial Guardian",
    subtitle: "A comprehensive guide to Ceylon Sapphires",
    heroImage:
      "https://images.unsplash.com/photo-1596944924616-00f3f29948dd?auto=format&fit=crop&q=80&w=2070",
    origin: {
      title: "Origins & Provenance",
      content:
        "While sapphires are found in various corners of the globe—from the mountains of Kashmir to the plains of Madagascar—it is the island of Sri Lanka (formerly Ceylon) that holds the oldest and most storied history. For over 2,000 years, Ceylon has produced sapphires of exceptional clarity and a distinct, lighter 'cornflower' blue that is celebrated worldwide. Our collection focuses exclusively on these Ratnapura deposits, where traditional artisanal mining preserves the integrity of the land.",
    },
    meaning: {
      title: "Symbolism & Myth",
      content:
        "Historically known as the 'Stone of Destiny', sapphires have adorned the robes of royalty and the clergy for centuries, symbolizing wisdom, virtue, and divine favor. In ancient Greece, they were worn to court the favor of Apollo. Today, the sapphire remains the ultimate symbol of noble truth and sincere romance, famously cementing its status as the premier engagement gem through the British Royal Family.",
    },
    rarity: {
      title: "Investment Value",
      content:
        "The investment potential of a sapphire is primarily dictated by color, clarity, and treatment status. 'Royal Blue' and 'Cornflower Blue' are the most coveted hues. Crucially, 95% of the world's sapphires are heat-treated to enhance color. An 'unheated' sapphire—one that exhibits perfect color naturally—is exponentially rarer and commands a significant premium at auction. Lunestra specializes in these investment-grade, unheated specimens.",
    },
    care: {
      title: "Care & Maintenance",
      content:
        "Ranking 9 on the Mohs scale, sapphires are second only to diamonds in hardness, making them excellent for daily wear. To clean, use warm soapy water and a soft brush. While durable, they should be stored separately from diamonds to prevent scratching. Ultrasonic cleaners are generally safe for untreated stones, but we recommend professional cleaning for high-value heirlooms.",
    },
  },
  ruby: {
    id: "ruby",
    name: "Ruby",
    title: "The King of Gems",
    subtitle: "Understanding the fire of Burmese Rubies",
    heroImage:
      "https://images.unsplash.com/photo-1615655406736-b37c4fabf923?auto=format&fit=crop&q=80&w=2070",
    origin: {
      title: "Origins & Provenance",
      content:
        "The Mogok Valley in Myanmar (Burma) is the spiritual home of the ruby. For centuries, it has produced stones of such intense saturation and fluorescence that they seem to glow from within. This 'internal fire' is due to a lack of iron in the gem's crystal structure, a geological anomaly specific to this region. While Mozambique has emerged as a modern source, Burmese rubies remain the gold standard for collectors.",
    },
    meaning: {
      title: "Symbolism & Myth",
      content:
        "In Sanskrit, the ruby is known as 'Ratnaraj', or 'King of Precious Stones'. It has long been associated with power, passion, and protection. Ancient warriors implanted rubies under their skin for invincibility in battle. In modern romance, it represents a love that burns eternally, making it a powerful alternative to the diamond for anniversary gifts.",
    },
    rarity: {
      title: "Investment Value",
      content:
        "Rubies are the most expensive colored gemstone per carat. A top-quality 'Pigeon's Blood' ruby (a specific hue of red with a hint of blue) can command higher prices than even the finest diamonds. Large, unheated rubies over 3 carats are statistically vanishingly rare, making them one of the most secure hard-asset investments available.",
    },
    care: {
      title: "Care & Maintenance",
      content:
        "Like sapphires, rubies are a variety of corundum and rank 9 on the Mohs scale. They are tough and durable. However, many commercial rubies are glass-filled to hide fractures; these require special care. Lunestra deals only in natural rubies which are stable and can be cleaned with standard ultrasonic cleaners or warm soapy water.",
    },
  },
  emerald: {
    id: "emerald",
    name: "Emerald",
    title: "The Jewel of Kings",
    subtitle: "The lush history of Colombian Emeralds",
    heroImage:
      "https://images.unsplash.com/photo-1599643478518-17488fbbcd75?auto=format&fit=crop&q=80&w=2070",
    origin: {
      title: "Origins & Provenance",
      content:
        "Colombia is the undisputed capital of fine emeralds. The mines of Muzo and Chivor produce stones with a warm, intense green that is unmatched by deposits in Zambia or Brazil. Colombian emeralds are often formed in sedimentary host rock, which allows them to grow larger and purer than those found in igneous deposits elsewhere.",
    },
    meaning: {
      title: "Symbolism & Myth",
      content:
        "Dedicated to Venus, the goddess of love, the emerald has been cherished since the time of Cleopatra. It is the stone of rebirth, believed to grant foresight and reveal the truth of a lover's oath. Its soothing green color is said to relieve eye strain and calm the spirit, representing eternal youth and vitality.",
    },
    rarity: {
      title: "Investment Value",
      content:
        "Emeralds are type III gems, meaning they almost always have inclusions, poetically called 'jardin' (garden). A completely clean emerald is rarer than a diamond. Value is driven primarily by the intensity of color. 'Muzo Green' is the benchmark. Unlike other gems, minor oil treatment is standard market practice, but 'No Oil' emeralds exist and are prized by top-tier investors.",
    },
    care: {
      title: "Care & Maintenance",
      content:
        "Ranking 7.5-8 on the Mohs scale, emeralds are softer than rubies and sapphires. They are often brittle due to their inclusions. NEVER use an ultrasonic cleaner or steam cleaner on an emerald, as it can remove the cedar oil used to enhance clarity and cause the stone to crack. Clean gently with a soft cloth and lukewarm water only.",
    },
  },
  diamond: {
    id: "diamond",
    name: "Diamond",
    title: "The Invincible",
    subtitle: "Beyond the 4Cs: Investment Grade Diamonds",
    heroImage:
      "https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&q=80&w=2070",
    origin: {
      title: "Origins & Provenance",
      content:
        "While historically associated with India and Brazil, today's finest ethical diamonds often hail from Botswana and Canada. Lunestra prioritizes diamonds from the Karowe mine in Botswana, known for producing large, high-quality Type IIa diamonds—the purest form of diamond crystals with no measurable nitrogen impurities.",
    },
    meaning: {
      title: "Symbolism & Myth",
      content:
        "Derived from the Greek 'adamas' meaning unconquerable, the diamond is the ultimate symbol of permanence. It represents clarity of thought, purity of intent, and unbreakable bonds. In the Renaissance, it was used to signify a promise of marriage, a tradition that was codified in the 20th century.",
    },
    rarity: {
      title: "Investment Value",
      content:
        "While commercial diamonds are plentiful, investment-grade diamonds (D-Flawless, Type IIa, or Fancy Colors) act as a hedge against inflation. They are a concentrated store of wealth. The rarity of pink, blue, and red diamonds has seen their value appreciate consistently over the last two decades, outperforming many traditional assets.",
    },
    care: {
      title: "Care & Maintenance",
      content:
        "The hardest known natural material (10 on Mohs scale), diamonds are resistant to scratching but can still chip if struck at the right angle (cleavage). They are magnets for grease and oil, which dulls their fire. Regular cleaning with degreasing dish soap and a soft toothbrush will keep them sparkling. Ultrasonic cleaning is perfectly safe.",
    },
  },
};

// Realistic Stock Video for "Hands of the Maker"
const HANDS_VIDEO_URL =
  "https://res.cloudinary.com/dw4hikox3/video/upload/v1768150838/4236565-uhd_3840_2160_24fps_xpfdya.mp4";

export const ALL_PRODUCTS: Product[] = [
  {
    id: "1",
    name: "Ceylon Royal Blue",
    category: "Blue Sapphire",
    price: "LKR 185,000",
    priceValue: 185000,
    carats: 3.8,
    origin: "Ceylon",
    shape: "Cushion",
    clarity: "VVS1",
    image:
      "https://www.gemsinsrilanka.com/wp-content/uploads/2021/01/Blue-Sapphire.jpg",
    isNew: true,
    gallery: [
      "https://images.unsplash.com/photo-1617038220319-33fc2e608c54?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&q=80&w=800",
    ],
    description:
      "A classic Ceylon sapphire in the coveted royal blue shade. 3.8 carats of brilliance and prestige.",
    certProvider: "GRS",
    certId: "GRS2023-112932",
    rarityProfile: {
      text: "Less than 1% of sapphires exhibit this specific 'Royal Blue' hue without heat treatment. The clarity is exceptional for a stone of this size.",
      score: 9.2,
    },
    videoUrl: HANDS_VIDEO_URL,
    status: "available",
  },
  {
    id: "2",
    name: "Pigeon Blood Treasure",
    category: "Ruby",
    price: "LKR 124,500",
    priceValue: 124500,
    carats: 2.1,
    origin: "Burma",
    shape: "Oval",
    clarity: "VVS1",
    image:
      "https://about.thenaturalrubycompany.com/wp-content/uploads/2025/05/apaxems_The_image_beautifully_captures_two_radiant_faceted_gems_8a9cf554-d8f3-4754-b991-2ffd911418c9.webp",
    description:
      "A rare Burmese ruby with the legendary Pigeon Blood color. 2.1 carats of fiery allure.",
    certProvider: "GRS",
    certId: "GRS2022-091122",
    rarityProfile: {
      text: "Burmese unheated rubies are the single most appreciable colored gemstone asset class over the last 20 years.",
      score: 10.0,
    },
    videoUrl: HANDS_VIDEO_URL,
    status: "available",
  },
  {
    id: "3",
    name: "Ocean Clarity",
    category: "Blue Topaz",
    price: "LKR 45,000",
    priceValue: 45000,
    carats: 5.2,
    origin: "Brazil",
    shape: "Emerald Cut",
    clarity: "VS1",
    image:
      "https://www.gemsinsrilanka.com/wp-content/uploads/2021/01/Blue-Topaz.jpg",
    description:
      "A sparkling blue topaz with oceanic clarity and a bold 5.2 carat presence.",
    certProvider: "SSEF",
    certId: "118320",
    rarityProfile: {
      text: "Muzo green is the gold standard. Finding a stone with such high transparency and minor oil is a triumph.",
      score: 8.5,
    },
    videoUrl: HANDS_VIDEO_URL,
    status: "available",
  },
  {
    id: "4",
    name: "Diamond Alternative",
    category: "White Sapphire",
    price: "LKR 38,000",
    priceValue: 38000,
    carats: 1.9,
    origin: "Ceylon",
    shape: "Cabochon",
    clarity: "Opaque",
    image:
      "https://www.lawsongems.com/cdn/shop/products/2021-10-30-13-16-28_1200x1200.jpg?v=1635564627",
    description:
      "A brilliant white sapphire, the perfect diamond alternative. 1.9 carats of pure sparkle.",
    certProvider: "GIA",
    certId: "5221039941",
    rarityProfile: {
      text: "While star sapphires are more common than transparent ones, a centered, sharp star on a dark blue base is highly desirable.",
      score: 7.5,
    },
    videoUrl: HANDS_VIDEO_URL,
    status: "available",
  },
  {
    id: "5",
    name: "Golden Prosperity",
    category: "Yellow Sapphire",
    price: "LKR 142,000",
    priceValue: 142000,
    carats: 4.3,
    origin: "Ceylon",
    shape: "Oval",
    clarity: "VVS2",
    image:
      "https://gemstock.org/wa-data/public/shop/products/48/67/6748/images/32110/32110.1024.jpg",
    description:
      "A radiant yellow sapphire symbolizing prosperity. 4.3 carats of golden brilliance.",
    certProvider: "GIA",
    certId: "2215392011",
    rarityProfile: {
      text: "Padparadscha is the rarest variety of sapphire. Unheated specimens over 3 carats are statistically vanishing.",
      score: 9.8,
    },
    videoUrl: HANDS_VIDEO_URL,
    status: "private_consideration",
  },
  {
    id: "6",
    name: "Midnight Star",
    category: "Star Sapphire",
    price: "LKR 95,000",
    priceValue: 95000,
    carats: 6.1,
    origin: "Ceylon",
    shape: "Cabochon",
    clarity: "Opaque",
    image:
      "https://gemstock.org/wa-data/public/shop/products/62/52/5262/images/28734/28734.1024.webp",
    description:
      "A mesmerizing star sapphire with a sharp, centered star. 6.1 carats of celestial beauty.",
    certProvider: "GIA",
    certId: "5221039941",
    rarityProfile: {
      text: "While star sapphires are more common than transparent ones, a centered, sharp star on a dark blue base is highly desirable.",
      score: 7.5,
    },
    videoUrl: HANDS_VIDEO_URL,
    status: "available",
  },
  {
    id: "7",
    name: "Cornflower Dream",
    category: "Blue Sapphire",
    price: "LKR 158,000",
    priceValue: 158000,
    carats: 2.5,
    origin: "Madagascar",
    shape: "Oval",
    clarity: "VVS1",
    image: "https://lusterblue.lk/wp-content/uploads/2021/06/LBG-1044d.jpg",
    description:
      "A dreamy blue sapphire in the rare cornflower shade. 2.5 carats of vibrant color.",
    certProvider: "GIA",
    certId: "6221049211",
    rarityProfile: {
      text: "Teal sapphires have gained massive popularity, but finding one with a 50/50 balance of blue and green is difficult.",
      score: 7.0,
    },
    videoUrl: HANDS_VIDEO_URL,
    status: "available",
  },
  {
    id: "8",
    name: "Lotus Blush",
    category: "Pink Sapphire",
    price: "LKR 89,000",
    priceValue: 89000,
    carats: 3.2,
    origin: "Ceylon",
    shape: "Cushion",
    clarity: "VVS2",
    image:
      "https://www.chatham.com/cdn/shop/files/gempages_498519226311508742-8ac52f7c-7bb4-44f2-ab30-81f97431a342.jpg?v=13793366578071807738",
    description:
      "A delicate pink sapphire with a lotus-inspired blush. 3.2 carats of feminine elegance.",
    certProvider: "GIA",
    certId: "1192203391",
    rarityProfile: {
      text: "Pink sapphires often require heat to remove purple modifiers. This unheated specimen is naturally pure pink.",
      score: 8.2,
    },
    videoUrl: HANDS_VIDEO_URL,
    status: "available",
  },
];

// Subset for the homepage
export const FEATURED_PRODUCTS: Product[] = ALL_PRODUCTS.slice(0, 4);

export const HERO_VIDEO_POSTER =
  "https://images.unsplash.com/photo-1596944924616-00f3f29948dd?q=80&w=2070&auto=format&fit=crop";
export const CURATOR_IMAGE =
  "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=688&auto=format&fit=crop";
export const HERITAGE_IMAGE =
  "https://images.unsplash.com/photo-1589820296156-2454bb8a4d50?q=80&w=1000&auto=format&fit=crop";

export const PARTNER_SHOPS: ShopPartner[] = [
  {
    id: "atelier-paris",
    name: "L'Atelier Doré",
    location: "Paris, France",
    specialty: "Art Nouveau Settings",
    image:
      "https://images.unsplash.com/photo-1622398925373-3f91b1e275f5?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: "studio-tokyo",
    name: "Kintsugi Masters",
    location: "Tokyo, Japan",
    specialty: "Minimalist Platinum",
    image:
      "https://images.unsplash.com/photo-1550948537-130a1ce83314?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: "workshop-ny",
    name: "Fifth Avenue Forge",
    location: "New York, USA",
    specialty: "Art Deco Revival",
    image:
      "https://images.unsplash.com/photo-1565514020176-857de7006764?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: "artisan-florence",
    name: "Bottega Orafa",
    location: "Florence, Italy",
    specialty: "Gold Filigree",
    image:
      "https://images.unsplash.com/photo-1616035049303-3b5643440788?auto=format&fit=crop&q=80&w=800",
  },
];

export const POLICIES_CONTENT = {
  returns: {
    title: "Global Returns & Inspections",
    content:
      "We offer a 14-day global inspection period. Upon receipt of your gemstone, you may examine it in your own environment. If it does not meet your expectations, return it fully insured for a 100% refund, minus shipping costs.",
  },
  buyback: {
    title: "Lifetime Buy-Back Guarantee",
    content:
      "Lunestra views every gemstone as an asset. We offer a lifetime buy-back guarantee at 75% of the original purchase price for any unheated sapphire, ruby, or emerald acquired through our private vault, subject to re-certification.",
  },
  liability: {
    title: "Shipping & Liability",
    content:
      "All shipments are fully insured by Malca-Amit or Brinks until the moment of signature. Our liability ceases only when the package has been signed for by the designated recipient.",
  },
};
