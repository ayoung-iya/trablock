import React from 'react';

import Checkbox from './common/input/Checkbox';

interface TagCheckBoxListProps {
  tagList: { [key: string]: string };
  selectedValueList: string[];
  onChangeCheckbox: React.ChangeEventHandler<HTMLInputElement>;
}

export default function TagCheckboxList({ tagList, selectedValueList, onChangeCheckbox }: TagCheckBoxListProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {Object.entries(tagList).map(([key, value]) => {
        const isChecked = selectedValueList.includes(key);
        return (
          <Checkbox key={key} value={key} id={key} onChange={onChangeCheckbox}>
            <button
              type="button"
              // eslint-disable-next-line max-len
              className={`font-caption-1 rounded-full border border-solid px-5 py-[7px]  ${isChecked ? 'border-secondary-01 text-secondary-01' : 'border-gray-02 text-black-02'}`}
            >
              {value}
            </button>
          </Checkbox>
        );
      })}
    </div>
  );
}
