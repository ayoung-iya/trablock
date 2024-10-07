import Image from 'next/image';
import Link from 'next/link';

import useGetUserReviews from '@/apis/review/useGetUserReviews';
import TravelPreviewCard from '@/components/card/TravelPreviewCard';
import NotificationMessage from '@/components/common/NotificationMessage';
import useIntersectingState from '@/libs/hooks/useIntersectingState';

const EMPTY_MESSAGE = '작성한 여행 후기가 없습니다.';

export default function ReviewList({ userId }: { userId: string }) {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useGetUserReviews({ userId });
  const ref = useIntersectingState<HTMLLIElement>((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting && !isFetchingNextPage) {
        fetchNextPage();
      }
    });
  });
  const reviews = data?.pages.flat() || [];

  if (!reviews.length) {
    <NotificationMessage>{EMPTY_MESSAGE}</NotificationMessage>;
  }

  return (
    <>
      {reviews.map(({ reviewId, title, cities, startAt, endAt, representativeImgUrl }) => (
        <li key={reviewId}>
          <Link href={`/review/${reviewId}`}>
            <TravelPreviewCard.MainSquare>
              {representativeImgUrl && (
                <Image src={representativeImgUrl} alt="대표 이미지" fill style={{ objectFit: 'cover' }} />
              )}
              <div className="absolute bottom-4 left-4 z-10 flex flex-col gap-3">
                <div className="flex flex-col gap-1">
                  <TravelPreviewCard.Title>{title}</TravelPreviewCard.Title>
                  <div className="hidden md:flex md:flex-col md:gap-[2px]">
                    <TravelPreviewCard.Info>{cities.join(', ')}</TravelPreviewCard.Info>
                    <TravelPreviewCard.Info>{`${startAt} ~ ${endAt}`}</TravelPreviewCard.Info>
                  </div>
                </div>
              </div>
            </TravelPreviewCard.MainSquare>
          </Link>
        </li>
      ))}
      {hasNextPage && <li className="h-20 w-full" ref={ref} />}
    </>
  );
}
