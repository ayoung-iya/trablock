import returnFetch, { ReturnFetchDefaultOptions } from 'return-fetch';

import interceptor from '@/apis/interceptors/interceptor';
import { returnData } from '@/apis/utils/utils';

const options: ReturnFetchDefaultOptions = {
  baseUrl: 'https://be.travel-laboratory.site',
  headers: {
    'Content-Type': 'application/json'
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

const bannerService = {
  getBannerArticles: async (token?: string) => {
    const endpoint = token ? '/api/v1/auth/banner/articles' : '/api/v1/banner/articles';
    // eslint-disable-next-line no-undef
    const headers: HeadersInit = token
      ? {
          'authorization-token': token
        }
      : {};
    const response = await fetchService(endpoint, { method: 'GET', headers });
    const result = await response.json();
    return returnData(result);
  }
};

export default bannerService;
