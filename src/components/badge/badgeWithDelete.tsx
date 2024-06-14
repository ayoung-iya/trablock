import React from 'react';

import ImageBox from '@/components/common/ImageBox';
import xIcon from '@/icons/x-circle-filled.svg?url';

interface BadgeWithDeleteProps {
  children: React.ReactNode;
  onClickDeleteButton: () => void;
}

export default function BadgeWithDelete({ onClickDeleteButton, children }: BadgeWithDeleteProps) {
  return (
    <button
      type="button"
      // eslint-disable-next-line max-len
      className="font-tag flex-row-center h-6 gap-[0.375rem] rounded-[0.3125rem] bg-[#ECF4FF] px-2 py-[0.1875rem] text-primary-01"
      onClick={onClickDeleteButton}
    >
      {children}
      <ImageBox src={xIcon} className="size-[0.875rem]" alt="삭제" width={14} height={14} />
    </button>
  );
}
