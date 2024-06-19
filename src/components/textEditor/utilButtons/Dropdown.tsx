import React from 'react';

import { useSlate } from 'slate-react';

import { MarkFormat } from '../types';
import { addMarkData, activeMark } from '../utils/slateUtilityFunctions';

const Dropdown: React.FC<{
  format: MarkFormat;
  options: { value: string; text: string }[];
}> = function Dropdown({ format, options }) {
  const editor = useSlate();
  const changeMarkData = (event: React.ChangeEvent<HTMLSelectElement> | string, dropdownFormat: MarkFormat) => {
    const value = typeof event === 'string' ? event : event.target.value;
    addMarkData(editor, { format: dropdownFormat, value });
  };
  return (
    <select
      value={activeMark(editor, format)}
      onChange={(e) => {
        changeMarkData(e, format);
      }}
    >
      {options.map((item) => (
        <option key={item.value} value={item.value}>
          {item.text}
        </option>
      ))}
    </select>
  );
};

export default Dropdown;
