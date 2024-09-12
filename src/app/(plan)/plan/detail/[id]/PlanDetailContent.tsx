/* eslint-disable max-len */

'use client';

import React, { useCallback, useState } from 'react';

import dynamic from 'next/dynamic';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { Article, Schedule, ScheduleDetail } from '@/apis/useArticle/article.type';
import ARTICLE_SERVICE from '@/apis/useArticle/fetch';
import usePutCoverImage from '@/apis/useArticle/useCoverImage';
import Button from '@/components/common/button/Button';
import Chip from '@/components/common/button/Chip';
import Dropdown from '@/components/common/Dropdown';
import DragAndDrop from '@/components/dragAndDrop/DragAndDrop';
import HorizontalResizer from '@/components/HorizontalResizer';
import LoadingSpinner from '@/components/LoadingSpinner';
import modalList from '@/components/modal/modalList/modalList';
import VerticalResizer from '@/components/VerticalResizer';
import kebab from '@/icons/kebab.svg?url';
import penEdit from '@/icons/pen-edit.svg?url';
import share from '@/icons/share.svg?url';
import useDropdown from '@/libs/hooks/useDropdown';
import useGoogleMapsApi from '@/libs/hooks/useGoogleMapsApi';
import useMediaQuery from '@/libs/hooks/useMediaQuery';
import useModal from '@/libs/hooks/useModal';
import { TAB } from '@/libs/types/planDetailType';
import { getDateFromDayNum, getDayNum } from '@/libs/utils/dateChanger';
import { hyphenToDotDate } from '@/libs/utils/dateFormatter';

const Map = dynamic(() => import('@/components/map/Map'), { ssr: false });

const TAB_LIST: { tab: TAB; name: string }[] = [
  { tab: 'plan', name: '일정' },
  { tab: 'budget', name: '비용' }
];

const SEE_MORE_LIST = Object.freeze({
  hasReview: {
    writer: ['편집하기', '후기 보러 가기', '삭제하기'],
    viewer: ['후기 보러 가기']
  },
  noReview: {
    writer: ['편집하기', '후기 작성하기', '삭제하기'],
    viewer: []
  }
});

export default function PlanDetailContent({
  articleId,
  isDesktopInitSize,
  initialPlanDetail: { title, startAt, endAt, coverImgUrl: initCoverImgUrl },
  initialScheduleList
}: {
  articleId: string;
  isDesktopInitSize: boolean;
  initialPlanDetail: Omit<Article, 'articleId' | 'profileImgUrl'>;
  initialScheduleList: ScheduleDetail;
}) {
  const [isEditing, setIsEditing] = useState(false);
  const isDesktop = useMediaQuery('(min-width: 1024px)', isDesktopInitSize);
  const [scheduleList, setScheduleList] = useState(initialScheduleList);
  const [selectedTab, setSelectedTab] = useState<TAB>('plan');
  const [selectedDay, setSelectedDay] = useState(1);
  const [coverImageUrl, setCoverImageUrl] = useState(initCoverImgUrl || '');
  const { mutate: coverImageMutate, isPending: isCoverImagePending } = usePutCoverImage();
  const { isLoaded: isGoggleApiLoaded } = useGoogleMapsApi();
  const { openModal, closeModal } = useModal();
  const {
    ref: dropdownRef,
    isDropdownOpened,
    handleDropdownClose,
    handleDropdownOpen
  } = useDropdown<HTMLUListElement>({ onClickOutside: () => handleDropdownClose() });
  const router = useRouter();

  const { reviewId, schedules, isEditable } = scheduleList;
  const dayList = Array.from({ length: getDayNum(endAt, startAt, endAt) }, (_, i) => i + 1);
  const seeMoreList = SEE_MORE_LIST[reviewId ? 'hasReview' : 'noReview'][isEditable ? 'writer' : 'viewer'];
  const currentDaySchedules = schedules.filter(
    (schedule) => schedule.visitedDate === getDateFromDayNum(selectedDay, startAt, endAt)
  );
  const currentDayCoordinateList = currentDaySchedules
    .filter(({ dtype }) => dtype === 'GENERAL' || dtype === 'TRANSPORT')
    .map((schedule) => {
      if (schedule.dtype === 'GENERAL') {
        const lat = schedule.scheduleGeneral?.googleMapLatitude;
        const lng = schedule.scheduleGeneral?.googleMapLongitude;
        if (!lat || !lng) return;
        return { lat, lng };
      }
      const lat = schedule.scheduleTransport?.googleMapStartLatitude;
      const lng = schedule.scheduleTransport?.googleMapStartLongitude;
      if (!lat || !lng) return;
      return { lat, lng };
    });
  const currentDayMarkerCategoryList = currentDaySchedules.map((schedule) => schedule.category);
  const handleUpdateScheduleList = useCallback((updatedList: Schedule[]) => {
    setScheduleList((prev) => ({ ...prev, schedules: updatedList }));
  }, []);

  const handleDeletePlan = () => {
    openModal(
      modalList.SubmitModal({
        className: 'h-auto w-[20rem] md:w-[25rem] ',
        text: '일정을 삭제하시겠습니까?',
        submitText: '삭제하기',
        negative: true,
        sameMdPadding: true,
        onCancel: () => closeModal(),
        onSubmit: async () => {
          // 삭제 후 홈페이지로 이동
          try {
            await ARTICLE_SERVICE.deleteArticle(articleId);
          } catch (error) {
            // TODO: 실패하면?
            console.error(error);
          } finally {
            closeModal();
          }
        }
      })
    );
  };

  const handleDropdownSelect = (e: any) => {
    const selectedMenu = e.target.textContent;

    if (selectedMenu === '편집하기') {
      setIsEditing(true);
    }

    if (selectedMenu === '후기 작성하기') {
      // 페이지 이동
      router.push(`/write/${articleId}`);
      console.log('후가 작성 페이지 이동');
    }

    if (selectedMenu === '후기 보러가기') {
      // 페이지 이동
      router.push(`/review/${reviewId}`);
      console.log('후기 보러가기 페이지 이동');
    }

    if (selectedMenu === '삭제하기') {
      handleDeletePlan();
    }

    handleDropdownClose();
  };

  const handleChangeCoverImageFile: React.ChangeEventHandler<HTMLInputElement> = async (e) => {
    const file = e.target.files?.[0];

    if (!file) {
      return;
    }

    coverImageMutate(
      { articleId, coverImage: file },
      {
        onSuccess: ({ coverImgUrl: newCoverImgUrl }) => setCoverImageUrl(newCoverImgUrl),
        onError: () => {} // TODO: 이미지 업로드 실패 Toast
      }
    );
  };

  const handleShareButtonClick = () => {
    openModal(
      modalList.ShareLink({
        className: 'h-[100vh] md:w-[36.875rem] max-md:rounded-none md:h-auto',
        imageUrl: coverImageUrl,
        onSubmit: () => closeModal()
      })
    );
  };

  const handleEditSubmit = async () => {
    try {
      await ARTICLE_SERVICE.putSchedules(articleId, { schedules: scheduleList.schedules });
      setIsEditing(false);
    } catch (error) {
      console.error('실패: ', error);
      // TODO: 실패 Toast
    }
  };

  return (
    <div className="relative">
      <HorizontalResizer isResizable={isDesktop}>
        <div className="scrollbar-custom relative bg-white-01 lg:z-10 lg:h-[calc(100vh-72px)] lg:overflow-x-hidden lg:overflow-y-scroll">
          {/* 대표 이미지 */}
          <div className={`relative w-full ${coverImageUrl ? '' : 'pd:mx-[30px] px-5 pt-5 lg:px-10'}`}>
            {coverImageUrl && (
              <div className="relative h-[180px] w-full md:h-60">
                <Image src={coverImageUrl} alt="여행 대표 이미지" fill style={{ objectFit: 'cover' }} />
                {isCoverImagePending && (
                  <div className="flex-row-center absolute inset-0 justify-center bg-black-02/50">
                    <LoadingSpinner />
                  </div>
                )}
              </div>
            )}
            {isEditing && (
              <>
                <input
                  id="coverImage"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleChangeCoverImageFile}
                />
                <label
                  htmlFor="coverImage"
                  className={`font-caption-3 ${coverImageUrl ? 'absolute bottom-5 right-5 md:left-5 md:right-auto' : 'relative'} h-8 cursor-pointer rounded-[0.3125rem] border border-gray-02 bg-white-01 px-4 py-[0.375rem] text-center hover:bg-gray-02`}
                >
                  커버 이미지 {coverImageUrl ? '변경' : '추가'}
                </label>
              </>
            )}
          </div>

          {/* 여행 정보 */}
          <div className={`pb-4 md:pb-5 ${coverImageUrl ? 'pt-5' : 'pt-3'} px-5 md:px-[30px] lg:border-b lg:px-10`}>
            <div className="flex-row-center justify-between gap-2 pb-2">
              <p className="font-caption-1 shrink-0 text-black-03">{`${hyphenToDotDate(startAt)} ~ ${hyphenToDotDate(endAt)}`}</p>
              <div className="relative shrink-0">
                <button type="button" onClick={handleShareButtonClick}>
                  <Image src={share} alt="공유하기" width={24} height={24} />
                </button>
                {!!seeMoreList.length && (
                  <button type="button" onClick={handleDropdownOpen}>
                    <Image src={kebab} alt="더보기" width={24} height={24} />
                  </button>
                )}
                {isDropdownOpened && (
                  <Dropdown
                    className="scrollbar-custom absolute right-0 top-9 z-30 overflow-auto px-0 py-[0.625rem]"
                    ref={dropdownRef}
                  >
                    {seeMoreList.map((item) => {
                      return (
                        <Button
                          className="modal-dropdown flex-row-center w-full cursor-pointer justify-between whitespace-nowrap py-2 pl-5 pr-8 hover:bg-primary-02"
                          key={item}
                          onClick={handleDropdownSelect}
                        >
                          <p className={`font-btn-text ${item === '삭제하기' && 'text-red-01'}`}>{item}</p>
                        </Button>
                      );
                    })}
                  </Dropdown>
                )}
              </div>
            </div>

            <div className="flex-row-center gap-2">
              <h1 className="font-title-2">{title}</h1>
              {isEditable && (
                <Link href={`/plan/initial/${articleId}`}>
                  <Image src={penEdit} alt="여행 초기 정보 수정하기" width={24} height={24} />
                </Link>
              )}
            </div>
          </div>

          {/* 여행 상세 */}
          <div className="scrollbar-custom fixed bottom-0 z-10 w-full overflow-y-auto bg-white-01 lg:relative">
            <VerticalResizer isResizable={!isDesktop}>
              <div className="flex-row-center justify-between">
                <div className="font-title-3 mx-5 mb-5 mt-7 flex flex-row items-start gap-7 text-gray-01 md:mx-7 md:mt-12 xl:mx-10 xl:my-5 ">
                  {TAB_LIST.map((item) => (
                    <Button
                      key={item.tab}
                      className={`flex-col-center w-[3.125rem] gap-1 ${selectedTab === item.tab && 'text-black-01'}`}
                      onClick={() => setSelectedTab(item.tab)}
                    >
                      {item.name}
                      {selectedTab === item.tab && <div className="ml-[2px] h-[0.125rem] w-12 bg-black-01" />}
                    </Button>
                  ))}
                </div>
                {isEditing && (
                  <Button
                    className="btn-solid font-btn-2 mr-5 h-10 w-20 gap-x-2.5 rounded-md md:mr-7 xl:mr-10"
                    onClick={handleEditSubmit}
                  >
                    완료하기
                  </Button>
                )}
              </div>
              {/* Day N 바로가기 버튼 -> 나중에 추가 / intersectionObserver 사용해야 할 듯 */}
              <div className="mx-5 mb-5 w-[calc(100%-5rem)] overflow-hidden md:mx-7 md:mb-7 xl:mx-10 xl:mb-9">
                <div className="flex-row-center scrollbar-custom w-full gap-2 overflow-x-auto">
                  {dayList.map((day) => (
                    <Chip
                      key={day}
                      className="mb-3 flex-shrink-0"
                      variant="day"
                      selected={day === selectedDay}
                      onClick={() => setSelectedDay(day)}
                    >
                      Day {day}
                    </Chip>
                  ))}
                </div>
              </div>
              {/* Day 1~N 콘텐츠 */}
              <DragAndDrop
                initList={schedules}
                startAt={startAt}
                endAt={endAt}
                selectedTab={selectedTab}
                updateList={handleUpdateScheduleList}
                isLoaded={isGoggleApiLoaded}
                isEdit={isEditing}
              />
            </VerticalResizer>
          </div>
        </div>
      </HorizontalResizer>

      {/* 지도 */}
      {isGoggleApiLoaded && (
        <div className="h-screen w-full lg:absolute lg:inset-0 lg:h-full">
          <Map
            mapContainerStyle={{ width: '100%', height: '100%' }}
            coordinateList={currentDayCoordinateList}
            markerCategoryList={currentDayMarkerCategoryList}
            alwaysRender
          />
        </div>
      )}
    </div>
  );
}
