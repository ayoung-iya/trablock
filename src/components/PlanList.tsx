'use client';

import React, { useEffect, useRef, useState } from 'react';

import TravelCard, { TravelCardProps } from '@/components/card/TravelCard';

interface PlanListProps {
  initialData: {
    totalPages: number;
    size: number;
    content: Omit<TravelCardProps, 'onClick'>[];
  };
  isPlanTab: boolean;
}

const handleClick = (title: string) => {
  alert(`Clicked on ${title}`);
};

export default function PlanList({ initialData, isPlanTab }: PlanListProps) {
  const [data, setData] = useState(initialData.content.slice(0, initialData.size));
  const [currentPage, setCurrentPage] = useState(0);
  const [hasMore, setHasMore] = useState(currentPage < initialData.totalPages - 1);
  const observerRef = useRef<HTMLDivElement | null>(null);

  const fetchMoreData = () => {
    if (!hasMore) return;

    const newPage = currentPage + 1;
    const start = newPage * initialData.size;
    const end = start + initialData.size;
    const newData = initialData.content.slice(start, end);

    setData((prevData) => [...prevData, ...newData]);
    setCurrentPage(newPage);

    if (newPage >= initialData.totalPages - 1) {
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
  }, [hasMore, currentPage]);

  if (data.length === 0) {
    return (
      <div className="mt-32 flex items-center justify-center">
        <span className="font-caption-1 text-black-02">여행 계획이 없습니다.</span>
      </div>
    );
  }

  return (
    <>
      <div className="mt-5 flex flex-col gap-4">
        {data.map((item) => (
          <TravelCard
            key={item.id}
            id={item.id}
            title={item.title}
            city={item.city}
            startAt={item.startAt}
            endAt={item.endAt}
            travelCompanion={item.travelCompanion}
            travelStyle={item.travelStyle}
            name={item.name}
            profileImageUrl={item.profileImageUrl}
            thumbnailImageUrl={item.thumbnailImageUrl}
            price={item.price}
            bookmarkCount={item.bookmarkCount}
            isBookmarked={item.isBookmarked}
            isEditable={item.isEditable}
            isPlanTab={isPlanTab}
            onClick={() => handleClick(item.title)}
          />
        ))}
      </div>
      {hasMore && <div ref={observerRef} style={{ height: '50px' }} />}
    </>
  );
}
