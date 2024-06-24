import ArticleService from '@/apis/useArticle/fetch';
import PlanInitialForm from '@/components/PlanInitialForm';

async function Plan({ params }: { params: { id: string } }) {
  const articleData = await ArticleService.getArticle(params.id);

  return <PlanInitialForm articlePageId={params.id} articleData={articleData} />;
}

export default Plan;
