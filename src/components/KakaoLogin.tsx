'use client';

export default function KakaoLogin() {
  // const REST_API_KEY = process.env.REST_API_KEY;
  // const REDIRECT_URI = process.env.REDIRECT_URI;
  const REST_API_KEY = 'e0e807673bcc1a1361126a62f6cf8c3a';
  const REDIRECT_URI = 'https://trablock-git-develop-codeit6.vercel.app';
  const link = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code,`;

  const loginHandler = () => {
    window.location.href = link;
  };
  return (
    <button type="button" onClick={loginHandler}>
      카카오 로그인 하기
    </button>
  );
}
