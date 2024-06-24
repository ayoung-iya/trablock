'use client';

import React from 'react';

import Link from 'next/link';

import { useGetPlanBanners } from '@/apis/useBannerArticle/useGetBanners';
import TravelCard from '@/components/card/TravelCard';
import Button from '@/components/common/button/Button';

export default function BannerList() {
  const { data, isLoading, error } = useGetPlanBanners();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="container mx-auto">
      <div className="my-4 flex flex-col items-center justify-between lg:flex-row">
        <h2 className="font-title-3 mb-6 w-full text-black-01">HOT 여행 계획</h2>
        <div className="hidden lg:block">
          <Link href="/search" passHref>
            <button type="button" className="font-btn-2 whitespace-nowrap text-primary-01">
              더보기
            </button>
          </Link>
        </div>
      </div>
      <div className="justify-center">
        <div className="grid gap-4 sm:gap-5 lg:grid-cols-2 lg:gap-5 lg:gap-y-5">
          {data?.map((article) => (
            <TravelCard
              key={article.article_id}
              id={article.article_id.toString()}
              title={article.title}
              city={article.location.map((loc) => loc.city)}
              startAt={article.start_at}
              endAt={article.end_at}
              travelCompanion={article.travel_companion}
              travelStyle={article.travel_styles}
              name={article.name}
              profileImageUrl={article.profile_image_url}
              thumbnailImageUrl={article.cover_image_url}
              price={article.expense ? Number(article.expense) : 0}
              bookmarkCount={article.bookmark_count}
              isBookmarked={article.is_bookmarked}
              isEditable={article.is_editable}
              isPlanTab={false}
            />
          ))}
        </div>
      </div>
      <div className="mt-8  flex justify-center lg:hidden">
        <Link href="/search" passHref>
          <Button className="btn-ghost btn-md ">여행 후기 더보기</Button>
        </Link>
      </div>
    </div>
  );
}
