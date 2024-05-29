'use client';

import { PropsWithChildren } from 'react';

interface CheckboxProps extends PropsWithChildren {
  value: string;
  checked: boolean;
}

// Checkbox 네이티브 대신 들어갈 내용을 children으로 전달한다
export default function Checkbox({ checked, value, children }: CheckboxProps) {
  return (
    <div className="relative min-w-48">
      {children}
      <input type="checkbox" id={value} className="absolute inset-0 opacity-0" checked={checked} value={value} />
    </div>
  );
}
