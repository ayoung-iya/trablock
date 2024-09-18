import { useInfiniteQuery } from '@tanstack/react-query';

import searchService from './fetch';

const useGetSearch = (keyword: string, order: string) => {
  return useInfiniteQuery({
    queryKey: ['trablock', 'search', keyword, order],
    queryFn: ({ pageParam }) => searchService.getSearchResults(keyword, order, pageParam),
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

export default useGetSearch;
