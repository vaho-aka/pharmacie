import { Suspense, lazy } from 'react';
import { Routes as Router, Route } from 'react-router-dom';
import LoadingSpinner from '../Layout/LoadingSpinner';
import PrivateRoutes from './PrivateRoutes';
import AdminLayout from '../Layout/AdminLayout';
import AdminRoutes from './AdminRoutes';
import AdminPrivateRoutes from './AdminPrivateRoutes';

const AuthPage = lazy(() => import('../Pages/AuthPage'));
const HomePage = lazy(() => import('../Pages/HomePage'));
const AccountPage = lazy(() => import('../Pages/AccountPage'));
const ProductsPage = lazy(() => import('../Pages/ProductsPage'));

const Routes = () => {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <Router>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/account/:id"
          element={
            <PrivateRoutes>
              <AccountPage />
            </PrivateRoutes>
          }
        />
        <Route
          path="/products/:categoryName/:productId"
          element={<ProductsPage />}
        />
        <Route
          path="/admin/*"
          element={
            <AdminPrivateRoutes>
              <AdminLayout>
                <AdminRoutes />
              </AdminLayout>
            </AdminPrivateRoutes>
          }
        />
        <Route path="/auth" element={<AuthPage />} />
      </Router>
    </Suspense>
  );
};

export default Routes;
