'use client';

import React from 'react';

import DragAndDrop, { ItemList } from '@/components/dragAndDrop/DragAndDrop';

const initialItems: ItemList[] = [
  { schedule_id: '1', name: 'item 1', column: 1, order: 1 },
  { schedule_id: '2', name: 'item 2', column: 1, order: 2 },
  { schedule_id: '3', name: 'item 3', column: 2, order: 1 },
  { schedule_id: '4', name: 'item 4', column: 2, order: 2 }
];

export default function Page() {
  const handleSubmit = (itemList: ItemList[]) => {
    console.log('itemList', itemList);
  };

  return (
    <div>
      <DragAndDrop initItemList={initialItems} columnCount={3} onSubmit={handleSubmit} />
    </div>
  );
}
