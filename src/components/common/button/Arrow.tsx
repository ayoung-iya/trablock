import React from 'react';

import Button from '@/components/common/button/Button';
import ArrowBtnLeft from '@/icons/arrow-btn-left.svg';
import ArrowBtnRight from '@/icons/arrow-btn-right.svg';

interface ArrowButtonProps {
  onClick: () => void;
  disabled?: boolean;
  direction?: 'left' | 'right';
}

export default function ArrowButton({ onClick, disabled, direction = 'left' }: ArrowButtonProps) {
  const fillColor = disabled ? '#DDE2E9' : '#363636';
  const ArrowIcon = direction === 'left' ? ArrowBtnLeft : ArrowBtnRight;

  return (
    <Button className="btn-arrow" onClick={onClick} type="button" disabled={disabled}>
      <ArrowIcon fill={fillColor} width="20" height="20" />
    </Button>
  );
}
