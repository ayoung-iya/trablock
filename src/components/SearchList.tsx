'use client';

import { useEffect } from 'react';

import useGetSearch from '@/apis/useSearch/useGetSearch';
import TravelCard from '@/components/card/TravelCard';
import OrderFilterSection from '@/components/OrderFilterSection';
import useIntersectingState from '@/libs/hooks/useIntersectingState';

export default function SearchList({ keyword, order }: { keyword: string; order: string }) {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } = useGetSearch(keyword, order);
  console.log(data);
  const [isIntersecting, ref] = useIntersectingState<HTMLLIElement>();

  useEffect(() => {
    if (!isIntersecting || isFetchingNextPage) {
      return;
    }

    if (hasNextPage) {
      fetchNextPage();
    }
  }, [isIntersecting, hasNextPage, fetchNextPage, isFetchingNextPage]);

  return (
    <>
      <div className="flex-row-center justify-between">
        <span className={`font-caption-1 flex-shrink-0 md:text-lg ${isLoading ? 'invisible' : ''}`}>
          전체 {data?.totalElements || 0}개
        </span>
        <OrderFilterSection />
      </div>
      <ul className="mt-5 grid grid-cols-1 gap-[18px] md:gap-5 lg:grid-cols-2">
        {data?.pages
          .flat()
          .map(({ articleId, ...rest }) => <TravelCard key={articleId} id={articleId} {...rest} isSearchPage />)}
        {hasNextPage && !isFetchingNextPage && <li className="h-20 w-full" ref={ref} />}
      </ul>
      {isLoading && <p className="mt-[180px] text-center">로딩 중</p>}
      {!isLoading && !data?.pages.flat().length && <p className="mt-[180px] text-center">검색 결과가 없습니다.</p>}
    </>
  );
}
