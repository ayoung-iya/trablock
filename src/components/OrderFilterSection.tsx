import React, { useRef } from 'react';

import { useRouter, useSearchParams } from 'next/navigation';

import TagCheckboxList from '@/components/TagCheckboxList';
import ORDER_STRING from '@/libs/constants/orderOptions';
import { TRAVEL_STYLE, WITH_WHOM } from '@/libs/constants/travelTags';
import useDropdown from '@/libs/hooks/useDropdown';

import OrderFilterButton from './OrderFilterButton';

const decodeFilterStringToArray = (filterString: string | null) => {
  if (!filterString) {
    return [];
  }

  return filterString.split(' ').map((filterItem) => decodeURIComponent(filterItem));
};

export default function OrderFilterSection() {
  const searchParams = useSearchParams();
  const order = searchParams.get('order');
  const companion = searchParams.get('companion');
  const travelStyle = searchParams.get('travel-style');

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

  const handleClickFilterCheckbox: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    updateQueryParams(e.target.name, e.target.value, 'append');
  };

  const orderButtonRef = useRef<HTMLButtonElement>(null);
  const filterButtonRef = useRef<HTMLButtonElement>(null);
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

  const {
    ref: filterListRef,
    isDropdownOpened: isFilterListOpened,
    handleDropdownOpen: handleFilterListOpen,
    handleDropdownClose: handleFilterListClose
  } = useDropdown<HTMLDivElement>({
    onClickInside: () => {},
    onClickOutside: (e?: MouseEvent) => {
      if (e && filterButtonRef.current?.contains(e.target as Node)) {
        return;
      }

      handleFilterListClose();
    }
  });

  return (
    <ul className="flex gap-2">
      <li className="relative">
        <OrderFilterButton
          isOpened={isOrderListOpened}
          onClick={() => {
            handleOrderListOpen();
            handleFilterListClose();
          }}
          ref={orderButtonRef}
        >
          {ORDER_STRING[order || 'latest']}
        </OrderFilterButton>
        {isOrderListOpened && (
          <ul ref={orderListRef} className="shadow-box absolute top-9 w-full overflow-hidden">
            <li data-order="latest" className="w-full cursor-pointer px-3 py-2 text-center hover:bg-gray-03">
              최신순
            </li>
            <li data-order="popular" className="w-full cursor-pointer px-3 py-2 text-center hover:bg-gray-03">
              인기순
            </li>
          </ul>
        )}
      </li>
      <li className="relative">
        <OrderFilterButton
          isOpened={isFilterListOpened}
          onClick={() => {
            handleOrderListClose();
            handleFilterListOpen();
          }}
          ref={filterButtonRef}
        >
          필터
        </OrderFilterButton>
        {isFilterListOpened && (
          <div
            ref={filterListRef}
            className="shadow-box absolute right-0 top-9 w-[90vw] max-w-[590px] p-10 pb-[76px] filter"
          >
            <h3 className="font-title-4 mb-5">해시태그</h3>
            <h4 className="font-subtitle-2 mb-3">누구와</h4>
            <TagCheckboxList
              tagList={WITH_WHOM}
              name="companion"
              selectedValueList={decodeFilterStringToArray(companion)}
              onChangeCheckbox={handleClickFilterCheckbox}
            />
            <h4 className="font-subtitle-2 mb-3 mt-10">여행스타일</h4>
            <TagCheckboxList
              tagList={TRAVEL_STYLE}
              name="travel-style"
              selectedValueList={decodeFilterStringToArray(travelStyle)}
              onChangeCheckbox={handleClickFilterCheckbox}
            />
          </div>
        )}
      </li>
    </ul>
  );
}
