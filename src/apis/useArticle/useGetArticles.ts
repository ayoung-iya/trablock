import { useInfiniteQuery } from '@tanstack/react-query';

import { PaginationParams } from '@/apis/constants/pagination.type';
import ARTICLE_SERVICE from '@/apis/useArticle/fetch';

const useGetArticles = ({ size = 10, sort = 'createdAt,DESC' }: Pick<PaginationParams, 'size' | 'sort'>) => {
  return useInfiniteQuery({
    queryKey: ['trablock', 'article', 'all', sort],
    queryFn: ({ pageParam: page }) => ARTICLE_SERVICE.getArticles({ page, size, sort }),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      const {
        pageable: { pageNumber: currentPage },
        last: isLastPage,
        totalPages
      } = lastPage;

      if (isLastPage || currentPage + 1 >= totalPages) {
        return null;
      }

      return currentPage + 1;
    },
    select: (data) => {
      return { pages: data.pages.map(({ content }) => content), totalElements: data.pages[0].totalElements };
    }
  });
};

export default useGetArticles;
