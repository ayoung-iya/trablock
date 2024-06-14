import React from 'react';

// 블럭 카테고리 상수
const CATEGORY = {
  spot: { name: '관광지', color: 'bg-blue-200 text-black border-blue-500' },
  restaurant: { name: '식당', color: 'bg-red-200 text-black border-red-500' },
  traffic: { name: '교통', color: 'bg-yellow-200 text-black border-yellow-500' },
  activity: { name: '엑티비티', color: 'bg-purple-500 text-white border-purple-700' },
  accommodation: { name: '숙소', color: 'bg-green-200 text-black border-green-500' },
  custom: { name: '기타', color: 'bg-gray-200 text-black border-gray-500' }
};

interface BlockBadgeProps {
  type?: 'spot' | 'restaurant' | 'traffic' | 'activity' | 'accommodation' | 'custom';
  className?: string;
}

export default function BlockBadge({ type, className }: BlockBadgeProps) {
  const baseStyle = ' ';
  const { name, color } = type ? CATEGORY[type] : { name: '', color: '' };
  const finalClassName = type ? `${baseStyle} ${color}` : `${baseStyle} ${className}`;

  return <div className={finalClassName}>{name}</div>;
}
