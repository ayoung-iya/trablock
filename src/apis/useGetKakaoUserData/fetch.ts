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
  getKakaoUserData: async (token: string) => {
    const response = await fetchKakaoUser('/v2/user/me', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.json();
  }
};

export default serviceKakaoUserData;
