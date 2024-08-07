'use client';

import { MouseEventHandler, useEffect, useState } from 'react';

import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import useGetProfile from '@/apis/useProfileService/useGetProfile';
import HeaderSearchInput from '@/components/HeaderSearchInput';
import calendarAdd from '@/icons/calendar-add.svg?url';
import LogoSvg from '@/icons/logo.svg';
import logout from '@/icons/logout.svg?url';
import ProfileDefault from '@/icons/profile-default.svg?url';

import ImageBox from './ImageBox';

export default function GNB() {
  const [hasCookie, setHasCookie] = useState(false);
  const [displayImageUrl, setDisplayImageUrl] = useState(ProfileDefault);
  const [decodeId, setDecodeId] = useState('');

  const { data: profileData } = useGetProfile(decodeId);
  const router = useRouter();

  const handleLogout: MouseEventHandler = () => {
    Cookies.remove('authorization-token');
    Cookies.remove('expires-at');
    Cookies.remove('refresh-token');

    setHasCookie(false);
    setDisplayImageUrl(ProfileDefault);
    setDecodeId('');
    router.push('/');
  };

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
        <LogoSvg width={131} height={28} />
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
            <>
              <li className="flex-row-center">
                <button type="button" className="size-6" onClick={handleLogout}>
                  <ImageBox src={logout} alt="로그아웃" className="size-6" width={24} height={24} />
                </button>
              </li>
              <Link href={`/profile/${decodeId}`}>
                <li>
                  <ImageBox
                    src={displayImageUrl}
                    alt="Profile Image"
                    className="size-9 rounded-full"
                    width={36}
                    height={36}
                  />
                </li>
              </Link>
            </>
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
