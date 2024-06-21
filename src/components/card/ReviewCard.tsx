/* eslint-disable max-len */

import React from 'react';

import ImageBox from '@/components/common/ImageBox';

export interface ReviewCardProps {
  imageUrl: string;
  title: string;
  city: string[];
  name: string;
  profileImageUrl: string;
  startAt?: string;
  endAt?: string;
  type?: 'default' | 'main';
  onClick: () => void;
}

export default function ReviewCard({
  imageUrl,
  title,
  city,
  name,
  profileImageUrl,
  startAt,
  endAt,
  type = 'default',
  onClick
}: ReviewCardProps) {
  const cityString = city.join(', ');

  const getClassNames = () => {
    if (type === 'main') {
      return 'w-[285px] h-[220px] sm:w-[320px] sm:h-[240px] md:w-[345px] md:h-[254px]';
    }
    return 'w-[156px] h-[156px] sm:w-[236px] sm:h-[236px]';
  };

  return (
    <button
      className={`relative overflow-hidden rounded-lg bg-gray-200 shadow-[0_0_10px_0_rgba(0,0,0,0.08)] ${getClassNames()} h-full w-full`}
      type="button"
      onClick={onClick}
    >
      <ImageBox className="h-full w-full" src={imageUrl} alt={imageUrl} width={80} height={80} />
      <div className="absolute bottom-4 left-4">
        <p className="font-subtitle-1 mb-1 text-white-01">{title}</p>
        {type === 'default' && (
          <>
            <p className="font-subtitle-3 hidden text-gray-02 sm:block">{cityString}</p>
            <p className="font-subtitle-3 hidden text-gray-02 sm:block">
              {startAt} ~ {endAt}
            </p>
          </>
        )}
        {type === 'main' && (
          <>
            <p className="font-subtitle-3 text-gray-02">{cityString}</p>
            <div className="mt-3 flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <div className="relative h-8 w-8 overflow-hidden rounded-full">
                  <ImageBox
                    className="h-full w-full"
                    src={profileImageUrl}
                    alt="profileImageUrl"
                    width={32}
                    height={32}
                  />
                </div>
                <span className="font-caption-2 text-gray-02">{name}</span>
              </div>
            </div>
          </>
        )}
      </div>
    </button>
  );
}
