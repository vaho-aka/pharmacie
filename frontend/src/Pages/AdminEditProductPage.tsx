import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks';
import { getProductById, updateProduct } from '../actions/productActions';
import { useParams } from 'react-router-dom';
import { Switch } from '@headlessui/react';
import LoadingSpinner from '../Layout/LoadingSpinner';

const AdminEditProductPage = () => {
  const { productId } = useParams();
  const dispatch = useAppDispatch();
  const { product, loading, error } = useAppSelector((state) => state.product);
  const [productName, setProductName] = useState('');
  const [desc, setDesc] = useState('');
  const [price, setPrice] = useState(product.price);
  const [count, setCount] = useState(0);
  const [enabled, setEnabled] = useState(+product.onSale === 1 ? true : false);

  useEffect(() => {
    dispatch(getProductById(productId));
  }, [productId, dispatch]);

  useEffect(() => {
    if (!loading && product) {
      setProductName(product.name || '');
      setDesc(product.description || '');
      setPrice(product.price || '');
      setCount(product.countInStock || 0);
    }
  }, [product, loading]);

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <div>Product not found</div>;
  }

  const updateProductHandler = () => {
    dispatch(
      updateProduct(
        product._id,
        productName,
        price,
        enabled ? 1 : 2,
        desc,
        count.toString()
      )
    );
  };

  return (
    <form className="flex gap-4 w-full lg:flex-row flex-col">
      <div className="max-w-[600px]  lg:flex-1 h-[300px] lg:h-[600px] mx-auto bg-gray-200/20 w-full flex items-center justify-center">
        <img
          src={product.imageUrl}
          className="max-w-full max-h-full w-auto h-auto object-contain"
          alt={product.name}
        />
      </div>
      <div className="flex-1 flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <label htmlFor="name" className="font-semibold">
            Product's name
          </label>
          <input
            type="text"
            id="name"
            value={productName}
            className="border-2 px-4 py-2 focus:outline-none rounded-md"
            onChange={(e) => setProductName(e.target.value)}
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="price" className="font-semibold">
            Price
          </label>
          <input
            type="number"
            id="price"
            value={price}
            className="border-2 px-4 py-2 focus:outline-none rounded-md"
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="count" className="font-semibold">
            Count in stock
          </label>
          <input
            type="number"
            id="count"
            value={count}
            className="border-2 px-4 py-2 focus:outline-none rounded-md"
            onChange={(e) => setCount(Number(e.target.value))}
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="count" className="font-semibold">
            On sale
          </label>
          <Switch
            checked={enabled}
            onChange={setEnabled}
            className="group inline-flex h-6 w-11 items-center rounded-full bg-gray-200 transition data-[checked]:bg-blue-600"
          >
            <span className="size-4 translate-x-1 rounded-full bg-white transition group-data-[checked]:translate-x-6" />
          </Switch>
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="desc" className="font-semibold">
            Description
          </label>
          <textarea
            name="desc"
            id="desc"
            rows={10}
            value={desc}
            className="border-2 resize-none px-4 py-2 focus:outline-none rounded-md"
            onChange={(e) => setDesc(e.target.value)}
          />
        </div>
        <button
          onClick={updateProductHandler}
          className="font-semibold bg-lime-500 text-lime-800 py-2 rounded-md"
        >
          update product
        </button>
      </div>
    </form>
  );
};

export default AdminEditProductPage;
