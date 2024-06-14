import returnFetch, { ReturnFetchDefaultOptions } from 'return-fetch';

import API_URL from '@/apis/constants/url';
import interceptor from '@/apis/interceptors/interceptor';
import { returnData } from '@/apis/utils/utils';

const options: { [key: string]: ReturnFetchDefaultOptions } = {
  test: {
    baseUrl: API_URL.TEST,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    },
    interceptors: {
      request: async (args) => {
        console.log('********* before sending request *********');
        console.log('url:', args[0].toString());
        console.log('requestInit:', args[1], '\n\n');
        return args;
      },
      response: async (response, requestArgs) => {
        console.log('********* after receiving response *********');
        console.log('url:', requestArgs[0].toString());
        console.log('requestInit:', requestArgs[1], '\n\n');
        return response;
      }
    }
  }
};

const fetchTest = returnFetch({ fetch: interceptor.logging(options.test) });

// 서버 사이드 fetch
const serviceTest = {
  getTest: async (id: number) => {
    const response = await fetchTest(`/users/${id}`, { method: 'GET' });
    const result = response.json();
    return returnData(result);
  }
};

export default serviceTest;
