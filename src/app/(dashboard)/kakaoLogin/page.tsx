'use client';

import { useEffect, useState } from 'react';

import useGetKakaoUserData from '@/apis/useGetKakaoUserData/useGetKakaoUserData';
import usePostKakaoToken from '@/apis/usePostKakao/usePostKakaoToken';
import useManageKakaoLogin from '@/libs/hooks/useManageKakaoLogin';

export default function Kakaologin() {
  const [accessToken, setAccessToken] = useState('');

  const { code, error, errorMessage } = useManageKakaoLogin();

  const postKakaoTokenMutate = usePostKakaoToken();

  const { data: kakaoUserData, isError, error: userDataError } = useGetKakaoUserData(accessToken);

  useEffect(() => {
    if (code) {
      console.log(code);
      postKakaoTokenMutate.mutate(code, {
        onSuccess: (response) => {
          const { access_token: accessTokens } = response;
          setAccessToken(accessTokens);
          console.log('토큰 성공');
        },
        onError: (err) => {
          console.log(err);
        }
      });
    }
  }, [code]);

  useEffect(() => {
    if (kakaoUserData && accessToken) {
      console.log(accessToken);
      console.log('userdata');
      const {
        profile_nickname: profileNickname,
        profile_image: profileImage,
        account_email: accountEmail
      } = kakaoUserData;
      // 백엔드로 세개의 데이터 전달
      console.log(profileImage, profileNickname, accountEmail);
    }

    if (isError) {
      console.log('Error fetching user data:', error);
    }
  }, [kakaoUserData, isError, userDataError]);

  return (
    <div>
      <p>kakaoLogin</p>
      {error && <p>오류 : {errorMessage}</p>}
    </div>
  );
}
