import type { Metadata } from 'next';

import PlanInitialForm from '@/components/PlanInitialForm';
import { PAGE_TITLES } from '@/libs/constants/title';

export const metadata: Metadata = {
  title: PAGE_TITLES.createInitialPlan
};

function Plan() {
  return <PlanInitialForm />;
}

export default Plan;
