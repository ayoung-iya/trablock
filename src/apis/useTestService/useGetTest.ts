'use client';

import { useQuery } from '@tanstack/react-query';

import serviceTest from '@/apis/useTestService/fetch';

// 클라이언트 사이드 react-query 훅
export default function useGetTest(id: number) {
  // useQuery<T> -> T에 queryFn 타입 지정 -> 여기서 직접 주입할 것
  return useQuery({
    queryKey: ['useGetTest', id] as const,
    queryFn: () => serviceTest.getTest(id)
  });
}
