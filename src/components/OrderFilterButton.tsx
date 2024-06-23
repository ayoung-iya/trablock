import React, { forwardRef } from 'react';

import chevron from '@/icons/chevron-down.svg?url';

import ImageBox from './common/ImageBox';

interface OrderFilterButtonProps {
  isOpened: boolean;
  children: React.ReactNode;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
}

const OrderFilterButton = forwardRef(function OrderFilterButton(
  { onClick, isOpened, children }: OrderFilterButtonProps,
  ref: React.ForwardedRef<HTMLButtonElement>
) {
  return (
    <button
      type="button"
      className="flex-row-center h-8 gap-1 rounded-[5px] border border-solid border-gray-02 px-3 py-1"
      ref={ref}
      onClick={onClick}
    >
      {children}
      <ImageBox
        className={`size-[14px] ${isOpened ? 'rotate-180' : ''}`}
        src={chevron}
        alt="화살표"
        width={18}
        height={18}
      />
    </button>
  );
});

export default OrderFilterButton;
