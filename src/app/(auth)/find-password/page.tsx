// 'use client';

// import SignInput from '@/components/common/input/SignInput';
// import { useForm, SubmitHandler, FieldValues } from 'react-hook-form';

// import Button from '@/components/common/button/Button';
// import { validate } from '@/libs/constants/validation';
// export default function find_password() {
//   const {
//     register,
//     handleSubmit,
//     watch,
//     formState: { errors, isValid }
//   } = useForm({ mode: 'onBlur', defaultValues: { username: '' } });

//   const registerList = {
//     username: register('username', validate.username)
//   };
//   const onSubmit: SubmitHandler<FieldValues> = () => {};
//   return (
//     <div>
//       <p>비밀번호 찾기</p>
//       <form>
//         <SignInput
//           label="가입한 이메일 주소"
//           id="username"
//           errorMessage={errors.username?.message as string}
//           {...registerList.username}
//         />
//       </form>
//     </div>
//   );
// }
