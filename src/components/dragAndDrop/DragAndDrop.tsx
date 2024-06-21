'use client';

import React, { useEffect, useState } from 'react';

import dynamic from 'next/dynamic';

import { getDateFromDayNum, getDayNum } from '@/libs/utils/dateChanger';

import INIT_SCHEDULE_DATA from './constant';
import { Schedule, ScheduleList } from './type';

const Droppable = dynamic(() => import('@hello-pangea/dnd').then((mod) => mod.Droppable), { ssr: false });
const Draggable = dynamic(() => import('@hello-pangea/dnd').then((mod) => mod.Draggable), { ssr: false });
const DragDropContext = dynamic(() => import('@hello-pangea/dnd').then((mod) => mod.DragDropContext), { ssr: false });

// mapping할 때 사용할 데이터 타입
export type ScheduleWithKey = Schedule & {
  key: string;
};

interface DragAndDropProps {
  initList: Schedule[];
  startAt: string;
  endAt: string;
  updateList: (updatedList: ScheduleList) => void;
}

export default function DragAndDrop({ initList, startAt, endAt, updateList }: DragAndDropProps) {
  const [scheduleList, setScheduleList] = useState<ScheduleWithKey[][]>([]);
  const [columnKeyList, setColumnKeyList] = useState<string[]>([]);

  const columnCount = initList.length;

  // 아이템 재정렬
  const reorder = (list: ScheduleWithKey[], startIdx: number, endIdx: number): ScheduleWithKey[] => {
    const result = Array.from(list);
    const [removed] = result.splice(startIdx, 1);
    result.splice(endIdx, 0, removed);

    return result.map((item, index) => ({
      ...item,
      order: index + 1
    }));
  };

  // 아이템 이동
  const move = (
    source: ScheduleWithKey[],
    destination: ScheduleWithKey[],
    droppableSource: any,
    droppableDestination: any
  ) => {
    const srcClone = Array.from(source);
    const destClone = Array.from(destination);
    const [removed] = srcClone.splice(droppableSource.index, 1);
    destClone.splice(droppableDestination.index, 0, removed);

    const updatedSource: ScheduleWithKey[] = srcClone.map((item, index) => ({
      ...item,
      sort_order: index + 1
    }));

    const newVisitedDate = getDateFromDayNum(+droppableDestination.droppableId + 1, startAt, endAt) || endAt;

    const updatedDestination: ScheduleWithKey[] = destClone.map((item, index) => ({
      ...item,
      sort_order: index + 1,
      visited_date: newVisitedDate
    }));

    const result: { [key: string]: ScheduleWithKey[] } = {};
    result[droppableSource.droppableId] = updatedSource;
    result[droppableDestination.droppableId] = updatedDestination;

    return result;
  };

  // 드래그 종료
  const handleDragEnd = (result: any) => {
    const { source, destination } = result;

    if (!destination) return;

    const srcIdx = +source.droppableId;
    const destIdx = +destination.droppableId;

    if (srcIdx === destIdx) {
      const reorderedList = reorder(scheduleList[srcIdx], source.index, destination.index);
      const newScheduleList = [...scheduleList];
      newScheduleList[srcIdx] = reorderedList;
      setScheduleList(newScheduleList);
    } else {
      const movedList = move(scheduleList[srcIdx], scheduleList[destIdx], source, destination);
      const newScheduleList = [...scheduleList];
      newScheduleList[srcIdx] = movedList[srcIdx];
      newScheduleList[destIdx] = movedList[destIdx];
      setScheduleList(newScheduleList);
    }
  };

  /**
   * 모달에 연결하기
   */
  // 아이템 추가
  const handleAddItem = (index: number) => {
    const newVisitedDate = getDateFromDayNum(index + 1, startAt, endAt) || endAt;
    const newScheduleWithKey = {
      ...INIT_SCHEDULE_DATA,
      key: `item-${new Date().getTime()}`,
      visited_date: newVisitedDate,
      sort_order: scheduleList[index].length + 1
    };

    const newScheduleList = [...scheduleList];
    newScheduleList[index] = [...newScheduleList[index], newScheduleWithKey];
    setScheduleList(newScheduleList);
  };

  /**
   * 모달에 연결하기
   */
  // 아이템 삭제
  const handleDeleteItem = (columnIdx: number, itemIdx: number) => {
    const newScheduleList = [...scheduleList];
    const deletedSchedule = newScheduleList[columnIdx].splice(itemIdx, 1)[0];

    const updatedColumn: ScheduleWithKey[] = newScheduleList[columnIdx].map((item, index) => ({
      ...item,
      sort_order: index + 1
    }));

    newScheduleList[columnIdx] = updatedColumn;

    setScheduleList(newScheduleList);

    return deletedSchedule;
  };

  // initList에 mapping용 key가 추가된 ScheduleList 생성
  useEffect(() => {
    const initListWithKey: ScheduleWithKey[] = initList.map((item) => ({
      ...item,
      key: `${item.visited_date}${item.sort_order}${new Date().getTime()}` // 고유한 mapping용 key 추가
    }));

    const scheduleListWithKey: ScheduleWithKey[][] = Array.from({ length: columnCount }, () => []);

    initListWithKey.forEach((item) => {
      const newIdx = getDayNum(item.visited_date, startAt, endAt) - 1;
      const colIdx = newIdx >= 0 ? newIdx : columnCount - 1;
      scheduleListWithKey[colIdx].push(item);
    });

    setScheduleList(scheduleListWithKey);
  }, [initList, columnCount, startAt, endAt]);

  // 각 column에 사용할 key 리스트
  useEffect(() => {
    for (let idx = 0; idx < columnCount; idx += 1) {
      columnKeyList[idx] = `columnKey-${idx}`;
    }
    setColumnKeyList(columnKeyList);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [columnCount]);

  // updateList 호출
  useEffect(() => {
    const updatedScheduleListWithKey = scheduleList.flat();
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const updatedScheduleList: Schedule[] = updatedScheduleListWithKey.map(({ key, ...item }) => item);
    const newPayload = { schedules: updatedScheduleList };
    updateList(newPayload);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [scheduleList]);

  // 렌더링
  return (
    <div className="flex gap-4">
      <DragDropContext onDragEnd={handleDragEnd}>
        {/* Day 1~N Column 전체 */}
        {scheduleList.map((list, columnIdx) => (
          <Droppable key={columnKeyList[columnIdx]} droppableId={`${columnIdx}`}>
            {/* Day N Column 1열 */}
            {(listProvided: any, listSnapshot: any) => (
              <div
                className="flex-col-center w-full gap-3 bg-gray-02 p-5"
                ref={listProvided.innerRef}
                style={{ ...listSnapshot.isDraggingOver }}
                {...listProvided.droppableProps}
              >
                {/* Day N 블록 리스트 */}
                {list.map((item, itemIdx) => (
                  <Draggable key={item.key} draggableId={item.key} index={itemIdx}>
                    {(itemProvided: any, itemSnapshot: any) => (
                      <div
                        className="w-full bg-white-01 p-4"
                        ref={itemProvided.innerRef}
                        {...itemProvided.draggableProps}
                        {...itemProvided.dragHandleProps}
                        style={{ ...itemSnapshot.isDragging, ...itemProvided.draggableProps.style }}
                      >
                        {/* 블록 컴포넌트 */}
                        <div className="flex-row-center justify-between">
                          <p>{item.sort_order}</p>
                          <p>{item.visited_date}</p>
                          <button type="button" onClick={() => handleDeleteItem(columnIdx, itemIdx)}>
                            삭제하기
                          </button>
                        </div>
                      </div>
                    )}
                  </Draggable>
                ))}
                {/* provided.placeholder 삭제 금지 */}
                {listProvided.placeholder}
                {/* 블록 추가 */}
                <button type="button" onClick={() => handleAddItem(columnIdx)}>
                  추가하기
                </button>
              </div>
            )}
          </Droppable>
        ))}
      </DragDropContext>
    </div>
  );
}
