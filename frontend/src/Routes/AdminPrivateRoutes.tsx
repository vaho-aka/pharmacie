import React, { ReactNode, useEffect } from 'react';
import { useAppSelector } from '../hooks';
import { useNavigate } from 'react-router-dom';

const AdminPrivateRoutes: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const navigate = useNavigate();
  const { userLoggedIn } = useAppSelector((state) => state.user);

  useEffect(() => {
    if (!userLoggedIn.username && !userLoggedIn.isAdmin) navigate('/');
  }, [userLoggedIn, navigate]);

  return <div>{children}</div>;
};

export default AdminPrivateRoutes;
