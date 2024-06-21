import React from 'react';

import { CoreBlockProps } from '@/components/travelBlock/CoreBlock';
import PlanBlock from '@/components/travelBlock/PlanBlock';
import TransportBlock from '@/components/travelBlock/TransportBlock';

export default function TravelBlock({ ...blockProps }: CoreBlockProps) {
  const { category } = blockProps;

  if (category === '기타') return <TransportBlock {...(blockProps as CoreBlockProps)} />;

  if (category === '교통') return <TransportBlock {...(blockProps as CoreBlockProps)} />;

  return <PlanBlock {...(blockProps as CoreBlockProps)} />;
}
