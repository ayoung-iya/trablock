'use client';

import { ChangeEventHandler, FormEventHandler, useRef, useState } from 'react';

import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';

import arrowIcon from '@/icons/arrow-left.svg?url';
import SearchIcon from '@/icons/search-custom-color.svg';
import XCircleFilledIcon from '@/icons/x-circle-filled-custom-color.svg';
import { INITIAL_CITIES } from '@/libs/constants/mockCitiesKorean';
import useDropdown from '@/libs/hooks/useDropdown';
import selectMatchingCities from '@/libs/utils/selectMatchingCities';

import ImageBox from './common/ImageBox';

export default function HeaderSearchInput() {
  const params = useSearchParams();
  const router = useRouter();
  const initialSearchString = params.get('keyword');

  const [searchString, setSearchString] = useState(initialSearchString || '');
  const [isShowInMobile, setIsShowInMobile] = useState(false);
  const filteredCities = searchString ? selectMatchingCities(searchString as string) : INITIAL_CITIES;

  const searchInputRef = useRef<HTMLInputElement>(null);
  const { ref, isDropdownOpened, handleDropdownOpen, handleDropdownClose } = useDropdown<HTMLUListElement>({
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

  return (
    <>
      <button
        type="button"
        onClick={() => {
          setIsShowInMobile(true);
          searchInputRef.current?.focus();
        }}
      >
        <SearchIcon className="size-[22px] fill-black-01 md:hidden" />
      </button>

      <form
        onSubmit={handleSubmit}
        // eslint-disable-next-line max-len
        className={`fixed inset-0 z-20 bg-white-01 px-5 pb-[8px] pt-3 transition-all duration-500 md:relative md:ml-[71px] md:mr-[47px] md:w-full md:min-w-80 md:max-w-[400px] md:translate-x-0 md:p-0 ${isShowInMobile ? '' : 'translate-x-full'}`}
      >
        <div className="flex-row-center gap-3">
          <ImageBox
            className="size-[18px] md:hidden"
            src={arrowIcon}
            alt="뒤로 가기"
            width={18}
            height={18}
            onClick={() => {
              handleSearchStringReset();
              setIsShowInMobile(false);
            }}
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
              <button
                type="button"
                className="mr-[9px]"
                onClick={() => {
                  handleSearchStringReset();
                  searchInputRef.current?.focus();
                }}
              >
                <XCircleFilledIcon className="size-4 fill-black-01 md:fill-gray-01" fill="#a0aab8" />
              </button>
            )}
            <button type="submit">
              <SearchIcon className="size-[18px] fill-black-01 md:fill-gray-01" fill="#2d3136" />
            </button>
          </div>
        </div>
        <ul
          // eslint-disable-next-line max-len
          className={`md:shadow-box my-5 max-h-[90vh] overflow-y-auto ${isDropdownOpened ? 'md:absolute' : 'md:hidden'} md:top-[52px] md:z-10 md:m-0 md:max-h-44 md:w-full md:overflow-y-auto`}
          ref={ref}
        >
          {filteredCities?.map((city) => {
            const splitCityName = city.split(searchString);
            const cityName =
              splitCityName.length > 1 && searchString ? (
                <>
                  {splitCityName[0]}
                  <b>{searchString}</b>
                  {splitCityName[1]}
                </>
              ) : (
                city
              );

            return (
              <li>
                <Link
                  href={`/search?keyword=${city}`}
                  onClick={() => {
                    setSearchString(city);
                    setIsShowInMobile(false);
                  }}
                  // eslint-disable-next-line max-len
                  className="flex-row-center h-[41px] cursor-pointer gap-3 rounded-[5px] px-4 py-2 hover:bg-gray-03 md:h-11 md:py-3"
                >
                  <SearchIcon className="size-[18px] fill-black-01 md:size-5 md:fill-gray-01" fill="#2d3136" />
                  <span className="text-sm leading-[180%] md:text-base md:font-medium md:leading-[125%]">
                    {cityName}
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </form>
    </>
  );
}
