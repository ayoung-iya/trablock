import React from 'react';

interface FormLabelProps {
  children: React.ReactNode;
  size?: 'sm' | 'md';
}

const TitleSize = {
  sm: 'font-subtitle-2',
  md: 'font-title-4'
};

export default function PlanInputTitle({ children, size = 'md' }: FormLabelProps) {
  return <h3 className={`${TitleSize[size]} text-black-01`}>{children}</h3>;
}
