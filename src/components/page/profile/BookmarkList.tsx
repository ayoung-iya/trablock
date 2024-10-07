'use client';

import useGetUserBookmarks from '@/apis/bookmark/useGetUserBookmarks';
import TravelDetailCard from '@/components/card/TravelDetailCard';
import NotificationMessage from '@/components/common/NotificationMessage';
import useIntersectingState from '@/libs/hooks/useIntersectingState';

const EMPTY_MESSAGE = '북마크한 여행 정보가 없습니다.';

export default function BookmarkList({ userId }: { userId: string }) {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useGetUserBookmarks({ userId });
  const ref = useIntersectingState<HTMLLIElement>((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting && !isFetchingNextPage) {
        fetchNextPage();
      }
    });
  });
  const articles = data?.pages.flat() || [];

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
