import returnFetch from 'return-fetch';

import type { ArticleFormData, ArticleRequestFormData } from '@/apis/useArticle/article.type';

import API_URL from '../constants/url';
import interceptor from '../interceptors/interceptor';
import { formatArticleInitialDataForRequest } from '../utils/formatArticleInitialData';

const options = {
  baseUrl: API_URL.API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'authorization-token':
      'eyJhbGciOiJIUzI1NiJ9.eyJ1c2VySWQiOjMsImV4cCI6MTcxODkwNDUyNX0.Cxue2RKkziWbyTSuj5gsG3_TesOdazxcokRuGVYLfiU'
  },
  interceptors: {
    request: async (args: any) => {
      console.log('********* before sending request *********');
      console.log('url:', args[0].toString());
      console.log('requestInit:', args[1], '\n\n');
      return args;
    },
    response: async (response: any, requestArgs: any) => {
      console.log('********* after receiving response *********');
      console.log('url:', requestArgs[0].toString());
      console.log('requestInit:', requestArgs[1], '\n\n');
      return response;
    }
  }
};

const fetchService = returnFetch({ fetch: interceptor.logging(options) });

const ArticleService = {
  postRegisterArticle: async (data: ArticleFormData) => {
    try {
      const formatData: ArticleRequestFormData = formatArticleInitialDataForRequest(data);
      const response = await fetchService('api/v1/register/article', {
        method: 'POST',
        body: JSON.stringify(formatData)
      });
      const responseData = await response.json();

      if (!response.ok) {
        throw new Error(responseData.local_message);
      }

      return { articleId: responseData.article_id };
    } catch (err) {
      throw (err as Error).message;
    }
  }
};

export default ArticleService;
