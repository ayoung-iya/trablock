import React from 'react';

interface ButtonProps {
  onClick: () => void;
  variant?: 'solid' | 'light' | 'ghost' | 'outline' | 'gary' | 'red';
  size?: 'sm' | 'lg';
  disabled?: boolean;
  children: React.ReactNode;
}

export default function Button({ children, onClick, variant = 'solid', size = 'lg', disabled = false }: ButtonProps) {
  // 기본스타일
  const baseStyles = 'flex justify-center items-center items-center gap-[10px] rounded-[5px]';

  return (
    <button
      type="button"
      onClick={onClick}
      className={`${baseStyles} btn-${variant} btn-${size} ${disabled ? 'disabled' : ''}`}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
