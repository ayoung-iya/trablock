import { useSuspenseInfiniteQuery } from '@tanstack/react-query';

import ARTICLE_SERVICE from './fetch';

const useGetUserArticles = ({ userId, size = 10 }: { userId: string; size?: number }) => {
  return useSuspenseInfiniteQuery({
    queryKey: ['trablock', 'article', 'user', userId],
    queryFn: ({ pageParam: page }) => ARTICLE_SERVICE.getUserArticles({ userId, page, size }),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      const { currentPage, isLastPage, totalPages } = lastPage;

      if (isLastPage || currentPage + 1 >= totalPages) {
        return null;
      }

      return currentPage + 1;
    },
    select: (data) => {
      return { pages: data.pages.map(({ content }) => content) };
    }
  });
};

export default useGetUserArticles;
