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
  const cityString = city.join(' , ');

  return (
    <button className="relative size-full max-h-80 max-w-80 overflow-hidden" type="button" onClick={onClick}>
      <ImageBox className="size-full" src={imageUrl} alt={imageUrl} width={80} height={80} />
      <div className="text-white absolute bottom-4 left-4">
        <p>{title}</p>
        {type === 'default' && (
          <>
            <p>{cityString}</p>
            <p>
              {startAt} ~ {endAt}
            </p>
          </>
        )}
        {type === 'main' && (
          <>
            <p>{cityString}</p>
            <div className="flex-row-center gap-2">
              <div className="relative size-full max-h-8 max-w-8 overflow-hidden rounded-full">
                <ImageBox className="size-full" src={profileImageUrl} alt="profileImageUrl" width={8} height={8} />
              </div>
              <span>{name}</span>
            </div>
          </>
        )}
      </div>
    </button>
  );
}
