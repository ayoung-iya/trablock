import type { Metadata } from 'next';
import { headers } from 'next/headers';

import API_URL from '@/apis/constants/url';
import ARTICLE_SERVICE from '@/apis/useArticle/fetch';
import PlanDetailContent from '@/app/(plan)/plan/detail/[id]/PlanDetailContent';
import { PAGE_DESCRIPTIONS, PAGE_TITLES } from '@/libs/constants/title';
import { getDayNum } from '@/libs/utils/dateChanger';

type PageProps = {
  params: {
    id: string;
  };
};

export async function generateMetadata({ params: { id } }: PageProps): Promise<Metadata> {
  const { title, endAt, startAt, locations } = await ARTICLE_SERVICE.getArticle(id);
  const tripPeriod = getDayNum(endAt, startAt, endAt);
  const locationsToString = locations.map(({ city }: { city: string }) => city).join(', ');

  return {
    title: PAGE_TITLES.planDetail(title),
    description: PAGE_DESCRIPTIONS.planDetail(tripPeriod, locationsToString)
  };
}

export default async function PlanDetailIdPage({ params: { id } }: PageProps) {
  const userAgent = headers().get('user-agent') || '';
  const isMobile = /mobile/i.test(userAgent);
  // fetch data
  const initPlanDetail = await ARTICLE_SERVICE.getArticle(id);
  const initScheduleList = await ARTICLE_SERVICE.getSchedules(id);
  const firstPlaceGeocoding = await (
    await fetch(`${API_URL.APP_BASE_URL}api/googleGeocoding/${initPlanDetail.locations[0].placeId}`)
  ).json();

  return (
    <PlanDetailContent
      articleId={id}
      initialPlanDetail={initPlanDetail}
      initialScheduleList={initScheduleList}
      isDesktopInitSize={!isMobile}
      firstPlaceGeocoding={firstPlaceGeocoding}
    />
  );
}
