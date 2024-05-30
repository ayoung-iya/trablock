import React from 'react';

import Image from 'next/image';

import CoreBlock from '@/components/travelBlock/CoreBlock';

/**
 * 숙소, 관광지, 식당, 액티비티, 기타 등의 블록입니다.
 * @param name string; 이름
 * @param tag string; 태그
 * @param memo string; (optional) 메모
 * @param imageUrl string; (optional) 이미지 주소
 */
export interface PlanBlockProps extends React.HTMLAttributes<HTMLButtonElement> {
  name: string;
  tag: string;
  memo?: string;
  imageUrl?: string;
}

/**
 * 숙소, 관광지, 식당, 액티비티, 기타 등의 블록입니다.
 * @param name string; 이름
 * @param tag string; 태그
 * @param memo string; (optional) 메모
 * @param imageUrl string; (optional) 이미지 주소
 */
export default function PlanBlock({ name, tag, memo, imageUrl, onClick }: PlanBlockProps) {
  return (
    <CoreBlock name={name} tag={tag} memo={memo} onClick={onClick}>
      {/* 이미지 크기 조절하기 */}
      {imageUrl && (
        <div className="h-full max-w-36 overflow-hidden">
          <Image src={imageUrl} alt={imageUrl} width={144 * 4} height={144 * 4} className="image-cover" />
        </div>
      )}
    </CoreBlock>
  );
}
