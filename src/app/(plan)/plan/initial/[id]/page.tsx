import type { Metadata } from 'next';

import ArticleService from '@/apis/useArticle/fetch';
import { formatArticleDataForUse } from '@/apis/utils/formatArticleInitialData';
import PlanInitialForm from '@/components/PlanInitialForm';
import { PAGE_TITLES } from '@/libs/constants/title';

export const metadata: Metadata = {
  title: PAGE_TITLES.modifyInitialPlan
};

async function Plan({ params }: { params: { id: string } }) {
  const articleData = await ArticleService.getArticle(params.id);

  return <PlanInitialForm articlePageId={params.id} articleData={formatArticleDataForUse(articleData)} />;
}

export default Plan;
