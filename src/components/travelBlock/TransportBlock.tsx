import React from 'react';

import Image from 'next/image';

import CoreBlock from '@/components/travelBlock/CoreBlock';

interface TransportBlockProps extends React.HTMLAttributes<HTMLButtonElement> {
  name: string;
  tag: string;
  route?: { start: string; end: string };
  memo?: string;
}

export default function TransportBlock({ name, tag, route, memo, onClick }: TransportBlockProps) {
  const imageUrl: { [key: string]: string } = {
    walk: 'https://picsum.photos/360/360',
    subway: 'https://picsum.photos/360/360'
  };

  return (
    <CoreBlock name={name} tag={tag} route={route} memo={memo} onClick={onClick}>
      {/* 이미지 크기 조절하기 */}
      {imageUrl && (
        <div className="h-full max-w-36 overflow-hidden">
          <Image
            src={imageUrl[tag]}
            alt={imageUrl[tag]}
            width={144 * 4}
            height={144 * 4}
            className="h-full w-full object-cover"
          />
        </div>
      )}
    </CoreBlock>
  );
}
