/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable max-len */

'use client';

import React, { useEffect, useState } from 'react';

import Link from 'next/link';

import useToggleBookmark from '@/apis/useContentService/useToggleBookmark';
import serviceSchedule from '@/apis/useScheduleService/fetch';
import Badge from '@/components/common/Badge';
import ImageBox from '@/components/common/ImageBox';
import modalList from '@/components/modal/modalList/modalList';
import useMediaQuery from '@/hooks/useMediaQuery';
import useResizeSize from '@/hooks/useResizeSize';
import ArticleDefaultIcon from '@/icons/article-default.svg';
import BookmarkFilledIcon from '@/icons/bookmark-filled.svg';
import BookmarkGrayIcon from '@/icons/bookmark-gray.svg';
import BookmarkIcon from '@/icons/bookmark.svg';
import CalendarIcon from '@/icons/calendar.svg';
import MapPinIcon from '@/icons/map-pin.svg';
import ProfileDefaultIcon from '@/icons/profile-default.svg';
import useModal from '@/libs/hooks/useModal';

export interface TravelCardProps {
  id: string;
  title: string;
  city: string[];
  startAt: string;
  endAt: string;
  travelCompanion: string;
  travelStyle: string[];
  name: string;
  profileImageUrl: string | null;
  thumbnailImageUrl: string | null;
  price: number;
  bookmarkCount: number;
  isBookmarked: boolean;
  isEditable?: boolean;
  isPlanTab?: boolean;
  isSearchPage?: boolean;
}

const isValidUrl = (url: string | null): url is string => {
  try {
    // eslint-disable-next-line no-new
    new URL(url!);
    return true;
  } catch {
    return false;
  }
};

export default function TravelCard({
  id,
  title,
  city,
  startAt,
  endAt,
  travelCompanion,
  travelStyle,
  name,
  profileImageUrl,
  thumbnailImageUrl,
  bookmarkCount,
  isBookmarked,
  isEditable = false,
  isPlanTab = false,
  isSearchPage = false
}: TravelCardProps) {
  const [menuVisible, setMenuVisible] = useState(false);
  const [bookmarked, setBookmarked] = useState(isBookmarked);

  const { openModal, closeModal } = useModal();
  const { mutate: toggleBookmark } = useToggleBookmark();
  const isSmOrLarger = useMediaQuery('(min-width: 640px)');

  const { divRef, divHeight } = useResizeSize();
  const [height, setHeight] = useState<number | undefined>(undefined);

  useEffect(() => {
    if (isSmOrLarger) {
      setHeight(divHeight);
    } else {
      setHeight(undefined);
    }
  }, [isSmOrLarger, divHeight]);

  const combinedTags = [travelCompanion, ...travelStyle];
  const imageSrc = isValidUrl(thumbnailImageUrl) ? thumbnailImageUrl : null;
  const profileSrc = isValidUrl(profileImageUrl) ? profileImageUrl : null;

  const handleMenuClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    setMenuVisible(!menuVisible);
  };

  const handleClickOutside = () => {
    if (menuVisible) {
      setMenuVisible(false);
    }
  };

  const handleBookmarkClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    toggleBookmark(Number(id), {
      onSuccess: () => {
        setBookmarked((prev) => !prev);
      }
    });
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
          await serviceSchedule.deleteSchedules(Number(id));
          closeModal();
          window.location.reload();
        }
      })
    );
  };

  useEffect(() => {
    if (menuVisible) {
      document.addEventListener('click', handleClickOutside);
    } else {
      document.removeEventListener('click', handleClickOutside);
    }

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [menuVisible]);

  return (
    <Link href={`/plan/detail/${id}`} passHref>
      <div
        className={`relative flex w-full flex-col overflow-hidden rounded-lg bg-white-01 shadow-[0_0_10px_0_rgba(0,0,0,0.08)] sm:w-full sm:flex-row ${isSearchPage ? 'w-full xl:max-w-[590px]' : ''}`}
        role="button"
        tabIndex={0}
        ref={divRef}
        style={isSmOrLarger && height ? { height } : undefined}
      >
        {/* 책갈피 아이콘 */}
        <button
          type="button"
          className="absolute left-4 top-4 z-10 flex h-[40px] w-[40px] flex-shrink-0 items-center justify-center rounded-[5px] bg-white-01 p-2 backdrop-blur-[10px]"
          onClick={handleBookmarkClick}
        >
          {bookmarked ? <BookmarkFilledIcon /> : <BookmarkIcon />}
        </button>
        {/* 케밥 메뉴 */}
        {isEditable && isPlanTab && (
          <div className="absolute right-4 top-4">
            <button type="button" onClick={handleMenuClick} className="flex h-4 w-4 items-center justify-center">
              <ImageBox className="h-full" src="/icons/kebab.svg" alt="kebab menu" width={16} height={16} />
            </button>
            {menuVisible && (
              <div className="absolute right-0 mt-2 flex w-[110px] flex-col gap-4 rounded-md bg-white-01 p-4 shadow-[0_0_10px_0_rgba(0,0,0,0.1)]">
                <button
                  type="button"
                  className="font-btn-text block w-full cursor-pointer text-left text-red-01"
                  onClick={handleDeletePlan}
                >
                  삭제하기
                </button>
              </div>
            )}
          </div>
        )}
        {/* 대표 이미지 */}
        <div
          className="relative h-[180px] w-full flex-shrink-0 sm:h-[201px] sm:w-[280px]"
          style={isSmOrLarger ? { height } : undefined}
        >
          {imageSrc ? (
            <ImageBox
              className="h-full w-full object-cover"
              src={imageSrc}
              alt="thumbnailImageUrl"
              width={280}
              height={isSmOrLarger && height ? height : 201}
            />
          ) : (
            <div className="h-full w-full object-cover">
              <ArticleDefaultIcon className="h-full w-full" />
            </div>
          )}
        </div>
        {/* 콘텐츠 */}
        <div className="flex flex-grow flex-col">
          {/* 상단 각종 데이터 */}
          <div className="flex flex-col gap-2 border-b border-gray-03 p-4">
            <p className="font-subtitle-1 w-full truncate sm:w-auto sm:pr-20">{title}</p>
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-[6px]">
                <MapPinIcon width={16} height={16} />
                <span className="font-subtitle-3 text-gray-01">{city.join(', ')}</span>
              </div>
              <div className="flex items-center gap-[6px]">
                <CalendarIcon width={16} height={16} />
                <span className="font-subtitle-3 text-gray-01">
                  {startAt} ~ {endAt}
                </span>
              </div>
            </div>
            <div className="flex-row-center flex-wrap gap-2">
              {combinedTags.map((item) => (
                <Badge key={item} type="해시태그" className="mr-2">
                  {item}
                </Badge>
              ))}
            </div>
          </div>
          <div className="flex-row-center justify-between p-4">
            <div className="flex-row-center gap-2">
              {profileSrc ? (
                <ImageBox
                  className="size-full max-h-8 max-w-8 rounded-full"
                  src={profileSrc}
                  alt="profileImageUrl"
                  width={32}
                  height={32}
                />
              ) : (
                <div className="size-full max-h-8 max-w-8 rounded-full">
                  <ProfileDefaultIcon className="h-full w-full" />
                </div>
              )}
              <p className="font-caption-2 text-black-01">{name}</p>
            </div>
            <div className="flex-row-center gap-1 p-1">
              <div className="inline h-[11px] w-[11px]">
                <BookmarkGrayIcon width={11} height={11} />
              </div>
              <span className="font-caption-3 text-gray-01">{bookmarkCount}</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
