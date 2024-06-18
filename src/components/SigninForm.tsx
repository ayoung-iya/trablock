'use client';

import Cookies from 'js-cookie';
import { useForm, SubmitHandler, FieldValues } from 'react-hook-form';

import usePostSignin from '@/apis/useSignin/usePostSignin';
import { validate } from '@/libs/constants/validation';

import SignInput from './common/input/SignInput';

export interface signinProps {
  username: string;
  password: string;
}

export default function SigninForm() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid }
  } = useForm();

  const { mutate: postSigninMutate } = usePostSignin();

  const registerList = {
    username: register('username', validate.username),
    password: register('password', validate.password)
  };

  const payload = {
    username: watch('username'),
    password: watch('password')
  };
  console.log(payload);

  const onSubmit: SubmitHandler<FieldValues> = () => {
    // login fetch
    console.log(payload);
    postSigninMutate(
      { username: payload.username, password: payload.password },
      {
        onSuccess: (response) => {
          console.log('성공이다!');
          // 쿠키에 토큰두개 , 끝나는 시간 세팅
          Cookies.set('authorization-token', response.headers['authorization-token'], { secure: true });
          Cookies.set('expires-at', response.headers['authorization-token-expired-at']);
          Cookies.set('refresh-token', response.headers['set-cookie'], { secure: true });
          console.log('성공');
        },
        onError: (error) => console.error(error)
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
