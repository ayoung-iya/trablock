'use client';

import { useContext } from 'react';

import { useRouter } from 'next/navigation';
import { useForm, SubmitHandler, FieldValues } from 'react-hook-form';

import useFindPasswordEmail from '@/apis/useFindPassword/usePostPasswordFindEmail';
import Button from '@/components/common/button/Button';
import SignInput from '@/components/common/input/SignInput';
import { validate } from '@/libs/constants/validation';
import { PasswordFindContext } from '@/libs/contexts/passwordFindContext';

export default function FindPasswordEmail() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid }
  } = useForm({ mode: 'onBlur', defaultValues: { username: '' } });

  const registerList = {
    username: register('username', validate.username)
  };
  const payload = watch('username');

  const { mutate: postEmailCheckMutate } = useFindPasswordEmail();

  const { setQuestionId, setUsername } = useContext(PasswordFindContext);
  const router = useRouter();
  const onSubmit: SubmitHandler<FieldValues> = () => {
    postEmailCheckMutate(payload, {
      onSuccess: (response) => {
        const { pw_question_id: pwQuestionID } = response;
        setQuestionId(Number(pwQuestionID));
        setUsername(payload);
        router.push('/find-password-question');
      },
      onError: () => {
        alert('존재하지 않는 이메일입니다.');
      }
    });
  };
  const buttonStyle = 'bg-primary-01 text-white-01 w-full rounded font-signin-button h-12';
  return (
    <div className="flex-col-center flex pb-32 pt-32">
      <p className="font-password-find">비밀번호 찾기</p>
      <form onSubmit={handleSubmit(onSubmit)} className="flex-col-start m-0 w-80 gap-6 pt-10">
        <section className="mg-0 mb-14 flex w-full flex-col gap-5">
          <SignInput
            label="가입한 이메일 주소"
            id="username"
            errorMessage={errors.username?.message as string}
            {...registerList.username}
          />
          <Button type="submit" className={buttonStyle} disabled={!isValid}>
            입력하기
          </Button>
        </section>
      </form>
    </div>
  );
}
