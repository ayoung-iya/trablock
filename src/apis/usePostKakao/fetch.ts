// import { URLSearchParams } from 'url';

import returnFetch, { ReturnFetchDefaultOptions } from 'return-fetch';

const options: {
  [key: string]: ReturnFetchDefaultOptions;
} = {
  kakaoToken: {
    baseUrl: 'https://kauth.kakao.com',
    headers: {
      'Content-type': 'application/x-www-form-urlencoded;charset=utf-8',
      'Access-Control-Allow-Origin': '*'
    }
  }
};
const fetchKakao = returnFetch(options.kakaoToken);

const serviceKakaoLogin = {
  postKakaoToken: async (code: string) => {
    const response = await fetchKakao(`/oauth/token`, {
      method: 'POST',
      body: new URLSearchParams({
        grant_type: 'authorization_code',
        client_id: '822dc8b88e2d46919a2062d853fa5108',
        redirect_uri: 'http://localhost:3000/kakaoLogin',
        code
      }).toString()
    });
    const result = response.json();
    return result;
  }
};

export default serviceKakaoLogin;
