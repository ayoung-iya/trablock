import { cookies, headers } from 'next/headers';
import Image from 'next/image';

import mockLogo from '@/icons/googleLogo.png';
import mockSearchIcon from '@/icons/mockSearchLogo.png';

export default function GNB() {
  const cookieStore = cookies();
  const hasCookie = cookieStore.has('user');

  const headerList = headers();
  const skipIcons = headerList.get('X-Skip-Icons') === 'true';
  // 추후 쿠키 저장 이름에 따라 달라질 예정
  // 계획하기 페이지는 로그인 상태가 아니면 로그인 하기 페이지 이동
  // path 가 메인일 때는 검색 아이콘 나타나지 않음

  return (
    <nav className="flex w-full space-x-7 bg-slate-400">
      <Image src={mockLogo} alt="logo" width="100" height="50" />
      <ul className="flex">
        <li>{!skipIcons && <Image src={mockSearchIcon} alt="searchIcon" width="20" height="20" />}</li>
        <li>
          <button type="button">계획하기</button>
        </li>
        {hasCookie && <li>프로필 사진 컴포넌트</li>}
      </ul>
    </nav>
  );
}
