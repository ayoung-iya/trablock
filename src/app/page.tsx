import Link from 'next/link';

import BannerHotArticleList from '@/components/BannerHotArticleList';
import BannerLikeArticleList from '@/components/BannerLikeArticleList';
import Carousel from '@/components/carousel/Carousel';
import Button from '@/components/common/button/Button';
import GNB from '@/components/common/GNB';
import PopularPlaces from '@/components/common/PopluarPlaces/PopularPlaces';
import Footer from '@/components/Footer';
import LandingSearchInput from '@/components/LandingSearchInput';

export default async function Home() {
  return (
    <>
      <GNB />
      <Carousel />
      <div className="mx-auto max-w-screen-xl">
        <LandingSearchInput />
        <PopularPlaces />
        <div className="mx-auto w-full overflow-hidden px-5 py-16 md:px-7 md:py-24 lg:px-5 xl:px-0">
          <h2 className="font-title-3 w-full pb-6 text-black-01">최신 인기 여행 계획</h2>
          <BannerHotArticleList />
        </div>

        <div className="mx-auto w-full">
          <div className="px-5 md:px-7 xl:mx-auto xl:px-0">
            <div className="xl:flex-row-center my-4 justify-between xl:justify-between">
              <h2 className="font-title-3 mb-6 w-full text-black-01">이번 주 가장 사랑받은 여행 계획</h2>
              <div className="hidden xl:block">
                <Link href="/articles" passHref>
                  <button type="button" className="font-btn-2 whitespace-nowrap text-primary-01">
                    더보기
                  </button>
                </Link>
              </div>
            </div>
            <BannerLikeArticleList />
            <div className="mt-8 xl:hidden">
              <Link href="/articles" passHref>
                <Button className="btn-ghost font-subtitle-1 h-12 w-full gap-x-2.5 rounded-md">여행 계획 더보기</Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
