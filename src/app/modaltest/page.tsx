'use client';

import modalList from '@/components/modal/modalList/modalList';
import useModal from '@/libs/hooks/useModal';

export default function ModalTest() {
  const { openModal, closeModal } = useModal();

  const handleClick = () => {
    openModal(modalList.Modal({ className: 'max-w-[20rem] md:max-w-[36.875rem]', onClose: closeModal }));
  };

  return (
    <button onClick={handleClick} type="button">
      버튼
    </button>
  );
}
