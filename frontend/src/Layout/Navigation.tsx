// import { useEffect, useState } from 'react';
import { RiShoppingCartLine } from 'react-icons/ri';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../hooks';
import { cartActions } from '../Reducers/cartReducer';

const Navigation = () => {
  const dispatch = useAppDispatch();
  // const { pathname } = useLocation();
  const { items } = useAppSelector((state) => state.cart);
  // const [showLogin, setShowLogin] = useState(true);

  const showCartHandler = () => {
    dispatch(cartActions.SHOW_CART());
  };

  // useEffect(() => {
  //   if (pathname.includes('login')) setShowLogin(false);
  //   else setShowLogin(true);
  // }, [pathname]);

  return (
    <nav className="bg-gray-200 rounded-md py-4 px-6 mb-4">
      <div className="max-w-[1400px] flex items-center justify-between mx-auto">
        <Link to="/">
          <h1 className="text-xl font-semibold py-2">Medicare</h1>
        </Link>
        <ul className="flex items-center gap-5">
          <li className="relative">
            <button onClick={showCartHandler}>
              <RiShoppingCartLine size={30} />
              <div className="absolute inline-flex items-center justify-center w-6 h-6 text-xs text-white font-semibold bg-lime-500 rounded-full -top-2 -right-2">
                {items.length}
              </div>
            </button>
          </li>
          <li className="px-4 py-2 bg-lime-500 rounded-lg text-white font-semibold">
            <Link to="/login" className="flex items-center gap-2 px-6">
              <span>Login</span>
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navigation;
