'use client';

import { ComponentType, useState } from 'react';

interface CheckboxProps {
  checkedIcon: ComponentType<{ checked: boolean }>;
  name: string;
  value: string;
}

// checkComponent: 체크박스 대신 보여준 아이콘(컴포넌트) 함수 전달
export default function Checkbox({ checkedIcon: CheckedIcon, ...rest }: CheckboxProps) {
  const [checked, setChecked] = useState(false);

  const handleCheckedChange = () => {
    setChecked(!checked);
  };

  return (
    <div className="relative">
      <CheckedIcon checked={checked} />
      <input
        type="checkbox"
        className="absolute inset-0 opacity-0"
        checked={checked}
        onChange={handleCheckedChange}
        {...rest}
      />
    </div>
  );
}
