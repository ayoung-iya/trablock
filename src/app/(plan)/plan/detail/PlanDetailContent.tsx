/* eslint-disable max-len */

'use client';

import React, { useEffect, useState } from 'react';

import AddPlanButton from '@/components/common/button/AddPlan';
import Button from '@/components/common/button/Button';
import Chip from '@/components/common/button/Chip';
import ImageBox from '@/components/common/ImageBox';
import ResizableComponent, { Position } from '@/components/common/ResizableComponent';
import Map from '@/components/map/Map';
import BudgetBlock from '@/components/travelBlock/BudgetBlock';
import TravelBlock from '@/components/travelBlock/TravelBlock';
import KebabSvg from '@/icons/kebab.svg';
import PenEditSvg from '@/icons/pen-edit.svg';
import ShareSvg from '@/icons/share.svg';
import { PAGE_MAP_STYLE, PAGE_MAP_STYLE_MOBILE } from '@/libs/constants/mapStyle';
import useGoogleMapsApi from '@/libs/hooks/useGoogleMapsApi';
import useMediaQuery from '@/libs/hooks/useMediaQuery';

type TAB = 'plan' | 'budget';
const TAB_LIST: { tab: TAB; name: string }[] = [
  { tab: 'plan', name: '일정' },
  { tab: 'budget', name: '비용' }
];

interface PlanDetailContentProps {
  className?: string;
  initData: any;
}

export default function PlanDetailContent({ className, initData }: PlanDetailContentProps) {
  const [position, setPosition] = useState<Position>('left');
  const isDt = useMediaQuery('(min-width: 1280px)');
  const { isLoaded } = useGoogleMapsApi();
  const [selectedTab, setSelectedTab] = useState<TAB>('plan');

  useEffect(() => {
    if (isDt) setPosition('left');
    else setPosition('bottom');
  }, [isDt]);

  // 일정 헤더
  const Header = (
    <>
      <div className="relative w-full p-5 md:p-7 xl:p-10 xl:pb-5">
        <div className="flex-row-center absolute right-5 top-5 gap-5 md:right-7 md:top-7 xl:right-10 xl:top-10">
          <ShareSvg width={24} height={24} />
          <KebabSvg width={24} height={24} />
        </div>
        <div className="flex-row-center mb-2 justify-between">
          <p className="font-caption-1 text-black-03">
            {initData.startAt} ~ {initData.endAt}
          </p>
        </div>
        <div className="flex-row-center gap-4">
          <p className="font-title-2">{initData.name}</p>
          <PenEditSvg width={24} height={24} />
        </div>
      </div>
      <div className="mx-10 hidden border-b border-gray-02 xl:block" />
    </>
  );

  // 외부 콘텐츠
  const bgChildren = (
    <>
      {!isDt && (
        <>
          <ImageBox
            className="h-[11.25rem] w-full md:h-[15rem]"
            src={initData.imageUrl}
            alt="cover"
            width={768}
            height={180}
            priority
          />
          {Header}
        </>
      )}
      <div className="h-24 w-full">
        {isLoaded && (
          <div className="lg:absolute lg:right-0">
            <Map
              mapContainerStyle={isDt ? PAGE_MAP_STYLE : PAGE_MAP_STYLE_MOBILE}
              coordinateList={undefined}
              alwaysRender
            />
          </div>
        )}
      </div>
    </>
  );

  // 내부 블록 콘텐츠 - 일정
  const TravelTabContent = (
    <>
      <TravelBlock
        index={1}
        name="성산 일출봉"
        category="관광지"
        memo="메모입니다. 메모입니다."
        startAt="15:30"
        duration="1시간 30분"
        imageUrl="https://picsum.photos/600/600"
      />
      <TravelBlock
        index={2}
        name="성산 일출봉"
        category="교통"
        memo="메모입니다. 메모입니다."
        startAt="15:30"
        duration="1시간 30분"
        imageUrl="https://picsum.photos/600/600"
      />
      <TravelBlock
        index={3}
        name="성산 일출봉"
        category="숙소"
        memo="메모입니다. 메모입니다."
        startAt="15:30"
        duration="1시간 30분"
        imageUrl="https://picsum.photos/600/600"
      />
    </>
  );

  // 내부 블록 콘텐츠 - 비용
  const BudgetTabContent = (
    <>
      <BudgetBlock name="성산 일출봉" category="관광지" symbol="KRW" money="21,680" />
      <BudgetBlock name="성산 일출봉" category="교통" symbol="KRW" money="21,680" />
      <BudgetBlock name="성산 일출봉" category="숙소" symbol="KRW" money="21,680" />
    </>
  );

  // 탭 블록 콘텐츠 객체
  const TabContent: { [key in TAB]: React.ReactNode } = {
    plan: TravelTabContent,
    budget: BudgetTabContent
  };

  // Day N일차 리스트
  const DayContent = (
    <div className="flex-col-center w-full px-5 md:w-72 md:min-w-80 md:px-[0.625rem] md:first:pl-7 md:last:pr-7 xl:first:pl-10 xl:last:pr-10">
      {/* Day N 헤더 */}
      <div className="mb-[1.25rem] w-full border-b border-solid border-gray-02 p-3 text-center">
        <p className="font-title-4 mb-2">Day 1</p>
        <p className="font-caption-1 text-gray-01">2024.05.31</p>
      </div>
      {/* 일정 블록 */}
      <div className="flex-col-center w-full gap-3 pb-16 md:gap-4">
        {TabContent[selectedTab]}
        {TabContent[selectedTab]}
        <AddPlanButton className="w-full" onClick={() => {}} />
      </div>
    </div>
  );

  return (
    <div className={className}>
      <ResizableComponent
        className="absolute bottom-0 left-0 h-full w-full"
        position={position}
        initialSize="50%"
        minSize={isDt ? '380px' : '10%'}
        maxSize="90%"
        bgChildren={bgChildren}
      >
        {/* 헤더 */}
        {isDt && (
          <>
            <ImageBox
              className="w-full md:h-[15rem]"
              src={initData.imageUrl}
              alt="cover"
              width={768}
              height={180}
              priority
            />
            {Header}
          </>
        )}
        <div>
          {/* 탭 */}
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
          <div className="mx-5 mb-5 w-[calc(100%-5rem)] overflow-hidden md:mx-7 md:mb-7 xl:mx-10 xl:mb-9">
            <div className="flex-row-center scrollbar-custom w-full gap-2 overflow-x-auto">
              <Chip className="mb-3 flex-shrink-0" variant="day" selected onClick={() => {}}>
                Day 1
              </Chip>
              <Chip className="mb-3 flex-shrink-0" variant="day" selected={false} onClick={() => {}}>
                Day 1
              </Chip>
            </div>
          </div>
          {/* Day 1~N 콘텐츠 */}
          <div className="flex-col-center scrollbar-custom w-full md:flex md:flex-row md:items-start md:overflow-x-auto">
            {DayContent}
            {DayContent}
            {DayContent}
            {DayContent}
          </div>
        </div>
      </ResizableComponent>
    </div>
  );
}
