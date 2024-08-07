/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable max-len */

'use client';

import { ChangeEventHandler, FormEventHandler, PropsWithChildren, useEffect, useRef, useState } from 'react';

import Link from 'next/link';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import arrowIcon from '@/icons/arrow-left.svg?url';
import SearchIcon from '@/icons/search-custom-color.svg';
import XCircleFilledIcon from '@/icons/x-circle-filled-custom-color.svg';
import { INITIAL_CITIES } from '@/libs/constants/mockCitiesKorean';
import useDropdown from '@/libs/hooks/useDropdown';
import selectMatchingCities from '@/libs/utils/selectMatchingCities';

import ImageBox from './common/ImageBox';

const matchStringBold = (city: string, matchString: string) => {
  const splitCityName = city.split(matchString);
  return splitCityName.length > 1 && matchString ? (
    <>
      {splitCityName[0]}
      <b>{matchString}</b>
      {splitCityName[1]}
    </>
  ) : (
    city
  );
};

export default function HeaderSearchInput({ children }: PropsWithChildren) {
  const params = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const initialSearchString = params.get('keyword');

  const [searchString, setSearchString] = useState(initialSearchString || '');
  const [isShowInMobile, setIsShowInMobile] = useState(false);
  const filteredCities = searchString ? selectMatchingCities(searchString as string) : INITIAL_CITIES;

  const searchInputRef = useRef<HTMLInputElement>(null);
  const { ref, isDropdownOpened, handleDropdownOpen, handleDropdownClose } = useDropdown<HTMLButtonElement>({
    onClickInside: () => {
      handleDropdownClose();
    },
    onClickOutside: (e) => {
      if (searchInputRef.current?.contains(e?.target as Node)) {
        return;
      }

      handleDropdownClose();
    }
  });

  const handleSearchStringReset = () => {
    setSearchString(initialSearchString || '');
  };

  const handleCloseSearchList = () => {
    handleDropdownClose();
    setIsShowInMobile(false);
  };

  const handleXButtonClick = () => {
    setSearchString('');
    searchInputRef.current?.focus();
  };

  const handleLinkClick = (city: string) => () => {
    setSearchString(city);
    handleCloseSearchList();
  };

  const handleMobileHide = () => {
    handleSearchStringReset();
    handleCloseSearchList();
  };

  const handleMobileShow = () => {
    setIsShowInMobile(true);
    searchInputRef.current?.focus();
  };

  const handleSearchStringChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    if (!e.target.value && !searchString) {
      handleDropdownClose();
    }

    handleDropdownOpen();
    setSearchString(e.target.value);
  };

  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    router.push(`/search?keyword=${searchString}`);
    setIsShowInMobile(false);
    handleDropdownClose();
  };

  useEffect(() => {
    setSearchString(initialSearchString || '');
  }, [initialSearchString]);

  if (!pathname.includes('/profile') && !pathname.includes('/search')) {
    return children;
  }

  return (
    <div className="flex w-full justify-end gap-5 md:justify-between md:gap-0">
      <button type="button" onClick={handleMobileShow}>
        <SearchIcon className="size-[22px] fill-black-01 md:hidden" />
      </button>
      <form
        onSubmit={handleSubmit}
        className={`fixed inset-0 z-20 bg-white-01 px-5 pb-[8px] pt-3 max-md:transition-all max-md:duration-500 md:relative md:ml-[71px] md:mr-[47px] md:w-full md:min-w-80 md:max-w-[400px] md:translate-x-0 md:p-0 ${isShowInMobile ? '' : 'translate-x-full'}`}
      >
        <div className="flex-row-center gap-3">
          <ImageBox
            className="size-[18px] md:hidden"
            src={arrowIcon}
            alt="뒤로 가기"
            width={18}
            height={18}
            onClick={handleMobileHide}
          />
          <div className="flex-row-center h-10 w-full rounded-[5px] bg-gray-03 px-3">
            <input
              type="text"
              value={searchString}
              onChange={handleSearchStringChange}
              className="w-full bg-inherit text-sm leading-[180%] focus:outline-none"
              placeholder="여행 계획을 검색해보세요!"
              ref={searchInputRef}
            />
            {searchString && (
              <button type="button" className="mr-[9px]" onClick={handleXButtonClick}>
                <XCircleFilledIcon className="size-4 fill-black-01 md:fill-gray-01" />
              </button>
            )}
            <button type="submit">
              <SearchIcon className="size-[18px] fill-black-01 md:fill-gray-01" />
            </button>
          </div>
        </div>
        <div className="relative w-full shadow-modal">
          <button
            className="md:shadow-box my-5 hidden max-h-[90vh] overflow-y-auto md:top-[52px] md:z-10 md:m-0 md:max-h-44 md:w-full md:overflow-y-auto"
            ref={ref}
            type="button"
          />
          {isDropdownOpened && (
            <div className="absolute top-3 w-[calc(100%-30px)] rounded-[0.3125rem] bg-white-01 shadow-modal max-md:left-[30px] md:w-full">
              {filteredCities?.map((city) => (
                <Link
                  href={`/search?keyword=${city}`}
                  onClick={handleLinkClick(city)}
                  className="flex-row-center h-[41px] cursor-pointer gap-3 rounded-[5px] px-4 py-2 hover:bg-gray-03 md:h-11 md:py-3"
                >
                  <SearchIcon className="size-[18px] fill-black-01 md:size-5 md:fill-gray-01" fill="#2d3136" />
                  <span className="text-sm leading-[180%] md:text-base md:font-medium md:leading-[125%]">
                    {matchStringBold(city, searchString)}
                  </span>
                </Link>
              ))}
            </div>
          )}
        </div>
      </form>
      {children}
    </div>
  );
}
