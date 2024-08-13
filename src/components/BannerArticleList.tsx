import Link from 'next/link';

import type { CustomError } from '@/apis/interceptors/customError.type';
import { fetchExtended } from '@/apis/interceptors/fetchExtended';
import TravelCard from '@/components/card/TravelCard';
import Button from '@/components/common/button/Button';

interface Article {
  article_id: number;
  title: string;
  locations: {
    place_id: string;
    address: string;
    city: string;
  }[];
  start_at: string;
  end_at: string;
  expense: string;
  profile_img_url: string;
  cover_img_url: string;
  travel_companion: string;
  travel_styles: string[];
  name: string;
  bookmark_count: number;
  is_bookmarked: boolean;
  is_editable: boolean;
}

interface ArticlesResponse {
  data: Article[];
  error?: CustomError;
}

export default async function BannerList() {
  const fetchBannerArticles = async () => {
    try {
      const {
        body: { data: articles }
      } = await fetchExtended<ArticlesResponse>('api/v1/banner/articles');

      return articles;
    } catch (e) {
      console.error(e);
      return [];
    }
  };

  const articles = await fetchBannerArticles();

  return (
    <div className="mx-auto w-full">
      <div className="px-5 md:px-7 xl:mx-auto xl:px-0">
        <div className="xl:flex-row-center my-4 justify-between xl:justify-between">
          <h2 className="font-title-3 mb-6 w-full text-black-01">HOT 여행 계획</h2>
          <div className="hidden xl:block">
            <Link href="/search" passHref>
              <button type="button" className="font-btn-2 whitespace-nowrap text-primary-01">
                더보기
              </button>
            </Link>
          </div>
        </div>
        <div className="justify-center">
          <div className="grid gap-4 sm:gap-5 xl:grid-cols-2 xl:gap-5 xl:gap-y-5">
            {articles?.map((article) => (
              <TravelCard
                key={article.article_id}
                id={article.article_id.toString()}
                title={article.title}
                city={article.locations.map((loc) => loc.city)}
                startAt={article.start_at}
                endAt={article.end_at}
                travelCompanion={article.travel_companion}
                travelStyle={article.travel_styles}
                name={article.name}
                profileImageUrl={article.profile_img_url}
                thumbnailImageUrl={article.cover_img_url}
                bookmarkCount={article.bookmark_count}
                isBookmarked={article.is_bookmarked}
                isEditable={article.is_editable}
                isPlanTab={false}
              />
            ))}
          </div>
        </div>
        <div className="mt-8 xl:hidden">
          <Link href="/search" passHref>
            <Button className="btn-ghost font-subtitle-1 h-12 w-full gap-x-2.5 rounded-md">여행 후기 더보기</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
