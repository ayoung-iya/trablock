import mockLogo from '@/icons/googleLogo.png';
import mockSearchIcon from '@/icons/mockSearchLogo.png';

import Image from 'next/image';

export default function GNB() {
  //프로필은 로그인 상태일 때만 나타내기
  //계획하기 페이지는 로그인 상태가 아니면 로그인 하기 페이지로 ㄱㄱ
  return (
    <nav className="flex w-full space-x-7 bg-slate-400">
      <Image src={mockLogo} alt="logo" width="100" height="50" />
      <ul className="flex">
        <li>
          <Image src={mockSearchIcon} alt="searchIcon" width="20" height="20" />
        </li>
        <li>
          <button type="button">계획하기</button>
        </li>
        <li>프로필 컴포넌트</li>
      </ul>
    </nav>
  );
}
