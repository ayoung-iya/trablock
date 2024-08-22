import Head from 'next/head';

import PlanInitialForm from '@/components/PlanInitialForm';

function Plan() {
  return (
    <>
      <Head>
        <title>여행 계획 생성하기 - 트래블록</title>
      </Head>
      <PlanInitialForm />
    </>
  );
}

export default Plan;
