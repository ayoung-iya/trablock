/* eslint-disable camelcase */
import type {
  ArticleInitialCamelCase,
  ArticleInitialSnakeCase,
  ArticleThumbnailSnakeCase
} from '@/apis/useArticle/article.type';
import { dateRequestFormat } from '@/libs/utils/dateFormatter';

export const formatArticleInitialDataToSnakeCase = ({
  title,
  locations,
  date,
  expense,
  travelCompanion,
  travelStyles
}: ArticleInitialCamelCase) => {
  const formatData: ArticleInitialSnakeCase = {
    title,
    locations: locations.map(({ placeId, address, city }) => ({ place_id: placeId, address, city })),
    start_at: dateRequestFormat(date.from),
    end_at: dateRequestFormat(date.to),
    travel_companion: travelCompanion
  };

  if (expense) {
    formatData.expense = String(expense);
  }

  if (travelStyles.length) {
    formatData.travel_styles = travelStyles;
  }

  return formatData;
};

export const formatArticleInitialDataToCamelCase = ({
  title,
  locations,
  start_at,
  end_at,
  travel_companion,
  travel_styles,
  expense
}: ArticleThumbnailSnakeCase | ArticleInitialSnakeCase) => {
  const formatData: ArticleInitialCamelCase = {
    title,
    locations: locations.map(({ place_id, address, city }) => ({ placeId: place_id, address, city })),
    date: {
      from: new Date(start_at),
      to: new Date(end_at)
    },
    travelCompanion: travel_companion,
    travelStyles: travel_styles || []
  };

  if (expense) {
    formatData.expense = Number(expense);
  }

  return formatData;
};
