/* eslint-disable max-len */
import React from 'react';

interface TabProps extends React.PropsWithChildren {
  isActive?: boolean;
}

export default function Tab({ isActive = false, children }: TabProps) {
  return (
    <div
      className={`font-subtitle-2 px-[2px] py-[10px] ${isActive ? 'shadow-[inset_0_-2px] shadow-black-01' : 'text-gray-01'}`}
    >
      {children}
    </div>
  );
}
