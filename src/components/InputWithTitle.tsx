import React from 'react';

import PlanInputTitle from './PlanInputTitle';

interface InputFieldProps {
  title: string;
  size?: 'sm' | 'md';
  children: React.ReactNode;
}

const WrapperGap = {
  sm: 'gap-3',
  md: 'gap-[9px] md:gap-3'
};

export default function InputWithTitle({ title, size = 'md', children }: InputFieldProps) {
  return (
    <div className={`flex flex-col ${WrapperGap[size]}`}>
      <PlanInputTitle size={size}>{title}</PlanInputTitle>
      {children}
    </div>
  );
}
