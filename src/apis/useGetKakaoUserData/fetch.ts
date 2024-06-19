import returnFetch, { ReturnFetchDefaultOptions } from 'return-fetch';

const options: {
  [key: string]: ReturnFetchDefaultOptions;
} = {
  kakaoUserData: {
    baseUrl: 'https://kauth.kakao.com',
    headers: {
      'Content-type': 'application/x-www-form-urlencoded;charset=utf-8'
    }
  }
};

const fetchKakaoUser = returnFetch(options.kakaoUserData);

const serviceKakaoUserData = {
  getKakaoUserData: async (data: {
    access_token: string;
    expires_in: string;
    refresh_token: string | null;
    refresh_token_expires_in: string | null;
  }) => {
    const response = await fetchKakaoUser('/v2/user/me', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${data.access_token}`
      }
    });
    return response;
  }
};

export default serviceKakaoUserData;
