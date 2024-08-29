interface RawDataDateAndExpense {
  startAt: string;
  endAt: string;
  expense?: string;
}

export interface articleId {
  articleId: number;
}

export interface CityInfo {
  placeId: string;
  address: string;
  city: string;
}

export interface ArticleInitial {
  title: string;
  locations: CityInfo[];
  date: { from: Date; to: Date };
  expense?: number;
  travelCompanion: string;
  travelStyles?: string[];
}

export interface ArticleThumbnail extends ArticleInitial {
  name: string;
  bookmarkCount: number;
  isBookmarked: boolean;
  isEditable: boolean;
}

export interface ArticleInitialRawData extends Omit<ArticleInitial, 'date' | 'expense'>, RawDataDateAndExpense {}
export interface ArticleThumbnailRawData extends Omit<ArticleThumbnail, 'date' | 'expense'>, RawDataDateAndExpense {}
export interface Article extends articleId, ArticleThumbnail {}
export interface ArticleRawData extends articleId, ArticleThumbnailRawData {}
