'use client';

import React from 'react';

interface CheckboxProps extends React.PropsWithChildren {
  value: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
}

// Checkbox 네이티브 대신 들어갈 내용을 children으로 전달한다
export default function Checkbox({ value, onChange, children }: CheckboxProps) {
  return (
    <div className="relative">
      {children}
      <input type="checkbox" className="absolute inset-0 opacity-0" value={value} onChange={onChange} />
    </div>
  );
}
