import React, { forwardRef, useState } from 'react';

import { DateRange, DayPicker, SelectRangeEventHandler } from 'react-day-picker';

import ArrowLeft from '@/icons/chevron-down.svg?url';

import ImageBox from './common/ImageBox';

interface DatePickerProps {
  initialRange: DateRange;
  onDateRangeChange: (range: DateRange | undefined) => void;
}

const DatePicker = forwardRef(function DatePicker(
  { initialRange, onDateRangeChange }: DatePickerProps,
  ref: React.ForwardedRef<HTMLDivElement>
) {
  const [range, setRange] = useState<DateRange | undefined>(initialRange);
  const [month, setMonth] = useState(new Date());

  const handleMonthChange = (direction: 'prev' | 'next') => {
    if (direction === 'prev') {
      setMonth(new Date(month.getFullYear(), month.getMonth() - 1));
      return;
    }

    setMonth(new Date(month.getFullYear(), month.getMonth() + 1));
  };

  const handleRange: SelectRangeEventHandler = (selectedRange, selectedDay) => {
    if (range?.from && range?.to) {
      setRange({ from: selectedDay, to: undefined });
      return;
    }

    setRange(selectedRange);
  };

  const handleClickConfirm = () => {
    if (range?.from && !range?.to) {
      setRange({ from: range.from, to: range.from });
      onDateRangeChange({ from: range.from, to: range.from });
      return;
    }

    onDateRangeChange(range);
  };

  return (
    <div
      // eslint-disable-next-line max-len
      className="absolute top-1 z-10 flex w-full flex-col gap-2 rounded-[10px] bg-white-01 p-4 shadow-[0_0_10px_0_rgba(0,0,0,0.1)]"
      ref={ref}
    >
      <div className="relative">
        <div className="absolute top-1 z-10 flex w-full justify-between px-2">
          <button type="button" onClick={() => handleMonthChange('prev')}>
            <ImageBox src={ArrowLeft} alt="이전 달" width={24} height={24} className="size-6 rotate-90" />
          </button>
          <button type="button" onClick={() => handleMonthChange('next')}>
            <ImageBox src={ArrowLeft} alt="이전 달" width={24} height={24} className="size-6 -rotate-90" />
          </button>
        </div>
        <DayPicker
          mode="range"
          month={month}
          selected={range}
          onSelect={handleRange}
          numberOfMonths={2}
          disableNavigation
        />
      </div>
      <button type="button" className="btn-solid btn-sm self-end" onClick={handleClickConfirm}>
        확인
      </button>
    </div>
  );
});

export default DatePicker;
