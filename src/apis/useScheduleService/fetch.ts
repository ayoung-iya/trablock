import returnFetch, { ReturnFetchDefaultOptions } from 'return-fetch';

import API_URL from '@/apis/constants/url';
import interceptor from '@/apis/interceptors/interceptor';
import { returnData } from '@/apis/utils/utils';
import { Schedule } from '@/libs/types/dragAndDropType';

const options: { [key: string]: ReturnFetchDefaultOptions } = {
  schedules: {
    baseUrl: API_URL.API_BASE_URL,
    headers: {
      'Content-Type': 'application/json',
      'authorization-token':
        'eyJhbGciOiJIUzI1NiJ9.eyJ1c2VySWQiOjExLCJleHAiOjE3MTkyNDUxNTN9.s7-sTfZRl-EOwnRayTSI2HLO-PsbuxI08wJWPgY7cEA'
    }
  },
  coverImage: {
    baseUrl: API_URL.API_BASE_URL,
    headers: {
      'authorization-token':
        'eyJhbGciOiJIUzI1NiJ9.eyJ1c2VySWQiOjExLCJleHAiOjE3MTkyNDUxNTN9.s7-sTfZRl-EOwnRayTSI2HLO-PsbuxI08wJWPgY7cEA'
    }
  }
};

const fetchSchedule = returnFetch({ fetch: interceptor.logging(options.schedules) });
const fetchCoverImage = returnFetch({ fetch: interceptor.logging(options.coverImage) });

// 서버 사이드 fetch
const serviceSchedule = {
  getSchedules: async (articleId: number) => {
    const response = await fetchSchedule(`api/v1/articles/${articleId}/schedules`, {
      method: 'GET'
    });
    const result = response.json();
    return returnData(result);
  },
  putSchedules: async (articleId: number, payload: { schedules: Schedule[] }) => {
    const response = await fetchSchedule(`api/v1/articles/${articleId}/schedules`, {
      method: 'PUT',
      body: JSON.stringify(payload)
    });
    const result = response.json();
    return returnData(result);
  },
  deleteSchedules: async (articleId: number) => {
    const response = await fetchSchedule(`api/v1/articles/${articleId}/status`, {
      method: 'PATCH',
      body: JSON.stringify({ is_delete: true })
    });
    const result = response.json();
    return returnData(result);
  },
  patchSchedulesPrivacy: async (articleId: number, payload: { is_private: boolean }) => {
    const response = await fetchSchedule(`api/v1/articles/${articleId}/privacy`, {
      method: 'PATCH',
      body: JSON.stringify(payload)
    });
    const result = response.json();
    return returnData(result);
  },
  putSchedulesCoverImage: async (articleId: number, payload: { coverImage: File | null }) => {
    const formData = new FormData();
    if (payload.coverImage) {
      formData.append('coverImage', payload.coverImage);
    }

    const response = await fetchCoverImage(`api/v1/article/${articleId}/coverImage`, {
      method: 'PUT',
      body: formData
    });
    const result = await response.json();
    return returnData(result);
  },
  getSchedulesPlanDetail: async (articleId: number) => {
    const response = await fetchSchedule(`api/v1/article/${articleId}`, {
      method: 'GET'
    });
    const result = response.json();
    return returnData(result);
  }
};

export default serviceSchedule;
