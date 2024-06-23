import React from 'react';

import Chip from '@/components/common/button/Chip';
import Checkbox from '@/components/common/input/Checkbox';

interface TagCheckBoxListProps {
  tagList: { [key: string]: string };
  selectedValueList: string[] | string;
  onChangeCheckbox: React.ChangeEventHandler<HTMLInputElement>;
}

export default function TagCheckboxList({ tagList, selectedValueList, onChangeCheckbox }: TagCheckBoxListProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {Object.entries(tagList).map(([key, value]) => {
        const isChecked = selectedValueList.includes(value);
        return (
          <Checkbox key={key} value={value} id={key} onChange={onChangeCheckbox}>
            <Chip selected={isChecked}>{value}</Chip>
          </Checkbox>
        );
      })}
    </div>
  );
}
