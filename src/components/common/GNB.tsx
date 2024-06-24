'use client';

import { useContext } from 'react';

import Cookies from 'js-cookie';
import Image from 'next/image';
import Link from 'next/link';

import HeaderSearchInput from '@/components/HeaderSearchInput';
import LogoSvg from '@/icons/logo.svg';
import ProfileDefault from '@/icons/profile-default.svg?url';
import { LoginContext } from '@/libs/contexts/LoginContext';

export default function GNB() {
  const hasCookie = Cookies.get('authorization-token');
  const { userProfileImage, userId } = useContext(LoginContext);
  // const headerList = headers();
  // const skipIcons = headerList.get('X-Skip-Icons') === 'true';
  // imageurl 받아야함. (profile 받을 때 받는걸루 )
  const displayImageUrl = userProfileImage || ProfileDefault;

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
          {hasCookie && (
            <Link href={`/profile/${userId}`}>
              <li>
                <Image src={displayImageUrl} alt="Profile Image" width={36} height={36} className="rounded-full" />
              </li>
            </Link>
          )}
          {!hasCookie && (
            <Link href="/login">
              <li>
                <Image src={ProfileDefault} width={36} height={36} alt="default profile" />
              </li>
            </Link>
          )}
        </ul>
      </HeaderSearchInput>
    </nav>
  );
}
