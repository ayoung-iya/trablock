'use client';

import { useQuery } from '@tanstack/react-query';

import profileService from './fetchGetProfile';
import { ProfileUserData } from './type';
// fetch
export default function useGetProfile(id: string) {
  const query = useQuery<ProfileUserData, Error>({
    queryKey: ['trablock', 'profile', id],
    queryFn: () => profileService.getProfile(id),
    enabled: !!id
  });

  return query;
}
