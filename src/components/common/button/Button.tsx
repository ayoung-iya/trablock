'use client';

import React from 'react';

import classNames from 'classnames';

interface ButtonProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
}

export default function Button({ children, className = '', onClick, type = 'button', disabled = false }: ButtonProps) {
  const baseClass = 'flex-row-center justify-center';
  const disabledClass = disabled ? 'cursor-not-allowed pointer-events-none' : '';

  const buttonClass = classNames(baseClass, className, disabledClass);

  return (
    // eslint-disable-next-line react/button-has-type
    <button className={buttonClass} type={type} onClick={onClick} disabled={disabled}>
      {children}
    </button>
  );
}
