'use client';

import { useMutation } from '@tanstack/react-query';

import serviceSignup from '@/apis/useSignup/fetch';
import { signupProps } from '@/components/SignupForm';

export default function usePostSignup() {
  return useMutation({
    mutationKey: ['usePostSignup'],
    mutationFn: (data: signupProps) => serviceSignup.postSignup(data)
  });
}
