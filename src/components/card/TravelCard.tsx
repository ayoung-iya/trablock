/* eslint-disable max-len */

'use client';

import React, { useEffect, useRef, useState } from 'react';

import Image from 'next/image';

import { DefaultCardProps } from '@/components/card/type';

interface TravelCardProps extends DefaultCardProps {
  route: string[];
  tag: string[];
  period: { start: string; end: string };
  user: { name: string; profileImg: string };
  favorite: number;
  comment: number;
}

export default function TravelCard({
  imageUrl,
  title,
  route,
  period,
  tag,
  user,
  favorite,
  comment,
  onClick
}: TravelCardProps) {
  // 콘텐츠 높이에 따라 이미지 높이를 동적으로 조절하기 위한 코드
  const contentRef = useRef<HTMLDivElement>(null);
  const [contentHeight, setContentHeight] = useState(0);
  const [isMd, setIsMd] = useState(false);

  useEffect(() => {
    const updateHeight = () => {
      if (contentRef.current && contentRef.current.clientHeight !== contentHeight) {
        setContentHeight(contentRef.current.clientHeight);
      }
    };

    const handleResize = () => {
      if (window.matchMedia('(min-width: 768px)').matches) {
        setIsMd(true);
      } else {
        setIsMd(false);
      }
      updateHeight();
    };

    handleResize();

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [contentHeight]);

  return (
    <button
      className="md:flex-row-center relative flex size-full overflow-hidden border border-solid max-md:flex-col"
      style={isMd ? { maxHeight: `${contentHeight}px` } : undefined}
      type="button"
      onClick={onClick}
    >
      {/* 대표 이미지 */}
      <div className="flex-row-center w-full overflow-hidden max-md:max-h-52 md:w-auto md:max-w-64">
        <Image src={imageUrl} alt={imageUrl} width={80 * 4} height={80 * 4} className="image-cover" />
      </div>
      {/* 콘텐츠 */}
      <div className="flex-grow max-md:w-full" ref={contentRef}>
        {/* 상단 각종 데이터 */}
        <div className="flex flex-col gap-2 border-b p-4">
          <p>{title}</p>
          <div>
            {route.map((item, idx) => (
              <span key={item}>
                <span>{item}</span>
                {idx < route.length - 1 && <span> → </span>}
              </span>
            ))}
            <p>
              {period.start} ~ {period.end}
            </p>
          </div>
          <div className="flex-row-center flex-wrap gap-2">
            {tag.map((item) => (
              <p key={item} className="flex-shrink-0 bg-slate-300">
                #{item}
              </p>
            ))}
          </div>
        </div>
        {/* 하단 프로필, 카운트 */}
        <div className="flex-row-center justify-between p-3">
          <div className="flex-row-center gap-2">
            <div className="size-full max-h-8 max-w-8 overflow-hidden rounded-full">
              <Image src={user.profileImg} alt={user.profileImg} width={8 * 4} height={8 * 4} className="image-cover" />
            </div>
            <p>{user.name}</p>
          </div>
          <div className="flex-row-center gap-2">
            <div>❤️{favorite}</div>
            <div>🌈{comment}</div>
          </div>
        </div>
      </div>
    </button>
  );
}
