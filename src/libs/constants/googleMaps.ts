import { Coordinate } from '@/components/map/type';

// 구글맵 API
export const GOOGLE_MAPS = {
  API_KEY: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || '',
  MAP_ID: process.env.NEXT_PUBLIC_GOOGLE_MAPS_MAP_ID || ''
};

// 맵 최대 줌 레벨
export const MAX_ZOOM = 20;

export const DEFAULT_COORDINATE_LIST: Coordinate[] = [
  { lat: 37.7749, lng: -122.4194 } // 도쿄역
];
