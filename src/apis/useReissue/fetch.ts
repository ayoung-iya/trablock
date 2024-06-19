'use client';

import Cookies from 'js-cookie';
import returnFetch, { ReturnFetchDefaultOptions } from 'return-fetch';

const authorizationToken = Cookies.get('authorization-token');
const refreshToken = Cookies.get('refresh-token');

const options: { [key: string]: ReturnFetchDefaultOptions } = {
  reissue: {
    baseUrl: 'https://be.travel-laboratory.site',
    headers: {
      'Content-Type': 'application/json'
    }
  }
};

const fetchReissue = returnFetch(options.reissue);

const serviceReissueToken = {
  postReissueToken: async () => {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json'
    };
    if (authorizationToken) {
      headers['authorization-token'] = authorizationToken;
    }

    if (refreshToken) {
      headers.cookie = refreshToken;
    }

    const response = await fetchReissue('/api/v1/auth/reissue-token', {
      method: 'POST',
      headers
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    return response.json();
  }
};
export default serviceReissueToken;
// const serviceReissueToken = {
//   postReissueToken: async (): Promise<void> => {
//     const response = await fetchReissue('/api/v1/auth/reissue-token', {
//       method: 'POST',
//       headers: {
//         'authorization-token':
//           'eyJhbGciOiJIUzI1NiJ9.eyJ1c2VySWQiOjIsImV4cCI6MTcxODY2NTgwOX0.SSXTXRJacgGWdajh6ZDv9gkgdybDEK9dovnuaAge4OI',

//         Cookie:
//           'refresh-token=eyJhbGciOiJIUzI1NiJ9.eyJ1c2VySWQiOjIsImV4cCI6MTcxODY2NjEyMX0._BNfbJlzfUeH86rh6NYrvEjEnq8529WnuTS5r-g3KVg; Path=/api/v1/auth/reissue-token; Max-Age=1209600; Expires=Mon, 01 Jul 2024 23:09:45 GMT; Secure; HttpOnly; SameSite=None'
//       }
//     });
//     const result = response.json();
//     return result;
//   }
// };

// export default serviceReissueToken;
