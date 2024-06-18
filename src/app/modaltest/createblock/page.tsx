/* eslint-disable no-undef */

'use client';

import { useEffect, useState } from 'react';

import Button from '@/components/common/button/Button';
import modalList from '@/components/modal/modalList/modalList';
import {
  CreateEtcBlockData,
  CreateTransportBlockData,
  CreatedBlockData,
  DefaultCreatedBlockData,
  EtcBlockDetailData,
  OnBlockDetailEdit,
  OnEtcSelect,
  OnPlaceSelect,
  OnTransportSelect,
  PlaceBlockDetailData,
  TransportBlockDetailData
} from '@/components/modal/modalList/type';
import { DEFAULT_BLOCK_DATA, DEFAULT_CATEGORY } from '@/libs/constants/modal';
import useGoogleMapsApi from '@/libs/hooks/useGoogleMapsApi';
import useModal from '@/libs/hooks/useModal';

export default function Page() {
  const { isLoaded } = useGoogleMapsApi();
  const { openModal, closeModal } = useModal();
  const [createdBlockData, setCreatedBlockData] = useState<
    DefaultCreatedBlockData | CreatedBlockData | CreateTransportBlockData | CreateEtcBlockData
  >({
    category: DEFAULT_CATEGORY,
    place: null
  });
  const [blockData, setBlockData] = useState<PlaceBlockDetailData | TransportBlockDetailData | EtcBlockDetailData>(
    DEFAULT_BLOCK_DATA
  );

  // 숙소, 식당, 관광지, 액티비티 블록 생성
  const handlePlaceSelect: OnPlaceSelect = ({ category, place }) => {
    const newData: PlaceBlockDetailData = {
      ...blockData,
      category,
      name: place?.name || '',
      placeId: place?.place_id || ''
    };
    setCreatedBlockData({ category, place });
    setBlockData(newData);
    closeModal();
  };

  // 교통 블록 생성
  const handleTransportSelect: OnTransportSelect = ({ category, transport, place, secondPlace }) => {
    const newData: TransportBlockDetailData = {
      ...blockData,
      category,
      name: place?.name || '',
      transport,
      placeId: place?.place_id || '',
      secondPlaceId: secondPlace?.place_id || ''
    };
    setCreatedBlockData({ category, transport, place, secondPlace });
    setBlockData(newData);
    closeModal();
  };

  // 기타 블록 생성
  const handleEtcSelect: OnEtcSelect = ({ category, name }) => {
    const newData: EtcBlockDetailData = { ...blockData, category, name };
    setCreatedBlockData({ category, name });
    setBlockData(newData);
    closeModal();
  };

  // 블록 생성 모달 열기 버튼
  const handleFirstButtonClick = () => {
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

  // 일정 상세 편집 완료 버튼
  const handleDetailSubmit: OnBlockDetailEdit = ({ startAt, duration, budget, memo }) => {
    setBlockData({ ...blockData, startAt, duration, budget, memo });
    closeModal();
  };

  // 일정 상세 모달 열기 버튼
  const handleSecondButtonClick = () => {
    openModal(
      modalList.BlockDetail({
        className: 'h-[100vh] md:w-[36.875rem] max-md:rounded-none md:h-auto',
        onClose: closeModal,
        blockData,
        isLoaded,
        isEdit: true,
        onSubmit: handleDetailSubmit
      })
    );
  };

  useEffect(() => {
    console.log('createdBlockData', createdBlockData);
  }, [createdBlockData]);

  return (
    <div>
      <Button onClick={handleFirstButtonClick}>블록 생성 모달</Button>
      <Button onClick={handleSecondButtonClick}>일정 상세 모달</Button>
      {blockData && <pre>{JSON.stringify(blockData, null, 2)}</pre>}
    </div>
  );
}
