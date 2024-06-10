import React from 'react';

import classNames from 'classnames';

/**
 * chip 컴포넌트
 * @component
 *
 * @param {('day' | 'default')} [variant='default'] - 칩의 변형
 * @param {boolean} selected - 칩의 선택 상태
 *
 * const [isSelectedLarge, setIsSelectedLarge] = useState(false);
 * <Chip size="lg" selected={isSelectedLarge} onClick={() => void}>
 *    Day 1
 * </Chip>
 */

const chipStyles: { [key: string]: string } = {
  base: 'flex px-5 py-1.75 justify-center items-center gap-2.5 rounded-full font-caption-1',
  selectedDay: 'bg-black-01 text-white-01',
  selectedDefault: 'border-solid border-secondary-01 bg-white text-secondary-01',
  unselectedDay: 'border-solid border-gray-02 bg-white-01 text-black-02',
  unselectedDefault: 'border-solid border-gray-02 bg-white-01 text-black-02',
  day: 'h-10',
  default: 'h-9'
};

interface ChipProps {
  children: React.ReactNode;
  variant?: 'day' | 'default';
  selected: boolean;
  onClick: () => void;
}

export default function Chip({ children, variant = 'default', selected, onClick }: ChipProps) {
  const variantClass = variant === 'day' ? chipStyles.day : chipStyles.default;
  const stateClass = selected
    ? variant === 'day'
      ? chipStyles.selectedDay
      : chipStyles.selectedDefault
    : variant === 'day'
      ? chipStyles.unselectedDay
      : chipStyles.unselectedDefault;

  const chipClass = classNames(chipStyles.base, variantClass, stateClass);

  return (
    <button type="button" className={chipClass} onClick={onClick}>
      {children}
    </button>
  );
}
