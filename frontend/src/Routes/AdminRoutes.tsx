import { Suspense, lazy } from 'react';
import { Routes as Router, Route } from 'react-router-dom';
import LoadingSpinner from '../Layout/LoadingSpinner';

const AdminProductPage = lazy(() => import('../Pages/AdminProductPage'));
const AdminUserPage = lazy(() => import('../Pages/AdminUserPage'));

const AdminRoutes = () => {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <Router>
        <Route path="/user" element={<AdminUserPage />} />
        <Route path="/product" element={<AdminProductPage />} />
      </Router>
    </Suspense>
  );
};

export default AdminRoutes;
