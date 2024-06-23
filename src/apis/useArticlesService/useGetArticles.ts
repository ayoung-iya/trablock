import { useInfiniteQuery, QueryFunctionContext } from '@tanstack/react-query';

import articleService from './fetch';
import { ArticlesResponse } from './type';

const useGetArticles = (userId: string) => {
  return useInfiniteQuery<ArticlesResponse, Error>({
    queryKey: ['articles', userId],
    queryFn: async ({ pageParam = 0 }: QueryFunctionContext) => {
      return articleService.getArticles(userId, pageParam as number);
    },
    getNextPageParam: (lastPage) => {
      if (lastPage.last) return undefined;
      return lastPage.pageable.page_number + 1;
    },
    initialPageParam: 0
  });
};

export default useGetArticles;
