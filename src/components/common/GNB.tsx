import { cookies, headers } from 'next/headers';
import Image from 'next/image';

import mockLogo from '@/icons/googleLogo.png';
import mockSearchIcon from '@/icons/mockSearchLogo.png';

export default function GNB() {
  const cookieStore = cookies();
  const hasCookie = cookieStore.has('user');
  // 추후 쿠키 저장 이름에 따라 달라질 예정

  const headerList = headers();
  const skipIcons = headerList.get('X-Skip-Icons') === 'true';
  // path 가 메인일 때는 검색 아이콘 나타나지 않음

  return (
    <nav className="flex h-20 w-full items-center justify-between bg-slate-400 p-3.5">
      <Image src={mockLogo} alt="logo" width="100" height="50" />
      <ul className="flex gap-3.5">
        <li>{!skipIcons && <Image src={mockSearchIcon} alt="searchIcon" width="20" height="20" />}</li>
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
