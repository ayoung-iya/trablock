import Head from 'next/head';

import serviceSchedule from '@/apis/useScheduleService/fetch';
import PlanDetailContent from '@/app/(plan)/plan/detail/[id]/PlanDetailContent';
import { getDayNum } from '@/libs/utils/dateChanger';

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
  const tripPeriod = getDayNum(initPlanDetail.end_at, initPlanDetail.start_at, initPlanDetail.end_at);
  const locations = initPlanDetail.locations.map(({ city }: { city: string }) => city).join(', ');

  return (
    <>
      <Head>
        <title>{initPlanDetail.title} - 트래블록</title>
        <meta name="description" content={`${tripPeriod - 1}박 ${tripPeriod}일 ${locations} 여행`} />
      </Head>

      <PlanDetailContent planDetail={initPlanDetail} initList={initScheduleList} />
    </>
  );
}
