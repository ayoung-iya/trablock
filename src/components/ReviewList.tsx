'use client';

/* eslint-disable react-hooks/exhaustive-deps */

import React, { useEffect, useRef } from 'react';

import { InfiniteQueryObserverResult, FetchNextPageOptions, InfiniteData } from '@tanstack/react-query';

import { ReviewsResponse } from '@/apis/useContentService/type';
import ReviewCard from '@/components/card/ReviewCard';

interface ReviewListProps {
  data: InfiniteData<ReviewsResponse> | undefined;
  error: Error | null;
  fetchNextPage: (
    options?: FetchNextPageOptions
  ) => Promise<InfiniteQueryObserverResult<InfiniteData<ReviewsResponse>, Error>>;
  hasNextPage: boolean | undefined;
  isFetching: boolean;
  isFetchingNextPage: boolean;
  status: string;
}

const handleClick = (title: string) => {
  alert(`Clicked on ${title}`);
};

export default function ReviewList({
  data,
  error,
  fetchNextPage,
  hasNextPage,
  isFetching,
  isFetchingNextPage,
  status
}: ReviewListProps) {
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

  if (!data || data.pages.length === 0 || data.pages.every((page) => page.reviews.length === 0)) {
    return (
      <div className="mt-32 flex items-center justify-center">
        <span className="font-caption-1 text-black-02">리뷰가 없습니다.</span>
      </div>
    );
  }

  return (
    <>
      <div className="mt-5 flex w-full justify-center">
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 sm:gap-3">
          {data.pages.map((page, pageIndex) => (
            // eslint-disable-next-line react/no-array-index-key
            <React.Fragment key={pageIndex}>
              {page.reviews.map((item) => (
                <ReviewCard
                  key={item.review_id}
                  imageUrl={item.representative_img_url}
                  title={item.title}
                  city={item.location.map((loc) => loc.city)}
                  startAt={item.start_at}
                  endAt={item.end_at}
                  type="default"
                  onClick={() => handleClick(item.title)}
                />
              ))}
            </React.Fragment>
          ))}
        </div>
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
