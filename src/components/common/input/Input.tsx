import React, { forwardRef } from 'react';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  id: string;
  formatter?: ((value: string) => string) | null;
}

const Input = forwardRef(function Input(
  { id, className, onChange = () => {}, formatter = null, ...rest }: InputProps,
  ref: React.ForwardedRef<HTMLInputElement>
) {
  return (
    <input
      id={id}
      className={`outline-none ${className}`}
      ref={ref}
      onChange={(e) => {
        if (!formatter) return onChange(e);
        const newEvent = {
          ...e,
          target: {
            ...e.target,
            value: formatter(e.target.value)
          }
        };
        return onChange(newEvent);
      }}
      {...rest}
    />
  );
});

export default Input;
