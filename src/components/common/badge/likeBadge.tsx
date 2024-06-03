import React from 'react';

interface LikeBadgeProps {
  count: number;
}

export default function LikeBadge({ count }: LikeBadgeProps) {
  return (
    <div>
      {/* 하트 아이콘 추후 추가 */}
      {count}
    </div>
  );
}
