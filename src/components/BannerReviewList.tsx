/* eslint-disable max-len */

'use client';

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
    <div className="mx-auto w-full overflow-hidden py-16 md:py-24">
      <div className=" flex-col-center my-4 justify-between xl:flex-row">
        <h2 className="font-title-3 mb-6 w-full px-5 text-black-01 md:px-7 xl:px-0">최신 여행 후기</h2>
      </div>
      <div className="scrollbar-custom grid w-full grid-cols-1 gap-[18px] max-md:flex-col max-md:px-5 md:grid-cols-2 md:px-7 xl:flex xl:overflow-x-auto xl:px-0">
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
  );
}
