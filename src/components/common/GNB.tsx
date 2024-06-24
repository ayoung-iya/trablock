import { cookies, headers } from 'next/headers';
import Image from 'next/image';
import Link from 'next/link';

import HeaderSearchInput from '@/components/HeaderSearchInput';
import calendarSvg from '@/icons/calendar-add.svg?url';
import LogoSvg from '@/icons/logo.svg';
import ProfileDefault from '@/icons/profile-default.svg';

import ImageBox from './ImageBox';

export default function GNB() {
  const cookieStore = cookies();
  const hasCookie = cookieStore.has('authorization-token');

  const headerList = headers();
  const skipIcons = headerList.get('X-Skip-Icons') === 'true';
  // imageurl 받아야함.
  const displayImageUrl = '';

  return (
    <nav className="flex-row-center h-[3.75rem] w-full justify-between p-10 md:h-[4.5rem]">
      <Link href="/">
        <LogoSvg width={123} height={32} />
      </Link>
      <div className={`${skipIcons ? '' : 'flex w-full justify-end gap-5 md:justify-between md:gap-0'}`}>
        {!skipIcons && <HeaderSearchInput />}
        <ul className="flex-row-center gap-5">
          <li className="flex-row-center">
            <button type="button">
              <span className="font-btn-2 hidden whitespace-nowrap text-primary-01 md:block">계획 생성하기</span>
              <ImageBox
                src={calendarSvg}
                alt="일정 추가하기"
                className="size-[22px] md:hidden"
                width={22}
                height={22}
              />
            </button>
          </li>
          {hasCookie && (
            <Link href="/profile">
              <li>
                <Image src={displayImageUrl} alt="Profile Image" width={36} height={36} className="rounded-full" />
              </li>
            </Link>
          )}
          {!hasCookie && (
            <Link href="/login">
              <li>
                <ProfileDefault width={36} height={36} />
              </li>
            </Link>
          )}
        </ul>
      </div>
    </nav>
  );
}
