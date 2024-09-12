import React from 'react';

import { Category, Transport } from '@/libs/types/commonPlanType';

export interface CityInfo {
  placeId: string;
  address: string;
  city: string;
}

export interface Article {
  articleId: number;
  title: string;
  locations: CityInfo[];
  startAt: string;
  endAt: string;
  expense?: string;
  travelCompanion: string;
  travelStyles?: string[];
  profileImgUrl?: string;
  coverImgUrl?: string;
  name: string;
  bookmarkCount: number;
  isBookmarked: boolean;
  isEditable: boolean;
}

export interface InitialArticle extends Pick<Article, 'title' | 'locations' | 'travelCompanion'> {
  date: { from: Date; to: Date };
  expense?: number;
  travelStyles: string[];
}

export interface InitialArticleRawData
  extends Pick<Article, 'title' | 'locations' | 'startAt' | 'endAt' | 'expense' | 'travelCompanion' | 'travelStyles'> {
  expense?: string;
}

export type Dtype = 'GENERAL' | 'TRANSPORT' | 'ETC';

export interface Schedule {
  scheduleId?: number;
  visitedDate: string; // yyyy-mm-dd
  visitedTime: string; // yyyy-mm-dd'T'HH-MM-ss.SSSZ
  sortOrder: number;
  category: Category;
  durationTime: string; // yyyy-mm-dd'T'HH-MM-ss.SSSZ
  expense: string;
  memo?: string;
  dtype: Dtype;
  scheduleGeneral?: {
    placeName: string;
    googleMapPlaceId: string;
    googleMapLatitude: number;
    googleMapLongitude: number;
    googleMapAddress: string;
    googleMapPhoneNumber: string;
    googleMapHomePageUrl: string;
  };
  scheduleTransport?: {
    transportation: Transport;
    startPlaceName: string;
    googleMapStartPlaceAddress: string;
    googleMapStartLatitude: number;
    googleMapStartLongitude: number;
    endPlaceName: string;
    googleMapEndPlaceAddress: string;
    googleMapEndLatitude: number;
    googleMapEndLongitude: number;
  };
  scheduleEtc?: {
    placeName: string;
  };
}

export interface ScheduleDetail {
  reviewId?: number;
  isEditable: boolean;
  schedules: Schedule[];
}

export interface ScheduleWithKey extends Schedule {
  key: string;
}

export interface TabContentProps extends React.HTMLAttributes<HTMLButtonElement> {
  schedule: ScheduleWithKey;
}
