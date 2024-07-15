import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks';
import { getProductById } from '../actions/productActions';
import { useParams } from 'react-router-dom';

const ProductsPage = () => {
  const { productId, categoryName } = useParams();
  const dispatch = useAppDispatch();
  const { product } = useAppSelector((state) => state.product);

  useEffect(() => {
    console.log(productId);
    dispatch(getProductById(productId, categoryName?.split('_').join(' ')));
  }, [dispatch, productId]);

  useEffect(() => {
    console.log(product);
  });

  return (
    <div className="grid grid-cols-1 max-w-[700px] lg:grid-cols-2 gap-5 lg:items-stretch lg:max-w-none mx-auto">
      <div className="max-w-[600px] h-[600px] mx-auto bg-gray-200/20 w-full flex items-center justify-center">
        <img
          src={product.imageUrl}
          className="max-w-full max-h-full w-auto h-auto object-contain"
          alt={product.name}
        />
      </div>
      <div className="">
        <h1 className="border-l-8 font-semibold text-xl border-lime-500 pl-5">
          {product.name}
        </h1>
        <div className="py-4 flex flex-col gap-4">
          <div className="flex gap-4 items-center">
            <h3 className="text-xl underline">Prix:</h3>
            <span>{product.price} Ar</span>
          </div>
          <div className="flex flex-col gap-2">
            <h3 className="text-xl underline">description:</h3>
            <span className="">{product.desc}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;
