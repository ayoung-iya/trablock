import { useEffect } from 'react';

import useIntersectingState from '@/libs/hooks/useIntersectingState';

export default function CardList() {
  const [isIntersecting, observerRef] = useIntersectingState<HTMLDivElement>();
  const cardList: object[] = []; // 미리 한 페이지 fetching 한 데이터
  useEffect(() => {
    if (!isIntersecting || cardList === undefined) return;
    console.log('다음 페이지 fetching');
    // 다음 페이지 fetching
  }, [isIntersecting]);
  return (
    <>
      {/* <Card /> */}
      <div ref={observerRef} />
    </>
  );
}
