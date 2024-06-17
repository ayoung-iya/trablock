// /* eslint-disable */

// 'use client';

// import { useForm, SubmitHandler, FieldValues } from 'react-hook-form';

// import Checkbox from '@/components/common/input/Checkbox';
// import SignInput from '@/components/common/input/SignInput';
// import PlanInputTitle from '@/components/PlanInputTitle';
// import { validate } from '@/libs/constants/validation';
// import usePostSignup from '@/apis/useSignup/usePostSignup';
// import usePostNicknameCheck from '@/apis/useSignup/usePostNicknameCheck;

// export interface signupProps {
//   username: string;
//   password: string;
//   nickname: string;
//   pw_question_id: number;
//   pw_answer: string;
//   is_agreement: boolean;
// }

// export default function SignupForm() {
//   const {
//     register,
//     handleSubmit,
//     setError,
//     watch,
//     formState: { errors, isValid }
//   } = useForm();

//   const payload = {
//     username: watch('nickname'),
//     password: watch('username'),
//     nickname: watch('password'),
//     pw_question_id: watch('pw_question_id'),
//     pw_answer: watch('pw_answer'),
//     is_agreement: watch('is_agreement')
//   };

//   const { mutate: postSignupMutate } = usePostSignup();
// const { mutate: postNicknameCheckMutate} = usePostNicknameCheck({
//   onSuccess:(data)=> {
//     if()
//   }
// });

//   const registerList = {
//     username: register('username', { ...validate.username, onBlur: () => validateUsername() }),
//     password: register('password', validate.password),
//     passwordCheck: register('password_confirm', { onBlur: () => validatePasswordCheck() }),
//     nickname: register('nickname', { ...validate.nickname, onBlur: () => validateNickname() }),
//     pw_answer: register('pw_answer', validate.pw_answer)
//   };

//   const validateUsername = () => {
//     //username fetch
//     console.log('a')
//   };
//   const validatePasswordCheck = () => {
//     //c
//     console.log('e')
//   };
//   const validateNickname = () => {
//     //fetch해서 결과에 따라 seterror or not(409)
//     postNicknameCheckMutate(payload.nickname);

//   };

//   const onSubmit: SubmitHandler<FieldValues> = () => {
//     postSignupMutate(payload);
//   };

//   return (
//     <form onSubmit={handleSubmit(onSubmit)}>
//       <PlanInputTitle>기본정보 입력</PlanInputTitle>
//       <SignInput
//         label="닉네임"
//         id="nickname"
//         errorMessage={errors.nickname?.message as string}
//         {...registerList.nickname}
//       />
//       <SignInput
//         label="이메일"
//         id="username"
//         errorMessage={errors.username?.message as string}
//         {...registerList.username}
//       />
//       <SignInput
//         label="비밀번호"
//         id="password"
//         errorMessage={errors.password?.message as string}
//         {...registerList.password}
//       />
//       <SignInput label="비밀번호 확인" id="password_confirm" errorMessage="비번이랑 같지 않으면 에러" />
//       <PlanInputTitle>비밀번호 찾기 정보 입력</PlanInputTitle>
//       <SignInput label="질문" id="pw_question_id" />
//       <PlanInputTitle>약관 동의</PlanInputTitle>
//       <Checkbox id="is_agreement">개인정보 수집 및 이용 동의</Checkbox>
//       <button disabled={isValid} type="submit">
//         회원가입
//       </button>
//     </form>
//   );
// }
