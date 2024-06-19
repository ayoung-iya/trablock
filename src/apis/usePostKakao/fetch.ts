import { URLSearchParams } from 'url';

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

const serviceKakaoLogin = {
  postKakaoToken: async (code: string) => {
    const response = await fetchKakao(`/oauth/token`, {
      method: 'POST',
      body: new URLSearchParams({
        grant_type: 'authorization_code',
        client_id: 'e0e807673bcc1a1361126a62f6cf8c3a',
        redirect_uri: 'https://trablock-git-develop-codeit6.vercel.app',
        code
      }).toString()
    });
    const result = response.json();
    return result;
  }
};

export default serviceKakaoLogin;
