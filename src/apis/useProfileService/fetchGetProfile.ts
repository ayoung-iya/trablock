import returnFetch, { ReturnFetchDefaultOptions } from 'return-fetch';

import interceptor from '@/apis/interceptors/interceptor';
import getAuthToken from '@/apis/utils/getAuthToken';
import { returnData } from '@/apis/utils/utils';

const options: ReturnFetchDefaultOptions = {
  baseUrl: 'https://be.travel-laboratory.site',
  headers: {
    'Content-Type': 'application/json'
  },
  interceptors: {
    response: async (response) => {
      const result = await response.json();
      if (!response.ok) {
        console.log('▷▶▷▶ response error', result);
      }
      return result;
    }
  }
};

const fetchService = returnFetch({ fetch: interceptor.logging(options) });

const getProfileService = {
  getProfile: async (id: string) => {
    const authToken = getAuthToken();

    const response = await fetchService(`/api/v1/profile/${id}`, {
      method: 'GET',
      headers: {
        'authorization-token': authToken
      }
    });
    return returnData(response);
  }
};

export default getProfileService;
