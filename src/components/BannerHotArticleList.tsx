import Image from 'next/image';
import Link from 'next/link';

import ARTICLE_SERVICE from '@/apis/useArticle/fetch';
import { formatBannerArticle } from '@/apis/utils/formatArticleData';
import TravelPreviewCard from '@/components/card/TravelPreviewCard';
import NotificationMessage from '@/components/common/NotificationMessage';

export default async function BannerHotArticleList() {
  // 조회 수 기준 (1시간)
  let articles = [];

  try {
    const data = await ARTICLE_SERVICE.getHotArticles();
    articles = formatBannerArticle(data);
  } catch {
    return <NotificationMessage>요청사항을 처리하는데 실패했습니다.</NotificationMessage>;
  }

  if (articles.length === 0) {
    return <NotificationMessage>적절한 여행 게획이 없습니다.</NotificationMessage>;
  }

  return (
    <ul className="scrollbar-custom grid gap-[18px] sm:grid-cols-2 lg:flex lg:overflow-x-scroll">
      {articles?.map(({ articleId, title, cities, profileImgUrl, name, coverImgUrl }) => (
        <li key={articleId}>
          <Link href={`/plan/detail/${articleId}`}>
            <TravelPreviewCard>
              {coverImgUrl && <Image src={coverImgUrl} alt="대표 이미지" fill style={{ objectFit: 'cover' }} />}
              <div className="absolute bottom-4 left-4 z-10 flex flex-col gap-3">
                <div className="flex flex-col gap-1">
                  <TravelPreviewCard.Title>{title}</TravelPreviewCard.Title>
                  <TravelPreviewCard.Info>{cities.join(', ')}</TravelPreviewCard.Info>
                </div>
                <TravelPreviewCard.Profile profileImgUrl={profileImgUrl} name={name} />
              </div>
            </TravelPreviewCard>
          </Link>
        </li>
      ))}
    </ul>
  );
}
