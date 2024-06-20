import { cookies, headers } from 'next/headers';

import LogoSvg from '@/icons/logo.svg';
import SearchSvg from '@/icons/search.svg';

export default function GNB() {
  const cookieStore = cookies();
  const hasCookie = cookieStore.has('user');
  // 추후 쿠키 저장 이름에 따라 달라질 예정

  const headerList = headers();
  const skipIcons = headerList.get('X-Skip-Icons') === 'true';
  // path 가 메인일 때는 검색 아이콘 나타나지 않음

  return (
    <nav className="flex-row-center h-[3.75rem] w-full justify-between bg-gray-01 p-3.5 md:h-[4.5rem]">
      <LogoSvg width={123} height={32} />
      <ul className="flex gap-3.5">
        <li>{!skipIcons && <SearchSvg width={24} height={24} />}</li>
        <li>
          <button type="button">계획 생성하기</button>
        </li>
        {hasCookie && <li>프로필 사진 컴포넌트</li>}
        {!hasCookie && (
          <li>
            <button type="button">로그인</button>
          </li>
        )}
      </ul>
    </nav>
  );
}
