import React from 'react';

import ReactModal from 'react-modal';

interface ModalProps extends ReactModal.Props {
  children: React.ReactNode;
  onClose?: () => void;
}

/**
 * Modal component for displaying modal content.
 *
 * @param {React.ReactNode} children - Content to be displayed inside the modal.
 * @param {function} onClose - (optional) Callback function called when the modal is closed.
 * @param {function} onAfterOpen - (optional) Callback function called after the modal is opened.
 * @param {function} onAfterClose - (optional) Callback function called after the modal is closed.
 * @param {string} className - (optional) Additional CSS class names for the modal container.
 * @param {string} overlayClassName - (optional) Additional CSS class names for the modal overlay.
 */

export default function Modal({
  children,
  onClose,
  onAfterOpen,
  onAfterClose,
  className,
  overlayClassName
}: ModalProps) {
  const modalRoot = document.querySelector<HTMLElement>('#modal-root') ?? document.body;

  return (
    <ReactModal
      isOpen
      className={className}
      overlayClassName={overlayClassName}
      onRequestClose={onClose}
      onAfterOpen={onAfterOpen}
      onAfterClose={onAfterClose}
      shouldCloseOnOverlayClick
      shouldCloseOnEsc
      preventScroll
      parentSelector={() => modalRoot}
      appElement={modalRoot}
    >
      모달
      {children}
    </ReactModal>
  );
}
