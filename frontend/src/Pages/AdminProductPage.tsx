import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks';
import { getProducts } from '../actions/productActions';
import { RiDeleteBinLine, RiEditLine } from 'react-icons/ri';
import { Link } from 'react-router-dom';
import { productActions } from '../Reducers/productReducer';
import { Item } from '../interfaces';

const tableClasses =
  'bg-background px-2 grid xl:grid-cols-6 lg:grid-cols-5 md:grid-cols-6 sm:grid-cols-5 grid-cols-3 items-center justify-between';

const Admin = () => {
  const dispatch = useAppDispatch();
  const { products } = useAppSelector((state) => state.product);
  // const [localProducts, setLocalProducts] = useState(products);

  const formatter = new Intl.NumberFormat('de-DE');

  useEffect(() => {
    if (products.length === 0) {
      dispatch(getProducts());
    }
    // setLocalProducts(products);
  }, [dispatch, products]);

  // const deleteProductHandler = (productId: string) => {
  //   dispatch(deleteUser(userId));
  //   setLocalProducts((prevProds) =>
  //     prevProds.filter((prod) => prod._id !== productId)
  //   );
  // };

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  const editProductHandler = (product: Item) => {
    dispatch(productActions.GET_PRODCUT_BY_ID_SUCCESS(product));
  };

  return (
    <div className="p-4">
      <h1 className="border-l-8 font-semibold text-xl border-lime-500 pl-5 mb-4">
        Lists of available products
      </h1>
      <div className="overflow-x-auto">
        <div className="w-full border-x rounded-md mt-4">
          <div
            className={`${tableClasses} py-2 bg-slate-400 text-white rounded-t-md`}
          >
            <span className="hidden md:block">ID</span>
            <span className="">Name</span>
            <span className="hidden md:block lg:hidden xl:block text-center">
              Price (Ar)
            </span>
            <span className="hidden sm:block text-center">Category</span>
            <span className="hidden md:block text-center">Count in stock</span>
            <span className="text-right">Action</span>
          </div>
          <ul className="bg-white">
            {products.map((product) => (
              <li key={product._id} className={`${tableClasses} py-2 border-b`}>
                <span className="hidden md:block">{product._id}</span>
                <span className="line-clamp-1">{product.name}</span>
                <span className="hidden md:block text-center lg:hidden xl:block">
                  {formatter.format(+product.price)}
                </span>
                <span className="hidden sm:block text-left truncate">
                  {product.categoryName}
                </span>
                <span className="hidden md:block text-center">
                  {product.countInStock}
                </span>
                <div className="flex gap-1 justify-end">
                  <Link
                    onClick={editProductHandler.bind(null, product)}
                    to={`/admin/product/edit/${product._id}`}
                  >
                    <RiEditLine size={24} />
                  </Link>
                  <button className="text-red-600">
                    <RiDeleteBinLine size={24} />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Admin;
