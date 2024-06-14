import React, { forwardRef } from 'react';

interface DropdownProps extends React.PropsWithChildren {}

const Dropdown = forwardRef(function Dropdown({ children }: DropdownProps, ref: React.ForwardedRef<HTMLUListElement>) {
  return (
    <ul className="rounded-[10px] bg-white-01 p-5 shadow-[0_0_10px_0_rgba(0,0,0,0.1)]" ref={ref}>
      {children}
    </ul>
  );
});

export default Dropdown;
