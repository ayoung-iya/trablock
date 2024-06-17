import React from 'react';

/**
 * Badge 컴포넌트
 *
 * @param {string} [props.type] - 배지의 타입 ('spot', 'restaurant', 'traffic', 'activity', 'accommodation', 'custom', 'hashtag')
 * @param {string} [props.text] - 배지에 표시할 텍스트 (해시태그 또는 커스텀 텍스트)
 *
 * @example
 * <Badge type="spot" />
 * <Badge type="hashtag" text="혼자서" />
 * <Badge text="커스텀 텍스트" className="bg-block-purple-02 text-block-purple-01" />
 */

const CATEGORY = {
  spot: { name: '관광지', color: 'bg-block-purple-02 text-block-purple-01' },
  restaurant: { name: '식당', color: 'bg-block-orange-02 text-block-orange-01' },
  traffic: { name: '교통', color: 'bg-primary-02 text-primary-01' },
  activity: { name: '엑티비티', color: 'bg-block-green-02 text-block-green-01' },
  accommodation: { name: '숙소', color: 'bg-block-pink-02 text-block-pink-01' },
  custom: { name: '커스텀', color: 'bg-secondary-02 text-secondary-01' },
  hashtag: { name: '', color: 'bg-secondary-02 text-secondary-01' }
};

interface BadgeProps {
  type?: 'spot' | 'restaurant' | 'traffic' | 'activity' | 'accommodation' | 'custom' | 'hashtag';
  className?: string;
  text?: string;
}

export default function Badge({ type, className = '', text }: BadgeProps) {
  const baseStyle =
    'flex h-[1.25rem] py-[0.0625rem] px-[0.5rem] justify-center items-center gap-[0.75rem] rounded font-tag';

  const badgeInfo =
    type && type in CATEGORY
      ? { name: type === 'hashtag' ? `#${text}` : CATEGORY[type].name, color: CATEGORY[type].color }
      : { name: text || '', color: '' };

  const finalClassName = `${baseStyle} ${badgeInfo.color} ${className}`;

  return <div className={finalClassName}>{badgeInfo.name}</div>;
}
