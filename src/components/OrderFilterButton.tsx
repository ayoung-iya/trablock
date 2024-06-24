import React, { forwardRef } from 'react';

import Chevron from '@/icons/chevron-custom-color.svg';
import chevron from '@/icons/chevron-down.svg?url';

import ImageBox from './common/ImageBox';

interface OrderFilterButtonProps {
  isOpened: boolean;
  children: React.ReactNode;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  isFiltering?: boolean;
}

const OrderFilterButton = forwardRef(function OrderFilterButton(
  { onClick, isOpened, isFiltering, children }: OrderFilterButtonProps,
  ref: React.ForwardedRef<HTMLButtonElement>
) {
  return (
    <button
      type="button"
      // eslint-disable-next-line max-len
      className={`flex-row-center h-8 gap-1 rounded-[5px] border border-solid border-gray-02 px-3 py-1 md:px-4 md:py-[9px] ${isFiltering ? 'border-secondary-01' : ''}`}
      ref={ref}
      onClick={onClick}
    >
      <span className={`flex-shrink-0 whitespace-nowrap ${isFiltering ? 'text-secondary-01' : ''}`}>{children}</span>
      {!isFiltering && (
        <ImageBox
          className={`size-[14px] flex-shrink-0 ${isOpened ? 'rotate-180' : ''}`}
          src={chevron}
          alt="화살표"
          width={18}
          height={18}
        />
      )}
      {isFiltering && (
        <Chevron className={`size-[14px] flex-shrink-0 ${isOpened ? 'rotate-180' : ''}`} fill="#F5BA07" />
      )}
    </button>
  );
});

export default OrderFilterButton;
