/* eslint-disable max-len */
import React from 'react';

import { ProfileUserData } from '@/apis/useProfileService/type';
import ImageBox from '@/components/common/ImageBox';
import profileDefaultUrl from '@/icons/profile-default.svg?url';

export const INTRODUCE_MESSAGE = {
  empty: '한줄소개가 없습니다',
  placeholder: '한줄소개를 입력하세요'
};

export const BUTTON_LABEL = {
  edit: '편집',
  complete: '완료',
  cancel: '취소',
  suffix: '하기'
};

interface ProfileCardProps extends ProfileUserData {
  onStartEdit: () => void;
}

export default function ProfileCard({
  name,
  introduce = '',
  profileImgUrl,
  isEditable,
  onStartEdit
}: ProfileCardProps) {
  return (
    <div className="lg:flex-col-center flex items-start justify-between px-5 py-6 md:p-6 md:shadow-card lg:h-fit lg:w-[347px] lg:flex-shrink-0 lg:gap-10 lg:pt-10">
      <div className="flex-row-center gap-4 md:gap-[26px] lg:flex-col lg:gap-5">
        <ImageBox
          src={profileImgUrl || profileDefaultUrl}
          alt={`${name} 프로필 이미지`}
          width={185}
          height={185}
          className="size-20 rounded-full md:size-[120px] lg:size-[185px]"
        />

        <div className="lg:flex-col-center flex flex-col gap-1">
          <span className="font-subtitle-1">{name}</span>
          <span className="font-body-2 text-black-03">{introduce || INTRODUCE_MESSAGE.empty}</span>
        </div>
      </div>
      {isEditable && (
        <button
          type="button"
          onClick={onStartEdit}
          className="flex-row-center font-btn-text md:btn-ghost md:font-btn-3 lg:font-btn-2 justify-center rounded text-black-02 md:px-6 md:py-[11px] lg:w-full"
        >
          {BUTTON_LABEL.edit}
          <span className="hidden md:block">{BUTTON_LABEL.suffix}</span>
        </button>
      )}
    </div>
  );
}
