/* eslint-disable no-shadow */
import { PaginationParams, Pagination } from '@/apis/constants/pagination.type';
import { fetchExtendedWithAuthToken, fetchExtendedWithoutContentType } from '@/apis/interceptors/fetchExtended';
import type {
  Article,
  InitialArticle,
  InitialArticleRawData,
  Schedule,
  ScheduleDetail
} from '@/apis/useArticle/article.type';
import { formatArticleDataForRequest } from '@/apis/utils/formatArticleInitialData';
import { changeKeysToSnakeCase, SnakeCase } from '@/libs/utils/snakeToCamel';

interface ArticlesResponse extends Pagination {
  content: Article[];
}

interface ArticleId extends Pick<Article, 'articleId'> {}
interface CoverImgUrl extends Required<Pick<Article, 'coverImgUrl'>> {}

const ARTICLE_SERVICE = Object.freeze({
  getArticles: async ({ page = 0, size = 10, sort = 'createdAt,DESC' }: PaginationParams) => {
    const response = await fetchExtendedWithAuthToken<ArticlesResponse>(
      `api/v1/articles?page=${page}&size=${size}&sort=${sort}`,
      {
        method: 'GET'
      }
    );

    return response;
  },

  postArticle: async (data: InitialArticle) => {
    const formatData = formatArticleDataForRequest(data);
    const response = await fetchExtendedWithAuthToken<ArticleId>('api/v1/article', {
      method: 'POST',
      body: formatData
    });

    return response;
  },

  getArticle: async (articleId?: string) => {
    if (!articleId) {
      throw new Error('no article id');
    }

    const response = await fetchExtendedWithAuthToken<Omit<Article, 'articleId' | 'profileImgUrl'>>(
      `api/v1/article/${articleId}`,
      {
        method: 'GET'
      }
    );

    return response;
  },

  putArticle: async (articleId: string, data: InitialArticle) => {
    const formatData = formatArticleDataForRequest(data);
    const response = await fetchExtendedWithAuthToken<InitialArticleRawData>(`/api/v1/article/${articleId}`, {
      method: 'PUT',
      body: formatData
    });

    return response;
  },

  getSchedules: async (articleId: string) => {
    const response = await fetchExtendedWithAuthToken<ScheduleDetail>(`api/v1/articles/${articleId}/schedules`, {
      method: 'GET'
    });

    return response;
  },

  putSchedules: async (articleId: string, payload: { schedules: Schedule[] }) => {
    const response = await fetchExtendedWithAuthToken<SnakeCase<ArticleId>>(`api/v1/articles/${articleId}/schedules`, {
      method: 'PUT',
      body: changeKeysToSnakeCase(payload)
    });

    return response;
  },

  putCoverImage: async (articleId: string, payload: { coverImage: File }) => {
    const formData = new FormData();
    formData.append('file', payload.coverImage);

    const response = await fetchExtendedWithoutContentType<CoverImgUrl>(`api/v1/article/${articleId}/coverImg`, {
      method: 'PUT',
      body: formData
    });

    return response;
  },

  deleteArticle: async (articleId: string) => {
    const response = await fetchExtendedWithAuthToken<{ isDelete: boolean }>(`api/v1/articles/${articleId}/status`, {
      method: 'PATCH'
    });

    return response;
  }
});

export default ARTICLE_SERVICE;
