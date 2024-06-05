'use client';

import React from 'react';

interface SubButtonProps {
  onClick: () => void;
  disabled?: boolean;
  children: React.ReactNode;
}

export default function SubButton({ onClick, disabled = false, children }: SubButtonProps) {
  const baseStyles =
    'flex justify-center items-center h-8 px-4 gap-2 rounded-md border-2 border-gray-500 text-gray-700  bg-white';
  const disabledStyles = 'disabled:cursor-not-allowed disabled:opacity-50';

  return (
    <button type="button" onClick={onClick} className={`${baseStyles} ${disabledStyles}`} disabled={disabled}>
      {children}
    </button>
  );
}
