import React from 'react';

import CATEGORY from '@/libs/constants/BlockCategories';

interface BlockBadgeProps {
  variant: 'spot' | 'restaurant' | 'traffic' | 'activity' | 'accommodation' | 'custom';
}

export default function BlockBadge({ variant }: BlockBadgeProps) {
  const { name, color } = CATEGORY[variant];

  return <div className={`m-1 inline-flex items-center px-3 py-1 ${color} border-2`}>{name}</div>;
}
