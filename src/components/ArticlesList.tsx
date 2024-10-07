'use client';

import useGetArticles from '@/apis/useArticle/useGetArticles';
import { formatArticleData } from '@/apis/utils/formatArticleData';
import TravelDetailCard from '@/components/card/TravelDetailCard';
import OrderFilterSection from '@/components/OrderFilterSection';
import useIntersectingState from '@/libs/hooks/useIntersectingState';

export default function ArticlesList() {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } = useGetArticles({
    size: 10,
    sort: 'createdAt,DESC'
  });

  const ref = useIntersectingState<HTMLLIElement>((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting && !isFetchingNextPage) {
        fetchNextPage();
      }
    });
  });
  const articles = formatArticleData(data?.pages.flat() || []);

  return (
    <>
      <div className="flex-row-center justify-between">
        <span className={`font-caption-1 flex-shrink-0 md:text-lg ${isLoading ? 'invisible' : ''}`}>
          전체 {data?.totalElements || 0}개
        </span>
        <OrderFilterSection />
      </div>
      <ul className="mt-5 flex flex-wrap gap-[18px] md:gap-5">
        {articles.map(({ articleId, ...rest }) => (
          <TravelDetailCard key={articleId} articleId={articleId} {...rest} />
        ))}
        {hasNextPage && !isFetchingNextPage && <li className="h-20 w-full" ref={ref} />}
      </ul>
      {isLoading && <p className="mt-[180px] text-center">로딩 중</p>}
      {!isLoading && !data?.pages.flat().length && <p className="mt-[180px] text-center">검색 결과가 없습니다.</p>}
    </>
  );
}
