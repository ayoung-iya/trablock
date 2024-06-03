import React from 'react';

interface PlanBadgeProps {
  text: string;
  isSelected: boolean;
  onClick: () => void;
}

export default function PlanBadge({ text, isSelected, onClick }: PlanBadgeProps) {
  // 스타일링 추후 수정
  const baseStyle = 'm-1 inline-flex cursor-pointer items-center rounded-md px-4 py-2 focus:outline-none';
  const selectedStyle = isSelected ? 'bg-gray-700 text-white' : 'bg-gray-200 text-gray-700';
  const className = `${baseStyle} ${selectedStyle}`;

  return (
    <button type="button" onClick={onClick} className={className}>
      {text}
    </button>
  );
}
