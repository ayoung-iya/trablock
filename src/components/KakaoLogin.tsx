/* eslint-disable */

'use client';

import Image from 'next/image';
import kakaoButton from '@/icons/kakaoLogin.png';

export default function KakaoLogin() {
  //const REST_API_KEY = process.env.NEXT_PUBLIC_REST_API_KEY;
  const KAKAO_REDIRECT_URI = process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URI;
  const api = 'de7da9716de09d1a9037a0be2bb3e5aa';
  const link = `https://kauth.kakao.com/oauth/authorize?client_id=${api}&redirect_uri=${KAKAO_REDIRECT_URI}&response_type=code`;

  const loginHandler = () => {
    window.location.href = link;
  };
  return (
    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-yellow-400" onClick={loginHandler}>
      <Image src={kakaoButton} alt="kakao" width={30} height={30} />
    </div>
  );
}
