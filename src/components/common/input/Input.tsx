import React, { forwardRef } from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  id: string;
  label?: string;
}

const Input = forwardRef(function Input({ label, id, ...rest }: InputProps, ref: React.ForwardedRef<HTMLInputElement>) {
  return (
    <>
      {label && <label htmlFor={id}>{label}</label>}
      <input id={id} className="outline-none" ref={ref} {...rest} />
    </>
  );
});

export default Input;
