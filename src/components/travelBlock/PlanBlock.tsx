import React from 'react';

import Image from 'next/image';

import CoreBlock from '@/components/travelBlock/CoreBlock';

export interface PlanBlockProps extends React.HTMLAttributes<HTMLButtonElement> {
  name: string;
  tag: string;
  memo?: string;
  imageUrl?: string;
}

export default function PlanBlock({ name, tag, memo, imageUrl, onClick }: PlanBlockProps) {
  return (
    <CoreBlock name={name} tag={tag} memo={memo} onClick={onClick}>
      {/* 이미지 크기 조절하기 */}
      {imageUrl && (
        <div className="h-full max-w-36 overflow-hidden">
          <Image
            src={imageUrl}
            alt={imageUrl}
            width={144 * 4}
            height={144 * 4}
            className="h-full w-full object-cover"
          />
        </div>
      )}
    </CoreBlock>
  );
}
