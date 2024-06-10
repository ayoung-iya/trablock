import React from 'react';

import Button from '@/components/common/button/Button';

import ImageBox from '../ImageBox';

interface ArrowButtonProps {
  onClick: () => void;
  direction: 'left' | 'right';
  disabled?: boolean;
}

const arrowIcons = {
  left: '/icons/arrow-btn-left.svg',
  right: '/icons/arrow-btn-right.svg'
};

export default function ArrowButton({ onClick, direction, disabled }: ArrowButtonProps) {
  return (
    <Button className="btn-arrow" onClick={onClick} type="button" disabled={disabled}>
      <ImageBox src={arrowIcons[direction]} alt={`${direction} arrow`} width={20} height={20} />
    </Button>
  );
}
