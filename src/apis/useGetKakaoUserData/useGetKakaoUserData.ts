'use clinet';

import { useQuery } from '@tanstack/react-query';

import serviceKakaoUserData from './fetch';

export default function useGetKakaoUserData(data: {
  access_token: string;
  expires_in: string;
  refresh_token: string | null;
  refresh_token_expires_in: string | null;
}) {
  return useQuery({
    queryKey: ['useGetKakaoUserData'],
    queryFn: () => serviceKakaoUserData.getKakaoUserData(data)
  });
}
