'use client';

import React from 'react';

import { useGetBanners } from '@/apis/useBannerArticle/useGetBanners';
import TravelCard from '@/components/card/TravelCard';

export default function BannerList() {
  const { data, isLoading, error } = useGetBanners();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <>
      <h2 className="font-title-3 mb-6 w-full text-black-01">HOT 여행 계획 </h2>
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
    </>
  );
}
