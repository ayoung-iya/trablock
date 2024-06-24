'use client';

import { useEffect } from 'react';

import { useRouter } from 'next/navigation';

import useGetSearch from '@/apis/useSearch/useGetSearch';
import TravelCard from '@/components/card/TravelCard';
import OrderFilterSection from '@/components/OrderFilterSection';
import useIntersectingState from '@/libs/hooks/useIntersectingState';

export default function Search({ searchParams }: { searchParams: { [key: string]: string } }) {
  const { keyword = '', order } = searchParams;
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } = useGetSearch(keyword, order);
  const router = useRouter();

  const [isIntersecting, ref] = useIntersectingState<HTMLLIElement>();

  const linkArticleDetailPage = (articleId: string) => () => router.push(`/plan/detail/${articleId}`);

  useEffect(() => {
    if (!isIntersecting || isFetchingNextPage) {
      return;
    }

    if (hasNextPage) {
      fetchNextPage();
    }
  }, [isIntersecting, hasNextPage, fetchNextPage, isFetchingNextPage]);

  return (
    <div className="mx-5 my-5">
      <h1 className="font-title-2 md:font-title-3 mb-3 whitespace-nowrap">
        {keyword ? `‘${decodeURIComponent(keyword)}’` : '전체'} 여행 계획 검색 결과
      </h1>
      <div className="flex-row-center justify-between">
        <span className={`font-caption-1 flex-shrink-0 md:text-lg ${isLoading ? 'invisible' : ''}`}>
          전체 {data?.totalElements || 0}개
        </span>
        <OrderFilterSection />
      </div>
      <ul className="mt-5 flex flex-wrap gap-[18px] md:gap-5">
        {data?.pages
          .flat()
          .map(({ articleId, ...rest }) => (
            <TravelCard id={articleId} {...rest} onClick={linkArticleDetailPage(articleId)} />
          ))}
        {hasNextPage && !isFetchingNextPage && <li className="h-20 w-full" ref={ref} />}
      </ul>
      {isLoading && <p className="mt-[180px] text-center">로딩 중</p>}
      {!isLoading && !data?.pages.flat().length && <p className="mt-[180px] text-center">검색 결과가 없습니다.</p>}
    </div>
  );
}
