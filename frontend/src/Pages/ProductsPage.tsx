import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks';
import Card from '../Layout/Card';
import { getProducts } from '../actions/productActions';

const ProductsPage = () => {
  const dispatch = useAppDispatch();
  const { products } = useAppSelector((state) => state.product);

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  useEffect(() => {
    console.log(products);
  });

  return (
    <div className="max-w-7xl mx-auto">
      <h1 className="text-2xl border-l-8 border-lime-500 text-lime-900 px-4 mb-5 font-semibold">
        All products
      </h1>
      <div className="flex flex-wrap sm:grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 justify-center mt-10 mx-auto">
        {products.map((product) => (
          <Card key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ProductsPage;
