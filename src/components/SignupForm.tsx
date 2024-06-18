/* eslint-disable */

'use client';

import { useForm, SubmitHandler, FieldValues } from 'react-hook-form';

import Checkbox from '@/components/common/input/Checkbox';
import SignInput from '@/components/common/input/SignInput';
import PlanInputTitle from '@/components/PlanInputTitle';
import { validate } from '@/libs/constants/validation';
import usePostSignup from '@/apis/useSignup/usePostSignup';
import usePostNicknameCheck from '@/apis/useSignup/usePostNicknameCheck';
import usePostUsernameCheck from '@/apis/useSignup/usePostUsernamCheck';
import { redirect } from 'next/navigation';

export interface signupProps {
  username: string;
  password: string;
  nickname: string;
  pw_question_id: number;
  pw_answer: string;
  is_agreement: boolean;
}

export default function SignupForm() {
  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    watch,
    formState: { errors, isValid }
  } = useForm();

  const payload = {
    username: watch('username'),
    password: watch('password'),
    nickname: watch('nickname'),
    pw_question_id: watch('pw_question_id'),
    pw_answer: watch('pw_answer'),
    is_agreement: watch('is_agreement')
  };

  const passwordCheckWatch = watch('password_confirm');
  const { mutate: postSignupMutate } = usePostSignup();
  const { mutate: postNicknameCheckMutate } = usePostNicknameCheck();
  const { mutate: postUsernameCheckMutate } = usePostUsernameCheck();

  const validateUsername = () => {
    postUsernameCheckMutate(payload.username, {
      onSuccess: (response) => {
        if (response.available) {
          clearErrors('username');
        } else {
          setError('username', { message: '중복된 이메일입니다.' });
        }
      }
    });
  };
  const validatePasswordCheck = () => {
    if (payload.password !== passwordCheckWatch) {
      setError('password_confirm', { type: 'password-mismatch', message: '비밀번호가 일치하지 않습니다.' });
    } else {
      clearErrors('password_confirm');
    }
  };
  const validateNickname = () => {
    console.log(payload.nickname as string);
    postNicknameCheckMutate(payload.nickname, {
      onSuccess: (response) => {
        console.log('nicknamefetch');
        if (response.available) {
          clearErrors('nickname');
        } else {
          console.log('실패');
          setError('nickname', { message: '중복된 닉네임입니다.' });
        }
      }
    });
  };

  const registerList = {
    username: register('username', { ...validate.username, onBlur: () => validateUsername() }),
    password: register('password', validate.password),
    passwordCheck: register('password_confirm', { onBlur: () => validatePasswordCheck() }),
    nickname: register('nickname', { ...validate.nickname, onBlur: () => validateNickname() }),
    pw_answer: register('pw_answer', validate.pw_answer)
  };

  const onSubmit: SubmitHandler<FieldValues> = () => {
    postSignupMutate(payload, {
      onSuccess: (data) => {
        redirect('/');
        //로그인fetch 하고 토큰 받아서 저장.
      },
      onError: (error) => {
        console.log(error);
      }
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <PlanInputTitle>기본 정보 입력</PlanInputTitle>
      <SignInput
        label="닉네임"
        id="nickname"
        errorMessage={errors.nickname?.message as string}
        {...registerList.nickname}
      />
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
      <SignInput
        label="비밀번호 확인"
        id="password_confirm"
        errorMessage={errors.password_confirm?.message as string}
      />
      <PlanInputTitle>비밀번호 정보 입력</PlanInputTitle>
      <SignInput label="질문" id="pw_question_id" />
      <SignInput label="답변" id="pw_answer" />
      <PlanInputTitle>약관 동의</PlanInputTitle>
      <Checkbox id="is_agreement">개인정보 수집 및 이용 동의</Checkbox>
      <button disabled={isValid} type="submit">
        회원가입
      </button>
    </form>
  );
}
