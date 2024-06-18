'use client';

import { useMutation } from '@tanstack/react-query';

import serviceSignin from '@/apis/useSignin/fetch';
// import { signinProps } from '@/components/SigninForm';

export default function usePostSignin() {
  return useMutation({
    mutationKey: ['usePostSignin'],
    mutationFn: (data: { username: string; password: string }) => serviceSignin.postSignin(data)
  });
}
