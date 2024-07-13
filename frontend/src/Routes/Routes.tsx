import { Suspense, lazy } from 'react';
import { Routes as Router, Route } from 'react-router-dom';
import LoadingSpinner from '../Layout/LoadingSpinner';

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
        <Route path="/account/:id" element={<AccountPage />} />
        <Route path="/products/:id/:id" element={<ProductsPage />} />
      </Router>
    </Suspense>
  );
};

export default Routes;
