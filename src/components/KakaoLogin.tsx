'use client';

export default function KakaoLogin() {
  // const REST_API_KEY = process.env.REST_API_KEY;
  // const REDIRECT_URI = process.env.REDIRECT_URI;
  const REST_API_KEY = '822dc8b88e2d46919a2062d853fa5108';
  // const REDIRECT_URI = 'https://trablock-git-develop-codeit6.vercel.app/kakaoLogin';
  const REDIRECT_URI = 'http://localhost:3000/kakaoLogin';
  const link = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;

  const loginHandler = () => {
    window.location.href = link;
  };
  return (
    <button type="button" onClick={loginHandler}>
      카카오 로그인 하기
    </button>
  );
}
