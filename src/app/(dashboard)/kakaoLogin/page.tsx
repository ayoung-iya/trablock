'use client';

import { useEffect } from 'react';

import Cookies from 'js-cookie';

import usePostKakaoUserData from '@/apis/useGetKakaoUserData/usePostKakaoUserData';
import usePostKakaoToken from '@/apis/usePostKakao/usePostKakaoToken';
import useManageKakaoLogin from '@/libs/hooks/useManageKakaoLogin';
// import { useRouter } from 'next/router';
export default function Kakaologin() {
  const { code } = useManageKakaoLogin();

  const postKakaoTokenMutate = usePostKakaoToken();
  const postKakaoUserData = usePostKakaoUserData();
  // const [isToken, setIsToken] = useState('');
  useEffect(() => {
    if (code) {
      console.log(code);
      postKakaoTokenMutate.mutate(code, {
        onSuccess: (response) => {
          const { access_token: accessToken } = response;
          Cookies.set('kakao', accessToken);
          // setIsToken(accessToken);
          console.log('토큰 성공');
          console.log(accessToken);
          postKakaoUserData.mutate(accessToken, {
            onSuccess: (res) => {
              console.log(res);
            },
            onError: (error) => {
              console.log('enqjsWo ', error);
            }
          });
          // router.push('/');
        },
        onError: (err) => {
          console.log(err);
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
