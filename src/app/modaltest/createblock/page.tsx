/* eslint-disable no-undef */

'use client';

import { useEffect, useState } from 'react';

import Button from '@/components/common/button/Button';
import modalList from '@/components/modal/modalList/modalList';
import {
  CreateEtcBlockData,
  CreateTransportBlockData,
  CreatedBlockData,
  OnEtcSelect,
  OnPlaceSelect,
  OnTransportSelect
} from '@/components/modal/modalList/type';
import { DEFAULT_CATEGORY } from '@/libs/constants/modal';
import useGoogleMapsApi from '@/libs/hooks/useGoogleMapsApi';
import useModal from '@/libs/hooks/useModal';

export default function Page() {
  const { isLoaded } = useGoogleMapsApi();
  const { openModal, closeModal } = useModal();
  const [createdBlockData, setCreatedBlockData] = useState<
    CreatedBlockData | CreateTransportBlockData | CreateEtcBlockData
  >({
    category: DEFAULT_CATEGORY,
    place: null
  });

  // 숙소, 식당, 관광지, 액티비티 블록 데이터
  const handlePlaceSelect: OnPlaceSelect = ({ category, place }) => {
    setCreatedBlockData({ category, place });
    closeModal();
  };

  // 교통 블록 데이터
  const handleTransportSelect: OnTransportSelect = ({ category, firstPlace, secondPlace }) => {
    setCreatedBlockData({ category, firstPlace, secondPlace });
    closeModal();
  };

  // 기타 블록 데이터
  const handleEtcSelect: OnEtcSelect = ({ category, name }) => {
    setCreatedBlockData({ category, name });
    closeModal();
  };

  const handleClick = () => {
    if (!isLoaded) return;
    openModal(
      modalList.CreateBlock({
        className: 'h-[100vh] md:w-[36.875rem] max-md:rounded-none md:h-auto',
        onClose: closeModal,
        isLoaded,
        onPlaceSelect: handlePlaceSelect,
        onTransportSelect: handleTransportSelect,
        onEtcSelect: handleEtcSelect
      })
    );
  };

  useEffect(() => {
    console.log('createdBlockData', createdBlockData);
  }, [createdBlockData]);

  return (
    <div>
      <Button onClick={handleClick}>Open Modal</Button>
    </div>
  );
}
