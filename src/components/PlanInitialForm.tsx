'use client';

import React, { useEffect, useRef, useState } from 'react';

import { useRouter } from 'next/navigation';
import { DateRange } from 'react-day-picker';
import { Controller, useForm } from 'react-hook-form';

import type { ArticleFormData, CityInfo } from '@/apis/useArticle/article.type';
import ArticleService from '@/apis/useArticle/fetch';
import BadgeWithDelete from '@/components/badge/badgeWithDelete';
import CitySearchList from '@/components/CitySearchList';
import Button from '@/components/common/button/Button';
import ImageBox from '@/components/common/ImageBox';
import ExpenseInput from '@/components/common/input/ExpenseInput';
import Input from '@/components/common/input/Input';
import DatePicker from '@/components/DayPicker';
import InputWithTitle from '@/components/InputWithTitle';
import PlanInputTitle from '@/components/PlanInputTitle';
import TagCheckboxList from '@/components/TagCheckboxList';
import calendarIcon from '@/icons/calendar.svg?url';
import SearchIcon from '@/icons/search.svg?url';
import { TRAVEL_STYLE, WITH_WHOM } from '@/libs/constants/travelTags';
import useDebounce from '@/libs/hooks/useDebounce';
import useDropdown from '@/libs/hooks/useDropdown';
import { dateDotFormat } from '@/libs/utils/dateFormatter';

export default function PlanInitialForm({
  articlePageId,
  articleData
}: {
  articlePageId?: string;
  articleData: ArticleFormData;
}) {
  const router = useRouter();
  const [isEditFinished, setIsEditFinished] = useState(false);

  const {
    control,
    register,
    getValues,
    handleSubmit,
    formState: { isValid }
  } = useForm<ArticleFormData>({
    defaultValues: {
      title: articleData?.title || '',
      location: articleData?.location || [],
      date: articleData?.date || {},
      travelCompanion: articleData?.travelCompanion || '혼자서',
      travelStyle: articleData?.travelStyle || []
    }
  });

  const [searchString, setSearchString] = useState('');
  const debounceSearchString = useDebounce(searchString, 300);

  const searchInputRef = useRef<HTMLInputElement>(null);
  const {
    ref: searchListRef,
    isDropdownOpened: isSearchListOpened,
    handleDropdownOpen: handleSearchListOpen,
    handleDropdownClose: handleSearchListClose
  } = useDropdown<HTMLUListElement>({
    onClickInside: () => {},
    onClickOutside: (e) => {
      if (searchInputRef.current && searchInputRef.current.contains(e?.target as Node)) {
        return;
      }

      setSearchString('');
      handleSearchListClose();
    }
  });
  const {
    ref: calendarRef,
    isDropdownOpened: isCalendarOpened,
    handleDropdownOpen: handleCalendarOpen,
    handleDropdownClose: handleCalendarClose
  } = useDropdown<HTMLDivElement>({
    onClickInside: () => {},
    onClickOutside: () => {
      handleCalendarClose();
    }
  });

  const isEditPage = !!articlePageId;

  const date = getValues('date');
  const title = register('title', { required: true });
  register('location', { validate: { moreThanOne: (placeList) => placeList.length > 0 } });
  register('date', { validate: { dateRange: (dateRange) => !!dateRange?.from && !!dateRange?.to } });
  register('travelCompanion', { required: true });

  const handleSearchStringChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setSearchString(e.target.value);

    if (!e.target.value && !searchString) {
      handleSearchListClose();
      return;
    }

    handleSearchListOpen();
  };

  const handleCitySearchListClose = () => {
    handleSearchListClose();
    setSearchString('');
  };

  const handleCalendarInputClick = () => {
    if (isEditPage) {
      return;
    }

    handleCalendarOpen();
  };

  const onSubmit = async (formData: ArticleFormData) => {
    if (isEditPage) {
      try {
        await ArticleService.putArticle(articlePageId, formData);
      } catch (err) {
        // TODO: 에러처리
        console.log(err);
      } finally {
        setIsEditFinished(true);
      }

      return;
    }

    try {
      const { articleId } = await ArticleService.postRegisterArticle(formData);

      // TODO: 여행 상세 페이지로 이동
      router.push(`/plan/detail/${articleId}`);
    } catch (err) {
      // TODO: 에러처리
      console.log(err);
    }
  };

  useEffect(() => {
    console.log('isEditFinished', isEditFinished);
    if (isEditFinished) window.location.href = `/plan/detail/${articlePageId}`;
  }, [isEditFinished]);

  return (
    <form className="flex w-full min-w-80 flex-col gap-10 pt-10 md:pt-[3.75rem]" onSubmit={handleSubmit(onSubmit)}>
      <InputWithTitle title="여행 타이틀">
        <Input
          type="text"
          id="title"
          className="h-12 w-full rounded-[0.3125rem] border border-gray-02 px-4"
          placeholder="멋진 여행 타이틀을 지어보세요!"
          {...title}
        />
      </InputWithTitle>

      <div>
        <InputWithTitle title="여행 장소">
          <div className="flex-row-center h-12 w-full gap-1 rounded-[0.3125rem] border border-gray-02 px-4">
            <Input
              type="text"
              id="place"
              className="w-full"
              placeholder="도시명을 입력하세요"
              value={searchString}
              onChange={handleSearchStringChange}
              autoComplete="off"
              ref={searchInputRef}
            />
            <ImageBox src={SearchIcon} alt="돋보기" className="size-[1.125rem]" width={18} height={18} />
          </div>
        </InputWithTitle>
        <Controller
          control={control}
          name="location"
          render={({ field: { value, onChange } }) => {
            return (
              <div className={`relative ${value.length ? 'pt-2' : ''}`}>
                <div className="flex-row-center flex-wrap gap-1">
                  {value.map(({ placeId, city }) => (
                    <BadgeWithDelete
                      key={placeId}
                      onClickDeleteButton={() =>
                        onChange(value.filter(({ placeId: selectedPlaceId }) => selectedPlaceId !== placeId))
                      }
                    >
                      {city}
                    </BadgeWithDelete>
                  ))}
                </div>
                {isSearchListOpened && (
                  <CitySearchList
                    searchString={debounceSearchString}
                    selectedCityList={value}
                    onClickCity={(city: CityInfo[]) => {
                      onChange(city);
                      handleCitySearchListClose();
                    }}
                    ref={searchListRef}
                  />
                )}
              </div>
            );
          }}
        />
      </div>

      <div>
        <InputWithTitle title="여행 날짜">
          <div
            // eslint-disable-next-line max-len
            className={`flex-row-center h-12 w-full gap-1 rounded-[0.3125rem] border border-gray-02 px-4 ${isEditPage ? 'bg-gray-03' : ''}`}
          >
            <Input
              type="text"
              id="place"
              className={`w-full cursor-pointer ${isEditPage ? 'bg-gray-03 hover:cursor-not-allowed' : ''}`}
              placeholder="여행 날짜를 선택하세요"
              onClick={handleCalendarInputClick}
              readOnly
              value={date?.from && date?.to && `${dateDotFormat(date.from)} ~ ${dateDotFormat(date.to)}`}
            />
            <button
              type="button"
              onClick={handleCalendarInputClick}
              className={`${isEditPage ? 'hover:cursor-not-allowed' : ''}`}
            >
              <ImageBox src={calendarIcon} alt="달력" className="size-[1.125rem]" width={18} height={18} />
            </button>
          </div>
        </InputWithTitle>
        <div className="relative">
          {isCalendarOpened && (
            <Controller
              control={control}
              name="date"
              render={({ field: { value, onChange } }) => (
                <DatePicker
                  initialRange={value}
                  onDateRangeChange={(range: DateRange | undefined) => {
                    onChange(range);
                    handleCalendarClose();
                  }}
                  ref={calendarRef}
                />
              )}
            />
          )}
        </div>
      </div>

      <InputWithTitle title="여행 경비">
        <div className="flex-row-center h-12 w-full justify-between rounded-[0.3125rem] border border-gray-02 px-4">
          <Controller
            control={control}
            name="expense"
            rules={{ required: false, pattern: /^-?\d+$/ }}
            render={({ field: { value, onChange } }) => (
              <ExpenseInput
                id="expense"
                placeholder="여행 경비를 입력하세요"
                initialValue={value || 0}
                onChangeExpense={onChange}
                onlyInteger
              />
            )}
          />
          <span>원</span>
        </div>
      </InputWithTitle>

      <div className="flex flex-col gap-5">
        <PlanInputTitle>여행 태그</PlanInputTitle>
        <div className="flex flex-col gap-10">
          <InputWithTitle title="누구와" size="sm">
            <Controller
              control={control}
              name="travelCompanion"
              render={({ field: { value, onChange } }) => {
                const handleCheckboxChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
                  onChange(e.target.value);
                };

                return (
                  <TagCheckboxList
                    tagList={WITH_WHOM}
                    selectedValueList={value}
                    onChangeCheckbox={handleCheckboxChange}
                  />
                );
              }}
            />
          </InputWithTitle>

          <InputWithTitle title="여행 스타일" size="sm">
            <Controller
              control={control}
              name="travelStyle"
              render={({ field: { value, onChange } }) => {
                const handleCheckboxChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
                  const newValue = value.includes(e.target.value)
                    ? value.filter((v) => v !== e.target.value)
                    : [...value, e.target.value];
                  onChange(newValue);
                };

                return (
                  <TagCheckboxList
                    tagList={TRAVEL_STYLE}
                    selectedValueList={value}
                    onChangeCheckbox={handleCheckboxChange}
                  />
                );
              }}
            />
          </InputWithTitle>
        </div>
      </div>

      <Button type="submit" className={`${isValid ? 'btn-solid' : 'btn-gray'} btn-lg sm:h-14`} disabled={!isValid}>
        {isEditPage ? '일정 수정하기' : '일정 짜러 가기'}
      </Button>
    </form>
  );
}
