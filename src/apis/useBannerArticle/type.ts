export interface Location {
  place_id: string;
  address: string;
  city: string;
}

export interface Article {
  article_id: number;
  title: string;
  location: Location[];
  start_at: string;
  end_at: string;
  expense: string | null;
  profile_image_url: string | null;
  cover_image_url: string | null;
  travel_companion: string;
  travel_styles: string[];
  name: string;
  bookmark_count: number;
  is_bookmarked: boolean;
  is_editable: boolean;
}

export type ArticlesResponse = Article[];
