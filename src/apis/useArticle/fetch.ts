import returnFetch, { ReturnFetchDefaultOptions } from 'return-fetch';

import type { ArticleFormData, ArticleRequestFormData, GetArticleFormData } from '@/apis/useArticle/article.type';
import getAuthToken from '@/apis/utils/getAuthToken';

import API_URL from '../constants/url';
import interceptor from '../interceptors/interceptor';
import {
  formatArticleInitialDataForRequest,
  formatArticleInitialDataFromResponse
} from '../utils/formatArticleInitialData';

const options: ReturnFetchDefaultOptions = {
  baseUrl: API_URL.API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
};

const fetchService = returnFetch({ fetch: interceptor.logging(options) });

const ArticleService = {
  postRegisterArticle: async (data: ArticleFormData) => {
    const authToken = getAuthToken();

    try {
      const formatData: ArticleRequestFormData = formatArticleInitialDataForRequest(data);
      const response = await fetchService('api/v1/article', {
        method: 'POST',
        body: JSON.stringify(formatData),
        headers: {
          'authorization-token': authToken
        }
      });
      const responseData = await response.json();

      if (!response.ok) {
        throw new Error(responseData.local_message);
      }

      return { articleId: responseData.article_id };
    } catch (err) {
      throw (err as Error).message;
    }
  },
  getArticle: async (articleId?: string) => {
    const authToken = getAuthToken();
    if (!articleId) {
      throw new Error('no article id');
    }

    const response = await fetchService(`api/v1/article/${articleId}`, {
      method: 'GET',
      headers: {
        'authorization-token': authToken
      }
    });
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.local_message);
    }

    const formattedData: GetArticleFormData = formatArticleInitialDataFromResponse(data);

    return formattedData;
  },
  putArticle: async (articleId: string, data: ArticleFormData) => {
    const authToken = getAuthToken();
    try {
      const formatData: ArticleRequestFormData = formatArticleInitialDataForRequest(data);
      const response = await fetchService(`/api/v1/article/${articleId}`, {
        method: 'PUT',
        body: JSON.stringify(formatData),
        headers: {
          'authorization-token': authToken
        }
      });
      const responseData = await response.json();

      if (!response.ok) {
        throw new Error(responseData.local_message);
      }

      return responseData;
    } catch (err) {
      throw (err as Error).message;
    }
  }
};

export default ArticleService;
