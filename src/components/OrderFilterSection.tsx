import React, { useRef } from 'react';

import { useRouter, useSearchParams } from 'next/navigation';

import ORDER_STRING from '@/libs/constants/orderOptions';
import useDropdown from '@/libs/hooks/useDropdown';

import OrderFilterButton from './OrderFilterButton';

export default function OrderFilterSection() {
  const searchParams = useSearchParams();
  const order = searchParams.get('order');

  const router = useRouter();

  const updateQueryParams = (key: string, value: string, type = 'set') => {
    const currentParams = new URLSearchParams(searchParams);
    const encodeValue = encodeURIComponent(value);

    if (type === 'set') {
      currentParams.set(key, value);
    }

    if (type === 'append') {
      const currentValueList = currentParams.get(key)?.split(' ') || [];
      if (currentValueList?.includes(encodeValue)) {
        const changeValueList = currentValueList.filter((currentValue) => currentValue !== encodeValue);
        currentParams.set(key, changeValueList.join(' '));
      } else {
        currentParams.set(key, `${currentValueList.join(' ')} ${encodeValue}`.trim());
      }
    }

    router.push(`search?${currentParams.toString()}`);
  };

  const orderButtonRef = useRef<HTMLButtonElement>(null);
  const {
    ref: orderListRef,
    isDropdownOpened: isOrderListOpened,
    handleDropdownOpen: handleOrderListOpen,
    handleDropdownClose: handleOrderListClose
  } = useDropdown<HTMLUListElement>({
    onClickInside: (e?: MouseEvent) => {
      if (!e || !(e.target instanceof HTMLLIElement)) {
        return;
      }

      const target = e.target as HTMLLIElement;

      if (target.dataset.order) {
        updateQueryParams('order', target.dataset.order);

        handleOrderListClose();
      }
    },
    onClickOutside: (e?: MouseEvent) => {
      if (e && orderButtonRef.current?.contains(e.target as Node)) {
        console.log('.');
        return;
      }

      handleOrderListClose();
    }
  });

  return (
    <ul className="flex gap-2">
      <li className="relative">
        <OrderFilterButton
          isOpened={isOrderListOpened}
          onClick={() => {
            handleOrderListOpen();
          }}
          ref={orderButtonRef}
        >
          {ORDER_STRING[order || 'createAt']}
        </OrderFilterButton>
        {isOrderListOpened && (
          <ul ref={orderListRef} className="shadow-box absolute top-9 z-10 w-full overflow-hidden">
            <li data-order="createAt" className="w-full cursor-pointer px-3 py-2 text-center hover:bg-gray-03">
              최신순
            </li>
            <li data-order="popularity" className="w-full cursor-pointer px-3 py-2 text-center hover:bg-gray-03">
              인기순
            </li>
          </ul>
        )}
      </li>
    </ul>
  );
}
