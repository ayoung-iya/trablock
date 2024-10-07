import { useSuspenseInfiniteQuery } from '@tanstack/react-query';

import BOOKMARK_SERVICE from '@/apis/bookmark/fetch';
import { formatCityData } from '@/apis/utils/formatArticleData';

interface UseGetUserBookmarksProps {
  userId: string;
  size?: number;
}

const useGetUserBookmarks = ({ userId, size = 10 }: UseGetUserBookmarksProps) => {
  return useSuspenseInfiniteQuery({
    queryKey: ['trablock', 'bookmark', `user${userId}`],
    queryFn: ({ pageParam: page }) => BOOKMARK_SERVICE.getUserBookmarks({ userId, page, size }),
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
        pages: data.pages.map(({ content }) =>
          content.map(({ locations, ...rest }) => ({ cities: formatCityData(locations), ...rest }))
        )
      };
    }
  });
};

export default useGetUserBookmarks;
