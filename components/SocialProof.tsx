"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

const FLAGS = [
  { country: "USA", code: "US" },
  { country: "UK", code: "GB" },
  { country: "UAE", code: "AE" },
  { country: "Singapore", code: "SG" },
  { country: "Switzerland", code: "CH" },
  { country: "Japan", code: "JP" },
];

const RECENTLY_SOLD = [
  {
    name: "Blue Sapphire 2.4ct",
    location: "Colombo",
    time: "2 days ago",
    price: "LKR 8,500,000",
    image:
      "https://deliqagems.com/cdn/shop/products/royal-blue-sapphire-cushion-unheated-certified-5-carat-BS1208.jpg?v=1613352237",
  },
  {
    name: "Ruby 1.8ct",
    location: "Kandy",
    time: "1 week ago",
    price: "LKR 6,200,000",
    image:
      "https://store.museumofjewelry.com/cdn/shop/articles/ruby-the-king-of-precious-stone-709034_720x.jpg?v=1680493164",
  },
  {
    name: "Blue Topaz 3.2ct",
    location: "Galle",
    time: "1 week ago",
    price: "LKR 2,900,000",
    image:
      "https://www.serendipitydiamonds.com/images//94000_94999/94864/600x600-2_jpg_80_center_center/blue-topaz-4ct.jpg",
  },
  {
    name: "White Sapphire 2.1ct",
    location: "Jaffna",
    time: "2 weeks ago",
    price: "LKR 4,100,000",
    image:
      "https://wijayagems.com/cdn/shop/collections/white-sapphire.jpg?v=1680339645",
  },
];

import { useScrollAnimation } from "../hooks/useScrollAnimation";

export default function SocialProof() {
  const { ref, isVisible } = useScrollAnimation();

  // Testimonial data
  const TESTIMONIALS = [
    {
      name: "Nadeesha P.",
      review:
        "Lunestra helped me find the perfect piece for my collection. Exceptional service and unmatched quality.",
      rating: 5,
      location: "Nugegoda, Colombo",
      image: "https://randomuser.me/api/portraits/women/65.jpg",
    },
    {
      name: "Sahan F.",
      review:
        "Professional, discreet, and truly global. I felt valued throughout the process with Lunestra.",
      rating: 4,
      location: "Wattala, Gampaha",
      image: "https://randomuser.me/api/portraits/men/44.jpg",
    },
    {
      name: "Ayesha J.",
      review:
        "Bespoke service exceeded expectations. Highly recommended for collectors and enthusiasts alike.",
      rating: 5,
      location: "Panadura, Kalutara",
      image: "https://randomuser.me/api/portraits/women/68.jpg",
    },
    {
      name: "Malith S.",
      review:
        "Impressive selection and attentive staff. My purchase was smooth and secure, truly memorable.",
      rating: 5,
      location: "Negombo, Gampaha",
      image: "https://randomuser.me/api/portraits/men/32.jpg",
    },
    {
      name: "Ishara W.",
      review:
        "I loved the personalized consultation. Lunestra truly understands luxury and client needs.",
      rating: 4,
      location: "Moratuwa, Colombo",
      image: "https://randomuser.me/api/portraits/women/12.jpg",
    },
    {
      name: "Hirantha S.",
      review:
        "The craftsmanship is outstanding. I will definitely return for future investments and recommendations.",
      rating: 5,
      location: "Ja-Ela, Gampaha",
      image: "https://randomuser.me/api/portraits/men/76.jpg",
    },
    {
      name: "Fathima R.",
      review:
        "Discreet, professional, and trustworthy. Highly recommended for collectors and gem lovers.",
      rating: 5,
      location: "Kalutara, Kalutara",
      image: "https://randomuser.me/api/portraits/women/45.jpg",
    },
    {
      name: "Chathura J.",
      review:
        "Excellent service and beautiful pieces. The team made me feel confident in my purchase experience.",
      rating: 4,
      location: "Dehiwala, Colombo",
      image: "https://randomuser.me/api/portraits/men/23.jpg",
    },
    {
      name: "Priyanka D.",
      review:
        "The online experience was seamless and the delivery was prompt. Thank you for everything!",
      rating: 5,
      location: "Gampaha, Gampaha",
      image: "https://randomuser.me/api/portraits/women/33.jpg",
    },
  ];

  // Swiper navigation instance
  const [swiperInstance, setSwiperInstance] = React.useState<any>(null);

  return (
    <section className="py-24 lg:py-32 bg-ivory relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-px bg-linear-to-r from-transparent via-gray-200 to-transparent" />
      <div className="absolute top-20 left-1/4 w-64 h-64 bg-gold/5 rounded-full blur-3xl" />

      <div
        className={`max-w-400 mx-auto px-6 lg:px-12 transition-all duration-1000 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
        }`}
        ref={ref}
      >
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="w-12 h-px bg-gold/40" />
            <span className="text-[10px] uppercase tracking-[0.4em] text-gold">
              Global Presence
            </span>
            <div className="w-12 h-px bg-gold/40" />
          </div>
          <h2 className="font-serif text-3xl md:text-4xl text-brandblack">
            Trusted <span className="italic">Islandwide</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16 lg:gap-12">
          {/* Testimonial Section - Swiper Carousel */}
          <div className="bg-transparent p-10 lg:p-6 shadow-lg shadow-none relative col-span-1 lg:col-span-2">
            <div className="flex items-center mb-2">
              <h3 className="font-serif text-2xl text-brandblack mr-4">
                Client Testimonials
              </h3>
              <div className="flex items-center gap-2">
                <button
                  aria-label="Previous testimonial"
                  className="p-2 rounded-full border border-gold/30 bg-white hover:bg-gold/10 transition-colors"
                  onClick={() => swiperInstance && swiperInstance.slidePrev()}
                  disabled={!swiperInstance}
                >
                  <svg
                    width="20"
                    height="20"
                    fill="none"
                    viewBox="0 0 20 20"
                    className="text-gold"
                  >
                    <path
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M13 16l-5-6 5-6"
                    />
                  </svg>
                </button>
                <button
                  aria-label="Next testimonial"
                  className="p-2 rounded-full border border-gold/30 bg-white hover:bg-gold/10 transition-colors"
                  onClick={() => swiperInstance && swiperInstance.slideNext()}
                  disabled={!swiperInstance}
                >
                  <svg
                    width="20"
                    height="20"
                    fill="none"
                    viewBox="0 0 20 20"
                    className="text-gold"
                  >
                    <path
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M7 4l5 6-5 6"
                    />
                  </svg>
                </button>
              </div>
            </div>
            <p className="font-sans text-gray-600 text-sm w-3/6 mb-6">
              Hear from collectors and connoisseurs who've discovered their
              perfect stone with Lunestra.
            </p>
            <Swiper
              slidesPerView={3}
              spaceBetween={30}
              modules={[Navigation, Autoplay]}
              autoplay={{ delay: 2000, disableOnInteraction: false }}
              className="testimonial-swiper"
              breakpoints={{
                320: { slidesPerView: 1 },
                768: { slidesPerView: 2 },
                1024: { slidesPerView: 3 },
              }}
              style={{ paddingBottom: "2rem" }}
              onSwiper={setSwiperInstance}
            >
              {TESTIMONIALS.map((testimonial, idx) => (
                <SwiperSlide key={idx}>
                  <div className="flex flex-col items-center bg-white border border-gold/10 rounded-xl p-7 shadow-md hover:shadow-lg transition-shadow duration-300 max-w-xs w-full mx-auto">
                    <div className="w-16 h-16 rounded-full overflow-hidden mb-4 border-2 border-gold/30 shadow">
                      <img
                        src={testimonial.image}
                        alt={testimonial.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <h4 className="font-serif text-lg text-brandblack mb-1">
                      {testimonial.name}
                    </h4>
                    <span className="text-[10px] text-gray-500 mb-2 uppercase tracking-wide">
                      {testimonial.location}
                    </span>
                    <div className="flex items-center mb-3">
                      {[...Array(5)].map((_, i) => (
                        <svg
                          key={i}
                          className={`w-4 h-4 ${
                            i < testimonial.rating
                              ? "text-gold"
                              : "text-gray-300"
                          }`}
                          fill="currentColor"
                          viewBox="0 0 20 20"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.966a1 1 0 00.95.69h4.175c.969 0 1.371 1.24.588 1.81l-3.38 2.455a1 1 0 00-.364 1.118l1.287 3.966c.3.921-.755 1.688-1.54 1.118l-3.38-2.455a1 1 0 00-1.175 0l-3.38 2.455c-.784.57-1.838-.197-1.539-1.118l1.287-3.966a1 1 0 00-.364-1.118L2.174 9.393c-.783-.57-.38-1.81.588-1.81h4.175a1 1 0 00.95-.69l1.286-3.966z" />
                        </svg>
                      ))}
                    </div>
                    <p className="text-sm text-gray-700 text-center italic">
                      "{testimonial.review}"
                    </p>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
          {/* Recently Acquired */}
          <div className="bg-white p-10 lg:p-8 shadow-lg shadow-black/5 relative col-span-1">
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-serif text-2xl text-brandblack">
                Recently Acquired Pieces
              </h3>
            </div>
            <p className="font-sans text-gray-600 text-sm mb-6">
              Exceptional gems recently entrusted to collectors worldwide.
            </p>
            <div className="space-y-4">
              {RECENTLY_SOLD.map((item, idx) => (
                <div
                  key={idx}
                  className="group flex items-start justify-between p-5 border border-gray-100 transition-colors duration-300"
                >
                  <div className="flex items-center gap-5">
                    <div className="w-12 h-12">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full"
                      />
                    </div>
                    <div>
                      <p className="font-serif text-brandblack transition-colors">
                        {item.name}
                      </p>
                      <p className="text-[10px] text-gray-400 uppercase tracking-wide mt-1">
                        Acquired in {item.location}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-[10px] text-gray-400 mt-1">
                      {item.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
