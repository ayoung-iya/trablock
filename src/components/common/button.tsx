import React from 'react';

interface ButtonProps {
  text?: string;
  onClick: () => void;
  variant?: 'primary' | 'secondary' | 'tertiary';
  size?: 'small' | 'medium' | 'large';
  icon?: string;
  disabled?: boolean;
}

export default function Button({
  text,
  onClick,
  variant = 'primary',
  size = 'medium',
  icon,
  disabled = false
}: ButtonProps) {
  // 모든 버튼에 기본으로 들어가는 스타일
  const baseStyles = 'inline-flex items-center justify-center';

  /* 버튼 스타일 디자인에 따라 추후 수정 */

  // 버튼 스타일에 따라 지정
  const VARIANT_STYLES = {
    primary: 'bg-blue-500 text-white',
    secondary: 'bg-blue-600 text-white',
    tertiary: 'bg-blue-700 text-white'
  };

  // 버튼 사이즈
  const SIZE_STYLES = {
    small: 'px-2 py-1 text-sm',
    medium: 'px-4 py-2 text-base',
    large: 'px-6 py-3 text-lg'
  };

  return (
    <button
      type="button"
      onClick={onClick}
      className={`${baseStyles} ${VARIANT_STYLES[variant]} ${SIZE_STYLES[size]} ${disabled ? 'opacity-50' : ''}`}
      disabled={disabled}
    >
      {/* 아이콘 이미지 링크가 있으면 이미지로 랜더링 될 수 있도록 추후 수정 */}
      {icon}
      {text}
    </button>
  );
}
