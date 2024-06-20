'use client';

import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import { useForm, SubmitHandler, FieldValues } from 'react-hook-form';

import usePostSignin from '@/apis/useSignin/usePostSignin';
import { validate } from '@/libs/constants/validation';

import Button from './common/button/Button';
import SignInput from './common/input/SignInput';

export default function SigninForm() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid }
  } = useForm({ mode: 'onChange', defaultValues: { username: '', password: '' } });

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
          // const refreshToken = response.headers.get('set-cookie');

          if (authorizationToken && expiresAt) {
            Cookies.set('authorization-token', authorizationToken, { secure: true });
            Cookies.set('expires-at', expiresAt);
            // Cookies.set('refresh-token', refreshToken, { secure: true });

            router.push('/');
          }
        },
        onError: (error) => console.log(error)
      }
    );
  };

  const buttonStyle = 'bg-primary-01 text-white-01 w-full rounded font-signin-button h-12 ';
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex-col-start m-0 w-80 gap-6 pt-10">
      <section className="mg-0 mb-14 flex w-full flex-col gap-5">
        <SignInput
          label="이메일"
          id="username"
          errorMessage={errors.username?.message as string}
          {...registerList.username}
        />
        <SignInput
          label="비밀번호"
          id="password"
          type="password"
          errorMessage={errors.password?.message as string}
          {...registerList.password}
        />
      </section>
      <Button type="submit" className={buttonStyle} disabled={!isValid}>
        로그인
      </Button>
    </form>
  );
}
