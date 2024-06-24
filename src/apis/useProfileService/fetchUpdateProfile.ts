import returnFetch, { ReturnFetchDefaultOptions } from 'return-fetch';

import API_URL from '@/apis/constants/url';
import getAuthToken from '@/apis/utils/getAuthToken';
import { returnData } from '@/apis/utils/utils';

const options: { [key: string]: ReturnFetchDefaultOptions } = {
  default: {
    baseUrl: API_URL.API_BASE_URL,
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
  }
};

const fetchService = returnFetch(options.default);

const updateProfileService = {
  updateProfile: async (profileData: { nickname: string; introduce: string; file?: File | string }) => {
    const authToken = getAuthToken();
    const formData = new FormData();

    if (profileData.file && typeof profileData.file !== 'string') {
      formData.append('file', profileData.file, profileData.file.name);
    }

    formData.append(
      'profile',
      new Blob(
        [
          JSON.stringify({
            nickname: profileData.nickname,
            introduce: profileData.introduce,
            profile_img_url: typeof profileData.file === 'string' ? profileData.file : undefined
          })
        ],
        {
          type: 'application/json'
        }
      )
    );

    const response = await fetchService(`api/v1/profile`, {
      method: 'PUT',
      body: formData,
      headers: {
        'authorization-token': authToken
      }
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.log('▷▶▷▶ response error', errorData);
      return;
    }

    return returnData(response);
  }
};

export default updateProfileService;
