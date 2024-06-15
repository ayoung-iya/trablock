/* eslint-disable no-undef */

export type Category = '숙소' | '식당' | '관광지' | '액티비티' | '교통' | '기타';

// 블록 데이터 타입
export type CreatedBlockData = {
  category: Category;
  place: google.maps.places.PlaceResult | null;
};

export type CreateTransportBlockData = {
  category: Category;
  firstPlace: google.maps.places.PlaceResult;
  secondPlace: google.maps.places.PlaceResult;
};

export type CreateEtcBlockData = {
  category: Category;
  name: string;
};

// 장소 선택 함수 타입
export type OnPlaceSelectProps = { category: Category; place: google.maps.places.PlaceResult };
export type OnPlaceSelect = ({ category, place }: OnPlaceSelectProps) => void;

export type OnTransportSelectProps = {
  category: Category;
  firstPlace: google.maps.places.PlaceResult;
  secondPlace: google.maps.places.PlaceResult;
};
export type OnTransportSelect = ({ category, firstPlace, secondPlace }: OnTransportSelectProps) => void;

export type OnEtcSelectProps = { category: Category; name: string };
export type OnEtcSelect = ({ category, name }: OnEtcSelectProps) => void;
