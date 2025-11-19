// components/home/NewArrivals.jsx
"use client";
import Link from "next/link";
import Image from "next/image";
import SectionHeader from "../common/SectionHeader";

const featuredBanners = [
  {
    id: 1,
    title: "PlayStation 5",
    subtitle: "Next-gen gaming console for immersive entertainment.",
    image: "/images/ps5.png",
    link: "/products/ps5",
    size: "large",
  },
  {
    id: 2,
    title: "Women's Collections",
    subtitle: "Stylish fashion for every occasion.",
    image: "/images/womens-collection.png",
    link: "/collection/womens",
    size: "small",
  },
  {
    id: 3,
    title: "Speakers",
    subtitle: "Wireless sound with powerful bass.",
    image: "/images/speakers.png",
    link: "/products/speakers",
    size: "small",
  },
  {
    id: 4,
    title: "Perfume",
    subtitle: "Luxury fragrances for all moods.",
    image: "/images/perfume.png",
    link: "/products/perfume",
    size: "small",
  },
];

const NewArrivals = () => {
  const renderBanner = (banner) => {
    const isLarge = banner.size === "large";

    return (
      <div
        key={banner.id}
        className={`
          relative group overflow-hidden rounded-2xl cursor-pointer
          ${isLarge 
            ? "h-[400px] sm:h-[500px] lg:h-[580px]" 
            : "h-[220px] sm:h-[250px] lg:h-[270px]"
          }
          shadow-lg hover:shadow-2xl transition-all duration-500
          bg-gradient-to-br from-gray-900/50 to-black/30
        `}
      >
       
        <div className="relative w-full h-full">
          <Image
            src={banner.image}
            alt={banner.title}
            fill
            priority={isLarge}
            sizes={isLarge ? "(max-width: 1024px) 100vw, 50vw" : "(max-width: 1024px) 50vw, 25vw"}
            className="object-cover transition-transform duration-700 group-hover:scale-110"
            placeholder="blur"
            blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mN8/OhPQQAJFAPXJ/XDwgAAAABJRU5ErkJggg=="
          />
        </div>

       
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>

        
        <div className={`absolute z-10 ${isLarge ? "bottom-10 left-10" : "bottom-6 left-6"} max-w-full`}>
          <h3 className={`
            font-bold text-white drop-shadow-lg
            ${isLarge ? "text-3xl sm:text-4xl lg:text-5xl" : "text-xl sm:text-2xl"}
            mb-2 leading-tight
          `}>
            {banner.title}
          </h3>
          <p className={`
            text-white/90 drop-shadow-md text-sm sm:text-base
            ${isLarge ? "max-w-md" : "max-w-xs"}
            mb-4 line-clamp-2
          `}>
            {banner.subtitle}
          </p>
          <Link
            href={banner.link}
            className={`
              inline-flex items-center gap-2 px-5 py-2.5 
              bg-white text-black font-semibold text-sm rounded-full
              hover:bg-gradient-to-r hover:from-indigo-500 hover:to-purple-500 
              hover:text-white transition-all duration-300
              shadow-md hover:shadow-lg transform hover:-translate-y-0.5
            `}
          >
            Shop Now
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    );
  };

  return (
    <section className="w-full py-16 lg:py-24 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
      
        <div className="text-center mb-12 lg:mb-16">
          <SectionHeader
            badgeText="Featured"
            title="New Arrivals"
            subtitle="Discover our latest and most loved collections"
          />
        </div>

       
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 lg:gap-8">
       
          <div className="lg:col-span-2 lg:row-span-2">
            {renderBanner(featuredBanners[0])}
          </div>

          
          <div className="lg:col-span-2">
            {renderBanner(featuredBanners[1])}
          </div>

        
          <div className="lg:col-span-1">
            {renderBanner(featuredBanners[2])}
          </div>
          <div className="lg:col-span-1">
            {renderBanner(featuredBanners[3])}
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewArrivals;