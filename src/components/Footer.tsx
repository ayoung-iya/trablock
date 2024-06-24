import Link from 'next/link';

import cIcon from '@/icons/corporation.svg?url';
import githubIcon from '@/icons/github.svg?url';

import ImageBox from './common/ImageBox';

export default function Footer() {
  return (
    // eslint-disable-next-line max-len
    <footer className="flex-col-center mt-[252px] max-w-none gap-y-6 bg-primary-03 py-10 md:mt-[242px] lg:-mx-[calc((100vw-1280px)*0.5)] lg:mt-[475px]">
      <Link href="https://github.com/TravelLaboratory/frontend" className="size-14">
        <ImageBox className="size-9" src={githubIcon} alt="깃허브" width={36} height={36} />
      </Link>
      <ul className="flex-row-center">
        <li>서비스 소개</li>
        <li>이용약관</li>
        <li>개인정보처리방침</li>
      </ul>
      <div className="flex-row-center">
        <ImageBox className="size-4" src={cIcon} alt="주식회사" width={16} height={16} />
        <span>2024 TRABLOCK</span>
      </div>
    </footer>
  );
}
