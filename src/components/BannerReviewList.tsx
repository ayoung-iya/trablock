'use client';

import React from 'react';

import { useGetReviewBanners } from '@/apis/useBannerArticle/useGetBanners';
import ReviewCard from '@/components/card/ReviewCard';

export default function BannerReviewList() {
  const { data, isLoading, error } = useGetReviewBanners();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!data || !Array.isArray(data.reviews)) {
    return <div>Error: Invalid data format</div>;
  }

  return (
    <div className="container mx-auto">
      <div className=" my-4 flex flex-col items-center justify-between lg:flex-row">
        <h2 className="font-title-3 mb-6 w-full text-black-01">최신 여행 후기</h2>
      </div>
      <div className="flex w-full justify-center scrollbar-hide xl:overflow-y-auto">
        {/* 캐러셀 수정예정 */}
        {/* 이미지 크기는 피그마 시안에 따라 임의로 저장, 캐러셀에 따라서 수정예정 */}
        <div className="flex gap-[18px]">
          {data.reviews.map((review) => (
            <ReviewCard
              key={review.review_id}
              reviewId={review.review_id}
              title={review.title}
              city={review.location.map((loc) => loc.city)}
              imageUrl={review.representative_img_url}
              name={review.nickname}
              profileImageUrl={review.profile_img_url}
              type="main"
            />
          ))}
        </div>
      </div>
    </div>
  );
}
