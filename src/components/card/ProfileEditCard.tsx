/* eslint-disable max-len */
import React, { useMemo, useState } from 'react';

import Image from 'next/image';

import PROFILE_SERVICE from '@/apis/useProfileService/fetch';
import type { ProfileUser } from '@/apis/useProfileService/type';
import { BUTTON_LABEL, INTRODUCE_MESSAGE } from '@/components/card/ProfileCard';
import ImageBox from '@/components/common/ImageBox';
import cameraUrl from '@/icons/camera.svg?url';
import profileDefaultUrl from '@/icons/profile-default.svg?url';
import useDropdown from '@/libs/hooks/useDropdown';

const PROFILE_PICTURE_MESSAGE = {
  edit: '사진 수정',
  delete: '사진 삭제',
  suffix: '하기'
};

interface ProfileEditCardProps extends ProfileUser {
  onEndEdit: () => void;
}

export default function ProfileEditCard({
  id: userId,
  name: initName,
  introduce: initIntroduce = '',
  profileImgUrl: initProfileImgUrl = '',
  onEndEdit
}: ProfileEditCardProps) {
  const [name, setName] = useState(initName);
  const [introduce, setIntroduce] = useState(initIntroduce);
  const [profileImageFile, setProfileImageFile] = useState<File | null>();
  const {
    ref: dropdownRef,
    isDropdownOpened,
    handleDropdownClose,
    handleDropdownOpen
  } = useDropdown({
    onClickOutside: (e) => {
      if (dropdownRef.current?.contains(e?.target as Node)) {
        return;
      }

      handleDropdownClose();
    }
  });
  const profileImageUrl = useMemo(
    () =>
      profileImageFile === undefined
        ? initProfileImgUrl
        : profileImageFile === null
          ? ''
          : URL.createObjectURL(profileImageFile),
    [profileImageFile, initProfileImgUrl]
  );

  const handleSubmitClick = async () => {
    try {
      if (initProfileImgUrl && profileImageFile === null) {
        await PROFILE_SERVICE.deleteProfileImage(userId);
      }

      if (profileImageFile) {
        await PROFILE_SERVICE.putProfileImage(userId, profileImageFile);
      }

      if (!(name === initName && introduce === initIntroduce)) {
        const payload = name === initName ? { introduce } : { name, introduce };
        // const payload = { name, introduce };
        await PROFILE_SERVICE.patchProfile(userId, payload);
      }

      onEndEdit();
    } catch (e) {
      // 실패 했습니다. (토스트 띄워주고 싶어요)
      console.log(e);
    }
  };

  const handleProfileImgReset = () => {
    setProfileImageFile(null);
    handleDropdownClose();
  };

  const handleNameChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setName(e.target.value);
  };

  const handleIntroduceChange: React.ChangeEventHandler<HTMLTextAreaElement> = (e) => {
    setIntroduce(e.target.value);
  };

  const handleChangeProfileImage: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    if (!e.target.files) return;

    const file = e.target.files[0];
    setProfileImageFile(file);
    handleDropdownClose();
  };

  return (
    <div className="flex-row-center lg:flex-col-center gap-2 px-5 py-6 md:gap-4 md:p-6 md:shadow-card lg:h-fit lg:w-[347px] lg:flex-shrink-0 lg:pt-10">
      <div className="relative">
        <ImageBox
          src={profileImageUrl || profileDefaultUrl}
          alt={`${name} 프로필 이미지`}
          width={185}
          height={185}
          className="size-20 rounded-full md:size-[120px] lg:size-[185px]"
        />
        <input id="profileImage" type="file" accept="image/*" className="hidden" onChange={handleChangeProfileImage} />
        <button
          type="button"
          className="flex-row-center absolute bottom-0 right-0 size-9 justify-center rounded-full border border-solid border-gray-02 bg-white-01 md:size-12 lg:size-[54px]"
          onClick={handleDropdownOpen}
        >
          <Image src={cameraUrl} alt="사진 수정하기" width={36} height={36} className="size-6 md:size-7" />
        </button>
        {isDropdownOpened && (
          <ul className="absolute left-10 top-[84px] z-20 w-[76px] overflow-hidden rounded-[0.625rem] bg-white-01 shadow-[0_0_0.625rem_0_rgba(0,0,0,0.1)] md:left-16 md:top-[124px] md:w-[84px] lg:left-48 lg:w-[110px]">
            <li className="font-btn-text hover:bg-gray-03">
              <button
                type="button"
                className="flex-row-center px-3 py-2 md:px-4 md:py-3"
                onClick={handleProfileImgReset}
              >
                <span className="flex-shrink-0">{PROFILE_PICTURE_MESSAGE.delete}</span>
                <span className="hidden flex-shrink-0 lg:block">{PROFILE_PICTURE_MESSAGE.suffix}</span>
              </button>
            </li>
            <li className="font-btn-text hover:bg-gray-03">
              <label htmlFor="profileImage" className="flex-row-center cursor-pointer px-3 py-2 md:px-4 md:py-3">
                <span className="flex-shrink-0">{PROFILE_PICTURE_MESSAGE.edit}</span>
                <span className="hidden flex-shrink-0 lg:block">{PROFILE_PICTURE_MESSAGE.suffix}</span>
              </label>
            </li>
          </ul>
        )}
      </div>

      <div className="relative flex w-full flex-col gap-1 md:gap-2">
        <input
          id="name"
          name="name"
          value={name}
          onChange={handleNameChange}
          className="font-body-3 md:font-body-2 max-w-[100px] rounded border px-3 py-[6px] outline-none md:px-4 md:pb-[9px] md:pt-[10px] lg:min-w-full"
          placeholder="닉네임을 입력하세요"
        />
        <textarea
          id="introduce"
          name="introduce"
          value={introduce}
          onChange={handleIntroduceChange}
          className="font-body-3 md:font-body-2 h-9 w-full resize-none rounded border px-3 py-[5px] outline-none md:h-12 md:px-4 md:py-[9px] lg:h-[84px] lg:w-full"
          placeholder={INTRODUCE_MESSAGE.placeholder}
        />

        <div className="flex-row-center absolute right-0 top-0 gap-3 lg:relative lg:gap-[7px] lg:pt-3">
          <button
            type="button"
            className="font-btn-text lg:btn-outline flex-row-center justify-center rounded text-black-02 lg:h-12 lg:flex-grow"
            onClick={onEndEdit}
          >
            {BUTTON_LABEL.cancel}
            <span className="hidden lg:block">{BUTTON_LABEL.suffix}</span>
          </button>
          <button
            type="button"
            className="font-btn-text lg:btn-solid flex-row-center justify-center rounded text-black-02 lg:h-12 lg:flex-grow"
            onClick={handleSubmitClick}
          >
            {BUTTON_LABEL.complete}
            <span className="hidden lg:block">{BUTTON_LABEL.suffix}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
