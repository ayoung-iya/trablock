import { QueryClient, useMutation } from '@tanstack/react-query';

import { InitialArticle } from '@/apis/useArticle/article.type';
import ARTICLE_SERVICE from '@/apis/useArticle/fetch';

export default function usePutArticle(articleId: string) {
  const queryClient = new QueryClient();

  return useMutation({
    mutationFn: (data: InitialArticle) => ARTICLE_SERVICE.putArticle(articleId, data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['trablock', 'article', articleId] })
  });
}
