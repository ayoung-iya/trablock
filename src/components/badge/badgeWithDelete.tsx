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
      className="font-tag flex-row-center h-6 gap-[6px] rounded-[5px] bg-[#ECF4FF] px-2 py-[3px] text-primary-01"
      onClick={onClickDeleteButton}
    >
      {children}
      <ImageBox src={xIcon} className="size-[14px]" alt="삭제" width={14} height={14} />
    </button>
  );
}
