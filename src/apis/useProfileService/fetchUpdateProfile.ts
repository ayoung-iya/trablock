import returnFetch, { ReturnFetchDefaultOptions } from 'return-fetch';

import interceptor from '@/apis/interceptors/interceptor';
import getAuthToken from '@/apis/utils/getAuthToken';
import { returnData } from '@/apis/utils/utils';

const options: ReturnFetchDefaultOptions = {
  baseUrl: 'https://be.travel-laboratory.site',
  headers: {},
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

const updateProfileService = {
  updateProfile: async (profileData: { nickname: string; introduce: string; file?: File }) => {
    const authToken = getAuthToken();
    const formData = new FormData();

    if (profileData.file) {
      formData.append('file', profileData.file, profileData.file.name);
    }

    formData.append(
      'profile',
      new Blob([JSON.stringify({ nickname: profileData.nickname, introduce: profileData.introduce })], {
        type: 'application/json'
      })
    );

    const response = await fetchService(`/api/v1/profile`, {
      method: 'PUT',
      body: formData,
      headers: {
        'authorization-token': authToken
      }
    });

    return returnData(response);
  }
};

export default updateProfileService;
