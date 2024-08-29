import { QueryClient, useMutation } from '@tanstack/react-query';

import { ArticleInitial } from '@/apis/useArticle/article.type';
import ArticleService from '@/apis/useArticle/fetch';

export default function usePutArticle(articleId: string) {
  const queryClient = new QueryClient();

  return useMutation({
    mutationFn: (data: ArticleInitial) => ArticleService.putArticle(articleId, data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['trablock', 'article', 'useGetArticle', articleId] })
  });
}
