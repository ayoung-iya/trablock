import BudgetBlock, { BudgetBlockProps } from '@/components/travelBlock/BudgetBlock';
import PlanBlock, { PlanBlockProps } from '@/components/travelBlock/PlanBlock';
import TransportBlock, { TransportBlockProps } from '@/components/travelBlock/TransportBlock';

interface TravelBlockProps {
  type: 'plan' | 'transport' | 'budget';
  blockProps: PlanBlockProps | TransportBlockProps | BudgetBlockProps;
}

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
