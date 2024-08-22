import type { Metadata } from 'next';
import { redirect } from 'next/navigation';

import ArticleService from '@/apis/useArticle/fetch';
import PlanInitialForm from '@/components/PlanInitialForm';
import { PAGE_TITLES } from '@/libs/constants/title';

export const metadata: Metadata = {
  title: PAGE_TITLES.modifyInitialPlan
};

async function Plan({ params }: { params: { id: string } }) {
  const articleData = await ArticleService.getArticle(params.id);

  if (!articleData.isEditable) {
    redirect('/plan/initial');
  }

  return <PlanInitialForm articlePageId={params.id} articleData={articleData} />;
}

export default Plan;
