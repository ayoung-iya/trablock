/* eslint-disable max-len */

'use client';

import React from 'react';

import ReactModal from 'react-modal';

import CloseSvg from '@/icons/x.svg';

export interface ModalProps extends ReactModal.Props {
  children?: React.ReactNode;
  onClose?: () => void;
  className?: string;
}

/**
 * Modal component for displaying modal content.
 *
 * @param {React.ReactNode} children - Content to be displayed inside the modal.
 * @param {function} onClose - (optional) Callback function called when the modal is closed.
 * @param {function} onAfterOpen - (optional) Callback function called after the modal is opened.
 * @param {function} onAfterClose - (optional) Callback function called after the modal is closed.
 * @param {string} className - (optional) Additional CSS class names for the modal container.
 */

export default function Modal({ children, onClose, onAfterOpen, onAfterClose, className = '' }: ModalProps) {
  const modalRoot = document.querySelector<HTMLElement>('#modal-root') ?? document.body;

  return (
    <ReactModal
      isOpen
      className={`absolute-center relative w-full rounded-[0.625rem] bg-white-01 p-[1.25rem] shadow-modal md:p-[2.5rem] ${className}`}
      overlayClassName="bg-overlay absolute-center size-full"
      onRequestClose={onClose}
      onAfterOpen={onAfterOpen}
      onAfterClose={onAfterClose}
      shouldCloseOnOverlayClick
      shouldCloseOnEsc
      preventScroll
      parentSelector={() => modalRoot}
      appElement={modalRoot}
    >
      <CloseSvg className="absolute right-5 top-5 size-[0.875rem] cursor-pointer md:size-5" onClick={onClose} />
      <p>모달입니다. 여기에 내용을 넣어주세요. 이곳에서 X 버튼을 우측 상단에 배치할 예정입니다.</p>
      {children}
      <button onClick={onClose} type="button">
        닫기
      </button>
    </ReactModal>
  );
}
