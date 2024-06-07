import React, { forwardRef } from 'react';

interface DropdownProps extends React.PropsWithChildren {}

const Dropdown = forwardRef(function Dropdown({ children }: DropdownProps, ref: React.ForwardedRef<HTMLUListElement>) {
  return <ul ref={ref}>{children}</ul>;
});

export default Dropdown;
