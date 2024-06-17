'use client';

import React, { useState } from 'react';

import { DateRange } from 'react-day-picker';
import { Controller, useForm } from 'react-hook-form';

import BadgeWithDelete from '@/components/badge/badgeWithDelete';
import ImageBox from '@/components/common/ImageBox';
import ExpenseInput from '@/components/common/input/ExpenseInput';
import Input from '@/components/common/input/Input';
import DatePicker from '@/components/DayPicker';
import InputWithTitle from '@/components/InputWithTitle';
import PlanInputTitle from '@/components/PlanInputTitle';
import TagCheckboxList from '@/components/TagCheckboxList';
import calendarIcon from '@/icons/calendar.svg?url';
import SearchIcon from '@/icons/search.svg?url';
import CITIES from '@/libs/constants/mockCity';
import { TRAVEL_STYLE, WITH_WHOM } from '@/libs/constants/travelTags';

const dateFormat = (date: Date) => `${date.getFullYear()}.${date.getMonth()}.${date.getDate()}`;

function Plan() {
  const { control, register, getValues, handleSubmit } = useForm<{
    title: string;
    places: string[];
    date: { from: Date; to: Date };
    expense: number;
    withWhom: string[];
    travelStyle: string[];
  }>({
    defaultValues: { title: '', places: [], date: {}, withWhom: ['alone'], travelStyle: [] }
  });
  const [showCalendar, setShowCalendar] = useState(false);
  const [showSearchList, setShowSearchList] = useState(false);
  const [searchString, setSearchString] = useState('');

  const date = getValues('date');
  const title = register('title', { required: true });
  register('places', { validate: { moreThanOne: (placeList) => placeList.length > 0 } });
  register('date', { validate: { dateRange: (dateRange) => !!dateRange?.from && !!dateRange?.to } });
  register('withWhom', { validate: { moreThanOne: (whom) => whom.length > 0 } });

  const onSubmit = (data: any) => {
    // 이후 api 작업
    console.log(data);
  };

  return (
    <div className="flex-col-center mx-auto max-w-[550px] px-5 pb-14 pt-10">
      <div className="w-full border-b border-gray-02 pb-5">
        <h1 className="font-subtitle-1 md:font-title-4 mb-2 text-center text-primary-01 md:mb-3">여행 일정 생성</h1>
        <h2 className="font-title-3 md:font-title-1 text-center text-black-01">멋진 여행 계획을 세워보세요!</h2>
      </div>

      <form className="flex w-full flex-col gap-10 pt-10 md:pt-[60px]" onSubmit={handleSubmit(onSubmit)}>
        <InputWithTitle title="여행 타이틀">
          <Input
            type="text"
            id="title"
            className="h-12 w-full rounded-[5px] border border-gray-02 px-4"
            placeholder="멋진 여행 타이틀을 지어보세요!"
            {...title}
          />
        </InputWithTitle>

        <div>
          <InputWithTitle title="여행 장소">
            <div className="flex-row-center h-12 w-full gap-1 rounded-[5px] border border-gray-02 px-4">
              <Input
                type="text"
                id="place"
                className="w-full"
                placeholder="도시명을 입력하세요"
                value={searchString}
                onChange={(e) => setSearchString(e.target.value)}
                onFocus={() => setShowSearchList(true)}
                autoComplete="off"
              />
              <ImageBox src={SearchIcon} alt="돋보기" className="h-[18px] w-[18px]" width={18} height={18} />
            </div>
          </InputWithTitle>
          <Controller
            control={control}
            name="places"
            render={({ field: { value, onChange } }) => {
              return (
                <div className={`relative ${value.length ? 'pt-2' : ''}`}>
                  <div className="flex-row-center gap-1">
                    {value.map((place) => (
                      <BadgeWithDelete onClickDeleteButton={() => onChange(value.filter((v) => v !== place))}>
                        {place}
                      </BadgeWithDelete>
                    ))}
                  </div>
                  {showSearchList && (
                    <div className="absolute top-0 rounded-[10px] bg-white-01 p-5 shadow-[0_0_10px_0_rgba(0,0,0,0.1)]">
                      <ul className="mb-5 max-h-40 min-w-52 overflow-y-auto">
                        {CITIES.filter(({ korean }) => korean.includes(searchString)).map(
                          ({ id, korean, imageURL }) => (
                            <li key={id} className="flex-row-center mb-2 justify-between">
                              <div className="flex-row-center gap-1">
                                <ImageBox src={imageURL} alt={korean} className="size-[18px]" width={18} height={18} />
                                <span>{korean}</span>
                              </div>
                              {value.includes(korean) ? (
                                <button
                                  type="button"
                                  className="border border-primary-01"
                                  onClick={() => onChange(value.filter((v) => v !== korean))}
                                >
                                  취소
                                </button>
                              ) : (
                                <button
                                  type="button"
                                  className="bg-gray-02"
                                  onClick={() => onChange([...value, korean])}
                                >
                                  선택
                                </button>
                              )}
                            </li>
                          )
                        )}
                      </ul>
                      <button
                        type="button"
                        className="h-12 w-full rounded-[5px] bg-primary-01 text-center text-white-01"
                        onClick={() => {
                          setShowSearchList(false);
                          setSearchString('');
                        }}
                      >
                        확인
                      </button>
                    </div>
                  )}
                </div>
              );
            }}
          />
        </div>

        <div>
          <InputWithTitle title="여행 날짜">
            <div className="flex-row-center h-12 w-full gap-1 rounded-[5px] border border-gray-02 px-4">
              <Input
                type="text"
                id="place"
                className="w-full cursor-pointer"
                placeholder="여행 날짜를 선택하세요"
                onClick={() => setShowCalendar(true)}
                readOnly
                value={date?.from && date?.to && `${dateFormat(date.from)} ~ ${dateFormat(date.to)}`}
              />
              <button type="button" onClick={() => setShowCalendar(true)}>
                <ImageBox src={calendarIcon} alt="달력" className="h-[18px] w-[18px]" width={18} height={18} />
              </button>
            </div>
          </InputWithTitle>
          <div className="relative">
            {showCalendar && (
              <Controller
                control={control}
                name="date"
                render={({ field: { value, onChange } }) => (
                  <DatePicker
                    initialRange={value}
                    onDateRangeChange={(range: DateRange | undefined) => {
                      onChange(range);
                      setShowCalendar(false);
                    }}
                  />
                )}
              />
            )}
          </div>
        </div>

        <InputWithTitle title="여행 경비">
          <div className="flex-row-center h-12 w-full justify-between rounded-[5px] border border-gray-02 px-4">
            <Controller
              control={control}
              name="expense"
              rules={{ required: false, pattern: /^-?\d+$/ }}
              render={({ field: { onChange } }) => (
                <ExpenseInput
                  id="expense"
                  placeholder="여행 경비를 입력하세요"
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
                name="withWhom"
                rules={{ validate: { required: (withWhom) => withWhom.length > 0 } }}
                render={({ field: { value, onChange } }) => {
                  const handleCheckboxChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
                    onChange([e.target.value]);
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

        <button type="submit">submit</button>
      </form>
    </div>
  );
}

export default Plan;
