import React, { useState } from 'react';
import { cartActions } from '../Reducers/cartReducer';
import { Item } from '../interfaces';
import { useAppDispatch } from '../hooks.js';
import { RiSubtractLine, RiAddLine } from 'react-icons/ri';

const CartItem: React.FC<{ item: Item; amount: number }> = ({
  item,
  amount,
}) => {
  const dispatch = useAppDispatch();
  const [itemNumber, setItemNumber] = useState(amount);

  const inscreaseItemNumber = () => {
    if (item.countInStock > itemNumber) {
      setItemNumber((itemNumber) => itemNumber + 1);

      const product = { product: item, amount: 1 };
      dispatch(cartActions.ADD_ITEM(product));
    }
  };

  const descreaseItemNumber = () => {
    if (itemNumber >= 1) {
      setItemNumber((itemNumber) => itemNumber - 1);

      dispatch(cartActions.REMOVE_ITEM(item._id));
    }
  };

  return (
    <div className="w-full flex items-center my-2 bg-slate-100 rounded">
      <div className="w-[10rem] h-[6.25rem] my-2">
        <img
          className="object-contain object-center w-full h-full"
          src={item.imageUrl}
          alt={item.name}
        />
      </div>
      <div className="mx-4">
        <h3 className="line-clamp-1 max-w-96">{item.name}</h3>
        <span>{item.price} Ar</span>
      </div>
      <div className="flex flex-col sm:flex-row items-center gap-5 p-4 max-w-fit ml-auto">
        <button className="bg-gray-400 rounded" onClick={descreaseItemNumber}>
          <RiSubtractLine size={30} color="#f1f5f9" />
        </button>
        <input
          type="number"
          className="w-10 text-center focus:outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
          value={itemNumber}
          onChange={(e: React.FormEvent<HTMLInputElement>) =>
            setItemNumber(+e.currentTarget.value)
          }
          min={1}
          max={item.countInStock}
        />
        <button className="bg-gray-400 rounded" onClick={inscreaseItemNumber}>
          <RiAddLine size={30} color="#f1f5f9" />
        </button>
      </div>
    </div>
  );
};

export default CartItem;
