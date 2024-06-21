import React from 'react';

import Badge from '@/components/common/Badge';
import ImageBox from '@/components/common/ImageBox';
import { Category } from '@/components/modal/modalList/type';
import { MARKER_COLOR } from '@/libs/constants/mapStyle';

/**
 * 블록 공통 타입입니다.
 * @param name string; 이름
 * @param category Category; 태그
 */
export interface CoreBlockProps extends React.HTMLAttributes<HTMLButtonElement> {
  name: string;
  category: Category;
  index: number;
  imageUrl?: string;
  startAt: string;
  duration: string;
  memo?: string;
}

/**
 * 기본 정보를 포함하는 코어 블록입니다.
 * @param name string; 이름
 * @param category Category; 카테고리
 * @param route \{ start: string; end: string }; 출발지 및 도착지 객체
 * @param memo string; (optional) 메모
 * @param imageUrl string; (optional) 이미지 주소
 */
export default function CoreBlock({
  index,
  name,
  category,
  memo,
  imageUrl,
  startAt,
  duration,
  onClick
}: CoreBlockProps) {
  const indexStyle = {
    backgroundColor: MARKER_COLOR[category].bg,
    color: MARKER_COLOR[category].text
  };

  return (
    <button className="w-full rounded-[0.3125rem] p-3 shadow-modal" type="button" onClick={onClick}>
      <div className="flex w-full gap-2">
        {/* 인덱스 */}
        <div className="font-tag relative size-6 flex-shrink-0 rounded-full text-center" style={indexStyle}>
          <p className="absolute-center">{index}</p>
        </div>
        <div className="w-full">
          {/* 각종 정보, 이미지 */}
          <div className="flex-row-center mb-3 w-full justify-between gap-2">
            <div className="flex flex-col items-start">
              {/* 방문 시간 */}
              <p className="font-tag mb-2 text-gray-01">{startAt}</p>
              {/* 카테고리 */}
              <Badge className="mb-[0.375rem] inline-block" type={category}>
                {category}
              </Badge>
              {/* 장소 */}
              <p className="font-subtitle-2 mb-2 line-clamp-1">{name}</p>
              {/* 소요 시간 */}
              <p className="font-caption-2 line-clamp-1 text-gray-01">{duration}</p>
            </div>
            {/* 이미지 */}
            {imageUrl && (
              <ImageBox
                className="h-full max-w-[6.4375rem] rounded-[0.3125rem]"
                src={imageUrl}
                alt={imageUrl}
                width={36}
                height={36}
              />
            )}
          </div>
          {/* 메모 */}
          {memo && <p className="font-caption-2 line-clamp-1">{memo}</p>}
        </div>
      </div>
    </button>
  );
}
