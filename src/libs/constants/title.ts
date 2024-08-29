const APP_NAME = '트래블록';

export const PAGE_TITLES = Object.freeze({
  default: APP_NAME,
  login: `로그인 - ${APP_NAME}`,
  signup: `회원가입 - ${APP_NAME}`,
  createInitialPlan: `여행 계획 생성하기 - ${APP_NAME}`,
  modifyInitialPlan: `여행 계획 수정하기 - ${APP_NAME}`,
  planDetail: (title: string) => `${title} - ${APP_NAME}`,
  search: (keyword: string) => `"${keyword}" 검색 결과 - ${APP_NAME}`
});

export const PAGE_DESCRIPTIONS = Object.freeze({
  default: '소중한 여행 계획, 트래블록으로 완성하세요',
  planDetail: (tripPeriod: number, locations: string) => `${tripPeriod - 1}박 ${tripPeriod}일 ${locations} 여행`
});
