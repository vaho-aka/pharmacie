import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks';
import { getProductById } from '../actions/productActions';
import { useParams } from 'react-router-dom';
import { CartItem } from '../interfaces';
import { RiAddLine, RiSubtractLine } from 'react-icons/ri';
import { cartActions } from '../Reducers/cartReducer';

const ProductsPage = () => {
  const { productId } = useParams();
  const dispatch = useAppDispatch();
  const { product, catId } = useAppSelector((state) => state.product);
  const [itemNumber, setItemNumber] = useState(1);

  const formatter = new Intl.NumberFormat('de-DE');

  useEffect(() => {
    dispatch(getProductById(productId, catId));
  }, [dispatch, productId, catId]);

  const addToCartHandler = (e: React.FormEvent) => {
    e.preventDefault();

    const item: CartItem = { product, amount: itemNumber };
    dispatch(cartActions.ADD_ITEM(item));
    setItemNumber(1);
  };

  const inscreaseItemNumber = () => {
    if (product.countInStock > itemNumber) {
      setItemNumber((itemNumber: number) => itemNumber + 1);
    }
  };

  const descreaseItemNumber = () => {
    if (itemNumber > 1) {
      setItemNumber((itemNumber: number) => itemNumber - 1);
    }
  };

  const inputNumberChangeHandler = (e: React.FormEvent<HTMLInputElement>) =>
    setItemNumber(+e.currentTarget.value);

  return (
    <div className="grid grid-cols-1 max-w-[700px] lg:grid-cols-2 gap-5 lg:items-stretch lg:max-w-none mx-auto">
      <div className="flex justify-center items-center  bg-gray-200/20">
        <div className="max-w-[600px] h-[600px] mx-auto w-full flex items-center justify-center">
          <img
            src={product.imageUrl}
            className="max-w-full max-h-full w-auto h-auto object-contain"
            alt={product.name}
          />
        </div>
      </div>
      <div className="flex flex-col justify-between">
        <h1 className="border-l-8 font-semibold text-xl border-lime-500 pl-5">
          {product.name}
        </h1>
        <div className="py-4 flex flex-col gap-4">
          <div className="flex gap-4 items-center">
            <h3 className="text-xl underline">Prix:</h3>
            <span>{formatter.format(+product.price)} Ar</span>
          </div>
          <div className="flex flex-col gap-2">
            <h3 className="text-xl underline">description:</h3>
            <span className="">{product.description}</span>
          </div>
        </div>
        <form
          onSubmit={addToCartHandler}
          className=" flex flex-col justify-between"
        >
          <div>
            <div className="flex items-center gap-5 my-4">
              <h3 className="text-xl underline">En stock:</h3>
              <span>{product.countInStock}</span>
            </div>
            <div className="flex items-center gap-5 border p-4 rounded max-w-fit">
              <div
                className="cursor-pointer bg-gray-400 rounded"
                onClick={descreaseItemNumber}
              >
                <RiSubtractLine size={24} color="#f1f5f9" />
              </div>
              <input
                type="number"
                className="w-10 text-center focus:outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                value={itemNumber}
                onChange={inputNumberChangeHandler}
                min={1}
                max={product.countInStock}
              />
              <div
                className="cursor-pointer bg-gray-400 rounded"
                onClick={inscreaseItemNumber}
              >
                <RiAddLine size={24} color="#f1f5f9" />
              </div>
            </div>
          </div>
          <button
            className="w-full py-4 bg-lime-500 rounded-md text-lime-900 font-semibold mt-4 active:translate-y-1  shadow-lg shadow-gray-300 active:shadow-none transition-all"
            type="submit"
          >
            Ajouter au panier
          </button>
        </form>
      </div>
    </div>
  );
};

export default ProductsPage;
