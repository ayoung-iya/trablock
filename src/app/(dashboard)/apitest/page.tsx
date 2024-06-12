'use client';

import { useEffect } from 'react';

import useGetTest from '@/apis/useTestService/useGetTest';

export default function ApiTest() {
  const { data } = useGetTest(1);

  useEffect(() => {
    if (data) {
      console.log('data', data);
    }
  }, [data]);

  return <div>ApiTest</div>;
}
