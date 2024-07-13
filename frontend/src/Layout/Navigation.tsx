import { useEffect, useState } from 'react';
import { RiShoppingCartLine } from 'react-icons/ri';
import { Link, useLocation } from 'react-router-dom';

const Navigation = () => {
  const { pathname } = useLocation();
  const [showLogin, setShowLogin] = useState(true);

  useEffect(() => {
    if (pathname.includes('login')) setShowLogin(false);
    else setShowLogin(true);
  }, [pathname]);

  return (
    <nav className="bg-gray-200 rounded-md flex items-center justify-between py-4 px-6 mb-4">
      <Link to="/">
        <h1 className="text-xl font-semibold py-2">Medicare</h1>
      </Link>
      <ul className="flex items-center gap-5">
        <li className="relative">
          <button>
            <RiShoppingCartLine size={30} />
            <div className="absolute inline-flex items-center justify-center w-6 h-6 text-xs text-white font-semibold bg-lime-500 rounded-full -top-2 -right-2">
              2
            </div>
          </button>
        </li>
        {showLogin && (
          <li className="px-4 py-2 bg-lime-500 rounded-lg text-white font-semibold">
            <Link to="/login" className="flex items-center gap-2 px-6">
              <span>Login</span>
            </Link>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navigation;
