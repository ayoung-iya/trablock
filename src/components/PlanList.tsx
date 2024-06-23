'use client';

import React, { useEffect, useRef } from 'react';

import { InfiniteQueryObserverResult, FetchNextPageOptions, InfiniteData } from '@tanstack/react-query';

import { ArticlesResponse } from '@/apis/useArticlesService/type';
import TravelCard from '@/components/card/TravelCard';

interface PlanListProps {
  data: InfiniteData<ArticlesResponse> | undefined;
  error: Error | null;
  fetchNextPage: (
    options?: FetchNextPageOptions
  ) => Promise<InfiniteQueryObserverResult<InfiniteData<ArticlesResponse>, Error>>;
  hasNextPage: boolean | undefined;
  isFetching: boolean;
  isFetchingNextPage: boolean;
  status: string;
  isPlanTab: boolean;
}

const handleClick = (title: string) => {
  alert(`Clicked on ${title}`);
};

export default function PlanList({
  data,
  error,
  fetchNextPage,
  hasNextPage,
  isFetching,
  isFetchingNextPage,
  status,
  isPlanTab
}: PlanListProps) {
  const observerRef = useRef<HTMLDivElement | null>(null);

  const fetchMoreData = () => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        fetchMoreData();
      }
    });

    if (observerRef.current) {
      observer.observe(observerRef.current);
    }

    return () => {
      if (observerRef.current) {
        observer.unobserve(observerRef.current);
      }
    };
  }, [hasNextPage, isFetchingNextPage]);

  if (status === 'error') {
    return (
      <div className="mt-32 flex items-center justify-center">
        <span className="font-caption-1 text-black-02">오류 발생: {error?.message}</span>
      </div>
    );
  }

  if (status === 'loading') {
    return (
      <div className="mt-32 flex items-center justify-center">
        <span className="font-caption-1 text-black-02">로딩 중...</span>
      </div>
    );
  }

  if (!data || data.pages.length === 0 || data.pages.every((page) => page.content.length === 0)) {
    return (
      <div className="mt-32 flex items-center justify-center">
        <span className="font-caption-1 text-black-02">여행 계획이 없습니다.</span>
      </div>
    );
  }

  return (
    <>
      <div className="mx-auto mt-5 flex flex-col items-center gap-4 md:mx-0">
        {data.pages.map((page, pageIndex) => (
          // eslint-disable-next-line react/no-array-index-key
          <React.Fragment key={pageIndex}>
            {page.content.map((item) => (
              <TravelCard
                key={item.article_id}
                id={item.article_id.toString()}
                title={item.title}
                city={item.location.map((loc) => loc.city)}
                startAt={item.start_at}
                endAt={item.end_at}
                travelCompanion={item.travel_companion}
                travelStyle={item.travel_styles}
                name={item.name}
                profileImageUrl={item.profile_image_url}
                thumbnailImageUrl={item.cover_image_url}
                price={item.expense ? Number(item.expense) : 0}
                bookmarkCount={item.bookmark_count}
                isBookmarked={item.is_bookmarked}
                isEditable={item.is_editable}
                isPlanTab={isPlanTab}
                onClick={() => handleClick(item.title)}
              />
            ))}
          </React.Fragment>
        ))}
      </div>
      {hasNextPage && <div ref={observerRef} style={{ height: '50px' }} />}
      {isFetching && !isFetchingNextPage && (
        <div className="mt-5 flex items-center justify-center">
          <span className="font-caption-1 text-black-02">로딩 중...</span>
        </div>
      )}
    </>
  );
}
