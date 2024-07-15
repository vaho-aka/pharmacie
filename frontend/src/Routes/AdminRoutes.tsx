import { Suspense, lazy } from 'react';
import { Routes as Router, Route } from 'react-router-dom';
import LoadingSpinner from '../Layout/LoadingSpinner';

const AdminUserPage = lazy(() => import('../Pages/AdminUserPage'));
const AdminProductPage = lazy(() => import('../Pages/AdminProductPage'));
const AdminEditUserPage = lazy(() => import('../Pages/AdminEditUserPage'));
const AdminEditProductPage = lazy(
  () => import('../Pages/AdminEditProductPage')
);

const AdminRoutes = () => {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <Router>
        <Route path="/user" element={<AdminUserPage />} />
        <Route path="/product" element={<AdminProductPage />} />
        <Route path="/user/edit/:userId" element={<AdminEditUserPage />} />
        <Route
          path="/product/edit/:productId"
          element={<AdminEditProductPage />}
        />
      </Router>
    </Suspense>
  );
};

export default AdminRoutes;
