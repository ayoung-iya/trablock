'use client';

import { useForm, SubmitHandler, FieldValues } from 'react-hook-form';

import Checkbox from '@/components/common/input/Checkbox';
import SignInput from '@/components/common/input/SignInput';
import PlanInputTitle from '@/components/PlanInputTitle';
import { validate } from '@/libs/constants/validation';

// interface signupProps {
//   username: string;
//   password: string;
//   nickname: string;
//   pw_question_id: number;
//   pw_answer: string;
//   is_agreement: boolean;
// }

export default function SignupForm() {
  const {
    register,
    handleSubmit,
    // setError,
    // watch,
    formState: { errors, isValid }
  } = useForm();

  const registerList = {
    username: register('username', validate.username),
    password: register('password', validate.password),
    nickname: register('nickname', validate.nickname),
    pw_answer: register('pw_answer', validate.pw_answer)
  };

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    const { passwordConfirm, ...submitData } = data;
    console.log(passwordConfirm);
    console.log(submitData);
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <PlanInputTitle>기본정보 입력</PlanInputTitle>
      <SignInput
        label="닉네임"
        id="nickname"
        errorMessage={errors.nicnkname?.message as string}
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
      <SignInput label="비밀번호 확인" id="password_confirm" errorMessage="비번이랑 같지 않으면 에러" />
      <PlanInputTitle>비밀번호 찾기 정보 입력</PlanInputTitle>
      <SignInput label="질문" id="pw_question_id" />
      <PlanInputTitle>약관 동의</PlanInputTitle>
      <Checkbox>개인정보 수집 및 이용 동의</Checkbox>
      <button disabled={isValid} type="submit">
        회원가입
      </button>
    </form>
  );
}
