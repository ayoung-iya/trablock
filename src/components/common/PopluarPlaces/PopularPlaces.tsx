/* eslint-disable max-len */
import React from 'react';

import { useRouter } from 'next/navigation';

import CircleImage from './CircleImage';

const places = [
  {
    imageUrl: 'https://picsum.photos/200',
    text: '오사카',
    searchQuery: '오사카'
  },
  {
    imageUrl: 'https://picsum.photos/200',
    text: '도쿄',
    searchQuery: '도쿄'
  },
  {
    imageUrl: 'https://picsum.photos/200',
    text: '뉴욕',
    searchQuery: '뉴욕'
  },
  {
    imageUrl: 'https://picsum.photos/200',
    text: '방콕',
    searchQuery: '방콕'
  },
  {
    imageUrl: 'https://picsum.photos/200',
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
    <div className="bg-blue-100 p-[40px]">
      <div className="text-[24px] font-bold">🔥 지금 인기 있는 여행지</div>
      <div className="mt-10 flex w-full flex-row place-content-center gap-10">
        {places.map((place) => (
          <CircleImage
            imageUrl={place.imageUrl}
            text={place.text}
            onClick={() => handlePlaceClick(place.searchQuery)}
          />
        ))}
      </div>
    </div>
  );
}
