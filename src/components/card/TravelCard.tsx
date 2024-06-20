/* eslint-disable max-len */

'use client';

import React, { useState, useEffect } from 'react';

import ImageBox from '@/components/common/ImageBox';
import useMediaQuery from '@/libs/hooks/useMediaQuery';
import useResizeHeight from '@/libs/hooks/useResizeHeight';

export interface TravelCardProps {
  id: string;
  title: string;
  city: string[];
  startAt: string;
  endAt: string;
  travelCompanion: string;
  travelStyle: string[];
  name: string;
  profileImageUrl: string;
  thumbnailImageUrl: string;
  price: number;
  bookmarkCount: number;
  isBookmarked: boolean;
  isEditable?: boolean;
  isPlanTab?: boolean;
  onClick: () => void;
}

export default function TravelCard({
  title,
  city,
  startAt,
  endAt,
  travelCompanion,
  travelStyle,
  name,
  profileImageUrl,
  thumbnailImageUrl,
  price,
  bookmarkCount,
  isBookmarked,
  isEditable = false,
  isPlanTab = false,
  onClick
}: TravelCardProps) {
  const { divRef, divHeight } = useResizeHeight();
  const isMd = useMediaQuery('(min-width: 768px)');
  const [menuVisible, setMenuVisible] = useState(false);

  const buttonStyle = isMd ? { maxHeight: `${divHeight}px` } : undefined;

  const combinedTags = [travelCompanion, ...travelStyle, `₩${price}`];

  const handleMenuClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setMenuVisible(!menuVisible);
  };

  const handleClickOutside = () => {
    if (menuVisible) {
      setMenuVisible(false);
    }
  };

  useEffect(() => {
    if (menuVisible) {
      document.addEventListener('click', handleClickOutside);
    } else {
      document.removeEventListener('click', handleClickOutside);
    }

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [menuVisible]);

  return (
    <button
      className="md:flex-row-center relative flex size-full overflow-hidden border border-solid max-md:flex-col"
      style={buttonStyle}
      type="button"
      onClick={onClick}
    >
      {/* 책갈피 아이콘 */}
      <div className="absolute left-0 top-0 rounded-full border-2 border-gray-300 p-2">
        {isBookmarked ? (
          <img src="/icons/bookmark-filled.svg" alt="bookmarked" />
        ) : (
          <img src="/icons/bookmark.svg" alt="not bookmarked" />
        )}
      </div>
      {/* 케밥 메뉴 */}
      {isEditable && isPlanTab && (
        <div className="absolute right-2 top-2">
          <button type="button" onClick={handleMenuClick}>
            <img src="/icons/kebab.svg" alt="kebab menu" />
          </button>
          {menuVisible && (
            <div className="bg-white absolute right-0 mt-2 w-24 rounded-md shadow-lg">
              <button type="button" className="block w-full px-4 py-2 text-left text-gray-700">
                수정하기
              </button>
              <button type="button" className="block w-full px-4 py-2 text-left text-red-600">
                삭제하기
              </button>
            </div>
          )}
        </div>
      )}
      {/* 대표 이미지 */}
      <ImageBox
        className="w-full max-md:max-h-52 md:w-auto md:max-w-64"
        src={thumbnailImageUrl}
        alt={thumbnailImageUrl}
        width={80}
        height={80}
      />
      {/* 콘텐츠 */}
      <div className="flex-grow max-md:w-full" ref={divRef}>
        {/* 상단 각종 데이터 */}
        <div className="flex flex-col gap-2 border-b p-4">
          <p>{title}</p>
          <div>
            <div className="flex items-center gap-1">
              <img src="/icons/map-pin.svg" alt="location" className="h-4 w-4" />
              {city.join(', ')}
            </div>
            <div className="flex items-center gap-1">
              <img src="/icons/calendar.svg" alt="calendar" className="h-4 w-4" />
              {startAt} ~ {endAt}
            </div>
          </div>
          <div className="flex-row-center flex-wrap gap-2">
            {combinedTags.map((item) => (
              <p key={item} className="flex-shrink-0 bg-slate-300">
                #{item}
              </p>
            ))}
          </div>
        </div>
        {/* 하단 프로필, 카운트 */}
        <div className="flex-row-center justify-between p-3">
          <div className="flex-row-center gap-2">
            <ImageBox
              className="size-full max-h-8 max-w-8 rounded-full"
              src={profileImageUrl}
              alt={profileImageUrl}
              width={8}
              height={8}
            />
            <p>{name}</p>
          </div>
          <div className="flex-row-center gap-2">
            <div>
              <img src="/icons/bookmark-filled.svg" alt="bookmark count" className="inline h-4 w-4" /> {bookmarkCount}
            </div>
          </div>
        </div>
      </div>
    </button>
  );
}
