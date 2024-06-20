'use client';

import React, { useEffect, useState, useRef } from 'react';

import TravelCard, { TravelCardProps } from '@/components/card/TravelCard';
import useIntersectingState from '@/libs/hooks/useIntersectingState';

interface PlanListProps {
  data: {
    total_pages: number;
    size: number;
    content: Omit<TravelCardProps, 'onClick'>[];
    number: number;
  };
  isPlanTab: boolean;
}

const handleClick = (title: string) => {
  alert(`Clicked on ${title}`);
};

export default function PlanList({ data, isPlanTab }: PlanListProps) {
  const [isIntersecting, observerRef] = useIntersectingState<HTMLDivElement>();
  const [cardList, setCardList] = useState<TravelCardProps[]>([]);
  const [currentPage, setCurrentPage] = useState(data.number);
  const hasMounted = useRef(false);

  useEffect(() => {
    if (hasMounted.current) return; // 초기 로드만 처리하도록 함
    hasMounted.current = true;

    console.log('Initial data loading');
    const initialData = data.content.slice(0, data.size).map((item) => ({
      ...item,
      onClick: () => handleClick(item.title)
    }));
    setCardList(initialData);
    console.log('Initial data set:', initialData);
  }, [data]);

  useEffect(() => {
    const loadNextPage = () => {
      if (!isIntersecting || currentPage >= data.total_pages - 1) {
        console.log('Observer is not intersecting or no more pages');
        return;
      }

      console.log('Loading next page:', currentPage + 1);
      const nextPage = currentPage + 1;
      const start = nextPage * data.size;
      const end = start + data.size;
      const nextItems = data.content.slice(start, end).map((item) => ({
        ...item,
        onClick: () => handleClick(item.title)
      }));

      setCardList((prev) => [...prev, ...nextItems]);
      setCurrentPage(nextPage);
    };

    loadNextPage();
  }, [isIntersecting]);

  useEffect(() => {
    if (observerRef.current) {
      observerRef.current.setAttribute('data-observe', 'true');
      console.log('Observer Ref set:', observerRef.current);
    }
  }, [observerRef]);

  if (cardList.length === 0) {
    return <div>여행 계획이 없습니다.</div>;
  }

  return (
    <>
      <div className="grid grid-cols-1 gap-4">
        {cardList.map((item) => (
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
      <div ref={observerRef} style={{ height: '50px' }} />
    </>
  );
}
