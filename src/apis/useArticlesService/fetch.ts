import returnFetch, { ReturnFetchDefaultOptions } from 'return-fetch';

import interceptor from '@/apis/interceptors/interceptor';
import { returnData } from '@/apis/utils/utils';

const options: ReturnFetchDefaultOptions = {
  baseUrl: 'https://be.travel-laboratory.site',
  headers: {
    'Content-Type': 'application/json',
    'authorization-token':
      'eyJhbGciOiJIUzI1NiJ9.eyJ1c2VySWQiOjcsImV4cCI6MTcxOTIwMjg0M30.9a5oghN7lIay1SyhXWe_02aEjavWp9dZePrRPMGTbNE'
  },
  interceptors: {
    request: async (args: any) => {
      console.log('********* 요청 전 *********');
      console.log('url:', args[0].toString());
      console.log('requestInit:', args[1], '\n\n');
      return args;
    },
    response: async (response: any, requestArgs: any) => {
      console.log('********* 응답 후 *********');
      console.log('url:', requestArgs[0].toString());
      console.log('requestInit:', requestArgs[1], '\n\n');
      return response;
    }
  } as { [key: string]: any }
};

const fetchService = returnFetch({ fetch: interceptor.logging(options) });

const articleService = {
  getArticles: async (userId: string, page: number) => {
    const response = await fetchService(`/api/v1/articles/${userId}?page=${page}`, { method: 'GET' });
    const result = await response.json();
    return returnData(result);
  }
};

export default articleService;
