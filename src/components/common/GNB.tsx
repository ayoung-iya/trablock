'use client';

import { useEffect, useState } from 'react';

import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';
import Image from 'next/image';
import Link from 'next/link';

import useGetProfile from '@/apis/useProfileService/useGetProfile';
import HeaderSearchInput from '@/components/HeaderSearchInput';
import calendarAdd from '@/icons/calendar-add.svg?url';
import LogoSvg from '@/icons/logo.svg';
import ProfileDefault from '@/icons/profile-default.svg?url';

import ImageBox from './ImageBox';
// import { LoginContext } from '@/libs/contexts/LoginContext';

export default function GNB() {
  // const { userProfileImage, userId } = useContext(LoginContext);
  const [hasCookie, setHasCookie] = useState(false);
  const [displayImageUrl, setDisplayImageUrl] = useState(ProfileDefault); // 기본 프로필 이미지 URL
  const [decodeId, setDecodeId] = useState('');

  const { data: profileData } = useGetProfile(decodeId);

  useEffect(() => {
    const token = Cookies.get('authorization-token');
    if (token) {
      const decode: { userId: string } = jwtDecode(token);
      console.log(decode);
      const { userId } = decode;
      setDecodeId(userId);
    }

    setHasCookie(!!token);

    // 이미지 URL을 클라이언트 측에서만 설정
  }, []);

  useEffect(() => {
    if (profileData?.profile_img_url) {
      // 실제 API 호출이나 다른 방법으로 이미지 URL을 가져옵니다.
      setDisplayImageUrl(profileData.profile_img_url); // 실제 이미지 URL로 대체
    }
  }, [profileData]);

  return (
    <nav className="flex-row-center h-[3.75rem] w-full justify-between px-5 md:h-[4.5rem] md:px-7 xl:px-10">
      <Link href="/">
        <LogoSvg width={123} height={32} />
      </Link>
      <HeaderSearchInput>
        <ul className="flex-row-center gap-5">
          <Link href="/plan/initial">
            <li>
              <button type="button" className="md:font-header hidden md:block md:whitespace-nowrap md:text-primary-01">
                계획 생성하기
              </button>
              <button type="button" className="block md:hidden">
                <ImageBox src={calendarAdd} alt="계획 생성하기" className="size-[22px]" width={22} height={22} />
              </button>
            </li>
          </Link>

          {hasCookie ? (
            <Link href={`/profile/${decodeId}`}>
              <li>
                <Image src={displayImageUrl} alt="Profile Image" width={36} height={36} className="rounded-full" />
              </li>
            </Link>
          ) : (
            <Link href="/login">
              <li>
                <button type="button" className="btn-solid btn-sm">
                  로그인
                </button>
                {/* <Image src={ProfileDefault} width={36} height={36} alt="default profile" /> */}
              </li>
            </Link>
          )}
        </ul>
      </HeaderSearchInput>
    </nav>
  );
}
