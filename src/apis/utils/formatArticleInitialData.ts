/* eslint-disable camelcase */
import { dateRequestFormat } from '@/libs/utils/dateFormatter';

import { ArticleFormData, ArticleRequestFormData } from '../useArticle/article.type';

export const formatArticleInitialDataForRequest = ({
  title,
  location,
  date,
  expense,
  travelCompanion,
  travelStyle
}: ArticleFormData) => {
  const formatData: ArticleRequestFormData = {
    title,
    location: location.map(({ placeId, address, city }) => ({ place_id: placeId, address, city })),
    start_at: dateRequestFormat(date.from),
    end_at: dateRequestFormat(date.to),
    travel_companion: travelCompanion
  };

  if (expense) {
    formatData.expense = String(expense);
  }

  if (travelStyle.length) {
    formatData.style = travelStyle;
  }

  return formatData;
};

export const formatArticleInitialDataFromResponse = ({
  title,
  location,
  start_at,
  end_at,
  travel_companion,
  travel_style,
  expense
}: ArticleRequestFormData) => {
  const formatData: ArticleFormData = {
    title,
    location: location.map(({ place_id, address, city }) => ({ placeId: place_id, address, city })),
    date: {
      from: new Date(start_at),
      to: new Date(end_at)
    },
    travelCompanion: travel_companion,
    travelStyle: travel_style || []
  };

  if (expense) {
    formatData.expense = Number(expense);
  }

  return formatData;
};
