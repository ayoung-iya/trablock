'use client';

import { useEffect } from 'react';

import Cookies from 'js-cookie';
import { useRouter } from 'next/router';

import usePostOauthLogin from '@/apis/oauthLogin/usePostOauthLogin';
import usePostKakaoUserData from '@/apis/useGetKakaoUserData/usePostKakaoUserData';
import usePostKakaoToken from '@/apis/usePostKakao/usePostKakaoToken';
import useManageKakaoLogin from '@/libs/hooks/useManageKakaoLogin';

export default function Kakaologin() {
  const { code } = useManageKakaoLogin();

  const postKakaoTokenMutate = usePostKakaoToken();
  const postKakaoUserData = usePostKakaoUserData();
  const postOauthData = usePostOauthLogin();
  const router = useRouter();
  useEffect(() => {
    if (code) {
      console.log(code);
      postKakaoTokenMutate.mutate(code, {
        onSuccess: (response) => {
          const { access_token: accessToken } = response;
          Cookies.set('kakao', accessToken);
          console.log('토큰 성공');
          console.log(accessToken);
          postKakaoUserData.mutate(accessToken, {
            onSuccess: (res) => {
              console.log(res);
              const { kakao_account: kakaoAccount } = res;
              const { email, profile } = kakaoAccount;
              const { nickname, profile_image_url: profileImage } = profile;

              const payload = {
                profile_nickname: nickname,
                profile_image: profileImage,
                account_email: email,
                is_agreement: true
              };
              console.log(payload);
              postOauthData.mutate(payload, {
                onSuccess: (responses) => {
                  console.log(responses, '오어스');
                  const authorizationToken = response.headers.get('authorization-token');
                  const expiresAt = response.headers.get('authorization-token-expired-at');
                  const refreshToken = response.headers.get('refresh-token');

                  if (authorizationToken && expiresAt && refreshToken) {
                    Cookies.set('authorization-token', authorizationToken, { secure: true });
                    Cookies.set('expires-at', expiresAt);
                    Cookies.set('refresh-token', refreshToken, { secure: true });
                  }
                  router.push('/');
                },
                onError: (err) => console.log('oauth', err)
              });
            },
            onError: (error) => {
              console.log('userdata', error);
            }
          });
          // router.push('/');
        },
        onError: (err) => {
          console.log('token', err);
        }
      });
    }
  }, []);

  return (
    <div>
      <p>kakaoLogin</p>
    </div>
  );
}
