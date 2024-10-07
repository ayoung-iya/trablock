/* eslint-disable max-len */
import { jwtDecode } from 'jwt-decode';
import { cookies } from 'next/headers';
import Link from 'next/link';

import PROFILE_SERVICE from '@/apis/useProfileService/fetch';
import ImageBox from '@/components/common/ImageBox';
import UserGNBButton from '@/components/common/UserGNBButton';
import HeaderSearchInput from '@/components/HeaderSearchInput';
import calendarAdd from '@/icons/calendar-add.svg?url';
import LogoSvg from '@/icons/logo.svg';

export default async function GNB() {
  const cookieStore = cookies();
  const authToken = cookieStore.get('authorization-token')?.value || '';
  const userId = authToken ? `${jwtDecode<{ userId: number; exp: number }>(authToken)?.userId}` : '';
  let profileData;

  if (userId) {
    profileData = await PROFILE_SERVICE.getProfile(userId);
  }

  return (
    <div className="mx-auto max-w-7xl">
      <nav className="flex-row-center h-[3.75rem] w-full justify-between px-5 md:h-[4.5rem] md:px-7 xl:px-10">
        <Link href="/">
          <LogoSvg width={131} height={28} />
        </Link>
        <HeaderSearchInput>
          <ul className="flex-row-center gap-5">
            <li>
              <Link href="/plan/initial">
                <button
                  type="button"
                  className="md:font-header hidden md:block md:whitespace-nowrap md:text-primary-01"
                >
                  계획 생성하기
                </button>
                <button type="button" className="block md:hidden">
                  <ImageBox src={calendarAdd} alt="계획 생성하기" className="size-[22px]" width={22} height={22} />
                </button>
              </Link>
            </li>
            {profileData && <UserGNBButton profileData={profileData} />}
            {!profileData && (
              <li>
                <Link href="/login">
                  <button type="button" className="btn-solid btn-sm">
                    로그인
                  </button>
                </Link>
              </li>
            )}
          </ul>
        </HeaderSearchInput>
      </nav>
    </div>
  );
}
