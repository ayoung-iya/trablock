'use client';

import useGetSearch from '@/apis/useSearch/useGetSearch';
import { formatArticleData } from '@/apis/utils/formatArticleData';
import TravelDetailCard from '@/components/card/TravelDetailCard';
import OrderFilterSection from '@/components/OrderFilterSection';
import useIntersectingState from '@/libs/hooks/useIntersectingState';

export default function SearchList({ keyword, order }: { keyword: string; order: string }) {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } = useGetSearch(keyword, order);
  const ref = useIntersectingState<HTMLLIElement>(([entry]) => {
    if (entry.isIntersecting && !isFetchingNextPage) {
      fetchNextPage();
    }
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
