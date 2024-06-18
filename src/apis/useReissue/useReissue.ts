'use client';

import { useMutation } from '@tanstack/react-query';

import serviceReissueToken from './fetch';

export default function useReissue() {
  return useMutation({
    mutationKey: ['useReissue'],
    mutationFn: () => serviceReissueToken.postReissueToken()
  });
}
