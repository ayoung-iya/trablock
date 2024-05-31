/* eslint-disable max-len */

import { BudgetBlockProps } from '@/components/travelBlock/BudgetBlock';
import CoreBlock from '@/components/travelBlock/CoreBlock';
import { PlanBlockProps } from '@/components/travelBlock/PlanBlock';
import { TransportBlockProps } from '@/components/travelBlock/TransportBlock';
import TravelBlock from '@/components/travelBlock/TravelBlock';

export default function Jinho() {
  // TravelBlock에 사용할 데이터
  const blockProps: { plan: PlanBlockProps; transport: TransportBlockProps; budget: BudgetBlockProps } = {
    plan: {
      name: 'PlanBlock',
      tag: '태그',
      memo: '메모입니다.',
      imageUrl: 'https://picsum.photos/600/600'
    },
    transport: {
      name: 'TransportBlock',
      tag: 'subway',
      route: { start: '출발지', end: '도착지' },
      memo: '메모입니다.'
    },
    budget: {
      name: 'BudgetBlock',
      tag: '태그',
      symbol: 'USD',
      money: '1000000.000183'
    }
  };

  return (
    <div className="flex flex-col gap-4 p-8">
      {/* CoreBlock 구성 요소 예시 */}
      <CoreBlock name="CoreBlock" tag="태그" route={{ start: '출발지', end: '도착지' }} memo="메모입니다.">
        <div>추가 요소</div>
      </CoreBlock>
      {/* TravelBlock 사용 예시 */}
      <TravelBlock type="plan" blockProps={blockProps.plan} />
      <TravelBlock type="transport" blockProps={blockProps.transport} />
      <TravelBlock type="budget" blockProps={blockProps.budget} />
    </div>
  );
}
