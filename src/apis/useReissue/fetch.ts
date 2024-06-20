/* eslint-disable */
'use client';

import Cookies from 'js-cookie';
import returnFetch, { ReturnFetchDefaultOptions } from 'return-fetch';

const headers: HeadersInit = new Headers();

const authorizationToken = Cookies.get('authorization-token');

if (authorizationToken) {
  headers.set('Authorization-Token', authorizationToken);
}

const options: { [key: string]: ReturnFetchDefaultOptions } = {
  reissue: {
    baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL,
    headers: {
      'Content-Type': 'application/json'
    }
  }
};

const fetchReissue = returnFetch(options.reissue);

const serviceReissueToken = {
  postReissueToken: async () => {
    const response = await fetchReissue('/api/v1/auth/reissue-token', {
      method: 'POST',
      headers: headers
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    return response.json();
  }
};
export default serviceReissueToken;
