/* eslint-disable no-undef */

export type Category = '숙소' | '식당' | '관광지' | '액티비티' | '교통' | '기타';
export type Transport = '자동차' | '도보' | '자전거' | '대중교통';

// 장소 선택 함수 타입
export type OnPlaceSelectProps = {
  category: Category;
  place: google.maps.places.PlaceResult;
};
export type OnPlaceSelect = ({ category, place }: OnPlaceSelectProps) => void;

export type OnTransportSelectProps = {
  category: Category;
  transport: Transport;
  place: google.maps.places.PlaceResult;
  secondPlace: google.maps.places.PlaceResult;
};
export type OnTransportSelect = ({ category, transport, place, secondPlace }: OnTransportSelectProps) => void;

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

// 일정 상세 - 공통
export type CommonBlockDetailData = {
  category: Category;
  name: string;
  startAt: string;
  duration: string;
  budget: string;
  memo?: string;
};

// 일정 상세 - 숙소, 식당, 관광지, 액티비티
// placeId -> location, address, phone, homepage, photos[0,1,2]
// place api에서 가져온 이미지 url이 일시적이기 때문에 어차피 한 번 호출해야 함
// 그러면 호출할 때 가져올 수 있는 모든 정보를 활용해서 백엔드 데이터를 아끼는 게 좋음
export type PlaceBlockDetailData = CommonBlockDetailData & {
  placeId: string;
};

// 일정 상세 - 교통
export type TransportBlockDetailData = CommonBlockDetailData & {
  transport: Transport;
  placeId: string;
  secondPlaceId: string;
};

// 일정 상세 - 기타
export type EtcBlockDetailData = CommonBlockDetailData;

// 일정 상세 편집 타입
export type OnBlockDetailEditProps = {
  startAt: string;
  duration: string;
  budget: string;
  memo?: string;
};
export type OnBlockDetailEdit = ({ startAt, duration, budget, memo }: OnBlockDetailEditProps) => void;
