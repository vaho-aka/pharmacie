import { Suspense, lazy } from 'react';
import { Routes as Router, Route } from 'react-router-dom';
import LoadingSpinner from '../Layout/LoadingSpinner';

const HomePage = lazy(() => import('../Pages/HomePage'));
const LoginPage = lazy(() => import('../Pages/LoginPage'));

const Routes = () => {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <Router>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
      </Router>
    </Suspense>
  );
};

export default Routes;
