import React, { ReactNode, useRef, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { Transition } from '@headlessui/react';

const Backdrop: React.FC<{ showModal: boolean }> = ({ showModal }) => {
  return (
    <Transition
      show={showModal}
      as="div"
      className="fixed top-0 left-0 bg-[#030712bf] h-full w-full z-50"
    ></Transition>
  );
};

const ModalOverlay: React.FC<{
  children: ReactNode;
  showModal: boolean;
  onClose: () => void;
}> = ({ children, onClose, showModal }) => {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    if (showModal) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('touchstart', handleClickOutside);
      document.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [showModal, onClose]);

  return (
    <Transition
      as="div"
      show={showModal}
      enter="transition duration-250 ease-in"
      enterFrom="-translate-y-12 opacity-0"
      enterTo="translate-y-0 opacity-100"
      leave="transition duration-100 ease-out"
      leaveFrom="translate-y-0 opacity-100"
      leaveTo="-translate-y-12 opacity-0"
      className="fixed top-0 left-0 bg-transparent flex items-center justify-center h-full w-full z-50"
    >
      <div ref={modalRef} className="p-4 rounded-md bg-white sm:min-w-[500px]">
        {children}
      </div>
    </Transition>
  );
};

const portalElement = document.getElementById('overlays') as HTMLDivElement;

const Modal: React.FC<{
  children: ReactNode;
  showModal: boolean;
  onClose: () => void;
}> = ({ children, onClose, showModal }) => {
  return (
    <>
      {ReactDOM.createPortal(<Backdrop showModal={showModal} />, portalElement)}
      {ReactDOM.createPortal(
        <ModalOverlay showModal={showModal} onClose={onClose}>
          {children}
        </ModalOverlay>,
        portalElement
      )}
    </>
  );
};

export default Modal;
