import { Category, Transport } from '@/components/modal/modalList/type';

export type Location = {
  place_id: string;
  address: string;
  city: string;
};

// 여행 계획 정보
export type PlanDetail = {
  title: string;
  location: Location[];
  start_at: string; // yyyy-MM-dd
  end_at: string; // yyyy-MM-dd
  travel_companion: string;
  travel_style: string[];
  name: string;
  bookmark_count: number;
  is_bookmarked: boolean;
};

export type ScheduleGeneral = {
  place_name: string;
  google_map_place_id: string; // 수정
  google_map_latitude: number;
  google_map_longitude: number;
  google_map_address: string;
  google_map_phone_number: string;
  google_map_home_page_url: string;
};

export type ScheduleTransport = {
  transportation: Transport;
  start_place_name: string;
  google_map_start_place_address: string;
  google_map_start_latitude: number;
  google_map_start_longitude: number;
  end_place_name: string;
  google_map_end_place_address: string;
  google_map_end_latitude: number;
  google_map_end_longitude: number;
};

export type ScheduleEtc = {
  place_name: string;
};

export type Dtype = 'GENERAL' | 'TRANSPORT' | 'ETC';

// 일정 블록 상세
export type Schedule = {
  id?: number;
  visited_date: string; // yyyy-MM-dd
  visited_time: string; // hh:mm
  duration_time: string; // hh:mm / 수정
  expense: string; // 12,000 KRW / 수정
  memo?: string; // 수정
  sort_order: number;
  category: Category;
  dtype: Dtype;
  schedule_general: ScheduleGeneral | null;
  schedule_transport: ScheduleTransport | null;
  schedule_etc: ScheduleEtc | null;
};

// 일정 블록 리스트
export type ScheduleList = {
  schedules: Schedule[];
};
