export interface CityInfo {
  placeId: string;
  address: string;
  city: string;
}

export interface ArticleFormData {
  title: string;
  location: CityInfo[];
  date: { from: Date; to: Date };
  expense?: number;
  travelCompanion: string;
  travelStyle: string[];
}

export interface ArticleRequestFormData {
  title: string;
  location: string[];
  start_at: Date;
  end_at: Date;
  // location: { place_id: string; address: string; city: string }[];
  // start_at: string;
  // end_at: string;
  expense?: string;
  travel_companion: string;
  style?: string[];
}
