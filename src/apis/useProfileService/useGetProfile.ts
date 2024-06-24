'use client';

import { useQuery } from '@tanstack/react-query';

import profileService from './fetchGetProfile';
import { ProfileUserData } from './type';

// 클라이언트 사이드 react-query 훅
export default function useGetProfile(id: string) {
  return useQuery<ProfileUserData>({
    queryKey: ['useGetProfile', id],
    queryFn: () => profileService.getProfile(id)
  });
}
