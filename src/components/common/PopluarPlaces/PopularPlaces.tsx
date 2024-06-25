/* eslint-disable max-len */

import { useRouter } from 'next/navigation';

import image1 from '@/components/common/PopluarPlaces/images/1.png';
import image2 from '@/components/common/PopluarPlaces/images/2.png';
import image3 from '@/components/common/PopluarPlaces/images/3.png';
import image4 from '@/components/common/PopluarPlaces/images/4.png';
import image5 from '@/components/common/PopluarPlaces/images/5.png';

import CircleImage from './CircleImage';

const places = [
  {
    imageUrl: image1,
    text: '오사카',
    searchQuery: '오사카'
  },
  {
    imageUrl: image2,
    text: '도쿄',
    searchQuery: '도쿄'
  },
  {
    imageUrl: image3,
    text: '뉴욕',
    searchQuery: '뉴욕'
  },
  {
    imageUrl: image4,
    text: '방콕',
    searchQuery: '방콕'
  },
  {
    imageUrl: image5,
    text: '하와이',
    searchQuery: '하와이'
  }
];

export default function PopularPlaces() {
  const router = useRouter();

  const handlePlaceClick = (searchQuery: string) => {
    router.push(`/search?keyword=${searchQuery}`);
  };

  return (
    <div className="bg-primary-03 py-10 md:py-14">
      <div className="mb-6 ml-5 text-[24px] font-bold md:ml-7 xl:ml-10">🔥 지금 인기 있는 여행지</div>
      <div className="flex w-full flex-row place-content-center gap-3 overflow-x-auto scrollbar-hide max-md:justify-start md:gap-5 xl:gap-10">
        {places.map((place) => (
          <CircleImage
            className="first:ml-5 last:mr-5 md:first:ml-7 md:last:mr-7"
            imageUrl={place.imageUrl}
            text={place.text}
            onClick={() => handlePlaceClick(place.searchQuery)}
          />
        ))}
      </div>
    </div>
  );
}
