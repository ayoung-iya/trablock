import React from 'react';

import classNames from 'classnames';

/**
 * chip 컴포넌트
 * @component
 *
 * @param {('lg' | 'sm')} [size='lg'] - 칩의 크기
 * @param {boolean} selected - 칩의 선택 상태
 *
 * const [isSelectedLarge, setIsSelectedLarge] = useState(false);
 * <Chip size="lg" selected={isSelectedLarge} onClick={() => void}>
 *    Day 1
 * </Chip>
 */

const chipStyles: { [key: string]: string } = {
  base: 'flex px-5 py-1.75 justify-center items-center gap-2.5 rounded-full font-caption-1',
  selectedLg: 'bg-black-01 text-white-01',
  selectedSm: 'border-solid border-secondary-01 bg-white text-secondary-01',
  defaultLg: 'border-solid border-gray-02 bg-white-01 text-black-02',
  defaultSm: 'border-solid border-gray-02 bg-white-01 text-black-02',
  lg: 'h-10',
  sm: 'h-9'
};

interface ChipProps {
  children: React.ReactNode;
  size?: 'lg' | 'sm';
  selected: boolean;
  onClick: () => void;
}

export default function Chip({ children, size = 'lg', selected, onClick }: ChipProps) {
  const sizeClass = size === 'lg' ? chipStyles.lg : chipStyles.sm;
  const stateClass = selected
    ? size === 'lg'
      ? chipStyles.selectedLg
      : chipStyles.selectedSm
    : size === 'lg'
      ? chipStyles.defaultLg
      : chipStyles.defaultSm;

  const chipClass = classNames(chipStyles.base, sizeClass, stateClass);

  return (
    <button type="button" className={chipClass} onClick={onClick}>
      {children}
    </button>
  );
}
