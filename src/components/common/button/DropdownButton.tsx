/* eslint-disable max-len */
import React from 'react';

import Button from '@/components/common/button/Button';
import ChevronUpSvg from '@/icons/chevron-up.svg';

interface DropdownButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  className?: string;
  children?: React.ReactNode;
  isDropdownOpened: boolean;
}
export default function DropdownButton({ className, children, isDropdownOpened, onClick }: DropdownButtonProps) {
  return (
    <Button
      className={`font-body-2 flex-row-center w-full justify-between rounded-md border border-solid border-gray-01 px-4 py-3 ${className}`}
      onClick={onClick}
    >
      {children}
      <ChevronUpSvg width={18} height={18} className={!isDropdownOpened ? 'rotate-180' : ''} />
    </Button>
  );
}
