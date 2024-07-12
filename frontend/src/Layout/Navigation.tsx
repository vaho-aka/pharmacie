import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navigation = () => {
  const { pathname } = useLocation();
  const [showNavLink, setShowNavLink] = useState(true);

  useEffect(() => {
    if (pathname.includes('login')) setShowNavLink(false);
    else setShowNavLink(true);
  }, [pathname]);

  return (
    <nav className="bg-gray-200 rounded-md flex items-center justify-between py-4 px-6 mb-4">
      <Link to="/">
        <h1 className="text-xl font-semibold py-2">Medicare</h1>
      </Link>
      {showNavLink && (
        <ul className="flex items-center">
          <li className="px-4 py-2 bg-lime-500 rounded-lg text-white font-semibold">
            <Link to="/login" className="flex items-center gap-2 px-6">
              <span>Login</span>
            </Link>
          </li>
        </ul>
      )}
    </nav>
  );
};

export default Navigation;
