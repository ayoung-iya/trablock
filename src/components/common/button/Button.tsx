import React from 'react';

interface ButtonProps {
  onClick: () => void;
  variant?: 'default' | 'variant2' | 'variant3' | 'ghost' | 'danger';
  size?: 'sm' | 'lg';
  disabled?: boolean;
  children: React.ReactNode;
}

export default function Button({ children, onClick, variant = 'default', size = 'lg', disabled = false }: ButtonProps) {
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
