'use client';

import { useRef } from 'react';

import { useRouter } from 'next/navigation';
import { useForm, SubmitHandler, FieldValues, Controller } from 'react-hook-form';

import usePostNicknameCheck from '@/apis/useSignup/usePostNicknameCheck';
import usePostSignup from '@/apis/useSignup/usePostSignup';
import usePostUsernameCheck from '@/apis/useSignup/usePostUsernamCheck';
import Button from '@/components/common/button/Button';
import Dropdown from '@/components/common/Dropdown';
import SignInput from '@/components/common/input/SignInput';
import PlanInputTitle from '@/components/PlanInputTitle';
import passwordList from '@/libs/constants/passwordQuestion';
import { validate } from '@/libs/constants/validation';
import useDropdown from '@/libs/hooks/useDropdown';

const DEFAULT_PW_QUESTION_ID = 1;

export default function SignupForm() {
  const {
    register,
    getValues,
    setError,
    control,
    formState: { errors, isValid }
  } = useForm({
    mode: 'onBlur',
    defaultValues: {
      username: '',
      password: '',
      password_confirm: '',
      nickname: '',
      pw_question_id: DEFAULT_PW_QUESTION_ID,
      pw_answer: '',
      is_agreement: false
    }
  });

  const selectedQuestionId = getValues('pw_question_id');
  const isAgreement = getValues('is_agreement');
  const selectedQuestion = passwordList[selectedQuestionId - 1];
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

  const router = useRouter();

  const { mutate: postSignupMutate } = usePostSignup();
  const { mutate: postNicknameCheckMutate } = usePostNicknameCheck();
  const { mutate: postUsernameCheckMutate } = usePostUsernameCheck();

  const validateUsername = () => {
    if (errors?.username?.type) {
      return;
    }

    const username = getValues('username');

    postUsernameCheckMutate(username, {
      onSuccess: ({ error }) => {
        if (error) {
          throw new Error(error.local_message);
        }
      },
      onError: ({ message }) => {
        setError('username', { message });
      }
    });
  };

  const validateNickname = () => {
    if (errors?.nickname?.type) {
      return;
    }

    const nickname = getValues('nickname');

    postNicknameCheckMutate(nickname, {
      onSuccess: (response) => {
        const { error } = response;

        if (error) {
          throw new Error(error.local_message);
        }
      },
      onError: ({ message }) => {
        setError('nickname', { message });
      }
    });
  };

  const validatePasswordConfirm = (value: string) => {
    const password = getValues('password');

    return value === password || '비밀번호가 일치하지 않습니다.';
  };

  const registerList = {
    nickname: register('nickname', { ...validate.nickname, onBlur: validateNickname }),
    username: register('username', { ...validate.username, onBlur: validateUsername }),
    password: register('password', validate.password),
    password_confirm: register('password_confirm', { validate: validatePasswordConfirm }),
    pw_answer: register('pw_answer', validate.pw_answer)
  };

  const onSubmit: SubmitHandler<FieldValues> = (e) => {
    e.preventDefault();
    // eslint-disable-next-line camelcase, @typescript-eslint/no-unused-vars
    const { password_confirm, ...submitFormData } = getValues();

    postSignupMutate(submitFormData, {
      onSuccess: ({ error }) => {
        if (error) {
          throw new Error(error.local_message);
        }

        router.push('/login');
      },
      onError: (error) => {
        // TODO: 에러 처리
        console.log(error);
      }
    });
  };

  const buttonStyle = 'bg-primary-01 text-white-01 w-full rounded font-signin-button h-12 disabled:btn-gray';

  return (
    <div>
      <form className="flex-col-start m-0 mb-5 w-80 gap-6 pt-10" onSubmit={onSubmit}>
        <PlanInputTitle>기본 정보 입력</PlanInputTitle>
        <section className="mg-0 mb-14 flex w-full flex-col gap-5">
          <SignInput label="닉네임" id="nickname" errorMessage={errors.nickname?.message} {...registerList.nickname} />
          <SignInput label="이메일" id="username" errorMessage={errors.username?.message} {...registerList.username} />
          <SignInput
            label="비밀번호"
            id="password"
            type="password"
            errorMessage={errors.password?.message}
            {...registerList.password}
          />
          <SignInput
            label="비밀번호 확인"
            type="password"
            id="password_confirm"
            errorMessage={errors.password_confirm?.message}
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
                    <Dropdown className="overflow-hidden" ref={questionListRef}>
                      {passwordList.map((sentence, index) => (
                        <li className="-mx-5 cursor-pointer px-5 pb-3 pt-3 first:-mt-5 last:-mb-5 hover:bg-gray-100">
                          <button
                            type="button"
                            onClick={() => {
                              onChange(index + 1);
                              handleQuestionListClose();
                            }}
                          >
                            {sentence}
                          </button>
                        </li>
                      ))}
                    </Dropdown>
                  )}
                </div>
              </div>
            )}
          />
          <SignInput label="답변" id="pw_answer" errorMessage={errors.pw_answer?.message} {...registerList.pw_answer} />
        </section>

        <Button disabled={!isAgreement || !isValid} onClick={onSubmit} type="submit" className={buttonStyle}>
          회원가입
        </Button>
      </form>

      <PlanInputTitle>약관 동의</PlanInputTitle>
      <div className="mt-5 flex gap-4">
        <input type="checkbox" id="is_agreement" {...register('is_agreement')} />
        <label htmlFor="is_agreement">(필수)개인정보 수집 및 이용 동의</label>
      </div>
    </div>
  );
}
