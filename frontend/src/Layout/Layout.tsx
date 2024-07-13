import React, { ReactNode } from 'react';
import Navigation from './Navigation';

const Layout: React.FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <div className="w-full p-1 md:p-3">
      <Navigation />
      <>{children}</>
    </div>
  );
};

export default Layout;
