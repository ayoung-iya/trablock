'use client';

import { useForm } from 'react-hook-form';

import Input from '@/components/common/input/Input';

function Ayoung() {
  const { register } = useForm({
    defaultValues: {
      email: '',
      password: ''
    }
  });

  const email = register('email', { required: true });
  const password = register('password', { required: true });

  // console.dir(email);

  // return <input {...email} placeholder="email" />;
  return (
    <form>
      <Input type="email" ref={email.ref} placeholder="email" />
      <Input type="password" ref={password.ref} placeholder="password" />
      <Input type="checkbox" />
    </form>
  );
}

export default Ayoung;
