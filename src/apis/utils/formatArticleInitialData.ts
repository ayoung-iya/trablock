import type { ArticleInitial, ArticleInitialRawData } from '@/apis/useArticle/article.type';
import { dateRequestFormat } from '@/libs/utils/dateFormatter';
import { changeKeysToSnakeCase } from '@/libs/utils/snakeToCamel';

export const formatArticleDataForRequest = ({
  title,
  locations,
  date,
  expense,
  travelCompanion,
  travelStyles
}: ArticleInitial) => {
  const formatData: ArticleInitialRawData = {
    title,
    locations,
    startAt: dateRequestFormat(date.from),
    endAt: dateRequestFormat(date.to),
    travelCompanion
  };

  if (expense) {
    formatData.expense = String(expense);
  }

  if (travelStyles?.length) {
    formatData.travelStyles = travelStyles;
  }

  return changeKeysToSnakeCase(formatData);
};

export const formatArticleDataForUse = ({
  title,
  locations,
  startAt,
  endAt,
  travelCompanion,
  travelStyles,
  expense
}: ArticleInitialRawData) => {
  const formatData: ArticleInitial = {
    title,
    locations,
    travelCompanion,
    date: {
      from: new Date(startAt),
      to: new Date(endAt)
    },
    travelStyles: travelStyles || []
  };

  if (expense) {
    formatData.expense = Number(expense);
  }

  return formatData;
};
