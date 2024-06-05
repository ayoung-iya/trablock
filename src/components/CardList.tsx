'use client';

import { useEffect, useState, MouseEventHandler } from 'react';

import useIntersectingState from '@/libs/hooks/useIntersectingState';

import ReviewCard from './card/ReviewCard';

export default function CardList() {
  const [isIntersecting, observerRef] = useIntersectingState<HTMLDivElement>();
  const [cardList, setCardList] = useState<
    {
      imageUrl: string;
      title: string;
      route: string[];
      user: { name: string; profileImg: string };
      onClick: MouseEventHandler<HTMLButtonElement> | undefined;
    }[]
  >([
    {
      imageUrl: '',
      title: '리뷰다!',
      route: ['서울', '뉴욕', '멕시코'],

      user: { name: '김가은', profileImg: '' },
      onClick: undefined
    },
    {
      imageUrl: '',
      title: '리뷰다!',
      route: ['서울', '뉴욕', '멕시코'],

      user: { name: '김가은', profileImg: '' },
      onClick: undefined
    },
    {
      imageUrl: '',
      title: '리뷰다!',
      route: ['서울', '뉴욕', '멕시코'],

      user: { name: '김가은', profileImg: '' },
      onClick: undefined
    },
    {
      imageUrl: '',
      title: '리뷰다!',
      route: ['서울', '뉴욕', '멕시코'],

      user: { name: '김가은', profileImg: '' },
      onClick: undefined
    },
    {
      imageUrl: '',
      title: '리뷰다!',
      route: ['서울', '뉴욕', '멕시코'],

      user: { name: '김가은', profileImg: '' },
      onClick: undefined
    },
    {
      imageUrl: '',
      title: '리뷰다!',
      route: ['서울', '뉴욕', '멕시코'],

      user: { name: '김가은', profileImg: '' },
      onClick: undefined
    }
  ]);

  useEffect(() => {
    if (!isIntersecting || cardList === undefined) return;

    // 다음 페이지 fetching
    // 우선 cardList 에 데이터를 추가하는 걸로 대체
    // 추후 setCardList대신 fetching하는 훅을 쓰면 됨.
    setCardList((prev) => [
      ...prev,
      {
        imageUrl: '',
        title: '리뷰다!',
        route: ['서울', '뉴욕', '멕시코'],

        user: { name: '김가은', profileImg: '' },
        onClick: undefined
      },
      {
        imageUrl: '',
        title: '리뷰다!',
        route: ['서울', '뉴욕', '멕시코'],

        user: { name: '김가은', profileImg: '' },
        onClick: undefined
      },
      {
        imageUrl: '',
        title: '리뷰다!',
        route: ['서울', '뉴욕', '멕시코'],

        user: { name: '김가은', profileImg: '' },
        onClick: undefined
      },
      {
        imageUrl: '',
        title: '리뷰다!',
        route: ['서울', '뉴욕', '멕시코'],

        user: { name: '김가은', profileImg: '' },
        onClick: undefined
      },
      {
        imageUrl: '',
        title: '리뷰다!',
        route: ['서울', '뉴욕', '멕시코'],

        user: { name: '김가은', profileImg: '' },
        onClick: undefined
      },
      {
        imageUrl: '',
        title: '리뷰다!',
        route: ['서울', '뉴욕', '멕시코'],

        user: { name: '김가은', profileImg: '' },
        onClick: undefined
      }
    ]);
  }, [isIntersecting]);

  return (
    <>
      {cardList.map((item) => (
        <ReviewCard
          imageUrl={item.imageUrl}
          title={item.title}
          route={item.route}
          user={item.user}
          onClick={item.onClick}
          key={item.title}
        />
      ))}
      <div ref={observerRef} />
    </>
  );
}
