'use client';

import { useEffect } from 'react';

import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/router';

import profileService from './fetchGetProfile';
import { ProfileUserData } from './type';
// fetch
export default function useGetProfile(id: string) {
  const router = useRouter();

  const query = useQuery<ProfileUserData, Error>({
    queryKey: ['useGetProfile', id],
    queryFn: () => profileService.getProfile(id)
  });

  useEffect(() => {
    if (query.isError && (query.error as any).code === 3000) {
      router.push('/');
    }
  }, [query.isError, query.error, router]);

  return query;
}
