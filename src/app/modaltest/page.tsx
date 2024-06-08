'use client';

import modalList from '@/components/modal/modalList/modalList';
import useModal from '@/libs/hooks/useModal';

export default function ModalTest() {
  const { openModal } = useModal();

  const handleClick = () => {
    openModal(modalList.Modal);
  };

  return (
    <button onClick={handleClick} type="button">
      버튼
    </button>
  );
}
