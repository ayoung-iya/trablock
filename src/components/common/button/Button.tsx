import React from 'react';

import classNames from 'classnames';

/*
크기가 필요한 버튼은
<Button variant="solid" size="lg"> 으로
크기가 필요하지 않은 기타 버튼은 
<Button variant="sub">커버 이미지 추가</Button> 으로
사용하시면 됩니다
*/

const buttonStyles: { [key: string]: string } = {
  solid: 'bg-primary-01 text-white-01',
  light: 'bg-primary-03 text-primary-01',
  ghost: 'border-solid border-primary-01 bg-white-01 text-primary-01',
  outline: 'border-solid border-gray-02 text-black-02',
  gray: 'bg-gray-02 text-white-01 cursor-not-allowed cursor-not-allowed pointer-events-none',
  red: 'bg-red-01 text-white-01',

  add: 'bg-primary-03 rounded-md h-12',
  addSm: 'w-[17.8125rem]',
  addMd: 'w-[20rem]',
  addLg: 'w-[21.625rem]',

  arrow: 'w-12 h-12 bg-white shadow-md rounded-full',
  sub: 'h-8 py-1.5 px-4 gap-2.5 rounded-md border-solid border-gray-02 bg-white-01 text-black-03 font-caption-2',
  plus: 'w-8 h-8 rounded-full bg-primary-01'
};

const buttonSizes: { [key: string]: string } = {
  sm: 'h-10 py-1.5 px-6 gap-x-2.5 rounded-md font-btn-3',
  md: 'min-w-[20rem] h-12 gap-x-2.5 rounded-md font-btn-2',
  lg: 'min-w-[20rem] h-10 gap-x-2.5 rounded-md font-subtitle-1'
};

interface ButtonProps {
  variant?: keyof typeof buttonStyles;
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
}

export default function Button({
  variant = 'solid',
  size,
  children,
  className,
  type = 'button',
  onClick,
  ...props
}: ButtonProps) {
  const isAddVariant = typeof variant === 'string' && variant.startsWith('add');
  const variantClass = isAddVariant ? `${variant}${size ? size.charAt(0).toUpperCase() + size.slice(1) : ''}` : variant;
  const sizeStyles = isAddVariant ? buttonStyles[variantClass!] || '' : size ? buttonSizes[size] || '' : '';
  const baseClass = 'flex items-center justify-center ';

  const buttonClass = classNames(baseClass, variant ? buttonStyles[variant] : '', sizeStyles, className);

  return (
    // eslint-disable-next-line react/button-has-type
    <button className={buttonClass} type={type} onClick={onClick} {...props}>
      {children}
    </button>
  );
}
