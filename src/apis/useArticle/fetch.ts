import { notFound } from 'next/navigation';

import { fetchExtendedWithAuthToken } from '@/apis/interceptors/fetchExtended';
import type {
  articleID,
  ArticleInitialCamelCase,
  ArticleInitialSnakeCase,
  ArticleThumbnailSnakeCase
} from '@/apis/useArticle/article.type';
import {
  formatArticleInitialDataToCamelCase,
  formatArticleInitialDataToSnakeCase
} from '@/apis/utils/formatArticleInitialData';

const ArticleService = {
  postArticle: async (data: ArticleInitialCamelCase) => {
    const formatData: ArticleInitialSnakeCase = formatArticleInitialDataToSnakeCase(data);
    const { article_id: articleId } = await fetchExtendedWithAuthToken<articleID>('api/v1/article', {
      method: 'POST',
      body: formatData
    });

    return { articleId };
  },
  getArticle: async (articleId?: string) => {
    if (!articleId) {
      throw new Error('no article id');
    }

    const response = await fetchExtendedWithAuthToken<ArticleThumbnailSnakeCase>(`api/v1/article/${articleId}`, {
      method: 'GET'
    });

    if (!response.is_editable) {
      notFound();
    }

    return formatArticleInitialDataToCamelCase(response);
  },
  putArticle: async (articleId: string, data: ArticleInitialCamelCase) => {
    const formatData: ArticleInitialSnakeCase = formatArticleInitialDataToSnakeCase(data);
    const response = await fetchExtendedWithAuthToken<ArticleInitialSnakeCase>(`/api/v1/article/${articleId}`, {
      method: 'PUT',
      body: formatData
    });

    return formatArticleInitialDataToCamelCase(response);
  }
};

export default ArticleService;
