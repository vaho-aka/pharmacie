import { ReactNode, useEffect } from 'react';
import AdminSideBar from './AdminSideBar';
import { useAppDispatch } from '../hooks';
import { getProducts } from '../actions/productActions';
import { getAllUsers } from '../actions/userActions';

const AdminLayout: React.FC<{ children: ReactNode }> = ({ children }) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getProducts());
    dispatch(getAllUsers());
  }, [dispatch]);

  return (
    <div className="flex gap-4">
      <AdminSideBar />
      <div>{children}</div>
    </div>
  );
};

export default AdminLayout;
