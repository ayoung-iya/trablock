import Head from 'next/head';
import { redirect } from 'next/navigation';

import ArticleService from '@/apis/useArticle/fetch';
import PlanInitialForm from '@/components/PlanInitialForm';

async function Plan({ params }: { params: { id: string } }) {
  const articleData = await ArticleService.getArticle(params.id);

  if (!articleData.isEditable) {
    redirect('/plan/initial');
  }

  return (
    <>
      <Head>
        <title>여행 계획 수정하기 - 트래블록</title>
      </Head>
      <PlanInitialForm articlePageId={params.id} articleData={articleData} />
    </>
  );
}

export default Plan;
