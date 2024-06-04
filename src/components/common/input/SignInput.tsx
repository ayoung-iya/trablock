import React, { forwardRef } from 'react';

import Input from './Input';

interface SignInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  id: string;
  label?: string;
  errorMessage?: string;
}

const SignInput = forwardRef(function SignInput(
  { label, id, errorMessage, ...rest }: SignInputProps,
  ref: React.ForwardedRef<HTMLInputElement>
) {
  const isError = !!errorMessage;
  const labelErrorStyle = 'text-red-01 peer-focus-within:text-red-01';

  return (
    <>
      <div className="flex flex-col-reverse gap-1">
        <Input id={id} variant="sign" ref={ref} {...rest} isError={isError} />
        <label
          htmlFor={id}
          className={`font-subtitle-3 text-gray-01 peer-focus-within:text-primary-01 ${isError && labelErrorStyle}`}
        >
          {label}
        </label>
      </div>
      {isError && <p className="font-caption-3 mt-2 text-red-01">{errorMessage}</p>}
    </>
  );
});

export default SignInput;
