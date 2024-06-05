import React from 'react';

interface ButtonProps {
  onClick: () => void;
  variant?: 'solid' | 'light' | 'ghost' | 'outline' | 'gray' | 'red';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

// 변형 스타일
const variantStyles = {
  solid: 'bg-primary-01 text-white-01',
  light: 'bg-primary-03 text-primary-01',
  ghost: 'border border-primary-01 bg-white-01 text-primary-01',
  outline: 'border border-gray-02 text-black-02',
  gray: 'bg-gray-02 text-white-01 cursor-not-allowed',
  red: 'bg-red-01 text-white-01'
};

// 크기 스타일
const sizeStyles = {
  sm: 'px-[24px] py-2 max-h-[56px]',
  md: 'max-w-[320px] max-h-[48px]',
  lg: 'max-w-[346px] max-h-[40px]'
};

export default function Button({ children, onClick, variant = 'solid', size = 'lg' }: ButtonProps) {
  // 기본스타일
  const baseStyles = 'flex justify-center items-center items-center gap-[10px] rounded-[5px]';
  return (
    <button type="button" onClick={onClick} className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]}`}>
      {children}
    </button>
  );
}
