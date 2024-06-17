/* eslint-disable no-undef */

export type Category = '숙소' | '식당' | '관광지' | '액티비티' | '교통' | '기타';

export type Transport = '자동차' | '도보' | '자전거' | '대중교통';

// 장소 선택 함수 타입
export type OnPlaceSelectProps = { category: Category; place: google.maps.places.PlaceResult };
export type OnPlaceSelect = ({ category, place }: OnPlaceSelectProps) => void;

export type OnTransportSelectProps = {
  category: Category;
  transport: Transport;
  firstPlace: google.maps.places.PlaceResult;
  secondPlace: google.maps.places.PlaceResult;
};
export type OnTransportSelect = ({ category, transport, firstPlace, secondPlace }: OnTransportSelectProps) => void;

export type OnEtcSelectProps = { category: Category; name: string };
export type OnEtcSelect = ({ category, name }: OnEtcSelectProps) => void;

// 블록 데이터 타입
export type DefaultCreatedBlockData = {
  category: Category;
  place: null;
};

export type CreatedBlockData = OnPlaceSelectProps;

export type CreateTransportBlockData = OnTransportSelectProps;

export type CreateEtcBlockData = OnEtcSelectProps;
