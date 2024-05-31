import React from 'react';

import CoreBlock, { DefaultBlockProps } from '@/components/travelBlock/CoreBlock';
import { addNumberCommas } from '@/libs/utils/moneyFormatter';

/**
 * 예산 블록입니다.
 * @param name string; 이름
 * @param tag string; 태그
 * @param symbol string; 통화
 * @param money string; 금액
 */
export interface BudgetBlockProps extends DefaultBlockProps {
  symbol: string;
  money: string;
}

/**
 * 예산 블록입니다.
 * @param name string; 이름
 * @param tag string; 태그
 * @param symbol string; 통화
 * @param money string; 금액
 */
export default function BudgetBlock({ name, tag, symbol, money, onClick }: BudgetBlockProps) {
  const currSymbol: { [key: string]: string } = {
    KRW: '₩',
    USD: '$'
  };

  const formattedMoney = addNumberCommas(money);

  return (
    <CoreBlock name={name} tag={tag} onClick={onClick}>
      <div className="flex-row-center gap-2">
        {currSymbol[symbol]} {formattedMoney}
      </div>
    </CoreBlock>
  );
}
