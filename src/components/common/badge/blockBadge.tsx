import React from 'react';

interface BlockBadgeProps {
  text: string;
  bgColor: string;
  textColor: string;
  borderColor: string;
}

// 디자인이 어떻게 나올지 모르겠는데 우선 props로 해당 값을 받을 수 있도록 만들었습니다.

export default function BlockBadge({ text, bgColor, textColor, borderColor }: BlockBadgeProps) {
  return (
    <div className={`m-1 inline-flex items-center px-3 py-1 ${bgColor} ${textColor} ${borderColor} border-2`}>
      {text}
    </div>
  );
}
