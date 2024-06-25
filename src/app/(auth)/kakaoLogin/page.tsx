// 'use client';

// import { useEffect } from 'react';

// import Cookies from 'js-cookie';
// import { useRouter } from 'next/router';

// import usePostOauthLogin from '@/apis/oauthLogin/usePostOauthLogin';
// import usePostKakaoUserData from '@/apis/useGetKakaoUserData/usePostKakaoUserData';
// import usePostKakaoToken from '@/apis/usePostKakao/usePostKakaoToken';
// import useManageKakaoLogin from '@/libs/hooks/useManageKakaoLogin';

// export default function Kakaologin() {
//   const { code } = useManageKakaoLogin();

//   const postKakaoTokenMutate = usePostKakaoToken();
//   const postKakaoUserData = usePostKakaoUserData();
//   const postOauthData = usePostOauthLogin();
//   const router = useRouter();
//   useEffect(() => {
//     if (code) {
//       console.log(code);
//       postKakaoTokenMutate.mutate(code, {
//         onSuccess: (response) => {
//           const { access_token: accessToken } = response;
//           Cookies.set('kakao', accessToken);
//           console.log('토큰 성공');
//           console.log(accessToken);
//           postKakaoUserData.mutate(accessToken, {
//             onSuccess: (res) => {
//               console.log(res);
//               const { kakao_account: kakaoAccount } = res;
//               const { email, profile } = kakaoAccount;
//               const { nickname, profile_image_url: profileImage } = profile;

//               const payload = {
//                 profile_nickname: nickname,
//                 profile_image: profileImage,
//                 account_email: email,
//                 is_agreement: true
//               };
//               console.log(payload);
//               postOauthData.mutate(payload, {
//                 onSuccess: (responses) => {
//                   console.log(responses, '오어스');
//                   const authorizationToken = response.headers.get('authorization-token');
//                   const expiresAt = response.headers.get('authorization-token-expired-at');
//                   const refreshToken = response.headers.get('refresh-token');

//                   if (authorizationToken && expiresAt && refreshToken) {
//                     Cookies.set('authorization-token', authorizationToken, { secure: true });
//                     Cookies.set('expires-at', expiresAt);
//                     Cookies.set('refresh-token', refreshToken, { secure: true });
//                   }
//                   router.push('/');
//                 },
//                 onError: (err) => console.log('oauth', err)
//               });
//             },
//             onError: (error) => {
//               console.log('userdata', error);
//             }
//           });
//           // router.push('/');
//         },
//         onError: (err) => {
//           console.log('token', err);
//         }
//       });
//     }
//   }, [code]);

//   return (
//     <div>
//       <p>kakaoLogin</p>
//     </div>
//   );
// }

'use client';

import { useEffect } from 'react';

import Cookies from 'js-cookie';
import { useRouter } from 'next/router';

import usePostOauthLogin from '@/apis/oauthLogin/usePostOauthLogin';
import usePostKakaoUserData from '@/apis/useGetKakaoUserData/usePostKakaoUserData';
import usePostKakaoToken from '@/apis/usePostKakao/usePostKakaoToken';
import useManageKakaoLogin from '@/libs/hooks/useManageKakaoLogin';

interface OAuthResponse {
  headers: {
    get: (headerName: string) => string | null;
  };
  // 필요한 경우 다른 속성들도 여기에 추가할 수 있습니다.
}

export default function Kakaologin() {
  const { code } = useManageKakaoLogin();

  const postKakaoTokenMutate = usePostKakaoToken();
  const postKakaoUserData = usePostKakaoUserData();
  const postOauthData = usePostOauthLogin();
  const router = useRouter();

  useEffect(() => {
    if (code) {
      console.log(`Authorization code: ${code}`);

      const handleKakaoLogin = async () => {
        try {
          const tokenResponse = await new Promise((resolve, reject) => {
            postKakaoTokenMutate.mutate(code, {
              onSuccess: resolve,
              onError: reject
            });
          });

          const accessToken = (tokenResponse as any).access_token; // 서버에서 반환하는 정확한 키 이름 사용
          Cookies.set('kakao', accessToken);
          console.log('Token fetch success');
          console.log(`Access token: ${accessToken}`);

          const userDataResponse = await new Promise((resolve, reject) => {
            postKakaoUserData.mutate(accessToken, {
              onSuccess: resolve,
              onError: reject
            });
          });

          console.log('User data fetch success:', userDataResponse);
          const { kakao_account: kakaoAccount } = userDataResponse as any;
          const { email, profile } = kakaoAccount;
          const { nickname, profile_image_url: profileImage } = profile;

          const payload = {
            profile_nickname: nickname,
            profile_image: profileImage,
            account_email: email,
            is_agreement: true
          };
          console.log('Payload for OAuth:', payload);

          const oauthResponse: OAuthResponse = await new Promise((resolve, reject) => {
            postOauthData.mutate(payload, {
              onSuccess: resolve,
              onError: reject
            });
          });

          console.log('OAuth data post success:', oauthResponse);
          const authorizationToken = oauthResponse.headers.get('authorization-token');
          const expiresAt = oauthResponse.headers.get('authorization-token-expired-at');
          const refreshToken = oauthResponse.headers.get('refresh-token');

          if (authorizationToken && expiresAt && refreshToken) {
            Cookies.set('authorization-token', authorizationToken, { secure: true });
            Cookies.set('expires-at', expiresAt);
            Cookies.set('refresh-token', refreshToken, { secure: true });
            console.log('Tokens saved in cookies');
          }
          router.push('/');
        } catch (error) {
          console.error('Error during Kakao login process:', error);
        }
      };

      handleKakaoLogin();
    }
  }, [code]); // 오직 code만 의존성 배열에 포함

  return (
    <div>
      <p>kakaoLogin</p>
    </div>
  );
}
