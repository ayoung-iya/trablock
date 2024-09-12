import Link from 'next/link';

// import { fetchExtended } from '@/apis/interceptors/fetchExtended';
// import { ArticleThumbnailRawData } from '@/apis/useArticle/article.type';
// import TravelCard from '@/components/card/TravelCard';
import Button from '@/components/common/button/Button';
// import { SnakeCase } from '@/libs/utils/snakeToCamel';

export default async function BannerList() {
  // const fetchBannerArticles = async () => {
  //   try {
  //     const { data } = await fetchExtended<SnakeCase<{ data: ArticleThumbnailRawData[] }>>('api/v1/banner/articles');

  //     return data;
  //   } catch (e) {
  //     console.error(e);
  //     return [];
  //   }
  // };

  // const articles = await fetchBannerArticles();

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
            {/* {articles?.map((article) => (
              <TravelCard
                key={article.articleId}
                id={article.articleId.toString()}
                title={article.title}
                city={article.locations.map((loc) => loc.city)}
                startAt={article.startAt}
                endAt={article.endAt}
                travelCompanion={article.travelCompanion}
                travelStyle={article.travelStyles || []}
                name={article.name}
                profileImageUrl={article.profileImgUrl}
                thumbnailImageUrl={article.coverImgUrl}
                bookmarkCount={article.bookmarkCount}
                isBookmarked={article.isBookmarked}
                isEditable={article.isEditable}
                isPlanTab={false}
              />
            ))} */}
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
