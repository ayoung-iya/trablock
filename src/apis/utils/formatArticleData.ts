import type { Article, InitialArticle, InitialArticleRawData } from '@/apis/useArticle/article.type';
import { dateRequestFormat } from '@/libs/utils/dateFormatter';
import { changeKeysToSnakeCase } from '@/libs/utils/snakeToCamel';

export const formatArticleInitialForRequest = ({
  title,
  locations,
  date,
  expense,
  travelCompanion,
  travelStyles
}: InitialArticle) => {
  const formatData: InitialArticleRawData = {
    title,
    locations,
    startAt: dateRequestFormat(date.from),
    endAt: dateRequestFormat(date.to),
    travelCompanion
  };

  if (expense) {
    formatData.expense = String(expense);
  }

  if (travelStyles.length) {
    formatData.travelStyles = travelStyles;
  }

  return changeKeysToSnakeCase(formatData);
};

export const formatArticleInitialForUse = ({
  title,
  locations,
  startAt,
  endAt,
  travelCompanion,
  travelStyles = [],
  expense
}: Omit<Article, 'articleId' | 'profileImgUrl'>) => {
  const formatData: InitialArticle = {
    title,
    locations,
    travelCompanion,
    date: {
      from: new Date(startAt),
      to: new Date(endAt)
    },
    travelStyles
  };

  if (expense) {
    formatData.expense = Number(expense);
  }

  return formatData;
};
