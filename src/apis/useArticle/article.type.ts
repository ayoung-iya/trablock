export interface articleID {
  article_id: number;
}

export interface CityInfoSnakeCase {
  place_id: string;
  address: string;
  city: string;
}

export interface CityInfoCamelCase {
  placeId: string;
  address: string;
  city: string;
}

export interface ArticleInitialSnakeCase {
  title: string;
  locations: CityInfoSnakeCase[];
  start_at: string;
  end_at: string;
  expense?: string;
  travel_companion: string;
  travel_styles?: string[];
}

export interface ArticleInitialCamelCase {
  title: string;
  locations: CityInfoCamelCase[];
  date: { from: Date; to: Date };
  expense?: number;
  travelCompanion: string;
  travelStyles: string[];
}

export interface ArticleThumbnailSnakeCase extends ArticleInitialSnakeCase {
  name: string;
  bookmark_count: number;
  is_bookmarked: boolean;
  is_editable: boolean;
}

export interface ArticleThumbnailCamelCase extends ArticleInitialCamelCase {
  name: string;
  bookmarkCount: number;
  isBookmarked: boolean;
  isEditable: boolean;
}
