export interface CityInfo {
  placeId: string;
  address: string;
  city: string;
}

export interface Article {
  articleId: number;
  title: string;
  locations: CityInfo[];
  startAt: string;
  endAt: string;
  expense?: string;
  travelCompanion: string;
  travelStyles?: string[];
  profileImgUrl?: string;
  coverImgUrl?: string;
  name: string;
  bookmarkCount: number;
  isBookmarked: boolean;
  isEditable: boolean;
}

export interface InitialArticle extends Pick<Article, 'title' | 'locations' | 'travelCompanion'> {
  date: { from: Date; to: Date };
  expense?: number;
  travelStyles: string[];
}

export interface InitialArticleRawData
  extends Pick<Article, 'title' | 'locations' | 'startAt' | 'endAt' | 'expense' | 'travelCompanion' | 'travelStyles'> {
  expense?: string;
}
