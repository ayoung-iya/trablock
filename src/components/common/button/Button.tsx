'use client';

import React from 'react';

import classNames from 'classnames';

/*
1. 크기(size) 옵션이 필요한 버튼:
<Button className="solid lg">등록</Button>
2. 크기(size) 옵션이 필요하지 않은 버튼:
<Button className="sub">커버 이미지 추가</Button>

각 버튼의 variant 속성에 따라 스타일이 적용됩니다. 
size가 필요한 속성은 sm, md, lg 중 하나를 사용할 수 있습니다.
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
  children: React.ReactNode;
  className?: string;
  onClick: () => void;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
}

export default function Button({ children, className = '', onClick, type = 'button', disabled = false }: ButtonProps) {
  const classes = className.split(' ');
  const variantClass = classes.find((cls) => Object.keys(buttonStyles).includes(cls)) || 'solid';
  const sizeClass = classes.find((cls) => Object.keys(buttonSizes).includes(cls)) || '';
  const sizeStyles = sizeClass ? buttonSizes[sizeClass] : '';
  const baseClass = 'flex items-center justify-center';
  const disabledClass = disabled ? 'cursor-not-allowed pointer-events-none' : '';

  const buttonClass = classNames(baseClass, buttonStyles[variantClass], sizeStyles, disabledClass, className);

  return (
    // eslint-disable-next-line react/button-has-type
    <button className={buttonClass} type={type} onClick={onClick} disabled={disabled}>
      {children}
    </button>
  );
}
