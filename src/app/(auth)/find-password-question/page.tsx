'use client';

import { useContext } from 'react';

import { useRouter } from 'next/navigation';
import { useForm, SubmitHandler, FieldValues } from 'react-hook-form';

import useFindPasswordVerification from '@/apis/useFindPassword/usePostPasswordFindVerification';
import Button from '@/components/common/button/Button';
import SignInput from '@/components/common/input/SignInput';
import passWordList from '@/libs/constants/passwordQuestion';
import { validate } from '@/libs/constants/validation';
import { PasswordFindContext } from '@/libs/contexts/passwordFindContext';

export default function FindPasswordQuestion() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid }
  } = useForm({ mode: 'onBlur', defaultValues: { pw_answer: '' } });

  const registerList = {
    pw_answer: register('pw_answer', validate.pw_answer)
  };

  const { mutate: postQuestionMutate } = useFindPasswordVerification();

  const { username, setAnswer, questionId } = useContext(PasswordFindContext);
  const payload = {
    answer: watch('pw_answer'),
    username,
    pw_question_id: questionId
  };

  const router = useRouter();

  const onSubmit: SubmitHandler<FieldValues> = () => {
    postQuestionMutate(payload, {
      onSuccess: (response) => {
        const { answer } = response;
        setAnswer(answer);
        router.push('/find-password-newpassword');
      },
      onError: () => {
        alert('올바르지 않은 답변입니다.');
      }
    });
  };
  const buttonStyle = 'bg-primary-01 text-white-01 w-full rounded font-signin-button h-12 ';

  return (
    <div className="flex-col-center flex pb-32 pt-32">
      <p className="font-password-find">비밀번호 찾기</p>

      <form onSubmit={handleSubmit(onSubmit)} className="flex-col-start m-0 w-80 gap-6 pt-10">
        <section className="mg-0 mb-14 flex w-full flex-col gap-5">
          <SignInput label="질문" id="pw_question" value={passWordList[questionId - 1]} disabled />
          <SignInput
            label="답변"
            id="pw_answer"
            errorMessage={errors.pw_answer?.message as string}
            {...registerList.pw_answer}
          />
          <Button type="submit" className={buttonStyle} disabled={!isValid}>
            입력하기
          </Button>
        </section>
      </form>
    </div>
  );
}
