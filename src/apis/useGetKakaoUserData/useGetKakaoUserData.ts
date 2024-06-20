'use clinet';

import { useQuery } from '@tanstack/react-query';

import serviceKakaoUserData from './fetch';

export default function useGetKakaoUserData(token: string) {
  return useQuery({
    queryKey: ['useGetKakaoUserData', token],
    queryFn: () => serviceKakaoUserData.getKakaoUserData(token),
    enabled: !!token
  });
}
