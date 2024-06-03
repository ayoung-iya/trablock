'use client';

import React from 'react';

interface OutlineButtonProps {
  onClick: () => void;
  disabled?: boolean;
  children: React.ReactNode;
}

export default function OutlineButton({ onClick, disabled = false, children }: OutlineButtonProps) {
  const baseStyles =
    'flex justify-center items-center h-8 px-4 gap-2 rounded-md border-2 border-gray-500 text-gray-700  bg-white';
  const disabledStyles = 'cursor-not-allowed opacity-50';

  return (
    <button
      type="button"
      onClick={onClick}
      className={`${baseStyles} ${disabled ? disabledStyles : ''}`}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
