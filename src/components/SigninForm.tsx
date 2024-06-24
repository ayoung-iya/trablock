'use client';

import { useContext } from 'react';

import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import { useForm, SubmitHandler, FieldValues } from 'react-hook-form';

import usePostSignin from '@/apis/useSignin/usePostSignin';
import Button from '@/components/common/button/Button';
import SignInput from '@/components/common/input/SignInput';
import { validate } from '@/libs/constants/validation';
import { LoginContext } from '@/libs/contexts/LoginContext';

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
  const { setUserProfileImage, setUserId } = useContext(LoginContext);
  const router = useRouter();
  const onSubmit: SubmitHandler<FieldValues> = () => {
    postSigninMutate(
      { username: payload.username, password: payload.password },
      {
        onSuccess: async (res) => {
          // 쿠키에 토큰두개 , 끝나는 시간 세팅
          const { response, responseBody } = res;
          const authorizationToken = response.headers.get('authorization-token');
          const expiresAt = response.headers.get('authorization-token-expired-at');
          const refreshToken = response.headers.get('refresh-token');

          if (authorizationToken && expiresAt && refreshToken) {
            Cookies.set('authorization-token', authorizationToken, { secure: true });
            Cookies.set('expires-at', expiresAt);
            Cookies.set('refresh-token', refreshToken, { secure: true });

            console.log(responseBody);
            const { profile_img_url: profileImage, user_id: userId } = responseBody;
            setUserProfileImage(profileImage);
            setUserId(userId);
          }
          router.push('/');
        },
        onError: (err) => alert(err) // 시간나면 에러메세지 가져오기
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

        <Button type="submit" className={buttonStyle} disabled={!isValid}>
          로그인
        </Button>
      </section>
    </form>
  );
}
