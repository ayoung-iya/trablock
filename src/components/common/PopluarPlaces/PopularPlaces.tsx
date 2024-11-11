/* eslint-disable max-len */

import Link from 'next/link';

import CircleImage from '@/components/common/PopluarPlaces/CircleImage';
import bangkokImageUrl from '@/images/popularPlace/bangkok.webp';
import hawaiianImageUrl from '@/images/popularPlace/hawaiian.webp';
import newYorkImageUrl from '@/images/popularPlace/newYork.webp';
import osakaImageUrl from '@/images/popularPlace/osaka.webp';
import tokyoImageUrl from '@/images/popularPlace/tokyo.webp';

const places = [
  {
    imageUrl: osakaImageUrl,
    text: '오사카',
    searchQuery: '오사카'
  },
  {
    imageUrl: tokyoImageUrl,
    text: '도쿄',
    searchQuery: '도쿄'
  },
  {
    imageUrl: newYorkImageUrl,
    text: '뉴욕',
    searchQuery: '뉴욕'
  },
  {
    imageUrl: bangkokImageUrl,
    text: '방콕',
    searchQuery: '방콕'
  },
  {
    imageUrl: hawaiianImageUrl,
    text: '하와이',
    searchQuery: '하와이'
  }
];

export default function PopularPlaces() {
  return (
    <div className="bg-primary-03 py-10 md:py-14">
      <div className="mb-6 ml-5 text-[24px] font-bold md:ml-7 xl:ml-10">🔥 지금 인기 있는 여행지</div>
      <div className="flex w-full flex-row place-content-center gap-3 overflow-x-auto scrollbar-hide max-md:justify-start md:gap-5 xl:gap-10">
        {places.map((place) => (
          <Link
            key={place.text}
            href={`/search?keyword=${place.searchQuery}`}
            className="first:ml-5 last:mr-5 md:first:ml-7 md:last:mr-7"
          >
            <CircleImage imageUrl={place.imageUrl} text={place.text} />
          </Link>
        ))}
      </div>
    </div>
  );
}
