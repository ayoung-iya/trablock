'use client';

import useGetUserArticles from '@/apis/useArticle/useGetUserArticles';
import { formatArticleData } from '@/apis/utils/formatArticleData';
import TravelDetailCard from '@/components/card/TravelDetailCard';
import NotificationMessage from '@/components/common/NotificationMessage';
import useIntersectingState from '@/libs/hooks/useIntersectingState';

const EMPTY_MESSAGE = '작성한 여행 계획이 없습니다.';

export default function PlanList({ userId }: { userId: string }) {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useGetUserArticles({ userId });
  const ref = useIntersectingState<HTMLLIElement>((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting && !isFetchingNextPage) {
        fetchNextPage();
      }
    });
  });
  const articles = formatArticleData(data?.pages.flat() || []);

  if (!articles.length) {
    <NotificationMessage>{EMPTY_MESSAGE}</NotificationMessage>;
  }

  return (
    <ul className="flex flex-wrap gap-[18px] md:gap-5">
      {articles?.map(({ articleId, ...rest }) => <TravelDetailCard key={articleId} articleId={articleId} {...rest} />)}
      {hasNextPage && <li className="h-20 w-full" ref={ref} />}
    </ul>
  );
}
