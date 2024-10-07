/* eslint-disable max-len */

'use client';

import React, { useState } from 'react';

import Image from 'next/image';
import Link from 'next/link';

import { Article } from '@/apis/useArticle/article.type';
import ARTICLE_SERVICE from '@/apis/useArticle/fetch';
import useToggleBookmark from '@/apis/useContentService/useToggleBookmark';
import Badge from '@/components/common/Badge';
import modalList from '@/components/modal/modalList/modalList';
import Bookmark from '@/icons/bookmark-filled.svg';
import Calendar from '@/icons/calendar.svg';
import kebab from '@/icons/kebab.svg?url';
import MapPin from '@/icons/map-pin.svg';
import profileDefault from '@/icons/profile-default.svg?url';
import useDropdown from '@/libs/hooks/useDropdown';
import useModal from '@/libs/hooks/useModal';
import { hyphenToDotDate } from '@/libs/utils/dateFormatter';

interface TravelCardParams
  extends Omit<Article, 'bookmarkCount' | 'isBookmarked' | 'isEditable' | 'locations'>,
    Partial<Pick<Article, 'bookmarkCount' | 'isBookmarked' | 'isEditable'>> {
  cities: string[];
}

const defaultCoverImageCSS =
  'before:bg-second-logo before:absolute before:inset-0 before:bg-[length:210px] before:bg-center before:bg-no-repeat';

// TODO: isValidUrl 함수 추가

export default function TravelDetailCard({
  articleId,
  title,
  cities,
  startAt,
  endAt,
  travelCompanion,
  travelStyles,
  profileImgUrl,
  coverImgUrl,
  name,
  bookmarkCount,
  isBookmarked,
  isEditable
}: TravelCardParams) {
  const {
    ref: dropdownRef,
    isDropdownOpened,
    handleDropdownOpen,
    handleDropdownClose
  } = useDropdown<HTMLDivElement>({
    onClickInside: () => {
      handleDropdownClose();
    },
    onClickOutside: (e) => {
      if (dropdownRef.current?.contains(e?.target as Node)) {
        return;
      }

      handleDropdownClose();
    }
  });
  const [bookmarked, setBookmarked] = useState(isBookmarked);

  const { openModal, closeModal } = useModal();
  const { mutate: toggleBookmark } = useToggleBookmark();

  const handleBookmarkClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    toggleBookmark(articleId, {
      onSuccess: () => {
        setBookmarked((prev) => !prev);
        // TODO: bookmarked 관련 쿼리키 업데이트
      }
    });
  };

  const handleMoreButtonClick: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    e.stopPropagation();
    handleDropdownOpen();
  };

  const handleDeletePlan = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    openModal(
      modalList.SubmitModal({
        className: 'h-auto w-[20rem] md:w-[25rem] z-50',
        text: '일정을 삭제하시겠습니까?',
        submitText: '삭제하기',
        negative: true,
        sameMdPadding: true,
        onCancel: () => closeModal(),
        onSubmit: async () => {
          await ARTICLE_SERVICE.deleteArticle(`${articleId}`);
          closeModal();
          handleDropdownClose();
          window.location.reload();
        }
      })
    );
  };

  return (
    <li className="w-[320px] min-w-[285px] flex-grow overflow-hidden rounded-lg shadow-card md:w-full lg:w-[590px]">
      <Link href={`/plan/detail/${articleId}`} className="flex h-full w-full flex-col md:flex-row">
        <div className={`relative min-h-[180px] min-w-[285px] bg-gray-02 ${defaultCoverImageCSS}`}>
          {isBookmarked !== undefined && (
            <button
              type="button"
              onClick={handleBookmarkClick}
              className="flex-row-center absolute z-10 m-3 size-9 justify-center rounded-[5px] bg-white-01 md:m-4"
            >
              <Bookmark className={`size-[18px] stroke-gray-01 ${bookmarked ? 'fill-gray-01' : ''}`} />
            </button>
          )}

          {coverImgUrl && <Image src={coverImgUrl} alt="여행 대표 사진" fill />}
        </div>

        <div className="w-full xl:flex xl:flex-col xl:justify-between">
          <div className="p-3 md:p-4">
            <div className="flex-col-start gap-2">
              <div className="flex w-full items-start justify-between">
                <span className="font-subtitle-2 md:font-subtitle-1">{title}</span>
                <div className="relative">
                  {isEditable && (
                    <button type="button" className="relative z-10" onClick={handleMoreButtonClick}>
                      <Image src={kebab} alt="더보기" width={20} height={20} />
                    </button>
                  )}
                  {isDropdownOpened && (
                    <div
                      ref={dropdownRef}
                      className="absolute right-0 mt-2 flex w-[110px] flex-col gap-4 rounded-md bg-white-01 shadow-[0_0_10px_0_rgba(0,0,0,0.1)]"
                    >
                      <button
                        type="button"
                        className="font-btn-text block w-full cursor-pointer p-4 text-left text-red-01"
                        onClick={handleDeletePlan}
                      >
                        삭제하기
                      </button>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex-col-start gap-1">
                <div className="flex-row-center gap-[6px]">
                  <MapPin className="size-4 text-gray-01" />
                  <span className="font-subtitle-3 text-gray-01">{cities.join(', ')}</span>
                </div>
                <div className="flex-row-center gap-[6px]">
                  <Calendar className="size-4 text-gray-01" />
                  <span className="font-subtitle-3 text-gray-01">
                    {`${hyphenToDotDate(startAt)} ~ ${hyphenToDotDate(endAt)}`}
                  </span>
                </div>
              </div>

              <ul className="flex-row-center flex-wrap gap-1">
                <li>
                  <Badge type="해시태그">{travelCompanion}</Badge>
                </li>
                {travelStyles?.map((style) => (
                  <li key={style}>
                    <Badge type="해시태그">{style}</Badge>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="flex-row-center justify-between border-t border-gray-03 py-[10px] pl-3 pr-4 md:py-[14px] md:pl-4 md:pr-[18px]">
            <div className="flex-row-center gap-2">
              <Image
                className="rounded-full"
                src={profileImgUrl || profileDefault}
                alt="프로필"
                width={32}
                height={32}
              />
              <span className="font-caption-2">{name}</span>
            </div>
            {bookmarkCount !== undefined && (
              <div className="flex-row-center gap-1 text-gray-01">
                <Bookmark className="size-[0.6875rem] fill-gray-01 stroke-gray-01" />
                <span className="font-caption-3">{bookmarkCount}</span>
              </div>
            )}
          </div>
        </div>
      </Link>
    </li>
  );
}
