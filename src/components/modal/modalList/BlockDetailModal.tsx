/* eslint-disable no-undef */

'use client';

import Badge from '@/components/common/Badge';
import Button from '@/components/common/button/Button';
import Modal, { ModalProps } from '@/components/modal/Modal';
import BlockDetailModalContent from '@/components/modal/modalList/BlockDetailModalContent';
import { EtcBlockDetailData, PlaceBlockDetailData, TransportBlockDetailData } from '@/components/modal/modalList/type';
import { GoogleMapsApiReturn } from '@/libs/hooks/useGoogleMapsApi';

export interface BlockDetailModalProps extends ModalProps, GoogleMapsApiReturn {
  blockData: PlaceBlockDetailData | TransportBlockDetailData | EtcBlockDetailData;
  onSubmit?: () => void;
}

// edit 모드 여부 설정해야 함
export default function BlockDetailModal({
  blockData,
  onSubmit = () => {},
  isLoaded,
  ...props
}: BlockDetailModalProps) {
  const handleSubmit = () => {
    onSubmit();
  };

  return (
    <Modal {...props}>
      <div className="flex flex-col gap-10">
        <div>
          <Badge type={blockData.category} className="mb-2">
            {blockData.category}
          </Badge>
          <p className="modal-h1 mb-3">{blockData.name}</p>
          <BlockDetailModalContent blockData={blockData} isLoaded={isLoaded} />
        </div>
        <div>
          <p className="modal-h2 mb-4">방문 시간</p>
          {blockData.startAt}
        </div>
        <div>
          <p className="modal-h2 mb-4">소요 시간</p>
          {blockData.endAt}
        </div>
        <div>
          <p className="modal-h2 mb-4">비용 추가</p>
          {blockData.budget}
        </div>
        <div>
          <p className="modal-h2 mb-4">메모</p>
          {blockData.memo}
        </div>
        <Button onClick={handleSubmit} className="btn-lg btn-solid w-full flex-shrink-0">
          완료하기
        </Button>
      </div>
    </Modal>
  );
}
