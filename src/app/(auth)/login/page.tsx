import Link from 'next/link';

import KakaoLogin from '@/components/KakaoLogin';
import SigninForm from '@/components/SigninForm';
import Logo from '@/icons/logo.svg';

export default function login() {
  return (
    <div className="flex-col-center pb-32 pt-32">
      <Logo width={123} height={32} />
      <div className="mt-14">
        <SigninForm />
      </div>

      <p className="font-btn-text mt-5 text-black-03">
        <span>
          <Link href="/signup">회원가입 </Link>
        </span>
        |
        <span>
          <Link href="/find-my-password"> 비밀번호 찾기</Link>
        </span>
      </p>
      <p className="font-caption-1 mt-10 text-gray-01">SNS 계정으로 로그인/회원가입</p>
      <div className="mt-4">
        <KakaoLogin />
      </div>
    </div>
  );
}
