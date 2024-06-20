import React, { forwardRef, useState } from 'react';

import { DateRange, DayPicker, SelectRangeEventHandler } from 'react-day-picker';

interface DatePickerProps {
  initialRange: DateRange;
  onDateRangeChange: (range: DateRange | undefined) => void;
}

const DatePicker = forwardRef(function DatePicker(
  { initialRange, onDateRangeChange }: DatePickerProps,
  ref: React.ForwardedRef<HTMLDivElement>
) {
  const [range, setRange] = useState<DateRange | undefined>(initialRange);

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
    <div className="absolute z-10 bg-white-01 shadow-[0_0_10px_0_rgba(0,0,0,0.1)]" ref={ref}>
      <DayPicker mode="range" selected={range} onSelect={handleRange} />
      <button
        type="button"
        className="h-12 w-full rounded-[5px] bg-primary-01 text-center text-white-01"
        onClick={handleClickConfirm}
      >
        확인
      </button>
    </div>
  );
});

export default DatePicker;
