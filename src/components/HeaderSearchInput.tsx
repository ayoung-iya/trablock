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

export default function HeaderSearchInput({ isMobile = false }: { isMobile?: boolean }) {
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

  if (isMobile) {
    return (
      <>
        <button
          type="button"
          onClick={() => {
            setIsShowInMobile(true);
            searchInputRef.current?.focus();
          }}
        >
          <SearchIcon className="size-[22px] md:hidden" fill="#2d3136" />
        </button>

        <form
          onSubmit={handleSubmit}
          // eslint-disable-next-line max-len
          className={`fixed inset-0 z-20 bg-white-01 px-5 pb-[8px] pt-3 transition-all duration-500 md:hidden ${isShowInMobile ? '' : 'translate-x-full'}`}
        >
          <div className="flex-row-center gap-3">
            <ImageBox
              className="size-[18px]"
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
              <button type="submit">
                <SearchIcon className="size-[18px]" fill="#2d3136" />
              </button>
            </div>
          </div>
          <ul className="my-5 max-h-[90vh] overflow-y-auto md:hidden">
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
                    className="flex-row-center h-[41px] cursor-pointer gap-3 py-2 hover:bg-gray-03"
                  >
                    <SearchIcon className="size-[18px] md:hidden" fill="#2d3136" />
                    <span className="text-sm leading-[180%]">{cityName}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </form>
      </>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="relative ml-[71px] mr-[47px] hidden w-full min-w-80 max-w-[400px] md:block"
    >
      <div className="flex-row-center gap-3">
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
              <XCircleFilledIcon className="size-4" fill="#a0aab8" />
            </button>
          )}
          <button type="submit">
            <SearchIcon className="size-[18px]" fill="#a0aab8" />
          </button>
        </div>
      </div>
      {isDropdownOpened && (
        <ul className="shadow-box absolute top-[52px] z-10 max-h-44 w-full overflow-y-auto" ref={ref}>
          {filteredCities?.map((city) => {
            // 입력한 부분과 일치하는 글자는 굵게 하기 위해서
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
                    handleDropdownClose();
                  }}
                  className="flex-row-center h-11 cursor-pointer gap-3 px-4 py-3 hover:bg-gray-03"
                >
                  <SearchIcon className="size-5" fill="#a0aab8" />
                  <span className="text-base font-medium leading-[125%]">{cityName}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      )}
    </form>
  );
}
