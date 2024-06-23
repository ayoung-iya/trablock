export interface Article {
  article_id: number;
  title: string;
  location: {
    place_id: string;
    address: string;
    city: string;
  }[];
  start_at: string;
  end_at: string;
  expense: string | null;
  profile_image_url: string;
  cover_image_url: string | null;
  travel_companion: string;
  travel_styles: string[];
  name: string;
  bookmark_count: number;
  is_bookmarked: boolean;
  is_editable?: boolean;
}

export interface ArticlesResponse {
  content: Article[];
  pageable: {
    page_number: number;
    page_size: number;
  };
  total_elements: number;
  total_pages: number;
  last: boolean;
  size: number;
  number: number;
  first: boolean;
  empty: boolean;
}
