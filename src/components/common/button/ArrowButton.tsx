'use client';

import React from 'react';

interface ArrowButtonProps {
  direction: 'left' | 'right';
  onClick: () => void;
  disabled?: boolean;
}

export default function ArrowButton({ direction, onClick, disabled = false }: ArrowButtonProps) {
  const baseStyles = 'flex justify-center items-center w-12 h-12 rounded-full shadow-md';
  const disabledStyles = 'cursor-not-allowed opacity-50';

  return (
    <button
      type="button"
      onClick={onClick}
      className={`${baseStyles} ${disabled ? disabledStyles : ''}`}
      disabled={disabled}
    >
      {/* 추후 아이콘으로 변경 */}
      {direction === 'left' ? '<' : '>'}
    </button>
  );
}
