/* eslint-disable */
'use client';

import { useEffect, useRef, useState } from 'react';

import { useRouter } from 'next/navigation';
import { useForm, SubmitHandler, FieldValues, Controller } from 'react-hook-form';
import usePostNicknameCheck from '@/apis/useSignup/usePostNicknameCheck';
import usePostSignup from '@/apis/useSignup/usePostSignup';
import usePostUsernameCheck from '@/apis/useSignup/usePostUsernamCheck';
import Button from '@/components/common/button/Button';
import SignInput from '@/components/common/input/SignInput';
import PlanInputTitle from '@/components/PlanInputTitle';
import { validate } from '@/libs/constants/validation';
import passWordList from '@/libs/constants/passWordQuestion';
import Dropdown from '@/components/common/Dropdown';
import useDropdown from '@/libs/hooks/useDropdown';

export default function SignupForm() {
  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    watch,
    control,
    formState: { errors }
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      username: '',
      password: '',
      password_confirm: '',
      nickname: '',
      pw_question_id: 1,
      pw_answer: '',
      is_agreement: true
    }
  });

  const [selectedQuestion, setSelectedQuestion] = useState(passWordList[0]);
  const [selectedQuestionId, setSelectedQuestionId] = useState(1);
  const [isAgree, setIsAgree] = useState(false);
  const questionInputRef = useRef<HTMLInputElement>(null);

  const {
    ref: questionListRef,
    isDropdownOpened: isQuestionListOpened,
    handleDropdownToggle: handleQuestionListToggle,
    handleDropdownClose: handleQuestionListClose
  } = useDropdown<HTMLUListElement>({
    onClickInside: () => {},
    onClickOutside: (e) => {
      if (questionInputRef.current && questionInputRef.current.contains(e?.target as Node)) {
        return;
      }

      handleQuestionListClose();
    }
  });

  const handleSelectQuestion = (question: string, id: number) => {
    setSelectedQuestion(question);
    setSelectedQuestionId(id + 1);
    handleQuestionListClose();
  };

  const router = useRouter();
  const payload = {
    username: watch('username'),
    password: watch('password'),
    nickname: watch('nickname'),
    pw_answer: watch('pw_answer')
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
    postNicknameCheckMutate(payload.nickname, {
      onSuccess: (response) => {
        if (response.available) {
          clearErrors('nickname');
        } else {
          setError('nickname', { message: '중복된 닉네임입니다.' });
        }
      }
    });
  };

  const handleCheckboxClick = () => {
    setIsAgree((prev) => !prev);
  };

  const registerList = {
    username: register('username', { ...validate.username, onBlur: () => validateUsername() }),
    password: register('password', validate.password),
    password_confirm: register('password_confirm', { onChange: () => validatePasswordCheck() }),
    nickname: register('nickname', { ...validate.nickname, onBlur: () => validateNickname() }),
    pw_answer: register('pw_answer', validate.pw_answer)
  };

  const onSubmit: SubmitHandler<FieldValues> = () => {
    const payloadValue = {
      username: payload.username,
      password: payload.password,
      nickname: payload.nickname,
      pw_question_id: selectedQuestionId,
      pw_answer: payload.pw_answer,
      is_agreement: true
    };
    console.log(payloadValue);
    postSignupMutate(payloadValue, {
      onSuccess: () => {
        router.push('/login');
      },
      onError: (error) => console.log(error)
    });
  };

  useEffect(() => {}, [isAgree]);

  const buttonStyle = 'bg-primary-01 text-white-01 w-full rounded font-signin-button h-12 ';

  return (
    <div>
      <form className="flex-col-start m-0 mb-5 w-80 gap-6 pt-10">
        <PlanInputTitle>기본 정보 입력</PlanInputTitle>
        <section className="mg-0 mb-14 flex w-full flex-col gap-5">
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
            type="password"
            errorMessage={errors.password?.message as string}
            {...registerList.password}
          />
          <SignInput
            label="비밀번호 확인"
            type="password"
            id="password_confirm"
            errorMessage={errors.password_confirm?.message as string}
            {...registerList.password_confirm}
          />
        </section>
        <PlanInputTitle>비밀번호 정보 입력</PlanInputTitle>
        <section className="mg-0 relative mb-14 flex w-full flex-col gap-5">
          <Controller
            control={control}
            name="pw_question_id"
            render={({ field: { value, onChange } }) => (
              <div className={`relative ${value ? 'pt-2' : ''}`}>
                <SignInput
                  label="질문"
                  id="pw_question_id"
                  value={selectedQuestion}
                  readOnly
                  onClickInput={handleQuestionListToggle}
                />
                <div className="absolute top-20">
                  {isQuestionListOpened && (
                    <Dropdown ref={questionListRef}>
                      {passWordList.map((sentence, index) => (
                        <li
                          key={sentence}
                          className="cursor-pointer pb-3 pt-3 hover:bg-gray-100"
                          onClick={() => {
                            handleSelectQuestion(sentence, index);
                            onChange(index + 1);
                          }}
                        >
                          {sentence}
                        </li>
                      ))}
                    </Dropdown>
                  )}
                </div>
              </div>
            )}
          />
          <SignInput label="답변" id="pw_answer" {...registerList.pw_answer} />
        </section>

        <Button disabled={!isAgree} onClick={onSubmit} type="submit" className={buttonStyle}>
          회원가입
        </Button>
      </form>

      <PlanInputTitle>약관 동의</PlanInputTitle>
      <div className="mt-5 flex gap-4">
        <input type="checkbox" id="is_agreement" onClick={handleCheckboxClick} />
        <p>개인정보 수집 및 이용 동의</p>
      </div>
      {!isAgree && <p className="mt-3 text-red-01">약관에 동의해 주세요</p>}
    </div>
  );
}
