import React, { ReactNode } from 'react';
import Navigation from './Navigation';
import Cart from './Cart';

const Layout: React.FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <div className="w-full p-2 lg:p-1 md:p-3">
      <Cart />
      <Navigation />
      <div className="max-w-7xl mx-auto w-full">{children}</div>
    </div>
  );
};

export default Layout;
