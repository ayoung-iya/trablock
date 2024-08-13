import { CustomError } from '@/apis/interceptors/customError.type';

export interface SearchResultContentData {
  article_id: number;
  title: string;
  locations: {
    place_id: string;
    address: string;
    city: string;
  }[];
  start_at: string;
  end_at: string;
  expense: string;
  profile_img_url: string;
  cover_img_url: string;
  travel_companion: string;
  travel_styles: string[];
  name: string;
  bookmark_count: number;
  is_bookmarked: boolean;
  is_editable: boolean;
}

export interface SearchResultData {
  total_elements: number;
  total_pages: number;
  size: number;
  content: SearchResultContentData[];
  number: number;
  sort: {
    empty: boolean;
    sorted: boolean;
    unsorted: boolean;
  };
  number_of_elements: number;
  pageable: {
    offset: number;
    sort: {
      empty: boolean;
      sorted: boolean;
      unsorted: boolean;
    };
    paged: boolean;
    page_number: number;
    page_size: number;
    unpaged: boolean;
  };
  first: boolean;
  last: boolean;
  empty: boolean;
}

export interface SearchResponse {
  data: SearchResultData;
  error: CustomError;
}
