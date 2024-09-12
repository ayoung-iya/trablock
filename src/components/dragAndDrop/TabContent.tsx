import { useEffect, useState } from 'react';

import { TabContentProps } from '@/apis/useArticle/article.type';
import BudgetBlock from '@/components/travelBlock/BudgetBlock';
import TravelBlock from '@/components/travelBlock/TravelBlock';
import useGoogleMapsPlaceDetails from '@/libs/hooks/useGoogleMapsPlaceDetails';

// 일정 탭 블록
export function TravelTabContent({ schedule, ...props }: TabContentProps) {
  const [photo, setPhoto] = useState('');

  const placeId = {
    GENERAL: schedule.scheduleGeneral?.googleMapPlaceId,
    TRANSPORT: schedule.scheduleTransport?.googleMapStartPlaceAddress,
    ETC: null
  };
  const { place } = useGoogleMapsPlaceDetails(placeId[schedule.dtype] || '');

  useEffect(() => {
    const placePhoto = place?.photos?.[0].getUrl({ maxWidth: 103 * 4, maxHeight: 103 * 4 });
    if (placePhoto) setPhoto(placePhoto);
  }, [place]);

  if (schedule.dtype === 'GENERAL') {
    return (
      <TravelBlock
        index={schedule.sortOrder}
        name={schedule.scheduleGeneral?.placeName || '빈 이름'}
        category={schedule.category}
        memo={schedule.memo}
        startAt={schedule.visitedTime}
        duration={schedule.durationTime}
        imageUrl={photo}
        {...props}
      />
    );
  }

  if (schedule.dtype === 'TRANSPORT') {
    return (
      <TravelBlock
        index={schedule.sortOrder}
        name={schedule.scheduleTransport?.startPlaceName || '빈 이름'}
        category={schedule.category}
        memo={schedule.memo}
        startAt={schedule.visitedTime}
        duration={schedule.durationTime}
        transport={schedule.scheduleTransport?.transportation}
        {...props}
      />
    );
  }

  if (schedule.dtype === 'ETC') {
    return (
      <TravelBlock
        index={schedule.sortOrder}
        name={schedule.scheduleEtc?.placeName || '빈 이름'}
        category={schedule.category}
        memo={schedule.memo}
        startAt={schedule.visitedTime}
        duration={schedule.durationTime}
        {...props}
      />
    );
  }
}

// 비용 탭 블록
export function BudgetTabContent({ schedule, ...props }: TabContentProps) {
  const [money, symbol] = schedule.expense.split(' ');

  if (schedule.dtype === 'GENERAL') {
    return (
      <BudgetBlock
        name={schedule.scheduleGeneral?.placeName || ''}
        category={schedule.category}
        symbol={symbol}
        money={money}
        {...props}
      />
    );
  }

  if (schedule.dtype === 'TRANSPORT') {
    return (
      <BudgetBlock
        name={schedule.scheduleTransport?.startPlaceName || ''}
        category={schedule.category}
        symbol={symbol}
        money={money}
        {...props}
      />
    );
  }

  if (schedule.dtype === 'ETC') {
    return (
      <BudgetBlock
        name={schedule.scheduleEtc?.placeName || ''}
        category={schedule.category}
        symbol={symbol}
        money={money}
        {...props}
      />
    );
  }
}
