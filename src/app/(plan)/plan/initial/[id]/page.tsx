import { redirect } from 'next/navigation';

import ArticleService from '@/apis/useArticle/fetch';
import PlanInitialForm from '@/components/PlanInitialForm';

async function Plan({ params }: { params: { id: string } }) {
  const articleData = await ArticleService.getArticle(params.id);

  if (!articleData.isEditable) {
    redirect('/plan/initial');
  }

  return <PlanInitialForm articlePageId={params.id} articleData={articleData} />;
}

export default Plan;
