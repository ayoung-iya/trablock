import React from 'react';

interface LikeBadgeProps {
  count: number;
}

export default function LikeBadge({ count }: LikeBadgeProps) {
  return (
    <div>
      {/* 하트 이모지 또는 이미지 추후 추가 */}
      {count}
    </div>
  );
}
