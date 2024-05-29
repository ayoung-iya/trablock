import { ForwardedRef, InputHTMLAttributes, forwardRef } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

const Input = forwardRef(function Input({ label, id, ...rest }: InputProps, ref: ForwardedRef<HTMLInputElement>) {
  return (
    <>
      {label && <label htmlFor={id}>{label}</label>}
      <input id={id} className="outline-none" ref={ref} {...rest} />
    </>
  );
});

export default Input;
