'use client';

import { useContext } from 'react';

import { useRouter } from 'next/navigation';
import { useForm, SubmitHandler, FieldValues } from 'react-hook-form';

// import passWordList from '@/libs/constants/passWordQuestion';
import useFindPasswordRenewal from '@/apis/useFindPassword/usePostPasswordRenewal';
import Button from '@/components/common/button/Button';
import SignInput from '@/components/common/input/SignInput';
import { validate } from '@/libs/constants/validation';
import { PasswordFindContext } from '@/libs/contexts/passwordFindContext';

export default function FindPasswordNewpassword() {
  const {
    register,
    handleSubmit,
    watch,
    setError,
    clearErrors,
    formState: { errors, isValid }
  } = useForm({
    mode: 'onChange',
    defaultValues: { password: '', password_confirm: '', pw_quesiton_id: 1, pw_answer: '' }
  });

  const { username, questionId, answer } = useContext(PasswordFindContext);

  const payload = {
    answer,
    password: watch('password'),
    pw_question_id: questionId,
    username
  };
  const passwordCheckWatch = watch('password_confirm');

  const validatePasswordCheck = () => {
    if (payload.password !== passwordCheckWatch) {
      setError('password_confirm', { type: 'password-mismatch', message: '비밀번호가 일치하지 않습니다.' });
    } else {
      clearErrors('password_confirm');
    }
  };

  const registerList = {
    password: register('password', validate.password),
    password_confirm: register('password_confirm', { onChange: () => validatePasswordCheck() })
  };

  const { mutate: postPasswordRenewal } = useFindPasswordRenewal();

  const router = useRouter();

  const onSubmit: SubmitHandler<FieldValues> = () => {
    postPasswordRenewal(payload, {
      onSuccess: () => {
        // 처리가 안되냐
        alert('비밀번호가 갱신되었습니다. 다시 로그인 해 주세요.');
        router.push('/login');
      },
      onError: () => {
        alert('비밀번호 갱신에 실패했습니다');
      }
    });
  };

  const buttonStyle = 'bg-primary-01 text-white-01 w-full rounded font-signin-button h-12 mt-7';

  return (
    <div className="flex-col-center flex pb-32 pt-32">
      <p className="font-password-find">새 비밀번호 발급하기</p>
      <form onSubmit={handleSubmit(onSubmit)} className="flex-col-start m-0 w-80 gap-6 pt-10">
        <section className="mg-0 mb-14 flex w-full flex-col gap-5">
          <SignInput
            label="새 비밀번호"
            type="password"
            id="password"
            errorMessage={errors.password?.message as string}
            {...registerList.password}
          />
          <SignInput
            type="password"
            label="비밀번호 확인"
            id="password_confirm"
            errorMessage={errors.password_confirm?.message as string}
            {...registerList.password_confirm}
          />
          <Button type="submit" className={buttonStyle} disabled={!isValid}>
            새 비밀번호 발급하기
          </Button>
        </section>
      </form>
    </div>
  );
}
