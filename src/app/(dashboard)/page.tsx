import BannerArticleList from '@/components/BannerArticleList';
import BannerReviewList from '@/components/BannerReviewList';
import Carousel from '@/components/carousel/Carousel';
import PopularPlaces from '@/components/common/PopluarPlaces/PopularPlaces';
import Footer from '@/components/Footer';
import LandingSearchInput from '@/components/LandingSearchInput';

export default async function Home() {
  return (
    <div className="mx-auto max-w-7xl gap-[60px] md:gap-[120px]">
      <Carousel />
      <LandingSearchInput />
      <PopularPlaces />
      <BannerReviewList />
      <BannerArticleList />
      <Footer />
    </div>
  );
}
