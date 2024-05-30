import React from 'react';

import CoreBlock from '@/components/travelBlock/CoreBlock';
import { addNumberCommas } from '@/libs/utils/moneyFormatter';

export interface BudgetBlockProps extends React.HTMLAttributes<HTMLButtonElement> {
  name: string;
  tag: string;
  symbol: string;
  money: string;
}

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
