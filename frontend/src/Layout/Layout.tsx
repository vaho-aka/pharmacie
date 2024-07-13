import React, { ReactNode } from 'react';
import Navigation from './Navigation';
import Cart from './Cart';

const Layout: React.FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <div className="w-full p-1 md:p-3">
      <Cart />
      <Navigation />
      <div className="">{children}</div>
    </div>
  );
};

export default Layout;
