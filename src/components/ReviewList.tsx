'use client';

import React, { useEffect, useRef, useState } from 'react';

import ReviewCard, { ReviewCardProps } from '@/components/card/ReviewCard';

interface ReviewListProps {
  data: {
    total_pages: number;
    size: number;
    content: Omit<ReviewCardProps, 'onClick' | 'type'>[];
    number: number;
  };
}

const handleClick = (title: string) => {
  alert(`Clicked on ${title}`);
};

export default function ReviewList({ data }: ReviewListProps) {
  const [cardList, setCardList] = useState(
    data.content.slice(0, data.size).map((item) => ({
      ...item,
      onClick: () => handleClick(item.title),
      type: 'default' as const
    }))
  );
  const [currentPage, setCurrentPage] = useState(0);
  const [hasMore, setHasMore] = useState(currentPage < data.total_pages - 1);
  const observerRef = useRef<HTMLDivElement | null>(null);

  const fetchMoreData = () => {
    if (!hasMore) return;

    const newPage = currentPage + 1;
    const start = newPage * data.size;
    const end = start + data.size;
    const newData = data.content.slice(start, end).map((item) => ({
      ...item,
      onClick: () => handleClick(item.title),
      type: 'default' as const
    }));

    setCardList((prevData) => [...prevData, ...newData]);
    setCurrentPage(newPage);

    if (newPage >= data.total_pages - 1) {
      setHasMore(false);
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && hasMore) {
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
  }, [hasMore]);

  if (cardList.length === 0) {
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
          {cardList.map((item) => (
            <ReviewCard
              key={item.title}
              imageUrl={item.imageUrl}
              title={item.title}
              city={item.city}
              name={item.name}
              profileImageUrl={item.profileImageUrl}
              startAt={item.startAt}
              endAt={item.endAt}
              type="default"
              onClick={() => handleClick(item.title)}
            />
          ))}
        </div>
      </div>
      {hasMore && <div ref={observerRef} style={{ height: '50px' }} />}
    </>
  );
}
