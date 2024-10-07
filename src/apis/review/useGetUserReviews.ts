import { useSuspenseInfiniteQuery } from '@tanstack/react-query';

import REVIEW_SERVICE from '@/apis/review/fetch';
import { formatCityData } from '@/apis/utils/formatArticleData';

interface UseGetUserReviewsProps {
  userId: string;
  size?: number;
}

const useGetUserReviews = ({ userId, size = 10 }: UseGetUserReviewsProps) => {
  return useSuspenseInfiniteQuery({
    queryKey: ['trablock', 'review', `user${userId}`],
    queryFn: ({ pageParam: page }) => REVIEW_SERVICE.getUserReviews({ userId, page, size }),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      const { currentPage, isLastPage, totalPages } = lastPage;

      if (isLastPage || currentPage + 1 >= totalPages) {
        return null;
      }

      return currentPage + 1;
    },
    select: (data) => {
      return {
        pages: data.pages.map(({ reviews }) =>
          reviews.map(({ locations, ...rest }) => ({ cities: formatCityData(locations), ...rest }))
        )
      };
    }
  });
};

export default useGetUserReviews;
