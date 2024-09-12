/* eslint-disable max-len */
import { fetchExtended } from '@/apis/interceptors/fetchExtended';
import ReviewCard from '@/components/card/ReviewCard';

interface Review {
  review_id: number;
  title: string;
  representative_img_url: string;
  locations: {
    place_id: string;
    address: string;
    city: string;
  }[];
  nickname: string;
  profile_img_url: string;
}

interface ReviewsResponse {
  reviews: Review[];
}

export default async function BannerReviewList() {
  const fetchBannerReviews = async () => {
    try {
      const { reviews } = await fetchExtended<ReviewsResponse>('api/v1/banner/reviews');

      return reviews;
    } catch (e) {
      console.error(e);
      return [];
    }
  };

  const reviews = await fetchBannerReviews();

  return (
    <div className="mx-auto w-full overflow-hidden py-16 md:py-24">
      <div className=" flex-col-center my-4 justify-between xl:flex-row">
        <h2 className="font-title-3 mb-6 w-full px-5 text-black-01 md:px-7 xl:px-0">최신 여행 후기</h2>
      </div>
      {reviews.length === 0 && (
        <div className="flex h-24 items-center justify-center px-7">최신 여행 후기가 없습니다.</div>
      )}
      <div className="scrollbar-custom grid w-full grid-cols-1 gap-[18px] max-md:flex-col max-md:px-5 md:grid-cols-2 md:px-7 xl:flex xl:overflow-x-auto xl:px-0">
        {reviews?.map((review) => (
          <ReviewCard
            key={review.reviewId}
            reviewId={review.reviewId}
            title={review.title}
            city={review.locations.map((location) => location.city)}
            imageUrl={review.representativeImgUrl}
            name={review.nickname}
            profileImageUrl={review.profileImgUrl}
            type="main"
          />
        ))}
      </div>
    </div>
  );
}
