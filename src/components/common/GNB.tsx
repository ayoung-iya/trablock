import { cookies } from 'next/headers';
import Link from 'next/link';

import ImageBox from '@/components/common/ImageBox';
import UserGNBButton from '@/components/common/UserGNBButton';
import HeaderSearchInput from '@/components/HeaderSearchInput';
import calendarAdd from '@/icons/calendar-add.svg?url';
import LogoSvg from '@/icons/logo.svg';

export default function GNB() {
  const cookieStore = cookies();
  const hasAuthToken = cookieStore.has('authorization-token');

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
          <UserGNBButton hasAuthToken={hasAuthToken} />
        </ul>
      </HeaderSearchInput>
    </nav>
  );
}
