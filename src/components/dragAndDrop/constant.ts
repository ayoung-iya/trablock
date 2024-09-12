import { Schedule } from '@/apis/useArticle/article.type';

// Schedule 블록 추가 시 초기 데이터
const INIT_SCHEDULE_DATA: Omit<Schedule, 'scheduleId'> = {
  visitedDate: '',
  visitedTime: '00:00',
  durationTime: '00:00',
  expense: '0 KRW',
  sortOrder: 0,
  category: '숙소',
  memo: '',
  dtype: 'GENERAL',
  scheduleGeneral: undefined,
  scheduleTransport: undefined,
  scheduleEtc: undefined
};

export default INIT_SCHEDULE_DATA;
