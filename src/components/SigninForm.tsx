'use client';

import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import { useForm, SubmitHandler, FieldValues } from 'react-hook-form';

import usePostSignin from '@/apis/useSignin/usePostSignin';
import { validate } from '@/libs/constants/validation';

import SignInput from './common/input/SignInput';

export default function SigninForm() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid }
  } = useForm({ username: '', password: '' });

  const { mutate: postSigninMutate } = usePostSignin();

  const registerList = {
    username: register('username', validate.username),
    password: register('password', validate.password)
  };

  const payload = {
    username: watch('username'),
    password: watch('password')
  };

  const router = useRouter();
  const onSubmit: SubmitHandler<FieldValues> = () => {
    // login fetch

    postSigninMutate(
      { username: payload.username, password: payload.password },
      {
        onSuccess: (response) => {
          // 쿠키에 토큰두개 , 끝나는 시간 세팅
          const authorizationToken = response.headers.get('Authorization-Token');
          const expiresAt = response.headers.get('authorization-token-expired-at');
          const refreshToken = response.headers.get('set-cookie');

          if (authorizationToken && expiresAt && refreshToken) {
            Cookies.set('authorization-token', authorizationToken, { secure: true });
            Cookies.set('expires-at', expiresAt);
            Cookies.set('refresh-token', refreshToken, { secure: true });

            router.push('/');
          }
        },
        onError: (error) => console.log(error)
      }
    );
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <SignInput
        label="이메일"
        id="username"
        errorMessage={errors.username?.message as string}
        {...registerList.username}
      />
      <SignInput
        label="비밀번호"
        id="password"
        errorMessage={errors.password?.message as string}
        {...registerList.password}
      />
      <button type="submit" disabled={!isValid}>
        로그인하기
      </button>
    </form>
  );
}
