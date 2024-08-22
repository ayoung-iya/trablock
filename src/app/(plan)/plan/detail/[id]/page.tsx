import type { Metadata } from 'next';

import serviceSchedule from '@/apis/useScheduleService/fetch';
import PlanDetailContent from '@/app/(plan)/plan/detail/[id]/PlanDetailContent';
import { PAGE_DESCRIPTIONS, PAGE_TITLES } from '@/libs/constants/title';
import { getDayNum } from '@/libs/utils/dateChanger';

type PageProps = {
  params: {
    id: string;
  };
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = params;
  const { title, end_at: endAt, start_at: startAt, locations } = await serviceSchedule.getSchedulesPlanDetail(+id);
  const tripPeriod = getDayNum(endAt, startAt, endAt);
  const locationsToString = locations.map(({ city }: { city: string }) => city).join(', ');

  return {
    title: PAGE_TITLES.planDetail(title),
    description: PAGE_DESCRIPTIONS.planDetail(tripPeriod, locationsToString)
  };
}

export default async function PlanDetailIdPage({ params }: PageProps) {
  // fetch data
  const articleId = Number(params.id);
  const initPlanDetail = await serviceSchedule.getSchedulesPlanDetail(articleId);
  const initScheduleList = await serviceSchedule.getSchedules(articleId);

  return <PlanDetailContent planDetail={initPlanDetail} initList={initScheduleList} />;
}
