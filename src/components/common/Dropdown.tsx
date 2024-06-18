import React, { forwardRef } from 'react';

interface DropdownProps extends React.PropsWithChildren {
  className?: string;
  style?: React.CSSProperties;
}

const Dropdown = forwardRef(function Dropdown(
  { className, style, children }: DropdownProps,
  ref: React.ForwardedRef<HTMLUListElement>
) {
  return (
    <ul
      className={`rounded-[0.625rem] bg-white-01 p-5 shadow-[0_0_0.625rem_0_rgba(0,0,0,0.1)] ${className}`}
      style={style}
      ref={ref}
    >
      {children}
    </ul>
  );
});

export default Dropdown;
