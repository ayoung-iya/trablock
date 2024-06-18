import { Category, CommonBlockDetailData } from '@/components/modal/modalList/type';

export const DEFAULT_CATEGORY = '숙소';
export const CATEGORY_LIST: Category[] = ['숙소', '식당', '관광지', '액티비티', '교통', '기타'];
export const CATEGORY: { [key: string]: string } = {
  숙소: '숙소',
  식당: '식당',
  관광지: '관광지',
  액티비티: '액티비티',
  교통: '교통',
  기타: '기타'
};

export const DEFAULT_BLOCK_DATA: CommonBlockDetailData = {
  category: DEFAULT_CATEGORY,
  name: '',
  startAt: '',
  endAt: '',
  budget: '0 KRW',
  memo: ''
};
