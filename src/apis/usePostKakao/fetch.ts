// import { URLSearchParams } from 'url';

import returnFetch, { ReturnFetchDefaultOptions } from 'return-fetch';

const options: {
  [key: string]: ReturnFetchDefaultOptions;
} = {
  kakaoToken: {
    baseUrl: 'https://kauth.kakao.com',
    headers: {
      'Content-type': 'application/x-www-form-urlencoded;charset=utf-8'
    }
  }
};
const fetchKakao = returnFetch(options.kakaoToken);
const clientID = process.env.NEXT_PUBLIC_KAKAO_CLIENT_ID;
const serviceKakaoLogin = {
  postKakaoToken: async (code: string) => {
    const response = await fetchKakao(`/oauth/token`, {
      method: 'POST',
      body: new URLSearchParams({
        grant_type: 'authorization_code',
        client_id: clientID as string,
        redirect_uri: process.env.KAKAO_REDIRECT_URI,
        code
      }).toString()
    });
    const result = response.json();
    return result;
  }
};

export default serviceKakaoLogin;
