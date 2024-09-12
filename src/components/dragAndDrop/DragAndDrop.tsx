/* eslint-disable max-len */
/* eslint-disable no-shadow */

'use client';

import { useState } from 'react';

import { DraggableProvided, DroppableProvided, DropResult } from '@hello-pangea/dnd';
import dynamic from 'next/dynamic';

import { Schedule, ScheduleWithKey } from '@/apis/useArticle/article.type';
import AddPlanButton from '@/components/common/button/AddPlan';
import Button from '@/components/common/button/Button';
import INIT_SCHEDULE_DATA from '@/components/dragAndDrop/constant';
import DayHeader from '@/components/dragAndDrop/DayHeader';
import ScheduleBlock from '@/components/dragAndDrop/ScheduleBlock';
import modalList from '@/components/modal/modalList/modalList';
import TrashSvg from '@/icons/trash.svg';
import useModal from '@/libs/hooks/useModal';
import {
  EtcBlockDetailData,
  OnBlockDetailEdit,
  OnBudgetDetailEdit,
  OnEtcSelect,
  OnPlaceSelect,
  OnTransportSelect,
  PlaceBlockDetailData,
  TransportBlockDetailData
} from '@/libs/types/modalType';
import { TAB } from '@/libs/types/planDetailType.js';
import { getDateFromDayNum, getDayNum } from '@/libs/utils/dateChanger';

const Droppable = dynamic(() => import('@hello-pangea/dnd').then((mod) => mod.Droppable), { ssr: false });
const Draggable = dynamic(() => import('@hello-pangea/dnd').then((mod) => mod.Draggable), { ssr: false });
const DragDropContext = dynamic(() => import('@hello-pangea/dnd').then((mod) => mod.DragDropContext), { ssr: false });

const createInitialScheduleListWithKey = (initList: Schedule[], startAt: string, endAt: string) => {
  const columnCount = getDayNum(endAt, startAt, endAt);
  const initListWithKey: ScheduleWithKey[] = initList.map((item) => ({
    ...item,
    key: crypto.randomUUID()
  }));

  const newScheduleListWithKey: ScheduleWithKey[][] = Array.from({ length: columnCount }, () => []);

  initListWithKey.forEach((item) => {
    const newIdx = getDayNum(item.visitedDate, startAt, endAt) - 1;
    const colIdx = newIdx >= 0 ? newIdx : columnCount - 1;
    newScheduleListWithKey[colIdx][item.sortOrder - 1] = item;
  });

  return newScheduleListWithKey;
};

interface DragAndDropProps {
  initList: Schedule[];
  startAt: string;
  endAt: string;
  selectedTab: TAB;
  updateList: (updatedList: Schedule[]) => void;
  isLoaded: boolean;
  isEdit: boolean;
  onClickAdd?: () => void;
  onClickDelete?: () => void;
}

// 컴포넌트
export default function DragAndDrop({
  initList,
  startAt,
  endAt,
  selectedTab,
  updateList,
  isLoaded,
  isEdit,
  onClickAdd = () => {},
  onClickDelete = () => {}
}: DragAndDropProps) {
  const [scheduleListWithKey, setScheduleListWithKey] = useState<ScheduleWithKey[][]>(() =>
    createInitialScheduleListWithKey(initList, startAt, endAt)
  );
  const { openModal, closeModal } = useModal();
  const dateList = Array.from({ length: getDayNum(endAt, startAt, endAt) }, (_, index) =>
    getDateFromDayNum(index + 1, startAt, endAt)
  );

  const updateScheduleList = (scheduleListWithKey: ScheduleWithKey[][]) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const newScheduleList = scheduleListWithKey.flat().map(({ key, ...item }) => item);

    updateList(newScheduleList);
  };

  // 드래그 종료
  const handleDragEnd = (result: DropResult) => {
    const { draggableId, source, destination } = result;

    if (!destination) return;

    const draggableBlock = scheduleListWithKey.flat().find((block) => block.key === draggableId);

    if (!draggableBlock) return;

    const newVisitedDate = getDateFromDayNum(+destination.droppableId + 1, startAt, endAt) || endAt;
    const newBlock = { ...draggableBlock, visitedDate: newVisitedDate };

    const newScheduleList = scheduleListWithKey
      .map((schedule, index) => {
        const newSchedule =
          index === +source.droppableId ? schedule.filter((block) => block.key !== draggableId) : schedule;

        if (index !== +destination.droppableId) {
          return newSchedule;
        }

        return [...newSchedule.slice(0, destination.index), newBlock, ...newSchedule.slice(destination.index)];
      })
      .map((schedule, index) =>
        index === +source.droppableId || index === +destination.droppableId
          ? schedule.map((block, index) => ({ ...block, sortOrder: index + 1 }))
          : schedule
      );

    setScheduleListWithKey(newScheduleList);
    updateScheduleList(newScheduleList);
  };

  // 아이템 삭제
  const handleDeleteItem = (columnIdx: number, itemIdx: number) => {
    const newScheduleList = [...scheduleListWithKey];
    const deletedSchedule = newScheduleList[columnIdx].splice(itemIdx, 1)[0];

    const updatedColumn: ScheduleWithKey[] = newScheduleList[columnIdx].map((item, index) => ({
      ...item,
      sortOrder: index + 1
    }));

    newScheduleList[columnIdx] = updatedColumn;

    setScheduleListWithKey(newScheduleList);
    updateScheduleList(newScheduleList);

    onClickDelete();

    return deletedSchedule;
  };

  // 숙소, 식당, 관광지, 액티비티 블록 생성
  const handlePlaceSelect: OnPlaceSelect<{ columnIdx: number }> = ({ category, place, columnIdx }) => {
    const newVisitedDate = getDateFromDayNum(columnIdx + 1, startAt, endAt) || endAt;
    const newScheduleWithKey: ScheduleWithKey = {
      ...INIT_SCHEDULE_DATA,
      key: crypto.randomUUID(),
      visitedDate: newVisitedDate,
      sortOrder: scheduleListWithKey[columnIdx].length + 1,
      category,
      dtype: 'GENERAL',
      scheduleGeneral: {
        placeName: place.name || '빈 이름',
        googleMapPlaceId: place.placeId || '',
        googleMapLatitude: place.geometry?.location?.lat() || 0,
        googleMapLongitude: place.geometry?.location?.lng() || 0,
        googleMapAddress: place.formattedAddress || '',
        googleMapPhoneNumber: place.formattedPhoneNumber || '',
        googleMapHomePageUrl: place.website || ''
      }
    };
    const newScheduleList = [...scheduleListWithKey];
    newScheduleList[columnIdx] = [...newScheduleList[columnIdx], newScheduleWithKey];

    setScheduleListWithKey(newScheduleList);
    updateScheduleList(newScheduleList);

    closeModal();
    onClickAdd();
  };

  // 교통 블록 생성
  const handleTransportSelect: OnTransportSelect<{ columnIdx: number }> = ({
    category,
    transport,
    place,
    secondPlace,
    columnIdx
  }) => {
    const newVisitedDate = getDateFromDayNum(columnIdx + 1, startAt, endAt) || endAt;
    const newScheduleWithKey: ScheduleWithKey = {
      ...INIT_SCHEDULE_DATA,
      key: crypto.randomUUID(),
      visitedDate: newVisitedDate,
      sortOrder: scheduleListWithKey[columnIdx].length + 1,
      category,
      dtype: 'TRANSPORT',
      scheduleTransport: {
        transportation: transport,
        startPlaceName: place.name || '빈 이름',
        googleMapStartPlaceAddress: place.formattedAddress || '',
        googleMapStartLatitude: place.geometry?.location?.lat() || 0,
        googleMapStartLongitude: place.geometry?.location?.lng() || 0,
        endPlaceName: secondPlace.name || '빈 이름',
        googleMapEndPlaceAddress: secondPlace.formattedAddress || '',
        googleMapEndLatitude: secondPlace.geometry?.location?.lat() || 0,
        googleMapEndLongitude: secondPlace.geometry?.location?.lng() || 0
      }
    };
    const newScheduleList = [...scheduleListWithKey];
    newScheduleList[columnIdx] = [...newScheduleList[columnIdx], newScheduleWithKey];

    setScheduleListWithKey(newScheduleList);
    updateScheduleList(newScheduleList);
    closeModal();
    onClickAdd();
  };

  // 기타 블록 생성
  const handleEtcSelect: OnEtcSelect<{ columnIdx: number }> = ({ category, name, columnIdx }) => {
    const newVisitedDate = getDateFromDayNum(columnIdx + 1, startAt, endAt) || endAt;
    const newScheduleWithKey: ScheduleWithKey = {
      ...INIT_SCHEDULE_DATA,
      key: crypto.randomUUID(),
      visitedDate: newVisitedDate,
      sortOrder: scheduleListWithKey[columnIdx].length + 1,
      category,
      dtype: 'ETC',
      scheduleEtc: {
        placeName: name
      }
    };
    const newScheduleList = [...scheduleListWithKey];
    newScheduleList[columnIdx] = [...newScheduleList[columnIdx], newScheduleWithKey];

    setScheduleListWithKey(newScheduleList);
    updateScheduleList(newScheduleList);
    closeModal();
    onClickAdd();
  };

  // 블록 생성 모달 열기 버튼
  const handleCreateBlockModalOpen = (columnIdx: number) => {
    if (!isLoaded) return;
    openModal(
      modalList.CreateBlock({
        className: 'h-[100vh] md:w-[36.875rem] max-md:rounded-none md:h-auto',
        onClose: closeModal,
        isLoaded,
        onPlaceSelect: ({ ...props }) => handlePlaceSelect({ ...props, columnIdx }),
        onTransportSelect: ({ ...props }) => handleTransportSelect({ ...props, columnIdx }),
        onEtcSelect: ({ ...props }) => handleEtcSelect({ ...props, columnIdx })
      })
    );
  };

  // 일정 상세 모달 편집 완료 버튼
  const handleDetailEditSubmit: OnBlockDetailEdit<{ columnIdx: number; itemIdx: number }> = ({
    startAt,
    duration,
    budget,
    memo,
    columnIdx,
    itemIdx
  }) => {
    const newScheduleList = [...scheduleListWithKey];
    newScheduleList[columnIdx][itemIdx] = {
      ...newScheduleList[columnIdx][itemIdx],
      visitedTime: startAt,
      durationTime: duration,
      expense: budget,
      memo: memo || ''
    };

    setScheduleListWithKey(newScheduleList);
    updateScheduleList(newScheduleList);
    closeModal();
  };

  // 비용 모달 편집 완료 버튼
  const handleBudgetEditSubmit: OnBudgetDetailEdit<{ budget: string; columnIdx: number; itemIdx: number }> = ({
    budget,
    columnIdx,
    itemIdx
  }: {
    budget: string;
    columnIdx: number;
    itemIdx: number;
  }) => {
    const newScheduleList = [...scheduleListWithKey];
    newScheduleList[columnIdx][itemIdx] = {
      ...newScheduleList[columnIdx][itemIdx],
      expense: budget
    };

    setScheduleListWithKey(newScheduleList);
    updateScheduleList(newScheduleList);
    closeModal();
  };

  // 일정 상세 블록 데이터 매핑
  const createBlockData = (schedule: ScheduleWithKey, baseData: any) => {
    if (schedule.dtype === 'GENERAL') {
      const { scheduleGeneral } = schedule;
      if (!scheduleGeneral) return null;
      const blockData: PlaceBlockDetailData = {
        ...baseData,
        name: scheduleGeneral.placeName,
        placeId: scheduleGeneral.googleMapPlaceId,
        lat: scheduleGeneral.googleMapLatitude,
        lng: scheduleGeneral.googleMapLongitude,
        address: scheduleGeneral.googleMapAddress,
        phone: scheduleGeneral.googleMapPhoneNumber,
        homepage: scheduleGeneral.googleMapHomePageUrl
      };
      return blockData;
    }

    if (schedule.dtype === 'TRANSPORT') {
      const { scheduleTransport } = schedule;
      if (!scheduleTransport) return null;
      const blockData: PlaceBlockDetailData = {
        ...baseData,
        name: scheduleTransport.startPlaceName,
        transport: scheduleTransport.transportation,
        address: scheduleTransport.googleMapStartPlaceAddress,
        lat: scheduleTransport.googleMapStartLatitude,
        lng: scheduleTransport.googleMapStartLongitude,
        secondPlaceName: scheduleTransport.endPlaceName,
        secondPlaceAddress: scheduleTransport.googleMapEndPlaceAddress,
        secondPlaceLat: scheduleTransport.googleMapEndLatitude,
        secondPlaceLng: scheduleTransport.googleMapEndLongitude
      };
      return blockData;
    }

    if (schedule.dtype === 'ETC') {
      const { scheduleEtc } = schedule;
      if (!scheduleEtc) return null;
      const blockData: PlaceBlockDetailData = {
        ...baseData,
        name: scheduleEtc.placeName
      };
      return blockData;
    }

    return null;
  };

  // 일정 상세 모달 열기 버튼
  const handleBlockDetailModalOpen = (columnIdx: number, itemIdx: number) => {
    const schedule = scheduleListWithKey[columnIdx][itemIdx];
    const { category } = scheduleListWithKey[columnIdx][itemIdx];

    if (!schedule.scheduleGeneral && !schedule.scheduleTransport && !schedule.scheduleEtc) return;

    const baseData = {
      category,
      startAt: schedule.visitedTime,
      duration: schedule.durationTime,
      budget: schedule.expense,
      memo: schedule.memo
    };

    const blockData: PlaceBlockDetailData | TransportBlockDetailData | EtcBlockDetailData | null = createBlockData(
      schedule,
      baseData
    );

    if (!blockData) return;

    if (selectedTab === 'plan') {
      openModal(
        modalList.BlockDetail({
          className: 'h-[100vh] md:w-[36.875rem] max-md:rounded-none md:h-auto',
          onClose: closeModal,
          blockData,
          isLoaded,
          isEdit,
          onSubmit: ({ ...props }) => handleDetailEditSubmit({ ...props, columnIdx, itemIdx })
        })
      );
    }

    if (selectedTab === 'budget') {
      openModal(
        modalList.BlockDetailBudget({
          className: 'h-[100vh] md:w-[36.875rem] max-md:rounded-none md:h-auto',
          onClose: closeModal,
          blockData,
          isEdit,
          onSubmit: ({ ...props }) => handleBudgetEditSubmit({ ...props, columnIdx, itemIdx })
        })
      );
    }
  };

  // 렌더링
  return (
    <div className="scrollbar-custom flex max-md:flex-col md:overflow-x-auto">
      <DragDropContext onDragEnd={handleDragEnd}>
        {scheduleListWithKey.map((list, columnIdx) => (
          <div
            className="flex-col-center w-full px-5 md:w-72 md:min-w-80 md:px-[0.625rem] md:first:ml-7 md:last:mr-7 xl:first:ml-10 xl:last:mr-10"
            key={dateList[columnIdx]}
          >
            <DayHeader columnIdx={columnIdx} startAt={startAt} endAt={endAt} />
            <Droppable droppableId={`${columnIdx}`} isDropDisabled={!isEdit}>
              {(listProvided: DroppableProvided) => (
                <div
                  className="flex-col-center w-full gap-3 pb-16 md:gap-4"
                  ref={listProvided.innerRef}
                  {...listProvided.droppableProps}
                >
                  {list.map((schedule, itemIdx) => (
                    <Draggable
                      key={schedule.key}
                      draggableId={schedule.key}
                      index={itemIdx}
                      disableInteractiveElementBlocking
                      isDragDisabled={!isEdit}
                    >
                      {(itemProvided: DraggableProvided) => (
                        <div
                          className="relative w-full bg-white-01"
                          ref={itemProvided.innerRef}
                          {...itemProvided.draggableProps}
                          {...itemProvided.dragHandleProps}
                          style={{ ...itemProvided.draggableProps.style }}
                        >
                          <ScheduleBlock
                            schedule={scheduleListWithKey[columnIdx][itemIdx]}
                            selectedTab={selectedTab}
                            onClick={() => handleBlockDetailModalOpen(columnIdx, itemIdx)}
                          />
                          {isEdit && (
                            <Button
                              className="absolute right-4 top-4 size-6 rounded-[0.125rem] bg-white-01 shadow-button hover:bg-gray-02"
                              onClick={() => handleDeleteItem(columnIdx, itemIdx)}
                            >
                              <TrashSvg width={16} height={16} />
                            </Button>
                          )}
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {listProvided.placeholder}
                  {isEdit && <AddPlanButton className="w-full" onClick={() => handleCreateBlockModalOpen(columnIdx)} />}
                </div>
              )}
            </Droppable>
          </div>
        ))}
      </DragDropContext>
    </div>
  );
}
