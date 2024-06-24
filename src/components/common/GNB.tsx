'use client';

import { useEffect, useState } from 'react';

import Cookies from 'js-cookie';
import Image from 'next/image';
import Link from 'next/link';

import HeaderSearchInput from '@/components/HeaderSearchInput';
import LogoSvg from '@/icons/logo.svg';
import ProfileDefault from '@/icons/profile-default.svg';

export default function GNB() {
  const [hasCookie, setHasCookie] = useState(false);
  const [displayImageUrl, setDisplayImageUrl] = useState('/path/to/default-profile-image.jpg'); // 기본 프로필 이미지 URL

  useEffect(() => {
    const token = Cookies.get('authorization-token');
    setHasCookie(!!token);

    // 이미지 URL을 클라이언트 측에서만 설정
    if (token) {
      // 실제 API 호출이나 다른 방법으로 이미지 URL을 가져옵니다.
      setDisplayImageUrl('/path/to/profile-image.jpg'); // 실제 이미지 URL로 대체
    }
  }, []);

  return (
    <nav className="flex-row-center h-[3.75rem] w-full justify-between px-5 md:h-[4.5rem] md:px-7 xl:px-10">
      <Link href="/">
        <LogoSvg width={123} height={32} />
      </Link>
      <HeaderSearchInput>
        <ul className="flex gap-5">
          <Link href="/plan/initial">
            <li>
              <button type="button" className="font-header whitespace-nowrap text-primary-01">
                계획 생성하기
              </button>
            </li>
          </Link>
          {hasCookie ? (
            <Link href="/profile">
              <li>
                <Image src={displayImageUrl} alt="Profile Image" width={36} height={36} className="rounded-full" />
              </li>
            </Link>
          ) : (
            <Link href="/login">
              <li>
                <ProfileDefault width={36} height={36} />
              </li>
            </Link>
          )}
        </ul>
      </HeaderSearchInput>
    </nav>
  );
}
