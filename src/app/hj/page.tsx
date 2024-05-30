'use client';

import React, { useState } from 'react';

import PlanBadge from '@/components/common/badge/planBadge';

export default function Hj() {
  const WHO = ['혼자', '친구와', '연인과', '배우자와', '아이와', '부모님과', '기타'];
  const [selectedBadge, setSelectedBadge] = useState<string | null>(null);

  const handleBadgeClick = (badge: string) => {
    setSelectedBadge(badge);
  };

  return (
    <div>
      {WHO.map((badge) => (
        <PlanBadge
          key={badge}
          text={badge}
          isSelected={selectedBadge === badge}
          onClick={() => handleBadgeClick(badge)}
        />
      ))}
    </div>
  );
}
