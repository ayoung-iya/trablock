export const PROFILE_CONTENT_TAB_LIST = ['plan', 'review', 'bookmark'] as const;

export const PROFILE_CONTENT_LABEL_LIST = {
  plan: '여행 계획',
  review: '여행 후기',
  bookmark: '북마크'
} as const;

export type ProfileContentTab = (typeof PROFILE_CONTENT_TAB_LIST)[number];
