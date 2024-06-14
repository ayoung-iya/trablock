import React, { forwardRef } from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  id: string;
}

const Input = forwardRef(function Input(
  { id, className, ...rest }: InputProps,
  ref: React.ForwardedRef<HTMLInputElement>
) {
  return <input id={id} className={`outline-none ${className}`} ref={ref} {...rest} />;
});

export default Input;
