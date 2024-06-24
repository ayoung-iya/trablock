import { redirect } from 'next/navigation';

import serviceSchedule from '@/apis/useScheduleService/fetch';
import PlanDetailContent from '@/app/(plan)/plan/detail/[id]/PlanDetailContent';

type PageProps = {
  params: {
    id: string;
  };
};

export default async function PlanDetailIdPage({ params }: PageProps) {
  // fetch data
  const articleId = Number(params.id);
  const initPlanDetail = await serviceSchedule.getSchedulesPlanDetail(articleId);
  const initScheduleList = await serviceSchedule.getSchedules(articleId);

  // 데이터를 가져오지 못하면 홈페이지로 이동
  if (!initScheduleList?.schedules || !initPlanDetail) redirect('/');

  return <PlanDetailContent planDetail={initPlanDetail} initList={initScheduleList} />;
}
