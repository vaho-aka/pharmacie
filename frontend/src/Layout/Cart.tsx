import Modal from './Modal.jsx';
import CartItem from './CartItem.jsx';
import { cartActions } from '../Reducers/cartReducer.js';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../hooks.js';
import { RiEmotionHappyLine } from 'react-icons/ri';

const Cart = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { items, totalAmount, showCart } = useAppSelector(
    (state) => state.cart
  );
  const { userLoggedIn } = useAppSelector((state) => state.user);

  const showCartHandler = () => {
    dispatch(cartActions.SHOW_CART());
  };

  const clickHandler = () => {
    const redirect = !userLoggedIn.username
      ? '/login?redirect=/shipping'
      : '/shipping';

    navigate(redirect);
    dispatch(cartActions.SHOW_CART());
  };

  return (
    <Modal showModal={showCart} onClose={showCartHandler}>
      <div className="flex gap-4 items-center justify-between border-b-2">
        <h3 className="text-xl">Prix total:</h3>
        <span>{totalAmount} Ar</span>
      </div>
      <div className="my-4 p-1 overflow-y-scroll max-h-[20rem]">
        {items[0] ? (
          items.map(({ product, amount }) => (
            <CartItem
              item={product}
              key={product._id + amount}
              amount={amount}
            />
          ))
        ) : (
          <div className="flex flex-col gap-2 items-center text-lime-500">
            <RiEmotionHappyLine size={36} />
            <span>Commencer par visiter nos produits !</span>
          </div>
        )}
      </div>
      <div className="flex items-center justify-end gap-5">
        <button
          onClick={showCartHandler}
          className="py-1 px-6 bg-gray-200 text-gray-700 rounded "
        >
          Fermer
        </button>
        <button
          onClick={clickHandler}
          disabled={items.length > 0 ? false : true}
          className="py-1 px-6 bg-lime-500 rounded text-lime-900 disabled:cursor-not-allowed disabled:bg-gray-600 disabled:text-gray-300"
        >
          Commander
        </button>
      </div>
    </Modal>
  );
};

export default Cart;
