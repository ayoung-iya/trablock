import React, { useState } from 'react';

import Input from '@/components/common/input/Input';
import searchIcon from '@/icons/search.svg?url';
import xCircledFilled from '@/icons/x-circle-filled.svg?url';

import ImageBox from '../ImageBox';

interface SearchInputParams extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  searchString?: string;
  onClickRemoveIcon?: () => void;
  onClickSearchIcon?: (searchString: string) => void;
}

export default function SearchInput({
  className,
  searchString: initialSearchString = '',
  onClickRemoveIcon,
  onClickSearchIcon,
  ...inputProps
}: SearchInputParams) {
  const [searchString, setSearchString] = useState(initialSearchString);

  const handleSearchStringChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setSearchString(e.target.value);
  };

  const handleSearchStringReset = () => {
    setSearchString('');
    if (onClickRemoveIcon) onClickRemoveIcon();
  };

  const handleSearchIconClick = () => {
    if (onClickSearchIcon) {
      onClickSearchIcon(searchString);
    }
  };

  return (
    <div className={`flex rounded-[0.375rem] bg-gray-03 px-3 py-[0.625rem] ${className}`}>
      <Input
        id="search"
        value={searchString}
        className="w-full bg-inherit"
        onChange={handleSearchStringChange}
        {...inputProps}
      />
      <div className="flex-row-center gap-1">
        {searchString && (
          <button type="button" onClick={handleSearchStringReset}>
            <ImageBox src={xCircledFilled} alt="초기화" className="size-4" width={16} height={16} />
          </button>
        )}
        <button type="submit" className="size-5 flex-shrink-0" onClick={handleSearchIconClick}>
          <ImageBox src={searchIcon} alt="검색하기" className="size-5" width={20} height={20} />
        </button>
      </div>
    </div>
  );
}
