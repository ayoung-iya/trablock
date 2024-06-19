'use client';

import { useMutation } from '@tanstack/react-query';

import serviceSignin from '@/apis/useSignin/fetch';
import { signinProps } from '@/libs/constants/auth.type';

export default function usePostSignin() {
  return useMutation({
    mutationKey: ['usePostSignin'],
    mutationFn: (data: signinProps) => serviceSignin.postSignin(data)
  });
}
