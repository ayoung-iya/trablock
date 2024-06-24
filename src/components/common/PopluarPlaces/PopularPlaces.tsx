/* eslint-disable max-len */
import React from 'react';

import CircleImage from './CircleImage';

const places = [
  {
    imageUrl: 'https://picsum.photos/200',
    text: '오사카',
    onClick: () => alert('Place 1 clicked')
  },
  {
    imageUrl: 'https://picsum.photos/200',
    text: '도쿄',
    onClick: () => alert('Place 2 clicked')
  },
  {
    imageUrl: 'https://picsum.photos/200',
    text: '뉴욕',
    onClick: () => alert('Place 3 clicked')
  },
  {
    imageUrl: 'https://picsum.photos/200',
    text: '방콕',
    onClick: () => alert('Place 4 clicked')
  },
  {
    imageUrl: 'https://picsum.photos/200',
    text: '하와이',
    onClick: () => alert('Place 5 clicked')
  }
];

export default function PopularPlaces() {
  return (
    <div className="bg-blue-100 p-[40px]">
      <div className="text-[24px] font-bold">지금 인기 있는 여행지</div>
      <div className="mt-10 flex w-full flex-row place-content-center gap-10">
        {places.map((place) => (
          <CircleImage imageUrl={place.imageUrl} text={place.text} onClick={place.onClick} />
        ))}
      </div>
    </div>
  );
}
