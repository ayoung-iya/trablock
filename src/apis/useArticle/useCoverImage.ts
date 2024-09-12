import { useMutation } from '@tanstack/react-query';

import ARTICLE_SERVICE from '@/apis/useArticle/fetch';

interface CoverImgVariables {
  articleId: string;
  coverImage: File;
}

export default function usePutCoverImage() {
  return useMutation({
    mutationFn: ({ articleId, coverImage }: CoverImgVariables) =>
      ARTICLE_SERVICE.putCoverImage(articleId, { coverImage })
  });
}
