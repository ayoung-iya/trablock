interface RawDataDateAndExpense {
  startAt: string;
  endAt: string;
  expense?: string;
}

interface ImageURL {
  profileImgUrl?: string;
  coverImgUrl?: string;
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

export interface ArticleInfo extends ArticleInitial {
  name: string;
  bookmarkCount: number;
  isBookmarked: boolean;
  isEditable: boolean;
}

export interface ArticleInitialRawData extends Omit<ArticleInitial, 'date' | 'expense'>, RawDataDateAndExpense {}
export interface ArticleInfoRawData extends Omit<ArticleInfo, 'date' | 'expense'>, RawDataDateAndExpense {}
export interface ArticleThumbnailRawData
  extends Omit<ArticleInfo, 'date' | 'expense'>,
    articleId,
    ImageURL,
    RawDataDateAndExpense {}
export interface Article extends articleId, ArticleInfo {}
export interface ArticleRawData extends articleId, ArticleThumbnailRawData {}
