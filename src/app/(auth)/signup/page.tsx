import Link from 'next/link';

import KakaoLogin from '@/components/KakaoLogin';
import SignupForm from '@/components/SignupForm';
import Logo from '@/icons/logo.svg';

export default function signup() {
  return (
    <div className="flex-col-center pb-32 pt-32">
      <Logo width={123} height={32} />
      <p className="font-signin-1 mt-5">
        아이디가 있으신가요?
        <span className="text-primary-01">
          <Link href="/login"> 로그인</Link>
        </span>
      </p>
      <p className="font-signin-2 mt-9 text-gray-01">SNS 계정으로 회원가입</p>
      <div className="mt-3">
        <KakaoLogin />
      </div>

      <hr className="mt-9 w-80 border-gray-01" />
      <SignupForm />
    </div>
  );
}
