import React, { useContext } from 'react';

import { OpenedModalType } from '@/components/modal/type';
import { ModalDispatchContext, ModalStateContext } from '@/contexts/modalContext';

// 다른 곳에서 불러올 모달 컴포넌트를 반환하는 함수
export default function ModalLoader() {
  const OpenedModal = useContext<OpenedModalType>(ModalStateContext);
  const { close } = useContext(ModalDispatchContext);

  const { component: ModalComponent, props } = OpenedModal;

  if (!ModalComponent) return null;

  const onClose = () => {
    close();
  };

  return <ModalComponent {...props} onClose={onClose} />;
}
