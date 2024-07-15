import React from 'react';
import Modal from './Modal';
import { useAppDispatch, useAppSelector } from './../hooks';
import { cartActions } from '../Reducers/cartReducer';

const ConfirmModal: React.FC<{ action: () => void }> = ({ action }) => {
  const dispatch = useAppDispatch();
  const { showModal } = useAppSelector((state) => state.cart);

  const onClose = () => {
    dispatch(cartActions.SHOW_MODAL());
  };

  const actionHandler = () => {
    action();
  };

  return (
    <Modal showModal={showModal} onClose={onClose}>
      <div className="w-full text-center mb-4">
        <span>
          Voulez-vous vraiment{' '}
          <span className="text-red-500">annuler votre commande</span> ?
        </span>
        <p>Toutes vos données seront effacées</p>
      </div>
      <div className="text-right">
        <button
          className="py-1 px-6 mx-5 bg-emerald-600 rounded text-white"
          onClick={onClose}
        >
          Annuler
        </button>
        <button
          onClick={actionHandler}
          className="py-1 px-6 bg-red-200 text-red-700 rounded hover:bg-red-300 transition"
        >
          Confirmer
        </button>
      </div>
    </Modal>
  );
};

export default ConfirmModal;
