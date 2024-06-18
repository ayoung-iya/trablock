// 'use client';

// import returnFetch, { ReturnFetchDefaultOptions } from 'return-fetch';

// import Cookies from 'js-cookie';

// const authorizationToken = Cookies.get('authorization-token');
// const refreshToken = Cookies.get('refresh-token');
// const options: { [key: string]: ReturnFetchDefaultOptions } = {
//   reissue: {
//     baseUrl: 'https://be.travel-laboratory.site',
//     headers: {
//       'Content-Type': 'application/json'
//     }
//   }
// };

// const fetchReissue = returnFetch(options.reissue);

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
