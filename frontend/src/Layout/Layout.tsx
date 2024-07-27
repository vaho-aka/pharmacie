import React, { ReactNode } from 'react';
import Navigation from './Navigation';
import Cart from './Cart';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Layout: React.FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <div className="w-full p-2 lg:p-1 md:p-3 mb-4">
      <Cart />
      <Navigation />
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <div className="max-w-7xl mx-auto w-full">{children}</div>
    </div>
  );
};

export default Layout;
