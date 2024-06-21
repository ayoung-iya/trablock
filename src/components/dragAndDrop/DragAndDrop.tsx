'use client';

import React, { useEffect, useState } from 'react';

import dynamic from 'next/dynamic';

const Droppable = dynamic(() => import('@hello-pangea/dnd').then((mod) => mod.Droppable), { ssr: false });
const Draggable = dynamic(() => import('@hello-pangea/dnd').then((mod) => mod.Draggable), { ssr: false });
const DragDropContext = dynamic(() => import('@hello-pangea/dnd').then((mod) => mod.DragDropContext), { ssr: false });

// api에서 받아올 데이터 타입
export type ItemList = {
  schedule_id?: string;
  name: string;
  column: number;
  order: number;
};

// mapping할 때 사용할 데이터 타입
type ItemListWithId = ItemList & {
  key: string;
};

// 아이템 재정렬
const reorder = (list: ItemListWithId[], startIdx: number, endIdx: number): ItemListWithId[] => {
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
  source: ItemListWithId[],
  destination: ItemListWithId[],
  droppableSource: any,
  droppableDestination: any
) => {
  const srcClone = Array.from(source);
  const destClone = Array.from(destination);
  const [removed] = srcClone.splice(droppableSource.index, 1);
  destClone.splice(droppableDestination.index, 0, removed);

  const updatedSource = srcClone.map((item, index) => ({
    ...item,
    order: index + 1
  }));

  const updatedDestination = destClone.map((item, index) => ({
    ...item,
    order: index + 1,
    column: +droppableDestination.droppableId + 1
  }));

  const result: { [key: string]: ItemListWithId[] } = {};
  result[droppableSource.droppableId] = updatedSource;
  result[droppableDestination.droppableId] = updatedDestination;

  return result;
};

interface DragAndDropProps {
  initItemList: ItemList[];
  columnCount: number;
  onSubmit: (itemListWithId: ItemList[]) => void;
}

export default function DragAndDrop({ initItemList, columnCount, onSubmit }: DragAndDropProps) {
  const [itemList, setItemList] = useState<ItemListWithId[][]>([]);
  const [columnKeyList, setColumnKeyList] = useState<string[]>([]);

  // 드래그 종료
  const handleDragEnd = (result: any) => {
    const { source, destination } = result;

    if (!destination) return;

    const srcIdx = +source.droppableId;
    const destIdx = +destination.droppableId;

    if (srcIdx === destIdx) {
      const reorderedList = reorder(itemList[srcIdx], source.index, destination.index);
      const newItemList = [...itemList];
      newItemList[srcIdx] = reorderedList;
      setItemList(newItemList);
    } else {
      const movedList = move(itemList[srcIdx], itemList[destIdx], source, destination);
      const newItemList = [...itemList];
      newItemList[srcIdx] = movedList[srcIdx];
      newItemList[destIdx] = movedList[destIdx];
      setItemList(newItemList);
    }
  };

  // 아이템 추가
  const handleAddItem = (index: number) => {
    const newItem = {
      key: `item-${new Date().getTime()}`,
      name: `item ${itemList[index].length + 1}`,
      column: index + 1,
      order: itemList[index].length + 1
    };
    const newState = [...itemList];
    newState[index] = [...newState[index], newItem];
    setItemList(newState);
  };

  // 아이템 삭제
  const handleDeleteItem = (columnIdx: number, itemIdx: number) => {
    const newItemList = [...itemList];
    const deletedItem = newItemList[columnIdx].splice(itemIdx, 1)[0];
    console.log('deletedItem', deletedItem);

    const updatedColumn = newItemList[columnIdx].map((item, index) => ({
      ...item,
      order: index + 1
    }));

    newItemList[columnIdx] = updatedColumn;

    setItemList(newItemList);

    return deletedItem;
  };

  // 제출
  const handleSubmit = () => {
    const updatedItemList = itemList.flat();

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const payload: ItemList[] = updatedItemList.map(({ key, ...item }) => item);

    onSubmit(payload);
  };

  // initItemList에 mapping용 key가 추가된 itemList 생성
  useEffect(() => {
    const newItemList = initItemList.map((item) => ({
      ...item,
      key: `${item.name}${item.column}${item.order}${new Date().getTime()}` // 고유한 mapping용 key 추가
    }));

    const columnList = Array.from({ length: columnCount }, () => [] as ItemListWithId[]);
    newItemList.forEach((item) => {
      const colIdx = item.column - 1;
      columnList[colIdx].push(item);
    });

    setItemList(columnList);
  }, [initItemList, columnCount]);

  // 각 column에 사용할 key 리스트
  useEffect(() => {
    for (let i = 0; i < columnCount; i += 1) {
      columnKeyList[i] = `columnKey-${i}`;
    }
    setColumnKeyList(columnKeyList);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [columnCount]);

  // 렌더링
  return (
    <>
      <div className="flex gap-4">
        <DragDropContext onDragEnd={handleDragEnd}>
          {/* Day 1~N Column 전체 */}
          {itemList.map((list, columnIdx) => (
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
                          className="w-full bg-white-01 p-10"
                          ref={itemProvided.innerRef}
                          {...itemProvided.draggableProps}
                          {...itemProvided.dragHandleProps}
                          style={{ ...itemSnapshot.isDragging, ...itemProvided.draggableProps.style }}
                        >
                          {/* 블록 컴포넌트 */}
                          <div className="flex-row-center justify-between">
                            <p>{item.order}</p>
                            <p>{item.name}</p>
                            <button type="button" onClick={() => handleDeleteItem(columnIdx, itemIdx)}>
                              delete
                            </button>
                          </div>
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {/* provided.placeholder 삭제 금지 */}
                  {listProvided.placeholder}
                  {/* 제출 버튼 (디버그용) */}
                  <button type="button" onClick={() => handleAddItem(columnIdx)}>
                    Add new item
                  </button>
                </div>
              )}
            </Droppable>
          ))}
        </DragDropContext>
      </div>
      <button type="button" onClick={handleSubmit}>
        제출하기
      </button>
    </>
  );
}
