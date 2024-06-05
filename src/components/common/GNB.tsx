import { cookies, headers } from 'next/headers';

import mockLogo from '@/icons/googleLogo.png';
import mockSearchIcon from '@/icons/mockSearchLogo.png';

import ImageBox from './ImageBox';

export default function GNB() {
  const cookieStore = cookies();
  const hasCookie = cookieStore.has('user');
  // 추후 쿠키 저장 이름에 따라 달라질 예정

  const headerList = headers();
  const skipIcons = headerList.get('X-Skip-Icons') === 'true';
  // path 가 메인일 때는 검색 아이콘 나타나지 않음

  return (
    <nav className="flex h-20 w-full items-center justify-between bg-slate-400 p-3.5">
      <ImageBox src={mockLogo} alt="logo" width={40} height={20} />
      <ul className="flex gap-3.5">
        <li>{!skipIcons && <ImageBox src={mockSearchIcon} alt="searchIcon" width={10} height={10} />}</li>
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
