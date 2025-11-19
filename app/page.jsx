// app/page.jsx
import HeroSlider from '@/components/home/HeroSlider';
import FlashSales from '@/components/home/FlashSales';
import Categories from '@/components/home/Categories';
import BestSelling from '@/components/home/BestSelling';
import ExploreProducts from '@/components/home/ExploreProducts';
import NewArrivals from '@/components/home/NewArrivals';
import ServiceFeatures from '@/components/home/ServiceFeatures';
import BannerSection from '@/components/home/BannerSection';

export const dynamic = 'force-dynamic';

export default async function HomePage() {
  const [flashRes, bestRes, exploreRes, newRes] = await Promise.all([
    fetch(`${process.env.NEXT_PUBLIC_URL}/api/products?limit=6`, { cache: 'no-store' }),
    fetch(`${process.env.NEXT_PUBLIC_URL}/api/products?limit=8`, { cache: 'no-store' }),
    fetch(`${process.env.NEXT_PUBLIC_URL}/api/products?limit=12`, { cache: 'no-store' }),
    fetch(`${process.env.NEXT_PUBLIC_URL}/api/products?limit=6`, { cache: 'no-store' })
  ]);

  const flashProducts = await flashRes.json();
  const bestProducts = await bestRes.json();
  const exploreProducts = await exploreRes.json();
  const newProducts = await newRes.json();

  return (
    <div className="container pt-8 pb-16">
      <HeroSlider />
      <div className="space-y-24">
        <FlashSales products={flashProducts} />
        <Categories />
        <hr className="border-gray-200" />
        <BestSelling products={bestProducts} />
        <BannerSection />
        <ExploreProducts products={exploreProducts} />
        <NewArrivals type="featured" products={newProducts} />
        <ServiceFeatures />
      </div>
    </div>
  );
}
