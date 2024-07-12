import React, { ReactNode, useEffect } from 'react';
import { useAppSelector } from '../hooks';
import { useNavigate } from 'react-router-dom';

const PrivateRoutes: React.FC<{ children: ReactNode }> = ({ children }) => {
  const navigate = useNavigate();
  const { userLoggedIn } = useAppSelector((state) => state.user);

  useEffect(() => {
    if (!userLoggedIn.name) navigate('/');
  }, [userLoggedIn]);

  return <>{children}</>;
};

export default PrivateRoutes;
