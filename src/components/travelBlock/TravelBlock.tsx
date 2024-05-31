import React from 'react';

import BudgetBlock, { BudgetBlockProps } from '@/components/travelBlock/BudgetBlock';
import PlanBlock, { PlanBlockProps } from '@/components/travelBlock/PlanBlock';
import TransportBlock, { TransportBlockProps } from '@/components/travelBlock/TransportBlock';

export interface TravelBlockProps {
  type: 'plan' | 'transport' | 'budget';
  blockProps: PlanBlockProps | TransportBlockProps | BudgetBlockProps;
}

/**
 * 여행 블록 컴포넌트입니다.
 * @param type 'plan' | 'transport' | 'budget'; 여행 블록 유형을 선택합니다.
 * @param blockProps PlanBlockProps | TransportBlockProps | BudgetBlockProps; 여행 블록에 전달할 데이터 객체입니다.
 */
export default function TravelBlock({ type, blockProps }: TravelBlockProps) {
  if (type === 'plan') {
    return <PlanBlock {...(blockProps as PlanBlockProps)} />;
  }

  if (type === 'transport') {
    return <TransportBlock {...(blockProps as TransportBlockProps)} />;
  }

  if (type === 'budget') {
    return <BudgetBlock {...(blockProps as BudgetBlockProps)} />;
  }
}
