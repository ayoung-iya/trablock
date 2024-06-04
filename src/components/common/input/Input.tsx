import React, { forwardRef } from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  id: string;
  isError?: boolean;
  variant: 'sign' | 'search';
}

const INPUT_STYLE = {
  sign: {
    default: 'bg-white-01 w-full h-12 px-3 pb-3 pt-[14px] rounded-[5px] border border-gray-02',
    focus: 'focus:border-primary-01',
    error: 'border-red-01 focus:border-red-01',
    text: 'font-body-2 text-black-01'
  },
  search: {
    default: 'bg-inherit w-full',
    focus: '',
    error: '',
    text: 'font-caption-1 text-black-02'
  }
};

const Input = forwardRef(function Input(
  { id, variant, isError, ...rest }: InputProps,
  ref: React.ForwardedRef<HTMLInputElement>
) {
  const inputStyle = INPUT_STYLE[variant];

  return (
    <input
      id={id}
      // eslint-disable-next-line max-len
      className={`peer outline-none ${inputStyle.default} ${inputStyle.focus} ${(isError && inputStyle.error) || ''} ${inputStyle.text}`}
      ref={ref}
      {...rest}
    />
  );
});

export default Input;
