import ARTICLE_SERVICE from '@/apis/useArticle/fetch';
import { formatBannerArticle } from '@/apis/utils/formatArticleData';
import TravelDetailCard from '@/components/card/TravelDetailCard';
import NotificationMessage from '@/components/common/NotificationMessage';

export default async function BannerLikeArticleList() {
  // 좋아요순 (일주일)
  let articles = [];

  try {
    const data = await ARTICLE_SERVICE.getLikeArticles();
    articles = formatBannerArticle(data);
  } catch {
    return <NotificationMessage>요청사항을 처리하는데 실패했습니다.</NotificationMessage>;
  }

  if (articles.length === 0) {
    return <NotificationMessage>적절한 여행 게획이 없습니다.</NotificationMessage>;
  }

  return (
    <ul className="mt-5 flex flex-wrap gap-[18px] md:gap-5">
      {articles?.map((article) => <TravelDetailCard key={article.articleId} {...article} />)}
    </ul>
  );
}
