import React from 'react';

import DropdownButton from '@/components/common/button/DropdownButton';
import Dropdown from '@/components/common/Dropdown';
import useDropdown from '@/libs/hooks/useDropdown';

interface DropdownInputProps {
  className?: string;
  value: string;
  dropdownList: any[];
  onClickInside: (e?: any) => void;
}

export default function DropdownInput({ className, value, dropdownList, onClickInside }: DropdownInputProps) {
  const { ref, isDropdownOpened, handleDropdownToggle } = useDropdown({
    onClickInside
  });

  return (
    <>
      <DropdownButton
        className={className}
        isDropdownOpened={isDropdownOpened}
        onClick={(e: any) => handleDropdownToggle(e)}
      >
        {value}
      </DropdownButton>
      {isDropdownOpened && (
        <div className="relative">
          <Dropdown className="absolute top-2 w-full px-0 py-[0.625rem]" ref={ref}>
            {dropdownList.map((item) => (
              <li className="modal-dropdown cursor-pointer p-3 hover:bg-primary-02" key={item}>
                {item}
              </li>
            ))}
          </Dropdown>
        </div>
      )}
    </>
  );
}
