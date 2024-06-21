'use client';

import React, { useEffect, useState } from 'react';

import DragAndDrop from '@/components/dragAndDrop/DragAndDrop';
import { mockPlanDetail, mockScheduleList } from '@/components/dragAndDrop/mockData';
import { ScheduleList } from '@/components/dragAndDrop/type';

export default function Page() {
  const [payload, setPayload] = useState<ScheduleList>();

  const handleSubmit = (updatedList: ScheduleList) => {
    setPayload(updatedList);
  };

  useEffect(() => {
    console.log('payload', payload);
  }, [payload]);

  return (
    <div>
      <DragAndDrop
        initList={mockScheduleList.schedules}
        startAt={mockPlanDetail.start_at}
        endAt={mockPlanDetail.end_at}
        updateList={handleSubmit}
      />
    </div>
  );
}
