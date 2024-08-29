/* eslint-disable no-shadow */
import { notFound } from 'next/navigation';

import { PaginationParams, Pagination } from '@/apis/constants/pagination.type';
import { fetchExtendedWithAuthToken } from '@/apis/interceptors/fetchExtended';
import type {
  articleId,
  ArticleInitial,
  ArticleInitialRawData,
  ArticleRawData,
  ArticleInfoRawData
} from '@/apis/useArticle/article.type';
import { formatArticleDataForRequest, formatArticleDataForUse } from '@/apis/utils/formatArticleInitialData';
import { Schedule, ScheduleList } from '@/libs/types/dragAndDropType';
import { SnakeCase } from '@/libs/utils/snakeToCamel';

interface ArticlesResponse extends Pagination {
  content: ArticleRawData[];
}

const ARTICLE_SERVICE = {
  getArticles: async ({ page = 0, size = 10, sort = 'createdAt,DESC' }: PaginationParams) => {
    const response = await fetchExtendedWithAuthToken<SnakeCase<ArticlesResponse>>(
      `api/v1/articles?page=${page}&size=${size}&sort=${sort}`,
      { method: 'GET' }
    );

    return response;
  },

  postArticle: async (data: ArticleInitial) => {
    const formatData = formatArticleDataForRequest(data);
    const response = await fetchExtendedWithAuthToken<SnakeCase<articleId>>('api/v1/article', {
      method: 'POST',
      body: formatData
    });

    return response;
  },

  getArticle: async (articleId?: string) => {
    if (!articleId) {
      throw new Error('no article id');
    }

    const response = await fetchExtendedWithAuthToken<SnakeCase<ArticleInfoRawData>>(`api/v1/article/${articleId}`, {
      method: 'GET'
    });

    if (!response.isEditable) {
      notFound();
    }

    return formatArticleDataForUse(response);
  },

  putArticle: async (articleId: string, data: ArticleInitial) => {
    const formatData = formatArticleDataForRequest(data);
    const response = await fetchExtendedWithAuthToken<SnakeCase<ArticleInitialRawData>>(
      `/api/v1/article/${articleId}`,
      {
        method: 'PUT',
        body: formatData
      }
    );

    return response;
  },

  getSchedules: async (articleId: number) => {
    const response = await fetchExtendedWithAuthToken<ScheduleList>(`api/v1/articles/${articleId}/schedules`, {
      method: 'GET'
    });

    return response;
  },

  putSchedules: async (articleId: number, payload: { schedules: Schedule[] }) => {
    const response = await fetchExtendedWithAuthToken<Schedule[]>(`api/v1/articles/${articleId}/schedules`, {
      method: 'PUT',
      body: payload
    });

    return response;
  },

  putCoverImage: async (articleId: number, payload: { coverImage: File | null }) => {
    const formData = new FormData();
    if (payload.coverImage) {
      formData.append('cover_img', payload.coverImage);
    }

    const response = await fetchExtendedWithAuthToken<{ cover_img_url: string }>(
      `api/v1/article/${articleId}/coverImg`,
      {
        method: 'PUT',
        body: formData
      }
    );

    return response;
  },

  deleteArticle: async (articleId: number) => {
    const response = await fetchExtendedWithAuthToken<{ is_delete: boolean }>(`api/v1/articles/${articleId}/status`, {
      method: 'PATCH'
    });

    return response;
  }
};

export default ARTICLE_SERVICE;
