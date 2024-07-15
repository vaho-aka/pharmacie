import { Suspense, lazy } from 'react';
import { Routes as Router, Route } from 'react-router-dom';
import LoadingSpinner from '../Layout/LoadingSpinner';
import PrivateRoutes from './PrivateRoutes';
import AdminLayout from '../Layout/AdminLayout';
import AdminRoutes from './AdminRoutes';
import AdminPrivateRoutes from './AdminPrivateRoutes';

const HomePage = lazy(() => import('../Pages/HomePage'));
const LoginPage = lazy(() => import('../Pages/LoginPage'));
const SignUpPage = lazy(() => import('../Pages/SignUpPage'));
const AccountPage = lazy(() => import('../Pages/AccountPage'));
const ProductsPage = lazy(() => import('../Pages/ProductsPage'));

const Routes = () => {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <Router>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<SignUpPage />} />
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
      </Router>
    </Suspense>
  );
};

export default Routes;
