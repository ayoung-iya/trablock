import { cookies, headers } from 'next/headers';
import Image from 'next/image';
import Link from 'next/link';

import LogoSvg from '@/icons/logo.svg';
import ProfileDefault from '@/icons/profile-default.svg';
import SearchSvg from '@/icons/search.svg';

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
      <ul className="flex gap-5">
        <li>{!skipIcons && <SearchSvg width={24} height={24} />}</li>
        <li>
          <button type="button" className="font-header text-primary-01">
            계획 생성하기
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
    </nav>
  );
}
