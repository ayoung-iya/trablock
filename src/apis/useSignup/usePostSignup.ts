'use client';

import { useMutation } from '@tanstack/react-query';

import serviceSignup from '@/apis/useSignup/fetch';
import { signupProps } from '@/libs/constants/auth.type';

export default function usePostSignup() {
  return useMutation({
    mutationKey: ['usePostSignup'],
    mutationFn: (data: signupProps) => serviceSignup.postSignup(data)
  });
}
